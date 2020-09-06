import { expect } from 'chai';
import { describe, it } from 'mocha';
import { Terrain } from '../src/entities/terrain';

describe('Terrain', () => {
    it('setsterrain state properly ', () => {
        // Given
        const terrain = new Terrain();
        terrain.setState({
            width: 7000,
            height: 3000,
            surfacePoints: [
                { x: 0, y: 100 },
                { x: 1000, y: 500 },
                { x: 1500, y: 100 },
                { x: 3000, y: 100 },
                { x: 5000, y: 1500 },
                { x: 6999, y: 1000 },
            ],
        });

        expect(terrain.state).to.deep.equal({
            width: 7000,
            height: 3000,
            surfacePoints: [
                { x: 0, y: 100 },
                { x: 1000, y: 500 },
                { x: 1500, y: 100 },
                { x: 3000, y: 100 },
                { x: 5000, y: 1500 },
                { x: 6999, y: 1000 },
            ],
        });
        expect(terrain.landingZone).to.deep.equal({
            end: {
                x: 3000,
                y: 100,
            },
            start: {
                x: 1500,
                y: 100,
            },
        });
    });
});
