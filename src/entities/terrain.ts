import { Coordinates } from '../shared-types';
import { LANDING_ZONE_MINIMUM_LENGTH } from '../consts';

export type TerrainState = {
    width: number;
    height: number;
    surfacePoints: Coordinates[];
};

export type LandingZone = {
    start: Coordinates;
    end: Coordinates;
};

export interface ITerrain {
    state: TerrainState;
    landingZone: {
        start: Coordinates;
        end: Coordinates;
    };
    setState: (state: TerrainState) => this;
    findLandingZone: (state: TerrainState) => this;
    clone: () => ITerrain;
    areCoordinatesWithinBoundaries: (coordinates: Coordinates) => boolean;
}

export class Terrain implements ITerrain {
    state: TerrainState;
    landingZone: LandingZone;

    constructor() {
        this.setState = this.setState.bind(this);
        this.clone = this.clone.bind(this);
        this.areCoordinatesWithinBoundaries = this.areCoordinatesWithinBoundaries.bind(this);
    }

    setState(state: TerrainState): this {
        this.state = state;
        this.findLandingZone();
        return this;
    }

    clone(): ITerrain {
        return this;
    }

    findLandingZone(): this {
        for (let i = 0, iMax = this.state.surfacePoints.length; i < iMax; i++) {
            const start = this.state.surfacePoints[i];
            const end = this.state.surfacePoints[i + 1];

            if (start.y - end.y === 0 && LANDING_ZONE_MINIMUM_LENGTH <= Math.abs(start.x - end.x)) {
                this.landingZone = { start, end };
                return this;
            }
        }

        throw new Error('Could not find the landing zone');
    }

    areCoordinatesWithinBoundaries(coordinates: Coordinates): boolean {
        return (
            0 <= coordinates.x &&
            0 <= coordinates.y &&
            coordinates.x < this.state.width &&
            coordinates.y < this.state.height
        );
    }
}
