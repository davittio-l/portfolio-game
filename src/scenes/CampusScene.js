import Phaser from 'phaser';

class CampusScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CampusScene' });
    this.player = null;
    this.cursors = null;
    this.wasd = null;
  }
  
  create() {

     this.physics.world.setBounds(0, 0, 1600, 1200);

    // Set background color to grass green
    this.cameras.main.setBackgroundColor('#5ac54f');
    
    // Add title
    this.add.text(400, 30, 'Portfolio Campus - Use WASD to Move!', {
        fontSize: '24px',
        fill: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4
    }).setOrigin(0.5);
    
    // Create a nice patterned grass ground using graphics
    const graphics = this.add.graphics();
    
    // Draw grass pattern
    for (let y = 0; y < 1200; y += 32) { // Changed from 600 to 1200
    for (let x = 0; x < 1600; x += 32) { // Changed from 800 to 1600
        const shade = (x + y) % 64 === 0 ? '#4a9c3f' : '#5ac54f';
        graphics.fillStyle(shade === '#4a9c3f' ? 0x4a9c3f : 0x5ac54f, 1);
        graphics.fillRect(x, y, 32, 32);
        
        graphics.fillStyle(0x3d8534, 0.3);
        graphics.fillCircle(x + 8, y + 8, 2);
        graphics.fillCircle(x + 24, y + 24, 2);
        }
    }
    graphics.setDepth(-1);
    
    // Add title
    this.add.text(400, 30, 'Portfolio Campus - Use WASD to Move!', {
      fontSize: '24px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    // CREATE MULTIPLE BUILDINGS - Store them in an array for collision
    this.buildings = this.physics.add.staticGroup();

    // Building 1: Top-left - "About Me"
    const building1 = this.buildings.create(180, 170, 'gym');
    building1.setScale(1);
    building1.setSize(building1.width * 0.8, building1.height * 0.6); // Adjust collision box
    building1.setOffset(building1.width * 0.1, building1.height * 0.4); // Offset to bottom of sprite
    building1.refreshBody();
    this.add.text(180, 120, 'About Me', {
    fontSize: '14px',
    fill: '#ffffff',
    stroke: '#000000',
    strokeThickness: 3
    }).setOrigin(0.5);
    
    // Building 2: Top-right - "Work Experience"
    const building2 = this.buildings.create(620, 140, 'musicstore');
    building2.setScale(1);
    building2.setSize(building2.width * 0.8, building2.height * 0.6);
    building2.setOffset(building2.width * 0.1, building2.height * 0.4);
    building2.refreshBody();
    this.add.text(620, 90, 'Work Experience', {
    fontSize: '14px',
    fill: '#ffffff',
    stroke: '#000000',
    strokeThickness: 3
    }).setOrigin(0.5);
    
    // Building 3: Bottom-left - "Certifications"
    const building3 = this.buildings.create(220, 480, 'gunstore');
    building3.setScale(1);
    building3.setSize(building3.width * 0.8, building3.height * 0.6);
    building3.setOffset(building3.width * 0.1, building3.height * 0.4);
    building3.refreshBody();
    this.add.text(220, 430, 'Certifications', {
    fontSize: '14px',
    fill: '#ffffff',
    stroke: '#000000',
    strokeThickness: 3
    }).setOrigin(0.5);
    
    // Building 4: Bottom-right - "Case Studies"
    const building4 = this.buildings.create(580, 460, 'condo');
    building4.setScale(1);
    building4.setSize(building4.width * 0.8, building4.height * 0.6);
    building4.setOffset(building4.width * 0.1, building4.height * 0.4);
    building4.refreshBody();
    this.add.text(580, 410, 'Case Studies', {
    fontSize: '14px',
    fill: '#ffffff',
    stroke: '#000000',
    strokeThickness: 3
    }).setOrigin(0.5);
    
    //Center building - contact
    const building5 = this.buildings.create(400, 370, 'icecream');
    building5.setScale(1);
    building5.setSize(building5.width * 0.8, building5.height * 0.6);
    building5.setOffset(building5.width * 0.1, building5.height * 0.4);
    building5.refreshBody();
    this.add.text(400, 320, 'Contact', {
    fontSize: '14px',
    fill: '#ffffff',
    stroke: '#000000',
    strokeThickness: 3
    }).setOrigin(0.5);

    // Create player sprite
    this.player = this.physics.add.sprite(200, 370, 'player', 1);
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true);

    // Make camera follow the player
    this.cameras.main.setBounds(0, 0, 1600, 1200); // Camera bounds match world
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1); // Smooth following
    this.cameras.main.setZoom(1); // Can adjust zoom if needed

  
    // ... animations and controls setup ...
      this.createAnimations();

    // ADD COLLISION with all buildings
    this.physics.add.collider(this.player, this.buildings);

    // Debug
    console.log('Total frames:', this.textures.get('player').frameTotal);
    
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

    this.physics.add.collider(this.player, this.building);
  }
  
  createAnimations() {
  // Walking down (frames 42-48)
  this.anims.create({
    key: 'walk-down',
    frames: this.anims.generateFrameNumbers('player', { start: 42, end: 47 }),
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