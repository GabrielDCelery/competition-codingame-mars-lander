import { Coordinates, Speed } from '../shared-types';
import {
    MAXIMUM_THRUST,
    MINIMUM_THRUST,
    MAXIMUM_THRUST_CHANGE_PER_TICK,
    MAXIMUM_ANGLE_CHANGE_PER_TICK,
    MAXIMUM_ANGLE,
    MINIMUM_ANGLE,
} from '../consts';

export type FsmState = {
    coordinates: Coordinates;
    speed: Speed;
    fuel: number;
    angle: number;
    thrust: number;
};

export type MarsLanderCommand = {
    angle: number;
    thrust: number;
};

export interface IMarsLander {
    state: FsmState;
    setState: (state: FsmState) => this;
    clone: () => IMarsLander;
    applyCommandToState: (command: MarsLanderCommand) => this;
    getAllowedCommands: (
        isAllowedCommandChecker: (command: MarsLanderCommand) => boolean
    ) => MarsLanderCommand[];
}

export class MarsLander implements IMarsLander {
    state: FsmState;

    setState(state: FsmState): this {
        this.state = state;
        return this;
    }

    clone(): IMarsLander {
        return new MarsLander().setState({
            coordinates: {
                x: this.state.coordinates.x,
                y: this.state.coordinates.y,
            },
            speed: {
                x: this.state.speed.x,
                y: this.state.speed.y,
            },
            thrust: this.state.thrust,
            fuel: this.state.fuel,
            angle: this.state.angle,
        });
    }

    applyCommandToState(command: MarsLanderCommand): this {
        const time = 1;
        const { thrust, angle } = command;

        this.state.thrust = thrust;
        this.state.angle = angle;

        const availableThrust =
            this.state.fuel < this.state.thrust ? this.state.fuel : this.state.thrust;

        this.state.fuel = this.state.fuel - availableThrust * time;

        const angleInRad = (this.state.angle * Math.PI) / 180;

        const accelThrustX = (angleInRad < 0 ? 1 : -1) * Math.sin(angleInRad) * availableThrust;
        const accelThrustY = Math.cos(angleInRad) * availableThrust;

        this.state.speed.x = this.state.speed.x + accelThrustX * time;
        this.state.speed.y = this.state.speed.y + accelThrustY * time - 3.711 * time;

        this.state.coordinates.x = this.state.coordinates.x + this.state.speed.x * time;
        this.state.coordinates.y = this.state.coordinates.y + this.state.speed.y * time;

        return this;
    }

    getAllowedCommands(
        isAllowedCommandChecker: (command: MarsLanderCommand) => boolean
    ): MarsLanderCommand[] {
        const validCommands: MarsLanderCommand[] = [];

        const validThrusts: number[] = [
            this.state.thrust,
            Math.min(MAXIMUM_THRUST, this.state.thrust + MAXIMUM_THRUST_CHANGE_PER_TICK),
            Math.max(MINIMUM_THRUST, this.state.thrust - MAXIMUM_THRUST_CHANGE_PER_TICK),
        ].filter((value, index, self) => self.indexOf(value) === index);

        let lastProcessedAngle = -Infinity;

        for (let i = 0, iMax = MAXIMUM_ANGLE_CHANGE_PER_TICK; i <= iMax; i++) {
            const angle = this.state.angle + i;
            if (MAXIMUM_ANGLE < angle || angle === lastProcessedAngle) {
                break;
            }
            validThrusts.forEach(thrust => {
                if (isAllowedCommandChecker({ angle, thrust })) {
                    validCommands.push({ angle, thrust });
                }
            });
        }

        lastProcessedAngle = -Infinity;

        for (let i = -1, iMin = -1 * MAXIMUM_ANGLE_CHANGE_PER_TICK; iMin <= i; i--) {
            const angle = this.state.angle + i;
            if (angle < MINIMUM_ANGLE || angle === lastProcessedAngle) {
                break;
            }
            validThrusts.forEach(thrust => {
                if (isAllowedCommandChecker({ angle, thrust })) {
                    validCommands.push({ angle, thrust });
                }
            });
        }

        return validCommands;
    }
}
