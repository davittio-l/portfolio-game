import Phaser from 'phaser';

class CampusScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CampusScene' });
        this.player = null;
        this.cursors = null;
        this.wasd = null;
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


        // Set up keyboard control
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
            });

        // Instructions
        this.add.text(400, 570, 'Use WASD or Arrow Keys to move', {
        fontSize: '16px',
        fill: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2
        }).setOrigin(0.5);
    } 
        
      createAnimations() {
 // Each row has 12 frames
  // Row 0 (frames 0-11): Idle/standing poses
  // Row 1 (frames 12-23): Walking down
  // Row 2 (frames 24-35): Walking left
  // Row 3 (frames 36-47): Walking right
  // Row 4 (frames 48-59): Walking up
  
  // Walking down - use 6 frames from row 1
  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }),
    frameRate: 8,
    repeat: -1
  });
  
  // Walking left - use 6 frames from row 2
  this.anims.create({
    key: 'walk-left',
    frames: this.anims.generateFrameNumbers('player', { start: 24, end: 29 }),
    frameRate: 8,
    repeat: -1
  });
  
  // Walking right - use 6 frames from row 3
  this.anims.create({
    key: 'walk-right',
    frames: this.anims.generateFrameNumbers('player', { start: 36, end: 41 }),
    frameRate: 8,
    repeat: -1
  });
  
  // Walking up - use 6 frames from row 4
  this.anims.create({
    key: 'walk-up',
    frames: this.anims.generateFrameNumbers('player', { start: 48, end: 53 }),
    frameRate: 8,
    repeat: -1
  });
  
  // Idle facing down - first frame
  this.anims.create({
    key: 'idle-down',
    frames: [{ key: 'player', frame: 0 }],
    frameRate: 1
  });
}
    
  update() {
    if (!this.player) return;
    
    const speed = 160;
    
    // Reset velocity
    this.player.setVelocity(0);
    
    // Check WASD keys
    if (this.wasd.left.isDown || this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play('walk-left', true);
    } else if (this.wasd.right.isDown || this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play('walk-right', true);
    } else if (this.wasd.up.isDown || this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play('walk-up', true);
    } else if (this.wasd.down.isDown || this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play('walk-down', true);
    } else {
      // No movement - play idle animation
      this.player.anims.play('idle-down', true);
    }
  }
}

export default CampusScene;