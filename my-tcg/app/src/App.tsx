import React from 'react';
import { VStack } from '@chakra-ui/react';
import GameSpace from './components/GameSpace';


/**
 * The top layer of the web app, containing the game.
 * @returns The main component of the web app, the App component.
 */
export function App() {
    return (
        <VStack>
            <header className="App-header">
                <h1>My TCG</h1>
            </header>
            <GameSpace/>
        </VStack>
    );
}