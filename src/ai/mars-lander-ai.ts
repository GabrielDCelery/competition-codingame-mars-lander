import { IMarsLander, MarsLanderCommand } from '../entities/mars-lander';
import { ITerrain } from '../entities/terrain';
import { FsmState, MarsLanderStateName } from './fsm-states/types';
import LandingState from './fsm-states/landing-state';
import { MarsLanderAIConfig } from '../configs';
import gameStateInterpreter, { IGameState } from '../interpreters/game-state-interpreter';

export class MarsLanderAI {
    private marsLander: IMarsLander;
    private terrain: ITerrain;
    private config: MarsLanderAIConfig;
    private currentFsmStateName: MarsLanderStateName;
    private currentFsmState: FsmState;

    constructor(marsLander: IMarsLander, terrain: ITerrain, config: MarsLanderAIConfig) {
        this.marsLander = marsLander;
        this.terrain = terrain;
        this.config = config;
        this.setCurrentFsmState(MarsLanderStateName.Landing);
    }

    private getNextFsmStateName(gameState: IGameState): MarsLanderStateName {
        const { marsLander, terrain } = gameState;
        if (gameStateInterpreter.isAboveLandingZone({ marsLander, terrain })) {
            return MarsLanderStateName.Landing;
        }
        throw new Error('This shouldnt have happened');
    }

    private setCurrentFsmState(nextFsmStateName: MarsLanderStateName): void {
        this.currentFsmStateName = nextFsmStateName;

        switch (this.currentFsmStateName) {
            case MarsLanderStateName.Landing: {
                this.currentFsmState = new LandingState(
                    this.marsLander,
                    this.terrain,
                    this.config[this.currentFsmStateName]
                );
                return;
            }

            default:
                throw new Error('Invalid currentFsmState for Mars Lander');
        }
    }

    createCommandForNextTick(): MarsLanderCommand {
        const nextFsmStateName = this.getNextFsmStateName({
            marsLander: this.marsLander,
            terrain: this.terrain,
        });
        if (nextFsmStateName !== this.currentFsmStateName) {
            this.setCurrentFsmState(nextFsmStateName);
        }
        return this.currentFsmState.createCommandForNextTick();
    }
}
