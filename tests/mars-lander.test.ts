import { expect } from 'chai';
import { describe, it } from 'mocha';
import { MarsLander } from '../src/entities/mars-lander';

describe('MarsLander', () => {
    it('gets valid command values from a starting position 1', () => {
        // Given
        const marsLander = new MarsLander();
        marsLander.setState({
            coordinates: {
                x: 1000,
                y: 1000,
            },
            speed: {
                x: 0,
                y: 0,
            },
            fuel: 1000,
            angle: 0,
            thrust: 0,
        });

        // When
        const commands = marsLander.getAllowedCommands(() => true);

        // Then
        expect(commands).to.deep.equal([
            { angle: 0, thrust: 0 },
            { angle: 0, thrust: 1 },
            { angle: 1, thrust: 0 },
            { angle: 1, thrust: 1 },
            { angle: 2, thrust: 0 },
            { angle: 2, thrust: 1 },
            { angle: 3, thrust: 0 },
            { angle: 3, thrust: 1 },
            { angle: 4, thrust: 0 },
            { angle: 4, thrust: 1 },
            { angle: 5, thrust: 0 },
            { angle: 5, thrust: 1 },
            { angle: 6, thrust: 0 },
            { angle: 6, thrust: 1 },
            { angle: 7, thrust: 0 },
            { angle: 7, thrust: 1 },
            { angle: 8, thrust: 0 },
            { angle: 8, thrust: 1 },
            { angle: 9, thrust: 0 },
            { angle: 9, thrust: 1 },
            { angle: 10, thrust: 0 },
            { angle: 10, thrust: 1 },
            { angle: 11, thrust: 0 },
            { angle: 11, thrust: 1 },
            { angle: 12, thrust: 0 },
            { angle: 12, thrust: 1 },
            { angle: 13, thrust: 0 },
            { angle: 13, thrust: 1 },
            { angle: 14, thrust: 0 },
            { angle: 14, thrust: 1 },
            { angle: 15, thrust: 0 },
            { angle: 15, thrust: 1 },
            { angle: -1, thrust: 0 },
            { angle: -1, thrust: 1 },
            { angle: -2, thrust: 0 },
            { angle: -2, thrust: 1 },
            { angle: -3, thrust: 0 },
            { angle: -3, thrust: 1 },
            { angle: -4, thrust: 0 },
            { angle: -4, thrust: 1 },
            { angle: -5, thrust: 0 },
            { angle: -5, thrust: 1 },
            { angle: -6, thrust: 0 },
            { angle: -6, thrust: 1 },
            { angle: -7, thrust: 0 },
            { angle: -7, thrust: 1 },
            { angle: -8, thrust: 0 },
            { angle: -8, thrust: 1 },
            { angle: -9, thrust: 0 },
            { angle: -9, thrust: 1 },
            { angle: -10, thrust: 0 },
            { angle: -10, thrust: 1 },
            { angle: -11, thrust: 0 },
            { angle: -11, thrust: 1 },
            { angle: -12, thrust: 0 },
            { angle: -12, thrust: 1 },
            { angle: -13, thrust: 0 },
            { angle: -13, thrust: 1 },
            { angle: -14, thrust: 0 },
            { angle: -14, thrust: 1 },
            { angle: -15, thrust: 0 },
            { angle: -15, thrust: 1 },
        ]);
    });

    it('gets valid command values from a starting position 2', () => {
        // Given
        const marsLander = new MarsLander();
        marsLander.setState({
            coordinates: {
                x: 1000,
                y: 1000,
            },
            speed: {
                x: 0,
                y: 0,
            },
            fuel: 1000,
            angle: 0,
            thrust: 4,
        });

        // When
        const commands = marsLander.getAllowedCommands(() => true);

        // Then
        expect(commands).to.deep.equal([
            { angle: 0, thrust: 4 },
            { angle: 0, thrust: 3 },
            { angle: 1, thrust: 4 },
            { angle: 1, thrust: 3 },
            { angle: 2, thrust: 4 },
            { angle: 2, thrust: 3 },
            { angle: 3, thrust: 4 },
            { angle: 3, thrust: 3 },
            { angle: 4, thrust: 4 },
            { angle: 4, thrust: 3 },
            { angle: 5, thrust: 4 },
            { angle: 5, thrust: 3 },
            { angle: 6, thrust: 4 },
            { angle: 6, thrust: 3 },
            { angle: 7, thrust: 4 },
            { angle: 7, thrust: 3 },
            { angle: 8, thrust: 4 },
            { angle: 8, thrust: 3 },
            { angle: 9, thrust: 4 },
            { angle: 9, thrust: 3 },
            { angle: 10, thrust: 4 },
            { angle: 10, thrust: 3 },
            { angle: 11, thrust: 4 },
            { angle: 11, thrust: 3 },
            { angle: 12, thrust: 4 },
            { angle: 12, thrust: 3 },
            { angle: 13, thrust: 4 },
            { angle: 13, thrust: 3 },
            { angle: 14, thrust: 4 },
            { angle: 14, thrust: 3 },
            { angle: 15, thrust: 4 },
            { angle: 15, thrust: 3 },
            { angle: -1, thrust: 4 },
            { angle: -1, thrust: 3 },
            { angle: -2, thrust: 4 },
            { angle: -2, thrust: 3 },
            { angle: -3, thrust: 4 },
            { angle: -3, thrust: 3 },
            { angle: -4, thrust: 4 },
            { angle: -4, thrust: 3 },
            { angle: -5, thrust: 4 },
            { angle: -5, thrust: 3 },
            { angle: -6, thrust: 4 },
            { angle: -6, thrust: 3 },
            { angle: -7, thrust: 4 },
            { angle: -7, thrust: 3 },
            { angle: -8, thrust: 4 },
            { angle: -8, thrust: 3 },
            { angle: -9, thrust: 4 },
            { angle: -9, thrust: 3 },
            { angle: -10, thrust: 4 },
            { angle: -10, thrust: 3 },
            { angle: -11, thrust: 4 },
            { angle: -11, thrust: 3 },
            { angle: -12, thrust: 4 },
            { angle: -12, thrust: 3 },
            { angle: -13, thrust: 4 },
            { angle: -13, thrust: 3 },
            { angle: -14, thrust: 4 },
            { angle: -14, thrust: 3 },
            { angle: -15, thrust: 4 },
            { angle: -15, thrust: 3 },
        ]);
    });

    it('gets valid command values from a starting position 3', () => {
        // Given
        const marsLander = new MarsLander();
        marsLander.setState({
            coordinates: {
                x: 1000,
                y: 1000,
            },
            speed: {
                x: 0,
                y: 0,
            },
            fuel: 1000,
            angle: 0,
            thrust: 2,
        });

        // When
        const commands = marsLander.getAllowedCommands(() => true);

        // Then
        expect(commands).to.deep.equal([
            { angle: 0, thrust: 2 },
            { angle: 0, thrust: 3 },
            { angle: 0, thrust: 1 },
            { angle: 1, thrust: 2 },
            { angle: 1, thrust: 3 },
            { angle: 1, thrust: 1 },
            { angle: 2, thrust: 2 },
            { angle: 2, thrust: 3 },
            { angle: 2, thrust: 1 },
            { angle: 3, thrust: 2 },
            { angle: 3, thrust: 3 },
            { angle: 3, thrust: 1 },
            { angle: 4, thrust: 2 },
            { angle: 4, thrust: 3 },
            { angle: 4, thrust: 1 },
            { angle: 5, thrust: 2 },
            { angle: 5, thrust: 3 },
            { angle: 5, thrust: 1 },
            { angle: 6, thrust: 2 },
            { angle: 6, thrust: 3 },
            { angle: 6, thrust: 1 },
            { angle: 7, thrust: 2 },
            { angle: 7, thrust: 3 },
            { angle: 7, thrust: 1 },
            { angle: 8, thrust: 2 },
            { angle: 8, thrust: 3 },
            { angle: 8, thrust: 1 },
            { angle: 9, thrust: 2 },
            { angle: 9, thrust: 3 },
            { angle: 9, thrust: 1 },
            { angle: 10, thrust: 2 },
            { angle: 10, thrust: 3 },
            { angle: 10, thrust: 1 },
            { angle: 11, thrust: 2 },
            { angle: 11, thrust: 3 },
            { angle: 11, thrust: 1 },
            { angle: 12, thrust: 2 },
            { angle: 12, thrust: 3 },
            { angle: 12, thrust: 1 },
            { angle: 13, thrust: 2 },
            { angle: 13, thrust: 3 },
            { angle: 13, thrust: 1 },
            { angle: 14, thrust: 2 },
            { angle: 14, thrust: 3 },
            { angle: 14, thrust: 1 },
            { angle: 15, thrust: 2 },
            { angle: 15, thrust: 3 },
            { angle: 15, thrust: 1 },
            { angle: -1, thrust: 2 },
            { angle: -1, thrust: 3 },
            { angle: -1, thrust: 1 },
            { angle: -2, thrust: 2 },
            { angle: -2, thrust: 3 },
            { angle: -2, thrust: 1 },
            { angle: -3, thrust: 2 },
            { angle: -3, thrust: 3 },
            { angle: -3, thrust: 1 },
            { angle: -4, thrust: 2 },
            { angle: -4, thrust: 3 },
            { angle: -4, thrust: 1 },
            { angle: -5, thrust: 2 },
            { angle: -5, thrust: 3 },
            { angle: -5, thrust: 1 },
            { angle: -6, thrust: 2 },
            { angle: -6, thrust: 3 },
            { angle: -6, thrust: 1 },
            { angle: -7, thrust: 2 },
            { angle: -7, thrust: 3 },
            { angle: -7, thrust: 1 },
            { angle: -8, thrust: 2 },
            { angle: -8, thrust: 3 },
            { angle: -8, thrust: 1 },
            { angle: -9, thrust: 2 },
            { angle: -9, thrust: 3 },
            { angle: -9, thrust: 1 },
            { angle: -10, thrust: 2 },
            { angle: -10, thrust: 3 },
            { angle: -10, thrust: 1 },
            { angle: -11, thrust: 2 },
            { angle: -11, thrust: 3 },
            { angle: -11, thrust: 1 },
            { angle: -12, thrust: 2 },
            { angle: -12, thrust: 3 },
            { angle: -12, thrust: 1 },
            { angle: -13, thrust: 2 },
            { angle: -13, thrust: 3 },
            { angle: -13, thrust: 1 },
            { angle: -14, thrust: 2 },
            { angle: -14, thrust: 3 },
            { angle: -14, thrust: 1 },
            { angle: -15, thrust: 2 },
            { angle: -15, thrust: 3 },
            { angle: -15, thrust: 1 },
        ]);
    });

    it('gets valid command values from a starting position 4', () => {
        // Given
        const marsLander = new MarsLander();
        marsLander.setState({
            coordinates: {
                x: 1000,
                y: 1000,
            },
            speed: {
                x: 0,
                y: 0,
            },
            fuel: 1000,
            angle: 80,
            thrust: 0,
        });

        // When
        const commands = marsLander.getAllowedCommands(() => true);

        // Then
        expect(commands).to.deep.equal([
            { angle: 80, thrust: 0 },
            { angle: 80, thrust: 1 },
            { angle: 81, thrust: 0 },
            { angle: 81, thrust: 1 },
            { angle: 82, thrust: 0 },
            { angle: 82, thrust: 1 },
            { angle: 83, thrust: 0 },
            { angle: 83, thrust: 1 },
            { angle: 84, thrust: 0 },
            { angle: 84, thrust: 1 },
            { angle: 85, thrust: 0 },
            { angle: 85, thrust: 1 },
            { angle: 86, thrust: 0 },
            { angle: 86, thrust: 1 },
            { angle: 87, thrust: 0 },
            { angle: 87, thrust: 1 },
            { angle: 88, thrust: 0 },
            { angle: 88, thrust: 1 },
            { angle: 89, thrust: 0 },
            { angle: 89, thrust: 1 },
            { angle: 90, thrust: 0 },
            { angle: 90, thrust: 1 },
            { angle: 79, thrust: 0 },
            { angle: 79, thrust: 1 },
            { angle: 78, thrust: 0 },
            { angle: 78, thrust: 1 },
            { angle: 77, thrust: 0 },
            { angle: 77, thrust: 1 },
            { angle: 76, thrust: 0 },
            { angle: 76, thrust: 1 },
            { angle: 75, thrust: 0 },
            { angle: 75, thrust: 1 },
            { angle: 74, thrust: 0 },
            { angle: 74, thrust: 1 },
            { angle: 73, thrust: 0 },
            { angle: 73, thrust: 1 },
            { angle: 72, thrust: 0 },
            { angle: 72, thrust: 1 },
            { angle: 71, thrust: 0 },
            { angle: 71, thrust: 1 },
            { angle: 70, thrust: 0 },
            { angle: 70, thrust: 1 },
            { angle: 69, thrust: 0 },
            { angle: 69, thrust: 1 },
            { angle: 68, thrust: 0 },
            { angle: 68, thrust: 1 },
            { angle: 67, thrust: 0 },
            { angle: 67, thrust: 1 },
            { angle: 66, thrust: 0 },
            { angle: 66, thrust: 1 },
            { angle: 65, thrust: 0 },
            { angle: 65, thrust: 1 },
        ]);
    });

    it('gets valid command values from a starting position 5', () => {
        // Given
        const marsLander = new MarsLander();
        marsLander.setState({
            coordinates: {
                x: 1000,
                y: 1000,
            },
            speed: {
                x: 0,
                y: 0,
            },
            fuel: 1000,
            angle: -80,
            thrust: 0,
        });

        // When
        const commands = marsLander.getAllowedCommands(() => true);

        // Then
        expect(commands).to.deep.equal([
            { angle: -80, thrust: 0 },
            { angle: -80, thrust: 1 },
            { angle: -79, thrust: 0 },
            { angle: -79, thrust: 1 },
            { angle: -78, thrust: 0 },
            { angle: -78, thrust: 1 },
            { angle: -77, thrust: 0 },
            { angle: -77, thrust: 1 },
            { angle: -76, thrust: 0 },
            { angle: -76, thrust: 1 },
            { angle: -75, thrust: 0 },
            { angle: -75, thrust: 1 },
            { angle: -74, thrust: 0 },
            { angle: -74, thrust: 1 },
            { angle: -73, thrust: 0 },
            { angle: -73, thrust: 1 },
            { angle: -72, thrust: 0 },
            { angle: -72, thrust: 1 },
            { angle: -71, thrust: 0 },
            { angle: -71, thrust: 1 },
            { angle: -70, thrust: 0 },
            { angle: -70, thrust: 1 },
            { angle: -69, thrust: 0 },
            { angle: -69, thrust: 1 },
            { angle: -68, thrust: 0 },
            { angle: -68, thrust: 1 },
            { angle: -67, thrust: 0 },
            { angle: -67, thrust: 1 },
            { angle: -66, thrust: 0 },
            { angle: -66, thrust: 1 },
            { angle: -65, thrust: 0 },
            { angle: -65, thrust: 1 },
            { angle: -81, thrust: 0 },
            { angle: -81, thrust: 1 },
            { angle: -82, thrust: 0 },
            { angle: -82, thrust: 1 },
            { angle: -83, thrust: 0 },
            { angle: -83, thrust: 1 },
            { angle: -84, thrust: 0 },
            { angle: -84, thrust: 1 },
            { angle: -85, thrust: 0 },
            { angle: -85, thrust: 1 },
            { angle: -86, thrust: 0 },
            { angle: -86, thrust: 1 },
            { angle: -87, thrust: 0 },
            { angle: -87, thrust: 1 },
            { angle: -88, thrust: 0 },
            { angle: -88, thrust: 1 },
            { angle: -89, thrust: 0 },
            { angle: -89, thrust: 1 },
            { angle: -90, thrust: 0 },
            { angle: -90, thrust: 1 },
        ]);
    });

    it('applies command to current state', () => {
        // Given
        const marsLander = new MarsLander();
        marsLander.setState({
            coordinates: {
                x: 1000,
                y: 1000,
            },
            speed: {
                x: 0,
                y: 0,
            },
            fuel: 1000,
            angle: 0,
            thrust: 0,
        });
        // When

        // Then
        marsLander.applyCommandToState({ angle: 0, thrust: 1 });
        expect(marsLander.state).to.deep.equal({
            coordinates: { x: 1000, y: 997.289 },
            speed: { x: 0, y: -2.711 },
            fuel: 999,
            angle: 0,
            thrust: 1,
        });
    });
});
