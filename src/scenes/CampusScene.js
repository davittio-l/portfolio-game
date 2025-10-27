import Phaser from 'phaser';

class CampusScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CampusScene' });
    }
    
    create() {
        // Background color
        this.cameras.main.setBackgroundColor('#87CEEB');

        // Test Sprite
        const testSprite = this.add.image(400, 300, 'test');

        // Welcome Text
        this.add.text(400, 100, 'Portfolio Campus', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(400, 550, 'Character movement coming next!', {
            fontSize: '16px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
    }
    
    // update() {

    // }
}

export default CampusScene;