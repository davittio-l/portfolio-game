import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key : 'PreloadScene' });
    }

    preload() {
        // Add loading bar
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(width / 2 - 160, height / 2 - 25, 230, 50);

        const loadingText = this.make.text({
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Load assets - NEED TO ADD MORE LATER
        // For now loading 1 sprite
        this.load.image('test', '/assets/buildings/exterior/Autotiles_32x32/1.png');
    }

    create() {
        // Once loading completes, start main game scene
        this.scene.start('CampusScene');
    }
}

export default PreloadScene;