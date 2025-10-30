import Phaser from 'phaser';

// FRAME CALCULATION HELPERS
const COLS = 24;
const cell = (r, c) => r * COLS + c;
const seq = (r, fromC, toC) => 
    Array.from({length: toC - fromC + 1}, (_, i) => cell(r, fromC + i));

const WALK_ROW = 2;

class CampusScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CampusScene' });
    this.player = null;
    this.cursors = null;
    this.wasd = null;
  }
  
  create() {
    // Set world bounds
    this.physics.world.setBounds(0, 0, 1600, 1200);

    // GRASS TILEMAP
    const map = this.make.tilemap({ 
      tileWidth: 32, 
      tileHeight: 32, 
      width: 50, 
      height: 38 
    });
    
    // Add the tileset image 
    const tileset = map.addTilesetImage('grass_tileset', 'grass_tileset');
    
    // Create ground layer
    const groundLayer = map.createBlankLayer('Ground', tileset, 0, 0);
    
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const grassTiles = [1, 2]; // indices of grass tiles in your sheet
        const randomGrass = Phaser.Math.RND.pick(grassTiles);
        groundLayer.putTileAt(randomGrass, x, y);
      }
    }
    
    groundLayer.setDepth(-1);

    // TITLE TEXT
    // ========================================
    this.add.text(800, 50, 'Portfolio Campus', {
      fontSize: '32px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6,
      fontFamily: 'Arial Black'
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);
    
    this.add.text(800, 85, 'Use WASD to Move • Press E to Interact', {
      fontSize: '18px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5).setScrollFactor(0).setDepth(100);

    // ========================================
    // BUILDINGS WITH REFINED COLLISIONS
    // ========================================
    this.buildings = this.physics.add.staticGroup();
    this.createBuildings();

    // ========================================
    // PLAYER SETUP
    // ========================================
    this.player = this.physics.add.sprite(800, 600, 'player', 1);
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true);
    this.player.setOrigin(0.5, 1);
    
    // Set player collision box (smaller for better feel)
    this.player.body.setSize(12, 16);
    this.player.body.setOffset(2, 16);

    // ========================================
    // CAMERA SETUP
    // ========================================
    this.cameras.main.setBounds(0, 0, 1600, 1200);
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(.9);

    // ========================================
    // ANIMATIONS
    // ========================================
    this.createAnimations();

    // ========================================
    // COLLISIONS
    // ========================================
    this.physics.add.collider(this.player, this.buildings);

    // Debug info
    console.log('Total frames:', this.textures.get('player').frameTotal);
    
    // ========================================
    // CONTROLS
    // ========================================
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  }

  createBuildings() {
    // Building 1: Top-left - "About Me"
    const building1 = this.buildings.create(250, 200, 'gym');
    building1.setScale(1.2);
    building1.setSize(building1.width * 0.5, building1.height * 0.25);
    building1.setOffset(building1.width * 0.25, building1.height * 0.7);
    building1.refreshBody();
    
    this.add.text(250, 130, 'About Me', {
      fontSize: '20px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      fontFamily: 'Arial Black'
    }).setOrigin(0.5);
    
    // Building 2: Top-right - "Work Experience"
    const building2 = this.buildings.create(1200, 200, 'musicstore');
    building2.setScale(1.2);
    building2.setSize(building2.width * 0.6, building2.height * 0.3);
    building2.setOffset(building2.width * 0.2, building2.height * 0.65);
    building2.refreshBody();
    
    this.add.text(1200, 130, 'Work Experience', {
      fontSize: '20px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      fontFamily: 'Arial Black'
    }).setOrigin(0.5);
    
    // Building 3: Bottom-left - "Certifications"
    const building3 = this.buildings.create(250, 900, 'gunstore');
    building3.setScale(1.2);
    building3.setSize(building3.width * 0.6, building3.height * 0.3);
    building3.setOffset(building3.width * 0.2, building3.height * 0.65);
    building3.refreshBody();
    
    this.add.text(250, 830, 'Certifications', {
      fontSize: '20px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      fontFamily: 'Arial Black'
    }).setOrigin(0.5);
    
    // Building 4: Bottom-right - "Case Studies"
    const building4 = this.buildings.create(1200, 900, 'condo');
    building4.setScale(1.2);
    building4.setSize(building4.width * 0.6, building4.height * 0.3);
    building4.setOffset(building4.width * 0.2, building4.height * 0.65);
    building4.refreshBody();
    
    this.add.text(1200, 830, 'Case Studies', {
      fontSize: '20px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      fontFamily: 'Arial Black'
    }).setOrigin(0.5);
    
    // Center building - "Contact"
    const building5 = this.buildings.create(800, 600, 'icecream');
    building5.setScale(1.3);
    building5.setSize(building5.width * 0.6, building5.height * 0.3);
    building5.setOffset(building5.width * 0.2, building5.height * 0.65);
    building5.refreshBody();
    
    this.add.text(800, 530, 'Contact', {
      fontSize: '20px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      fontFamily: 'Arial Black'
    }).setOrigin(0.5);
  }

  createAnimations() {
    // Walking animations
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('player', { 
        frames: seq(WALK_ROW, 18, 23) 
      }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('player', { 
        frames: seq(WALK_ROW, 12, 17) 
      }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('player', { 
        frames: seq(WALK_ROW, 0, 5) 
      }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('player', { 
        frames: seq(WALK_ROW, 6, 11) 
      }),
      frameRate: 10,
      repeat: -1
    });
    
    // Idle animations
    this.anims.create({
      key: 'idle-down',
      frames: [{ key: 'player', frame: cell(WALK_ROW, 20) }],
      frameRate: 1
    });
    
    this.anims.create({
      key: 'idle-left',
      frames: [{ key: 'player', frame: cell(WALK_ROW, 14) }],
      frameRate: 1
    });
    
    this.anims.create({
      key: 'idle-right',
      frames: [{ key: 'player', frame: cell(WALK_ROW, 2) }],
      frameRate: 1
    });
    
    this.anims.create({
      key: 'idle-up',
      frames: [{ key: 'player', frame: cell(WALK_ROW, 8) }],
      frameRate: 1
    });
  }

  update() {
    if (!this.player) return;
    
    const speed = 160;
    let moving = false;
    
    this.player.setVelocity(0);
    
    // Movement with diagonal support
    let vx = 0;
    let vy = 0;
    
    if (this.wasd.up.isDown || this.cursors.up.isDown) {
      vy = -speed;
    } else if (this.wasd.down.isDown || this.cursors.down.isDown) {
      vy = speed;
    }
    
    if (this.wasd.left.isDown || this.cursors.left.isDown) {
      vx = -speed;
    } else if (this.wasd.right.isDown || this.cursors.right.isDown) {
      vx = speed;
    }
    
    // Normalize diagonal movement
    if (vx !== 0 && vy !== 0) {
      vx *= 0.707;
      vy *= 0.707;
    }
    
    this.player.setVelocity(vx, vy);
    
    // Animations - prioritize vertical over horizontal
    if (vy < 0) {
      this.player.anims.play('walk-up', true);
      moving = true;
    } else if (vy > 0) {
      this.player.anims.play('walk-down', true);
      moving = true;
    } else if (vx < 0) {
      this.player.anims.play('walk-left', true);
      moving = true;
    } else if (vx > 0) {
      this.player.anims.play('walk-right', true);
      moving = true;
    }
    
    // Idle animation
    if (!moving) {
      const currentAnim = this.player.anims.currentAnim?.key ?? 'walk-down';
      this.player.anims.stop();
      
      if (currentAnim.includes('down')) {
        this.player.anims.play('idle-down', true);
      } else if (currentAnim.includes('left')) {
        this.player.anims.play('idle-left', true);
      } else if (currentAnim.includes('right')) {
        this.player.anims.play('idle-right', true);
      } else if (currentAnim.includes('up')) {
        this.player.anims.play('idle-up', true);
      }
    }
  }
}

export default CampusScene;