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
  // Walking down (frames 42-48)
  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', { start: 42, end: 48 }),
    frameRate: 10,
    repeat: -1
  });
  
  // Walking left (frames 36-41)
  this.anims.create({
    key: 'walk-left',
    frames: this.anims.generateFrameNumbers('player', { start: 36, end: 41 }),
    frameRate: 10,
    repeat: -1
  });
  
  // Walking right (frames 25-29)
  this.anims.create({
    key: 'walk-right',
    frames: this.anims.generateFrameNumbers('player', { start: 25, end: 29 }),
    frameRate: 10,
    repeat: -1
  });
  
  // Walking up (frames 30-35)
  this.anims.create({
    key: 'walk-up',
    frames: this.anims.generateFrameNumbers('player', { start: 30, end: 35 }),
    frameRate: 10,
    repeat: -1
  });
  
  // Idle
  this.anims.create({
    key: 'idle',
    frames: [{ key: 'player', frame: 0 }],
    frameRate: 1
  });
}

update() {
  if (!this.player) return;
  
  const speed = 160;
  let moving = false;
  
  // Reset velocity
  this.player.setVelocity(0);
  
  if (this.wasd.down.isDown || this.cursors.down.isDown) {
    this.player.setVelocityY(speed);
    this.player.anims.play('walk-down', true);
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