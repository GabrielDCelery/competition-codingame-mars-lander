import { Coordinates } from '../shared-types';
import { FsmState } from '../entities/mars-lander';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const readline: any;

class GameInputInterpreter {
    getSurfacePoints(): Coordinates[] {
        const surfacePoints: Coordinates[] = [];
        const numOfSurfacePoints: number = parseInt(readline());
        for (let i = 0; i < numOfSurfacePoints; i++) {
            const [x, y]: number[] = readline()
                .split(' ')
                .map((value: string) => {
                    return parseInt(value, 10);
                });
            surfacePoints.push({ x, y });
        }
        return surfacePoints;
    }

    getMarsLanderState(): FsmState {
        const [x, y, hSpeed, vSpeed, fuel, angle, thrust]: number[] = readline()
            .split(' ')
            .map((value: string) => {
                return parseInt(value, 10);
            });
        return {
            coordinates: { x, y },
            speed: { x: hSpeed, y: vSpeed },
            fuel,
            angle,
            thrust,
        };
    }
}

export default new GameInputInterpreter();
