import { IMarsLander } from '../entities/mars-lander';
import { ITerrain } from '../entities/terrain';
import {
    LANDING_SPEED_LIMIT_Y,
    LANDING_SPEED_LIMIT_X,
    LANDING_SPEED_LIMIT_SAFETY_MULTIPLIER,
} from '../consts';

export type IGameState = { marsLander: IMarsLander; terrain: ITerrain };

export interface IGameStateInterpreter {
    landingSpeedLimitWithSafetyY: number;
    landingSpeedLimitWithSafetyX: number;
    landingHitBoxY: number;
    hasSuccessfullyLanded: (gameState: IGameState) => boolean;
    hasCrashed: (gameState: IGameState) => boolean;
    hasFlownOffTheMap: (gameState: IGameState) => boolean;
}

class GameStateInterpreter {
    landingSpeedLimitWithSafetyY: number;
    landingSpeedLimitWithSafetyX: number;
    landingHitBoxY: number;

    constructor() {
        this.landingSpeedLimitWithSafetyY =
            LANDING_SPEED_LIMIT_Y * LANDING_SPEED_LIMIT_SAFETY_MULTIPLIER;
        this.landingSpeedLimitWithSafetyX =
            LANDING_SPEED_LIMIT_X * LANDING_SPEED_LIMIT_SAFETY_MULTIPLIER;
        this.landingHitBoxY = LANDING_SPEED_LIMIT_Y * 0.5;
    }

    hasSuccessfullyLanded(gameState: IGameState): boolean {
        const { marsLander, terrain } = gameState;
        const distanceFromGround = marsLander.state.coordinates.y - terrain.landingZone.start.y;
        return (
            distanceFromGround <= 0 &&
            this.landingHitBoxY <= distanceFromGround &&
            marsLander.state.angle === 0 &&
            Math.abs(marsLander.state.speed.y) <= this.landingSpeedLimitWithSafetyY &&
            Math.abs(marsLander.state.speed.x) <= this.landingSpeedLimitWithSafetyX
        );
    }

    hasCrashed(gameState: IGameState): boolean {
        const { marsLander, terrain } = gameState;
        const reachedSurface = marsLander.state.coordinates.y <= terrain.landingZone.start.y;

        if (reachedSurface && LANDING_SPEED_LIMIT_X < Math.abs(marsLander.state.speed.x)) {
            return true;
        }

        if (reachedSurface && LANDING_SPEED_LIMIT_Y < Math.abs(marsLander.state.speed.y)) {
            return true;
        }

        return false;
    }

    hasFlownOffTheMap(gameState: IGameState): boolean {
        const { marsLander, terrain } = gameState;
        return !terrain.areCoordinatesWithinBoundaries(marsLander.state.coordinates);
    }
}

export default new GameStateInterpreter();
