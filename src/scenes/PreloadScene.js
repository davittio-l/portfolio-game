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
        loadingText.setOrigin(0.5, 0.5);

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(width / 2 - 150, height / 2 - 15, 300 * value, 30);
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Load assets - NEED TO ADD MORE LATER
        // For now loading 1 sprite
        this.load.spritesheet('player', '/assets/characters/player/Characters_free/Adam_16x16.png', {
            frameWidth: 16,
            frameHeight: 32
        });

        

        // Load multiple ground options
        this.load.image('ground', '/assets/buildings/exterior/Autotiles_32x32/1.png');
        this.load.image('grass', '/assets/buildings/exterior/Autotiles_32x32/2.png');
        this.load.image('path', '/assets/buildings/exterior/Autotiles_32x32/3.png');

        this.load.image('building1', '/assets/buildings/exterior/Modern_Exteriors_Complete_32x32/1.png');

        this.load.image('gym', '/assets/exteriors/Modern_Exteriors_Complete_Singles_32x32/ME_Singles_Floor_Modular_Building_32x32_Ground_Floor_Gym_2.png');
        this.load.image('condo', '/assets/exteriors/Modern_Exteriors_Complete_Singles_32x32/ME_Singles_Floor_Modular_Building_32x32_Ground_Floor_Shop_13.png');
        this.load.image('gunstore', '/assets/exteriors/Modern_Exteriors_Complete_Singles_32x32/ME_Singles_Floor_Modular_Building_32x32_Ground_Floor_Gun_Store_1.png');
        this.load.image('icecream', '/assets/exteriors/Modern_Exteriors_Complete_Singles_32x32/ME_Singles_Floor_Modular_Building_32x32_Ground_Floor_Ice_Cream_Shop_1.png');
        this.load.image('musicstore', '/assets/exteriors/Modern_Exteriors_Complete_Singles_32x32/ME_Singles_Floor_Modular_Building_32x32_Ground_Floor_Music_Store_1.png');

        
    }

    create() {
        // Once loading completes, start main game scene
        this.scene.start('CampusScene');
    }
}

export default PreloadScene;