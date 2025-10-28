import Phaser from 'phaser';

class CampusScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CampusScene' });
    this.player = null;
    this.cursors = null;
    this.wasd = null;
  }
  
  create() {
    // Set background color
    this.cameras.main.setBackgroundColor('#5ac54f');
    
    // Add title
    this.add.text(400, 30, 'Portfolio Campus - Use WASD to Move!', {
      fontSize: '24px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);
    
    // Create player sprite
    this.player = this.physics.add.sprite(400, 300, 'player', 1);
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true);
    
    // Debug
    console.log('Total frames:', this.textures.get('player').frameTotal);
    
    // Create animations
    this.createAnimations();
    
    // Set up controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    
    // Add SPACE key for testing
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }
  
  createAnimations() {
    // Walking down (row 1: frames 12-17)
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('player', { start: 12, end: 17 }),
      frameRate: 8,
      repeat: -1
    });
    
    // Walking left - SWAPPED (using right frames)
    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('player', { start: 36, end: 41 }),
      frameRate: 8,
      repeat: -1
    });
    
    // Walking right - SWAPPED (using left frames)
    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('player', { start: 24, end: 29 }),
      frameRate: 8,
      repeat: -1
    });
    
    // Walking up (row 4: frames 48-53)
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('player', { start: 48, end: 53 }),
      frameRate: 8,
      repeat: -1
    });
    
    // Idle
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'player', frame: 1 }],
      frameRate: 1
    });
  }

  update() {
    if (!this.player) return;
    
    const speed = 160;
    let moving = false;
    
    // Reset velocity
    this.player.setVelocity(0);
    
    // TEMPORARY DEBUG: Press S to cycle through frames to find the right "down" frames
    if (this.wasd.down.isDown || this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      
      // Press SPACE while holding S to cycle frames
      if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
        if (!this.testFrame) this.testFrame = 0;
        this.testFrame++;
        if (this.testFrame > 24) this.testFrame = 0; // Test frames 0-24
        this.player.setFrame(this.testFrame);
        console.log('Testing frame:', this.testFrame);
      }
      moving = true;
    }
    else if (this.wasd.up.isDown || this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play('walk-up', true);
      moving = true;
    }
    else if (this.wasd.left.isDown || this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play('walk-left', true);
      moving = true;
    } 
    else if (this.wasd.right.isDown || this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play('walk-right', true);
      moving = true;
    }
    
    // If not moving, show idle
    if (!moving) {
      this.player.anims.play('idle', true);
    }
  }
}

export default CampusScene;