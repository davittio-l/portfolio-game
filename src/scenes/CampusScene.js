import Phaser from 'phaser';

class CampusScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CampusScene' });
        this.player = null;
        this.cursors = null;
    }
    
    create() {
        // Background color
        this.cameras.main.setBackgroundColor('#87CEEB');

        this.add.text(400, 50, 'Portfolio Campus', {
            fontSize: '32px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Create ground
        for (let y = 0; y < 600; y +=32) {
            for (let x=0; x < 800; x +=32) {
                this.add.image(x, y, 'ground').setOrigin(0);
            }
        }

        // Create player sprite at center
        this.player = this.physics.add.sprite(400, 300, 'player');
        this.player.setScale(2);
        this.player.setCollideWorldBounds(true);

        // Create animations
        this.createAnimations();

        // Set up keyboard control
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
            });

        // Instructions
        
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