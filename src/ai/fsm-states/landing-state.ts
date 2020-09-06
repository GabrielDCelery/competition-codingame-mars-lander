import { FsmState } from './types';
import { IMarsLander, MarsLanderCommand } from '../../entities/mars-lander';
import { ITerrain } from '../../entities/terrain';
import MCSearch, {
    ValidActionsGetter,
    ActionToStateApplier,
    StateScorer,
    TerminalStateChecker,
} from '../../generic-algorithms/monte-carlo';
import gameStateInterpreter, { IGameState } from '../../interpreters/game-state-interpreter';
import { MarsLanderFsmStateConfig } from '../../configs';
import * as utility from '../../generic-algorithms/utility-helpers';
import { LANDING_SPEED_LIMIT_X } from '../../consts';

export default class LandingState implements FsmState {
    marsLander: IMarsLander;
    terrain: ITerrain;
    config: MarsLanderFsmStateConfig;

    constructor(marsLander: IMarsLander, terrain: ITerrain, config: MarsLanderFsmStateConfig) {
        this.marsLander = marsLander;
        this.terrain = terrain;
        this.config = config;
    }

    allowedCommandCheckerWrapper = ({
        marsLander,
    }: {
        marsLander: IMarsLander;
        terrain: ITerrain;
    }): ((command: MarsLanderCommand) => boolean) => {
        return command => {
            if (marsLander.state.speed.x === 0) {
                return command.angle === 0;
            }
            if (marsLander.state.speed.x > 0) {
                return marsLander.state.angle <= command.angle;
            }
            if (marsLander.state.speed.x < 0) {
                return command.angle <= marsLander.state.angle;
            }
            throw new Error('This shouldnt have happened');
        };
    };

    getValidActionsMc: ValidActionsGetter<IGameState, MarsLanderCommand> = gameState => {
        const isAllowedCommandChecker = this.allowedCommandCheckerWrapper(gameState);
        return gameState.marsLander.getAllowedCommands(isAllowedCommandChecker);
    };

    applyActionAndCloneStateMc: ActionToStateApplier<IGameState, MarsLanderCommand> = (
        gameState,
        command
    ) => {
        return {
            marsLander: gameState.marsLander.applyCommandToState(command).clone(),
            terrain: gameState.terrain.clone(),
        };
    };

    checkIfTerminalStateMc: TerminalStateChecker<IGameState> = ({ nextState }) => {
        return (
            gameStateInterpreter.hasSuccessfullyLanded(nextState) ||
            gameStateInterpreter.hasCrashed(nextState) ||
            gameStateInterpreter.hasFlownOffTheMap(nextState)
        );
    };

    calculateStateUtilityScore: StateScorer<IGameState> = ({
        initialState,
        terminalState,
    }): number => {
        const maxAllowedOffsetX = LANDING_SPEED_LIMIT_X;
        const xCovered = Math.abs(
            initialState.marsLander.state.coordinates.x -
                terminalState.marsLander.state.coordinates.x
        );

        const yCovered =
            initialState.marsLander.state.coordinates.y -
            terminalState.marsLander.state.coordinates.y;
        const yToCover =
            initialState.marsLander.state.coordinates.y - initialState.terrain.landingZone.start.y;

        const fuelAtStart = initialState.marsLander.state.fuel;
        const fueldUsed = initialState.marsLander.state.fuel - terminalState.marsLander.state.fuel;

        const uDistanceX = utility.normalizedExponentialDecay({
            value: xCovered <= maxAllowedOffsetX ? xCovered : maxAllowedOffsetX,
            max: maxAllowedOffsetX,
        });
        const uDistanceY = utility.normalizedExponential({ value: yCovered, max: yToCover });
        const uFuel = utility.normalizedExponentialDecay({
            value: fueldUsed,
            max: fuelAtStart,
        });

        return utility.average([uDistanceX, uDistanceY, uFuel]);
    };

    scoreStateMc: StateScorer<IGameState> = ({ numOfSteps, initialState, terminalState }) => {
        if (gameStateInterpreter.hasSuccessfullyLanded(terminalState)) {
            return 1000;
        }

        if (
            gameStateInterpreter.hasFlownOffTheMap(terminalState) ||
            gameStateInterpreter.hasCrashed(terminalState)
        ) {
            return 0;
        }

        return this.calculateStateUtilityScore({ numOfSteps, initialState, terminalState }) * 100;
    };

    createCommandForNextTick(): MarsLanderCommand {
        const mc = new MCSearch<IGameState, MarsLanderCommand>({
            startState: {
                marsLander: this.marsLander.clone(),
                terrain: this.terrain.clone(),
            },
            numOfMaxIterations: Infinity,
            maxTimetoSpend: this.config.monteCarlo.maxTimetoSpend,
            cConst: this.config.monteCarlo.cConst,
            maxRolloutSteps: this.config.monteCarlo.maxRolloutSteps,
            getValidActions: this.getValidActionsMc,
            applyActionAndCloneState: this.applyActionAndCloneStateMc,
            scoreState: this.scoreStateMc,
            checkIfTerminalState: this.checkIfTerminalStateMc,
        });

        return mc.run();
    }
}
