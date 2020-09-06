import { IMarsLander, MarsLanderCommand } from '../../entities/mars-lander';
import { ITerrain } from '../../entities/terrain';
import {
    ValidActionsGetter,
    ActionToStateApplier,
    TerminalStateChecker,
    StateScorer,
} from '../../generic-algorithms/monte-carlo';
import { IGameState } from '../../interpreters/game-state-interpreter';

export enum MarsLanderStateName {
    Landing,
}

export interface FsmState {
    marsLander: IMarsLander;
    terrain: ITerrain;
    createCommandForNextTick: () => MarsLanderCommand;
    getValidActionsMc: ValidActionsGetter<IGameState, MarsLanderCommand>;
    applyActionAndCloneStateMc: ActionToStateApplier<IGameState, MarsLanderCommand>;
    checkIfTerminalStateMc: TerminalStateChecker<IGameState>;
    scoreStateMc: StateScorer<IGameState>;
    calculateStateUtilityScore: StateScorer<IGameState>;
}
