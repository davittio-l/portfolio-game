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

    this.add.image(0, 0, 'campusMap').setOrigin(0, 0).setDepth(-1);

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
    // Create Decorations (trees, bushes, etc.)
    // ========================================
    this.decorations = this.physics.add.staticGroup()

    const tree1 = this.decorations.create(200, 360, 'tree1');
    tree1.setScale(1.0); // Make it bigger
    tree1.setSize(tree1.width * 0.01, tree1.height * 0.01);
    tree1.setOffset(tree1.width * 0.01, tree1.height * 0.01);
    tree1.refreshBody();

    const tree1b = this.decorations.create(800, 1100, 'tree1');
    tree1b.setScale(1.0);
    tree1b.setSize(tree1b.width * 0.01, tree1b.height * 0.01);
    tree1b.setOffset(tree1b.width * 0.01, tree1b.height * 0.01);
    tree1b.refreshBody();

    // Tree 1 type - third instance
    const tree1c = this.decorations.create(500, 900, 'tree1');
    tree1c.setScale(1.0);
    tree1c.setSize(tree1c.width * 0.01, tree1c.height * 0.01);
    tree1c.setOffset(tree1c.width * 0.01, tree1c.height * 0.01);
    tree1c.refreshBody();

    // Tree 1 type - fourth instance
    const tree1d = this.decorations.create(975, 600, 'tree1');
    tree1d.setScale(1.0);
    tree1d.setSize(tree1d.width * 0.01, tree1d.height * 0.01);
    tree1d.setOffset(tree1d.width * 0.01, tree1d.height * 0.01);
    tree1d.refreshBody();

    const tree2 = this.decorations.create(1500, 600, 'tree2');
    tree2.setScale(1.0);
    tree2.setSize(tree2.width * 0.001, tree2.height * 0.001);
    tree2.setOffset(tree2.width * 0.001, tree2.height * 0.001);
    tree2.refreshBody();

  // Tree 2 type - second instance
    const tree2b = this.decorations.create(50, 800, 'tree2'); // Same 'tree2' sprite!
    tree2b.setScale(1.0);
    tree2b.setSize(tree2b.width * 0.001, tree2b.height * 0.001);
    tree2b.setOffset(tree2b.width * 0.001, tree2b.height * 0.001);
    tree2b.refreshBody();

    // Tree 2 type - second instance
    const tree2c = this.decorations.create(975, 300, 'tree2'); // Same 'tree2' sprite!
    tree2c.setScale(1.0);
    tree2c.setSize(tree2c.width * 0.001, tree2c.height * 0.001);
    tree2c.setOffset(tree2c.width * 0.001, tree2c.height * 0.001);
    tree2c.refreshBody();
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
    this.cameras.main.setZoom(.5); //CHANGE

    // ========================================
    // ANIMATIONS
    // ========================================
    this.createAnimations();

    // ========================================
    // COLLISIONS
    // ========================================
    this.physics.add.collider(this.player, this.buildings);
    this.physics.add.collider(this.player, this.decorations);

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
    const building1 = this.buildings.create(250, 160, 'gym');
    building1.setScale(1.2);
    building1.setSize(building1.width * 0.5, building1.height * 0.25);
    building1.setOffset(building1.width * 0.25, building1.height * 0.7);
    building1.refreshBody();
    
    this.add.text(250, 110, 'About Me', {
      fontSize: '20px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      fontFamily: 'Arial Black'
    }).setOrigin(0.5);
    
    // Building 2: Top-right - "Work Experience"
    const building2 = this.buildings.create(1300, 200, 'musicstore');
    building2.setScale(1.2);
    building2.setSize(building2.width * 0.6, building2.height * 0.3);
    building2.setOffset(building2.width * 0.2, building2.height * 0.65);
    building2.refreshBody();
    
    this.add.text(1300, 150, 'Work Experience', {
      fontSize: '20px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      fontFamily: 'Arial Black'
    }).setOrigin(0.5);
    
    // Building 3: Bottom-left - "Certifications"
    const building3 = this.buildings.create(270, 1075, 'gunstore');
    building3.setScale(1.2);
    building3.setSize(building3.width * 0.6, building3.height * 0.3);
    building3.setOffset(building3.width * 0.2, building3.height * 0.65);
    building3.refreshBody();
    
    this.add.text(270, 1025, 'Certifications', {
      fontSize: '20px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      fontFamily: 'Arial Black'
    }).setOrigin(0.5);
    
    // Building 4: Bottom-right - "Case Studies"
    const building4 = this.buildings.create(1200, 1000, 'condo');
    building4.setScale(1.2);
    building4.setSize(building4.width * 0.6, building4.height * 0.3);
    building4.setOffset(building4.width * 0.2, building4.height * 0.65);
    building4.refreshBody();
    
    this.add.text(1200, 950, 'Case Studies', {
      fontSize: '20px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      fontFamily: 'Arial Black'
    }).setOrigin(0.5);
    
    // Center building - "Contact"
    const building5 = this.buildings.create(675, 710, 'icecream');
    building5.setScale(1.1);
    building5.setSize(building5.width * 0.6, building5.height * 0.3);
    building5.setOffset(building5.width * 0.2, building5.height * 0.65);
    building5.refreshBody();
    
    this.add.text(675, 660, 'Contact', {
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