import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import CampusScene from './scenes/CampusScene';
import './App.css';

function App() {
  const gameRef = useRef(null);

   useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      backgroundColor: '#000000',
      scene: [PreloadScene, CampusScene],
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current?.destroy(true);
    };
  }, []);

  return (
    <div className="App">
      <div id="game-container" style={{ width: '100%', height: '100vh' }}></div>
    </div>
  );
}

export default App;