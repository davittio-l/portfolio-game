import Phaser from 'phaser';

// ========================================
// FRAME CALCULATION HELPERS
// ========================================
// The sprite sheet is 384×224 pixels = 24 columns × 7 rows (16×32 per frame)
const COLS = 24;
const cell = (r, c) => r * COLS + c;
const seq = (r, fromC, toC) => 
    Array.from({length: toC - fromC + 1}, (_, i) => cell(r, fromC + i));

// All walking animations are on ROW 2 (the 3rd row)
// Different column ranges for each direction
const WALK_ROW = 2;  // All walks are on row 2

class CampusScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CampusScene' });
    this.player = null;
    this.cursors = null;
    this.wasd = null;
  }
  
  create() {

     this.physics.world.setBounds(0, 0, 1000, 1000);

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
    for (let y = 0; y < 1200; y += 32) {
      for (let x = 0; x < 1600; x += 32) {
        const shade = (x + y) % 64 === 0 ? '#4a9c3f' : '#5ac54f';
        graphics.fillStyle(shade === '#4a9c3f' ? 0x4a9c3f : 0x5ac54f, 1);
        graphics.fillRect(x, y, 32, 32);
        
        graphics.fillStyle(0x3d8534, 0.3);
        graphics.fillCircle(x + 8, y + 8, 2);
        graphics.fillCircle(x + 24, y + 24, 2);
      }
    }
    graphics.setDepth(-1);
    
    // Add title - 
    // ********MAKE THIS INTO A POP UP NOTIFICATION UPON LOADING THE WEBPAGE****
    //*********************************************** */
    this.add.text(400, 80, 'Portfolio Campus - Use WASD to Move and press E to interact with people and buildings!', {
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
    building1.setSize(building1.width * 0.4, building1.height * 0.2);
    building1.setOffset(building1.width * 0.1, building1.height * 0.4);
    building1.refreshBody();
    this.add.text(180, 120, 'About Me', {
      fontSize: '14px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);
    
    // Building 2: Top-right - "Work Experience"
    const building2 = this.buildings.create(820, 170, 'musicstore');
    building2.setScale(1);
    building2.setSize(building2.width * 0.8, building2.height * 0.6);
    building2.setOffset(building2.width * 0.1, building2.height * 0.4);
    building2.refreshBody();
    this.add.text(820, 120, 'Work Experience', {
      fontSize: '14px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);
    
    // Building 3: Bottom-left - "Certifications"
    const building3 = this.buildings.create(150, 800, 'gunstore');
    building3.setScale(1);
    building3.setSize(building3.width * 0.8, building3.height * 0.6);
    building3.setOffset(building3.width * 0.1, building3.height * 0.4);
    building3.refreshBody();
    this.add.text(150, 750, 'Certifications', {
      fontSize: '14px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);
    
    // Building 4: Bottom-right - "Case Studies"
    const building4 = this.buildings.create(800, 750, 'condo');
    building4.setScale(1);
    building4.setSize(building4.width * 0.8, building4.height * 0.6);
    building4.setOffset(building4.width * 0.1, building4.height * 0.4);
    building4.refreshBody();
    this.add.text(800, 700, 'Case Studies', {
      fontSize: '14px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);
    
    // Center building - contact
    const building5 = this.buildings.create(470, 570, 'icecream');
    building5.setScale(1);
    building5.setSize(building5.width * 0.8, building5.height * 0.6);
    building5.setOffset(building5.width * 0.1, building5.height * 0.4);
    building5.refreshBody();
    this.add.text(470, 520, 'Contact', {
      fontSize: '14px',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);

    // Create player sprite
    this.player = this.physics.add.sprite(200, 370, 'player', 1);
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true);
    this.player.setOrigin(0.5, 1); // Anchor at feet for better ground contact

    // Make camera follow the player
    this.cameras.main.setBounds(0, 0, 1600, 1200);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setZoom(1);

    // Create animations
    this.createAnimations();

    // ADD COLLISION with all buildings
    this.physics.add.collider(this.player, this.buildings);

    // Debug - log total frames available
    console.log('Total frames:', this.textures.get('player').frameTotal);
    console.log('Expected frames: 168 (24 cols × 7 rows)');
    
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
    // All walking animations are on row 2 with different column ranges
    // FINAL FIX: Mapped based on actual testing results
    
    // Walking down (Row 2, columns 18-23)
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('player', { 
        frames: seq(WALK_ROW, 18, 23) 
      }),
      frameRate: 10,
      repeat: -1
    });
    
    // Walking left (Row 2, columns 12-17)
    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('player', { 
        frames: seq(WALK_ROW, 12, 17) 
      }),
      frameRate: 10,
      repeat: -1
    });
    
    // Walking right (Row 2, columns 0-5)
    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers('player', { 
        frames: seq(WALK_ROW, 0, 5) 
      }),
      frameRate: 10,
      repeat: -1
    });
    
    // Walking up (Row 2, columns 6-11)
    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers('player', { 
        frames: seq(WALK_ROW, 6, 11) 
      }),
      frameRate: 10,
      repeat: -1
    });
    
    // Idle animations - using middle frame of each direction on row 2
    this.anims.create({
      key: 'idle-down',
      frames: [{ key: 'player', frame: cell(WALK_ROW, 20) }], // Middle of columns 18-23
      frameRate: 1
    });
    
    this.anims.create({
      key: 'idle-left',
      frames: [{ key: 'player', frame: cell(WALK_ROW, 14) }], // Middle of columns 12-17
      frameRate: 1
    });
    
    this.anims.create({
      key: 'idle-right',
      frames: [{ key: 'player', frame: cell(WALK_ROW, 2) }], // Middle of columns 0-5
      frameRate: 1
    });
    
    this.anims.create({
      key: 'idle-up',
      frames: [{ key: 'player', frame: cell(WALK_ROW, 8) }], // Middle of columns 6-11
      frameRate: 1
    });
    
    console.log('Animations FINAL mapping:');
    console.log('Down (S key): columns 18-23');
    console.log('Left (A key): columns 12-17');
    console.log('Right (D key): columns 0-5');
    console.log('Up (W key): columns 6-11');
  }

  update() {
    if (!this.player) return;
    
    const speed = 180;
    let moving = false;
    let lastDirection = null;
    
    // Reset velocity
    this.player.setVelocity(0);
    
    // Priority: vertical movement first, then horizontal
    if (this.wasd.down.isDown || this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play('walk-down', true);
      moving = true;
      lastDirection = 'down';
    } 
    else if (this.wasd.up.isDown || this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play('walk-up', true);
      moving = true;
      lastDirection = 'up';
    }
    else if (this.wasd.left.isDown || this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.anims.play('walk-left', true);
      moving = true;
      lastDirection = 'left';
    } 
    else if (this.wasd.right.isDown || this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.anims.play('walk-right', true);
      moving = true;
      lastDirection = 'right';
    }
    
    // If not moving, show idle frame for last direction
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