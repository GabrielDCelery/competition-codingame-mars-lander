import gameInputInterpreter from './interpreters/game-input-interpreter';
import { MarsLander } from './entities/mars-lander';
import { Terrain } from './entities/terrain';
import { TERRAIN_WIDTH, TERRAIN_HEIGHT } from './consts';
import { MarsLanderAI } from './ai/mars-lander-ai';
import configs from './configs';

const marsLander = new MarsLander();
const terrain = new Terrain();
const marsLanderAI = new MarsLanderAI(marsLander, terrain, configs);

terrain.setState({
    width: TERRAIN_WIDTH,
    height: TERRAIN_HEIGHT,
    surfacePoints: gameInputInterpreter.getSurfacePoints(),
});

while (true) {
    try {
        marsLander.setState(gameInputInterpreter.getMarsLanderState());
        const { angle, thrust } = marsLanderAI.createCommandForNextTick();
        console.log(`${angle} ${thrust}`);
    } catch (error) {
        console.error(error);
    }
}
