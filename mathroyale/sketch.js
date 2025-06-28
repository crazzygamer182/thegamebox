let deck = [];
let draggedCard = null;
let offsetX = 0;
let offsetY = 0;
let spawnedCards = []; // Array to track spawned cards
let skeletonsCardImage;
let knightCardImage;
let towers = []; // Array to track all towers
let goblinCardImage;
let witchCardImage;
let skeletonImage;
let knightImage;
let fireballCardImage;
let arrowsCardImage;
let arrowImage; // New arrow image for projectiles
let fireballImage; // New fireball image for projectiles
let goblinImage;
let witchImage;
let mathPoints = 0; // Player's math points
let currentProblem = null; // Current math problem to solve
let showMathProblem = false; // Whether to show math problem UI
let userAnswer = ""; // User's current answer input
let elixir = 0; // Player's elixir (max 10)
let problemChoices = []; // Multiple choice options
let displayedElixir = 0; // Animated elixir value for smooth bar animation
let elixirAnimationSpeed = 0.1; // How fast the bar animates
let elixirGradient = null; // Store gradient to avoid recreating it every frame
let frameCount = 0; // Frame counter for debugging
let lastMathAnswerTime = 0; // Track when last math question was answered
let mathAnswerCooldown = 500; // 500ms cooldown after answering math question

// Enemy AI system
let enemyElixir = 0; // Enemy's elixir (max 10)
let enemyLastSpawn = 0; // Track when enemy last spawned a unit
let enemySpawnInterval = 8000; // Enemy spawns every 8 seconds
let enemyDeck = []; // Enemy's deck of cards

// Card properties
let fireballradius = 30;
let arrowsradius = 60;

// Bridge properties
let bridges = [
  {x: 58, y: 195, width: 20, height: 20}, // Left bridge
  {x: 315, y: 195, width: 20, height: 20}  // Right bridge
];

// Projectile system for witch attacks
let projectiles = [];

// Arrow projectile system for arrows spell
let arrowProjectiles = [];

// Tower arrow system for tower defense
let towerArrows = [];

class TowerArrow {
  constructor(towerX, towerY, targetX, targetY, damage, towerSide) {
    this.x = towerX;
    this.y = towerY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.damage = damage;
    this.towerSide = towerSide; // Track which side shot this arrow
    this.speed = 4;
    this.radius = 3;
    this.hit = false;
    this.hitTime = 0;
    this.size = 6; // Size of the tower arrow image
    
    // Calculate direction
    let dx = targetX - towerX;
    let dy = targetY - towerY;
    let distance = sqrt(dx * dx + dy * dy);
    this.dx = (dx / distance) * this.speed;
    this.dy = (dy / distance) * this.speed;
    
    // Calculate angle for arrow rotation
    this.angle = atan2(dy, dx);
  }
  
  update() {
    if (!this.hit) {
      this.x += this.dx;
      this.y += this.dy;
      
      // Check if arrow reached target area
      let distanceToTarget = dist(this.x, this.y, this.targetX, this.targetY);
      if (distanceToTarget < 10) {
        this.hit = true;
        this.hitTime = millis();
        this.dealDamage();
      }
    }
  }
  
  dealDamage() {
    // Deal single target damage to the specific troop that was targeted
    let splashRadius = 15;
    let targetSide = this.towerSide === "player" ? "enemy" : "player"; // Determine which troops to damage
    
    // Damage troops
    for (let troop of spawnedCards) {
      if (troop && troop.health > 0 && troop.isEnemy === (targetSide === "enemy")) {
        let distance = dist(this.x, this.y, troop.x, troop.y);
        if (distance < splashRadius) {
          troop.health -= this.damage;
          if (troop.health < 0) {
            troop.health = 0;
          }
          break; // Only damage one troop (single target)
        }
      }
    }
  }
  
  display() {
    if (!this.hit) {
      // Draw tower arrow image rotated to face the target
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      imageMode(CENTER);
      image(arrowImage, 0, 0, this.size * 2, this.size);
      pop();
    }
  }
  
  isDead() {
    // Keep arrow visible for a short time after hitting
    if (this.hit) {
      return millis() - this.hitTime > 100;
    }
    return false;
  }
}

class ArrowProjectile {
  constructor(startX, startY, targetX, targetY, damage) {
    this.x = startX;
    this.y = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.damage = damage;
    this.speed = 4;
    this.radius = 3;
    this.hit = false;
    this.hitTime = 0;
    this.size = 8; // Size of the arrow image
    
    // Calculate direction
    let dx = targetX - startX;
    let dy = targetY - startY;
    let distance = sqrt(dx * dx + dy * dy);
    this.dx = (dx / distance) * this.speed;
    this.dy = (dy / distance) * this.speed;
    
    // Calculate angle for arrow rotation
    this.angle = atan2(dy, dx);
  }
  
  update() {
    if (!this.hit) {
      this.x += this.dx;
      this.y += this.dy;
      
      // Check if arrow reached target area
      let distanceToTarget = dist(this.x, this.y, this.targetX, this.targetY);
      if (distanceToTarget < 10) {
        this.hit = true;
        this.hitTime = millis();
        this.dealDamage();
      }
    }
  }
  
  dealDamage() {
    // Deal damage to troops in a small radius around the arrow
    let splashRadius = arrowsradius/2;
    
    // Damage troops
    for (let troop of spawnedCards) {
      if (troop && troop.health > 0 && troop.isEnemy) {
        let distance = dist(this.x, this.y, troop.x, troop.y);
        if (distance < splashRadius) {
          troop.health -= this.damage;
          if (troop.health < 0) {
            troop.health = 0;
          }
        }
      }
    }
    
    // Damage enemy towers
    for (let tower of towers) {
      if (tower.side === "enemy") {
        let distance = dist(this.x, this.y, tower.x, tower.y);
        if (distance < splashRadius) {
          tower.health -= this.damage;
          if (tower.health < 0) {
            tower.health = 0;
          }
        }
      }
    }
  }
  
  display() {
    if (!this.hit) {
      // Draw arrow image rotated to face the target
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      imageMode(CENTER);
      image(arrowImage, 0, 0, this.size*3, this.size);
      pop();
    }
  }
  
  isDead() {
    // Keep arrow visible for a short time after hitting
    if (this.hit) {
      return millis() - this.hitTime > 100;
    }
    return false;
  }
}

function preload() {
  // Load background image
  backgroundImg = loadImage('background.png');
  
  // Load card images
  knightcard = loadImage('knightcard.png');
  goblincard = loadImage('goblincard.png');
  skellycard = loadImage('skellycard.png');
  witchcard = loadImage('witchcard.png');
  fireballcard = loadImage('fireballcard.png');
  arrowcard = loadImage('arrowcard.png');
  
  // Load arrow projectile image
  arrowImage = loadImage('arrow.png'); // Load the arrow image for projectiles
  
  // Load fireball projectile image
  fireballImage = loadImage('fireball.png'); // Load the fireball image for projectiles
  
  // Load unit images
  knight = loadImage('knight.png');
  goblin = loadImage('goblin.png');
  skelly = loadImage('skelly.png');
  witch = loadImage('witch.png');
  
  // Load enemy unit images
  knightenemy = loadImage('knightenemy.png');
  goblinenemy = loadImage('goblinenemy.png');
  skellyenemy = loadImage('skellyenemy.png');
  witchenemy = loadImage('witchenemy.png');
  
  // Load tower images
  playerTower = loadImage('playertower.png');
  enemyTower = loadImage('enemytower.png');
  playerKingTower = loadImage('playertower.png');
  enemyKingTower = loadImage('enemytower.png');
}

function setup() {
  createCanvas(400, 700);
  
  // Center the canvas in the window
  let canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.style.position = 'absolute';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
  }

  // Initialize cards
  deck = [
    new Card("fast", "melee", false, 60, "Goblin", goblin, 50, goblincard, 25, [100, 200, 100], 2),
    new Card("medium", "ranged", false, 60, "Witch", witch, 150, witchcard, 35, [150, 100, 200], 4),
    new Card("medium", "melee", false, 65, "Knight", knight, 200, knightcard, 60, [100, 150, 255], 4),
    new Card("fast", "melee", false, 60, "Skeletons", skelly, 25, skellycard, 3, [205, 155, 100], 3),
    new Card("n/a", "spell", true, fireballradius, "Fireball", null, 0, fireballcard, 120, [255, 150, 50], 4),
    new Card("n/a", "spell", true, arrowsradius, "Arrows", null, 0, arrowcard, 25, [255, 100, 100], 3)
  ];

  // Initialize enemy deck (enemy versions of units)
  enemyDeck = [
    new Card("fast", "melee", false, 60, "Goblin", goblinenemy, 50, goblincard, 25, [200, 100, 100], 2),
    new Card("medium", "ranged", false, 60, "Witch", witchenemy, 100, witchcard, 35, [200, 100, 150], 4),
    new Card("medium", "melee", false, 65, "Knight", knightenemy, 200, knightcard, 40, [255, 100, 100], 4),
    new Card("fast", "melee", false, 60, "Skeletons", skellyenemy, 30, skellycard, 3, [205, 205, 100], 3)
  ];

  // Start with some math points
  mathPoints = 10;
  elixir = 5; // Start with 5 elixir
  displayedElixir = 5; // Initialize displayed elixir

  // Initialize towers
  initializeTowers();

  layoutBottomCards();
  
  // Generate first math problem
  generateMathProblem();
}

function draw() {
  frameCount++;
  
  // Safety check - prevent infinite loops
  if (frameCount > 10000) {
    console.log("Frame count too high, possible infinite loop detected");
    frameCount = 0;
  }
  
  imageMode(CORNER)
  image(backgroundImg, 0, 0, width, height-247);


  // Draw battlefield separator - section off the lower UI area
  fill(100, 80, 60); // Dark brown separator
  stroke(0);
  strokeWeight(3);
  rect(0, height - 247, width, 247); // Cover the bottom 247 pixels

  // Draw bridges
  //drawBridges();

  // Update elixir bar animation
  displayedElixir += (elixir - displayedElixir) * elixirAnimationSpeed;

  // Update spawned cards and remove off-screen ones
  for (let i = spawnedCards.length - 1; i >= 0; i--) {
    let card = spawnedCards[i];
    if (card) {
      card.update();
      
      // Remove dead troops (health <= 0)
      if (card.health <= 0) {
        spawnedCards.splice(i, 1);
        continue;
      }
      
      // Only remove null/undefined cards, not off-screen ones
    } else {
      // Remove null/undefined cards
      spawnedCards.splice(i, 1);
    }
  }
  
  // Update projectiles
  for (let i = projectiles.length - 1; i >= 0; i--) {
    let projectile = projectiles[i];
    projectile.update();

    // Remove exploded projectiles after a short delay
    if (projectile.isDead()) {
      projectiles.splice(i, 1);
    }
  }
  
  // Update arrow projectiles
  for (let i = arrowProjectiles.length - 1; i >= 0; i--) {
    let arrow = arrowProjectiles[i];
    arrow.update();

    // Remove dead arrows
    if (arrow.isDead()) {
      arrowProjectiles.splice(i, 1);
    }
  }
  
  // Update tower arrows
  for (let i = towerArrows.length - 1; i >= 0; i--) {
    let arrow = towerArrows[i];
    arrow.update();

    // Remove dead arrows
    if (arrow.isDead()) {
      towerArrows.splice(i, 1);
    }
  }
  
  // Update towers (for archery)
  for (let tower of towers) {
    tower.update();
  }
  
  // Enemy AI logic
  updateEnemyAI();
  
  // Remove dead towers (health <= 0)
  for (let i = towers.length - 1; i >= 0; i--) {
    if (towers[i].health <= 0) {
      towers.splice(i, 1);
    }
  }
  
  // Collect all drawable objects with their y positions for depth sorting
  let drawableObjects = [];
  
  // Add towers
  for (let tower of towers) {
    drawableObjects.push({object: tower, y: tower.y, type: 'tower'});
  }
  
  // Add spawned cards
  for (let card of spawnedCards) {
    drawableObjects.push({object: card, y: card.y, type: 'spawned'});
  }
  
  // Add projectiles
  for (let projectile of projectiles) {
    drawableObjects.push({object: projectile, y: projectile.y, type: 'projectile'});
  }
  
  // Add arrow projectiles
  for (let arrow of arrowProjectiles) {
    drawableObjects.push({object: arrow, y: arrow.y, type: 'arrow'});
  }
  
  // Add tower arrows
  for (let arrow of towerArrows) {
    drawableObjects.push({object: arrow, y: arrow.y, type: 'towerArrow'});
  }
  
  // Add bottom cards (but not the one being dragged)
  for (let i = 0; i < 4 && i < deck.length; i++) {
    if (deck[i] !== draggedCard) {
      deck[i].updateAnimation(); // Update animation before adding to draw list
      drawableObjects.push({object: deck[i], y: deck[i].y, type: 'card'});
    }
  }
  
  // Sort by y position (top to bottom = back to front)
  drawableObjects.sort((a, b) => a.y - b.y);
  
  // Draw all objects in depth order
  for (let obj of drawableObjects) {
    obj.object.display();
  }
  
  // Draw math points and problem UI
  drawMathUI();
  
  // Draw preview if dragging (always on top)
  if (draggedCard) {
    // Draw enemy territory indicator (red transparent rectangle) only for non-spell cards
    if (!draggedCard.spell) {
      fill(255, 0, 0, 80); // Semi-transparent red
      noStroke();
      rect(0, 0, width, height/3); // Top third of screen is enemy territory (smaller area)
    }
    
    drawSpawnPreview(mouseX, mouseY, draggedCard);
  }
}

function initializeTowers() {
  // Player towers (bottom side) - moved up by 10 pixels
  towers.push(new Tower(100, 353, "archer", "player")); // Left archer tower - moved up by 10 pixels
  towers.push(new Tower(300, 353, "archer", "player")); // Right archer tower - moved up by 10 pixels
  towers.push(new Tower(200, 368, "king", "player"));   // King tower (center) - moved up by 10 more pixels
  
  // Enemy towers (top side)
  towers.push(new Tower(100, 100, "archer", "enemy")); // Left archer tower
  towers.push(new Tower(300, 100, "archer", "enemy")); // Right archer tower
  towers.push(new Tower(200, 65, "king", "enemy"));    // King tower (center) - moved down by 10 more pixels
}

function mousePressed() {
  for (let i = 0; i < 4 && i < deck.length; i++) {
    if (deck[i].contains(mouseX, mouseY)) {
      // Check if player has enough elixir
      if (elixir >= deck[i].cost) {
      draggedCard = deck[i];
      offsetX = mouseX - draggedCard.x;
      offsetY = mouseY - draggedCard.y;
      }
      break;
    }
  }
  
  // Check if clicking on math problem choices
  if (currentProblem && elixir < 10 && millis() - lastMathAnswerTime > mathAnswerCooldown) {
    let problemY = height - 80; // Match the new problem Y position
    let choiceY = problemY + 20; // Match the new choice Y position
    let choiceWidth = 60;
    let choiceHeight = 30;
    
    for (let i = 0; i < problemChoices.length; i++) {
      let choiceX = width/2 - 135 + i * 70; // Match the new choice X positioning
      if (mouseX > choiceX && mouseX < choiceX + choiceWidth &&
          mouseY > choiceY && mouseY < choiceY + choiceHeight) {
        // Check if answer is correct
        if (problemChoices[i] === currentProblem.answer) {
          elixir = Math.min(elixir + 2, 10); // Add 1 elixir, max 10
          lastMathAnswerTime = millis(); // Record when question was answered
          // Generate new problem only when answered correctly
          generateMathProblem();
        } else {
          // Wrong answer - lose 1 elixir and keep same question
          elixir = Math.max(elixir - 1, 0); // Subtract 1 elixir, min 0
          lastMathAnswerTime = millis(); // Record when question was answered
        }
        break;
      }
    }
  }
}

function mouseDragged() {
  if (draggedCard) {
    draggedCard.x = mouseX - offsetX;
    draggedCard.y = mouseY - offsetY;
  }
}

function mouseReleased() {
  if (draggedCard) {
    // Check if trying to play card inside the UI area (bottom 247 pixels)
    if (mouseY > height - 247) {
      // Don't play the card, just return it to hand
      layoutBottomCards();
      draggedCard = null;
      return;
    }
    
    // Check if trying to play non-spell card in enemy territory (top third of screen)
    if (mouseY < height/3 && !draggedCard.spell) {
      // Don't play the card, just return it to hand
      layoutBottomCards();
      draggedCard = null;
      return;
    }
    
    // Call the spawn function at the drop location
    spawnCard(mouseX, mouseY, draggedCard);

    // Deduct elixir for playing the card
    elixir -= draggedCard.cost;

    // Move card to end of deck
    let index = deck.indexOf(draggedCard);
    if (index !== -1) {
      deck.splice(index, 1);
      deck.push(draggedCard);
      
      // Reset the played card's position to prevent interference
      draggedCard.x = width;
      draggedCard.y = height;
      draggedCard.targetX = width;
      draggedCard.targetY = height;
    }

    layoutBottomCards();
    draggedCard = null;
  }
}

// Position cards at the bottom
function layoutBottomCards() {
  let cardWidth = 80;
  let cardHeight = 90;
  let spacing = 10;
  let totalWidth = (cardWidth + spacing) * 4 - spacing;
  let startX = (width - totalWidth) / 2;
  let y = height - cardHeight - 140; // Moved up to make room for math question

  for (let i = 0; i < 4 && i < deck.length; i++) {
    let x = startX + i * (cardWidth + spacing);
    
    // Check if this card is new
    if (deck[i].isNewCard) {
      // Set starting position at bottom right corner
      deck[i].x = width - cardWidth - 20;
      deck[i].y = height - cardHeight - 140; // Moved up to match new position
      deck[i].targetX = width - cardWidth - 20;
      deck[i].targetY = height - cardHeight - 140;
      deck[i].isNewCard = false; // Mark as no longer new
    }
    
    // Set target position in hand
    deck[i].setPosition(x, y, cardWidth, cardHeight);
  }
}

// Spawns a card effect at the drop location
function spawnCard(x, y, card) {
  if (card.name === "Fireball") {
    // Create a fireball projectile that travels to the target location
    let fireballProjectile = new Projectile(width*(4/5), height-247, x, y, card.damage, false); // false = player projectile
    fireballProjectile.isFireball = true; // Mark as fireball for special handling
    projectiles.push(fireballProjectile);
    return; // Exit early for spells
  }
  
  if (card.name === "Arrows") {
    // Create multiple arrow projectiles that travel to the target location
    let numArrows = 20;
    let spreadRadius = arrowsradius; // Radius of the spread area around the target
    let startSpreadRadius = 45; // Radius of the starting spread area
    
    for (let i = 0; i < numArrows; i++) {
      // Calculate random offset within the spread radius for target
      let angle = random(TWO_PI);
      let distance = random(spreadRadius);
      let offsetX = cos(angle) * distance;
      let offsetY = sin(angle) * distance;
      
      // Target position with offset
      let targetX = x + offsetX;
      let targetY = y + offsetY;
      
      // Calculate random starting position around the launch point
      let startAngle = random(TWO_PI);
      let startDistance = random(startSpreadRadius);
      let startOffsetX = cos(startAngle) * startDistance;
      let startOffsetY = sin(startAngle) * startDistance;
      
      // Starting position with offset
      let startX = width*(4/5) + startOffsetX;
      let startY = height-247 + startOffsetY;
      
      // Create arrow projectile
      let arrow = new ArrowProjectile(startX, startY, targetX, targetY, card.damage);
      arrowProjectiles.push(arrow);
    }
    return; // Exit early for spells
  }
  
  if (card.name === "Skeletons") {
    // Spawn 13 skeletons in a fixed diamond formation (removed front and back)
    let positions = [
      // Center row (5 skeletons)
      {x: 0, y: 0}, {x: 25, y: 0}, {x: -25, y: 0}, {x: 50, y: 0}, {x: -50, y: 0},
      // Upper rows (4 skeletons)
      {x: 12, y: -20}, {x: -12, y: -20}, {x: 37, y: -20}, {x: -37, y: -20},
      // Lower rows (4 skeletons)
      {x: 12, y: 20}, {x: -12, y: 20}, {x: 37, y: 20}, {x: -37, y: 20}
    ];
    
    for (let i = 0; i < 13; i++) {
      let skeletonX = x + positions[i].x;
      let skeletonY = y + positions[i].y;
      
      // Create a small skeleton with reduced radius
      let smallSkeleton = new SpawnedCard(skeletonX, skeletonY, {
        speed: card.speed,
        range: card.range,
        spell: card.spell,
        radius: 34, // Increased from 15 to 20 for better visibility
        name: card.name,
        image: card.image,
        health: card.health,
        damage: card.damage,
        isEnemy: false // Mark as player unit
      });
      spawnedCards.push(smallSkeleton);
    }
  } else if (card.name === "Goblin") {
    // Spawn 3 goblins in a triangle formation
    let positions = [
      {x: 0, y: 0},      // Center
      {x: -20, y: -15},  // Left
      {x: 20, y: -15}    // Right
    ];
    
    for (let i = 0; i < 3; i++) {
      let goblinX = x + positions[i].x;
      let goblinY = y + positions[i].y;
      
      // Create a goblin with radius slightly bigger than skeleton
      let goblin = new SpawnedCard(goblinX, goblinY, {
        speed: card.speed,
        range: card.range,
        spell: card.spell,
        radius: 45, // Slightly bigger than skeleton (8) but smaller than original (30)
        name: card.name,
        image: card.image,
        health: card.health,
        damage: card.damage,
        isEnemy: false // Mark as player unit (FIXED)
      });
      spawnedCards.push(goblin);
    }
  } else {
    // Create a new spawned card instance for other cards
    let playerCard = {
      speed: card.speed,
      range: card.range,
      spell: card.spell,
      radius: card.radius,
      name: card.name,
      image: card.image,
      health: card.health,
      damage: card.damage,
      isEnemy: false // Mark as player unit (FIXED)
    };
    let spawnedCard = new SpawnedCard(x, y, playerCard);
    spawnedCards.push(spawnedCard);
  }

  // Optional: draw a temporary indicator
  fill(0, 255, 0, 100);
  noStroke();
  ellipse(x, y, 40);

  // Future: add game objects, animations, etc.
}

function drawSpawnPreview(x, y, card) {
  // Set reduced saturation for preview
  drawingContext.globalAlpha = 0.6;
  
  if (card.name === "Fireball") {
    // Preview fireball explosion radius
    fill(255, 165, 0, 100); // Semi-transparent orange
    stroke(255, 100, 0, 150);
    strokeWeight(2);
    ellipse(x, y, card.radius * 2, card.radius * 2); // Show splash radius (60 * 2)
    
    // Add glow effect
    fill(255, 200, 100, 50);
    ellipse(x, y, card.radius * 2, card.radius * 2);
  } else if (card.name === "Arrows") {
    // Preview arrows spread area
    fill(255, 255, 255, 100); // Semi-transparent white
    stroke(200, 200, 200, 150);
    strokeWeight(2);
    ellipse(x, y, card.radius * 2, card.radius * 2); // Show spread radius
    
    // Add glow effect
    fill(255, 255, 255, 50);
    ellipse(x, y, card.radius * 2 + 20, card.radius * 2 + 20);
    
  } else if (card.name === "Skeletons") {
    // Preview 13 skeletons in fixed diamond formation (removed front and back)
    let positions = [
      // Center row (5 skeletons)
      {x: 0, y: 0}, {x: 25, y: 0}, {x: -25, y: 0}, {x: 50, y: 0}, {x: -50, y: 0},
      // Upper rows (4 skeletons)
      {x: 12, y: -20}, {x: -12, y: -20}, {x: 37, y: -20}, {x: -37, y: -20},
      // Lower rows (4 skeletons)
      {x: 12, y: 20}, {x: -12, y: 20}, {x: 37, y: 20}, {x: -37, y: 20}
    ];
    
    for (let i = 0; i < 13; i++) {
      let skeletonX = x + positions[i].x;
      let skeletonY = y + positions[i].y;
      
      // Draw preview skeleton
      if (card.image) {
        imageMode(CENTER);
        image(card.image, skeletonX, skeletonY, 34, 34); // 20 radius = 40 diameter
      } else {
        fill(200, 100, 100);
        noStroke();
        ellipse(skeletonX, skeletonY, 34);
      }
    }
  } else if (card.name === "Goblin") {
    // Preview 3 goblins in triangle formation
    let positions = [
      {x: 0, y: 0},      // Center
      {x: -20, y: -15},  // Left
      {x: 20, y: -15}    // Right
    ];
    
    for (let i = 0; i < 3; i++) {
      let goblinX = x + positions[i].x;
      let goblinY = y + positions[i].y;
      
      // Draw preview goblin
      if (card.image) {
        imageMode(CENTER);
        image(card.image, goblinX, goblinY, 45, 45); // 12 radius = 24 diameter
      } else {
        fill(200, 100, 100);
        noStroke();
        ellipse(goblinX, goblinY, 45);
      }
    }
  } else {
    // Preview single unit
    if (card.image) {
      imageMode(CENTER);
      image(card.image, x, y, card.radius, card.radius);
    } else {
      fill(200, 100, 100);
      noStroke();
      ellipse(x, y, card.radius);
    }
  }
  
  // Reset alpha
  drawingContext.globalAlpha = 1.0;
}

function generateMathProblem() {
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;
  let operators = ['+', '-', 'x'];
  let operator = operators[Math.floor(Math.random() * operators.length)];
  
  let answer;
  switch(operator) {
    case '+': 
      answer = num1 + num2; 
      break;
    case '-': 
      // Ensure subtraction doesn't result in negative numbers
      if (num1 < num2) {
        [num1, num2] = [num2, num1]; // Swap to ensure larger number first
      }
      answer = num1 - num2; 
      break;
    case 'x': 
      answer = num1 * num2; 
      break;
  }
  
  currentProblem = {
    question: `${num1} ${operator} ${num2} = ?`,
    answer: answer
  };
  
  // Generate multiple choice options
  problemChoices = [answer];
  let attempts = 0;
  while (problemChoices.length < 4 && attempts < 100) {
    let wrongAnswer = answer + Math.floor(Math.random() * 6) - 3; // ±3 from correct answer
    // Ensure wrong answers are also not negative
    if (wrongAnswer > 0 && wrongAnswer !== answer && !problemChoices.includes(wrongAnswer)) {
      problemChoices.push(wrongAnswer);
    }
    attempts++;
  }
  
  // If we couldn't generate enough unique wrong answers, fill with simple alternatives
  while (problemChoices.length < 4) {
    let simpleWrong = answer + (problemChoices.length - 1) * 2;
    if (simpleWrong > 0 && !problemChoices.includes(simpleWrong)) {
      problemChoices.push(simpleWrong);
    } else {
      // Last resort - just add any positive number
      problemChoices.push(Math.max(1, answer + problemChoices.length));
    }
  }
  
  // Shuffle the choices
  for (let i = problemChoices.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [problemChoices[i], problemChoices[j]] = [problemChoices[j], problemChoices[i]];
  }
}

function drawMathUI() {
  // Draw elixir bar between cards and math problem
  let barY = height - 130; // Between cards and math problem
  let barWidth = 300;
  let barHeight = 20;
  let barX = (width - barWidth) / 2;
  
  // Background bar
  fill(100, 100, 100);
  stroke(0);
  strokeWeight(2);
  rect(barX, barY, barWidth, barHeight, 10);
  
  // Elixir fill (using animated value) - solid purple for performance
  let fillWidth = (displayedElixir / 10) * barWidth;
  fill(150, 100, 200); // Solid purple for better performance
  rect(barX, barY, fillWidth, barHeight, 10);
  
  // Elixir text (using actual value for accuracy)
  fill(255);
  stroke(0);
  strokeWeight(1);
  textAlign(CENTER);
  textSize(14);
  text(`${elixir}/10`, width/2, barY + 15);
  
  // Always draw math problem if elixir is not full
  if (elixir < 10 && currentProblem) {
    let problemY = height - 80;
    
    // Problem background
    fill(255, 225, 225, 175);
    stroke(0);
    strokeWeight(2);
    rect(width/2 - 150, problemY - 20, 300, 80, 10);
    
    // Problem question
    fill(0);
    noStroke();
    textAlign(CENTER);
    textSize(18);
    text(currentProblem.question, width/2, problemY+4);
    
    // Multiple choice options
    let choiceY = problemY + 20;
    for (let i = 0; i < problemChoices.length; i++) {
      let choiceX = width/2 - 135 + i * 70;
      
      // Choice button
      fill(255, 235, 235, 175);
      stroke(0);
      strokeWeight(1);
      rect(choiceX, choiceY, 60, 30, 5);
      
      // Choice text
      fill(0);
      noStroke();
      textAlign(CENTER);
      textSize(14);
      text(problemChoices[i], choiceX + 30, choiceY + 20);
    }
  }
}

class Card {
  constructor(speed, range, spell, radius, name, image, health, cardImage, damage, color, cost) {
    this.speed = speed;
    this.range = range;
    this.spell = spell;
    this.radius = radius;
    this.name = name;
    this.image = image;
    this.health = health;
    this.cardImage = cardImage;
    this.damage = damage;
    this.color = color;
    this.cost = cost; // Add cost property

    this.x = width;
    this.y = height;
    this.w = 80;
    this.h = 90;
    
    // Animation properties for smooth movement
    this.targetX = 0;
    this.targetY = 0;
    this.animationSpeed = 0.15; // How fast cards move to their target position
    this.isNewCard = true; // Flag to track if this card is new
  }

  setPosition(x, y, w, h) {
    this.targetX = x;
    this.targetY = y;
    this.w = w;
    this.h = h;
  }
  
  updateAnimation() {
    // Smoothly move towards target position
    this.x += (this.targetX - this.x) * this.animationSpeed;
    this.y += (this.targetY - this.y) * this.animationSpeed;
  }

  display() {
    // Check if player has enough elixir for this card
    let canAfford = elixir >= this.cost;
    
    // Use card-specific color for background, or gray if can't afford
    if (canAfford) {
      fill(this.color[0], this.color[1], this.color[2]);
    } else {
      fill(100, 100, 100); // Gray background when can't afford
    }
    noStroke();
    rect(this.x, this.y, this.w, this.h, 15);
    
    // Add a subtle inner border
    stroke(255, 255, 255, 100);
    strokeWeight(2);
    noFill();
    rect(this.x + 2, this.y + 2, this.w - 4, this.h - 4, 13);

    // Display cost in purple circle
    fill(150, 100, 200); // Purple background
    stroke(45, 30, 60);
    strokeWeight(2);
    ellipse(this.x+4, this.y+5, 25, 25);
    
    // Display card image or fallback circle
    if (this.cardImage) {
      imageMode(CENTER);
      if (canAfford) {
        // Normal colored image
        image(this.cardImage, this.x + this.w / 2, 13 + this.y + this.h / 3, 90, 90);
      } else {
        // Completely colorless (black and white) image when can't afford
        push();
        drawingContext.filter = 'grayscale(100%)'; // Convert to pure black and white
        image(this.cardImage, this.x + this.w / 2, 13 + this.y + this.h / 3, 90, 90);
        pop();
      }
    } else {
      if (canAfford) {
        fill(200, 100, 100);
      } else {
        fill(100, 100, 100); // Gray fallback circle
      }
      ellipse(this.x + this.w / 2, this.y + this.h / 3, this.radius);
    }
    
    // Cost text
    fill(255);
    stroke(0);
    strokeWeight(1);
    textAlign(CENTER);
    textSize(12);
    text(this.cost, this.x+4, this.y+8.5);
  }

  contains(mx, my) {
    return mx > this.x && mx < this.x + this.w &&
           my > this.y && my < this.y + this.h;
  }
}

class SpawnedCard {
  constructor(x, y, originalCard) {
    this.x = x;
    this.y = y;
    this.speed = originalCard.speed;
    this.range = originalCard.range;
    this.spell = originalCard.spell;
    this.radius = originalCard.radius;
    this.name = originalCard.name;
    this.image = originalCard.image;
    this.health = originalCard.health;
    this.maxHealth = originalCard.health;
    this.damage = originalCard.damage;
    this.moveSpeed = originalCard.speed;
    this.targetTower = null;
    this.targetEnemy = null; // New: target enemy troop
    this.lastAttackTime = 0;
    this.attackCooldown = 500; // Attack every 0.5 seconds
    
    // Target re-evaluation system
    this.lastTargetUpdate = millis();
    this.targetUpdateInterval = 5000; // Re-evaluate targets every 5 seconds
    
    // Enemy flag
    this.isEnemy = originalCard.isEnemy || false;
    
    // Bridge crossing state
    this.isCrossingBridge = false;
    this.hasCrossedBridge = false;
    
    // Formation system to prevent overlapping
    this.formationOffset = {x: 0, y: 0};
    this.formationRadius = 20; // How far troops spread from target
    this.formationAngle = random(TWO_PI); // Random angle for formation position
    
    // Set movement speed based on card speed
    if (this.speed === "fast") {
      this.moveSpeed = 0.6;
    } else if (this.speed === "medium") {
      this.moveSpeed = 0.4;
    } else if (this.speed === "slow") {
      this.moveSpeed = 0.2;
    }
    
    // Set attack range based on unit type
    this.attackRange = this.range === "melee" ? 35 : 75; // 35 pixels for melee, 75 for ranged
    
    // Find nearest enemy (tower or troop)
    this.findNearestTarget();
    
    // Temporary debug
    if (this.name === "Witch" || this.name === "Knight") {
      console.log(`Created ${this.name}, isEnemy: ${this.isEnemy}, targetTower side: ${this.targetTower ? this.targetTower.side : 'none'}`);
    }
  }

  findNearestTarget() {
    let nearestTarget = null;
    let nearestDistance = Infinity;
    let isTargetTower = false;
    
    // Safety check - make sure towers array exists and has elements
    if (!towers || towers.length === 0) {
      return;
    }
    
    // Check enemy towers first
    for (let tower of towers) {
      // Enemy units target player towers, player units target enemy towers
      let targetSide = this.isEnemy ? "player" : "enemy";
      
      if (tower && tower.side === targetSide && tower.health > 0) {
        let distance = dist(this.x, this.y, tower.x, tower.y);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestTarget = tower;
          isTargetTower = true;
        }
      }
    }
    
    // Check enemy troops
    for (let troop of spawnedCards) {
      if (troop && troop !== this && troop.health > 0 && troop.isEnemy !== this.isEnemy) {
        let distance = dist(this.x, this.y, troop.x, troop.y);
        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestTarget = troop;
          isTargetTower = false;
        }
      }
    }
    
    // Set the target
    if (isTargetTower) {
      this.targetTower = nearestTarget;
      this.targetEnemy = null;
    } else {
      this.targetTower = null;
      this.targetEnemy = nearestTarget;
    }
  }

  findNearestBridge() {
    let nearestBridge = null;
    let nearestDistance = Infinity;
    
    for (let bridge of bridges) {
      let distance = dist(this.x, this.y, bridge.x + bridge.width/2, bridge.y);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestBridge = bridge;
      }
    }
    
    return nearestBridge;
  }

  isOnBridge() {
    for (let bridge of bridges) {
      if (this.x > bridge.x && this.x < bridge.x + bridge.width &&
          this.y > bridge.y - 10 && this.y < bridge.y + bridge.height + 10) {
        return true;
      }
    }
    return false;
  }

  isInAttackRange() {
    let target = this.targetTower || this.targetEnemy;
    if (!target) return false;
    
    // Calculate distance considering formation offset
    let targetX = target.x;
    let targetY = target.y;
    
    // Apply formation offset if targeting an enemy troop
    if (this.targetEnemy) {
      targetX += cos(this.formationAngle) * this.formationRadius;
      targetY += sin(this.formationAngle) * this.formationRadius;
    }
    
    let distance = dist(this.x, this.y, targetX, targetY);
    return distance <= this.attackRange;
  }

  canAttack() {
    return millis() - this.lastAttackTime >= this.attackCooldown;
  }

  attack() {
    let target = this.targetTower || this.targetEnemy;
    if (target && this.canAttack()) {
      // For witch, create a projectile instead of instant damage
      if (this.name === "Witch") {
        // Create orange blast projectile
        let projectile = new Projectile(this.x, this.y, target.x, target.y, this.damage, this.isEnemy);
        projectiles.push(projectile);
      } else {
        // Other units deal instant damage
        target.health -= this.damage;
        
        // Ensure health doesn't go below 0
        if (target.health < 0) {
          target.health = 0;
        }
      }
      
      // Reset attack cooldown
      this.lastAttackTime = millis();
      
      // If target is destroyed, find a new target
      if (target.health <= 0) {
        this.findNearestTarget();
      }
    }
  }

  needsBridgeToReachTarget() {
    let target = this.targetTower || this.targetEnemy;
    if (!target) return false;
    
    // Check if target is on the opposite side of the river
    let playerSide = this.isEnemy ? "top" : "bottom"; // Enemy units are on top, player units on bottom
    let riverY = 230; // Approximate river position
    
    if (playerSide === "bottom" && target.y < riverY && this.y > riverY) {
      return true; // Player unit needs bridge to reach enemy on top
    } else if (playerSide === "top" && target.y > riverY && this.y < riverY) {
      return true; // Enemy unit needs bridge to reach player on bottom
    }
    
    return false;
  }

  update() {
    // Move towards nearest enemy (unless it's a spell)
    if (!this.spell) {
      // Periodic target re-evaluation (every 5 seconds)
      if (millis() - this.lastTargetUpdate > this.targetUpdateInterval) {
        this.findNearestTarget();
        this.lastTargetUpdate = millis();
      }
      
      // Check if we need to find a new target (if current target is destroyed)
      let currentTarget = this.targetTower || this.targetEnemy;
      if (!currentTarget || currentTarget.health <= 0) {
        this.findNearestTarget();
        currentTarget = this.targetTower || this.targetEnemy;
      }
      
      if (currentTarget) {
        // Check if unit is in attack range
        if (this.isInAttackRange()) {
          // Unit is in range, attack instead of moving
          this.attack();
          return;
        }
        
        // Determine movement target
        let targetX = currentTarget.x;
        let targetY = currentTarget.y;
        let needsBridge = this.needsBridgeToReachTarget();
        
        // If we need a bridge and haven't crossed yet, go to bridge first
        if (needsBridge && !this.hasCrossedBridge) {
          let nearestBridge = this.findNearestBridge();
          if (nearestBridge) {
            targetX = nearestBridge.x + nearestBridge.width/2;
            targetY = nearestBridge.y + nearestBridge.height/2;
            this.isCrossingBridge = true;
          }
        } else {
          this.isCrossingBridge = false;
          
          // Apply formation offset to prevent overlapping (only when targeting enemies, not bridges)
          if (this.targetEnemy) {
            targetX += cos(this.formationAngle) * this.formationRadius;
            targetY += sin(this.formationAngle) * this.formationRadius;
          }
        }
        
        // Check if unit has reached the bridge
        if (this.isCrossingBridge) {
          let nearestBridge = this.findNearestBridge();
          if (nearestBridge) {
            let distanceToBridge = dist(this.x, this.y, nearestBridge.x + nearestBridge.width/2, nearestBridge.y + nearestBridge.height/2);
            if (distanceToBridge < 20) {
              this.hasCrossedBridge = true;
              this.isCrossingBridge = false;
            }
          }
        }
        
        // Move toward target (either bridge or enemy)
        let dx = targetX - this.x;
        let dy = targetY - this.y;
        let distance = sqrt(dx * dx + dy * dy);
        
        if (distance > 0 && distance < 1000) {
          this.x += (dx / distance) * this.moveSpeed;
          this.y += (dy / distance) * this.moveSpeed;
        }
      }
    }
  }

  display() {
    if (this.image) {
      // Display the card image
      imageMode(CENTER);
      image(this.image, this.x, this.y, this.radius, this.radius);
    } else {
      // Fallback to circle with card radius
      fill(200, 100, 100);
      noStroke();
      ellipse(this.x, this.y, this.radius);
    }
    
    // Draw health bar (only for non-spells with health)
    if (!this.spell && this.maxHealth > 0) {
      this.drawHealthBar();
    }
  }
  
  drawHealthBar() {
    let barWidth = this.radius * 0.375; // Reduced from 0.75 to 0.375 (half length)
    let barHeight = 3; // Reduced from 6 to 3 (half width)
    let barX = this.x - barWidth / 2;
    let barY = this.y - this.radius / 2 + 5; // Moved down by 20 pixels (from -15 to +5)
    
    // Background (gray)
    fill(100);
    noStroke();
    rect(barX, barY, barWidth, barHeight, 3);
    
    // Health (green to red based on percentage)
    let healthPercent = this.health / this.maxHealth;
    let healthWidth = barWidth * healthPercent;
    
    if (healthPercent > 0.6) {
      fill(0, 255, 0); // Green
    } else if (healthPercent > 0.3) {
      fill(255, 255, 0); // Yellow
    } else {
      fill(255, 0, 0); // Red
    }
    
    rect(barX, barY, healthWidth, barHeight, 3);
    
    // Border
    stroke(0);
    strokeWeight(1);
    noFill();
    rect(barX, barY, barWidth, barHeight, 3);
  }
}

class Tower {
  constructor(x, y, type, side) {
    this.x = x;
    this.y = y;
    this.type = type; // "archer" or "king"
    this.side = side; // "player" or "enemy"
    this.lastShotTime = 0; // Track when tower last shot an arrow
    this.shotCooldown = 1500; // Tower shoots every 1.5 seconds
    
    // Set properties based on tower type
    if (type === "king") {
      this.radius = 25;
      this.maxHealth = 2200;
      this.health = 2200;
      this.damage = 50;
      this.range = 120;
    } else { // archer tower
      this.radius = 20;
      this.maxHealth = 1400;
      this.health = 1400;
      this.damage = 30;
      this.range = 120;
    }
  }

  update() {
    // Both player and enemy towers shoot at enemy troops
    if (this.health > 0) {
      this.findAndShootAtEnemies();
    }
  }

  findAndShootAtEnemies() {
    // Check if tower can shoot (cooldown)
    if (millis() - this.lastShotTime < this.shotCooldown) {
      return;
    }

    // Find nearest enemy troop within range
    let nearestEnemy = null;
    let nearestDistance = Infinity;
    let targetSide = this.side === "player" ? "enemy" : "player"; // Enemy towers target player troops

    for (let troop of spawnedCards) {
      if (troop && troop.health > 0 && troop.isEnemy === (targetSide === "enemy")) {
        let distance = dist(this.x, this.y, troop.x, troop.y);
        if (distance <= this.range && distance < nearestDistance) {
          nearestDistance = distance;
          nearestEnemy = troop;
        }
      }
    }

    // Shoot at the nearest enemy
    if (nearestEnemy) {
      let towerArrow = new TowerArrow(this.x, this.y, nearestEnemy.x, nearestEnemy.y, this.damage, this.side);
      towerArrows.push(towerArrow);
      this.lastShotTime = millis();
    }
  }

  display() {
    // Draw tower using images
    imageMode(CENTER);
    
    if (this.type === "king") {
      // King tower
      if (this.side === "player") {
        image(playerKingTower, this.x, this.y, this.radius * 4, this.radius * 5);
      } else {
        image(enemyKingTower, this.x, this.y, this.radius * 4, this.radius * 5);
      }
    } else {
      // Archer tower
      if (this.side === "player") {
        image(playerTower, this.x, this.y, this.radius * 4, this.radius * 5);
      } else {
        image(enemyTower, this.x, this.y, this.radius * 4, this.radius * 5);
      }
    }
    
    // Draw health bar
    this.drawHealthBar();
  }
  
  drawHealthBar() {
    let barWidth = this.radius * 1; // Reduced from 2 to 1 (half length)
    let barHeight = 3; // Reduced from 6 to 3 (half width)
    let barX = this.x - barWidth / 2;
    let barY = this.y - this.radius - 15;
    
    // Background (gray)
    fill(100);
    noStroke();
    rect(barX, barY, barWidth, barHeight, 3);
    
    // Health (green to red based on percentage)
    let healthPercent = this.health / this.maxHealth;
    let healthWidth = barWidth * healthPercent;
    
    if (healthPercent > 0.6) {
      fill(0, 255, 0); // Green
    } else if (healthPercent > 0.3) {
      fill(255, 255, 0); // Yellow
    } else {
      fill(255, 0, 0); // Red
    }
    
    rect(barX, barY, healthWidth, barHeight, 3);
    
    // Border
    stroke(0);
    strokeWeight(1);
    noFill();
    rect(barX, barY, barWidth, barHeight, 3);
  }
}

function drawBridges() {
  // Draw wooden bridges
  fill(139, 69, 19); // Brown wood color
  stroke(0);
  strokeWeight(2);
  
  for (let bridge of bridges) {
    // Main bridge platform
    rect(bridge.x, bridge.y, bridge.width, bridge.height, 5);
    
    // Bridge supports (vertical posts)
    fill(101, 67, 33); // Darker brown for supports
    rect(bridge.x - 5, bridge.y - 10, 10, 30, 3);
    rect(bridge.x + bridge.width - 5, bridge.y - 10, 10, 30, 3);
    
    // Bridge railings
    fill(139, 69, 19);
    rect(bridge.x, bridge.y - 5, bridge.width, 5, 3);
    rect(bridge.x, bridge.y + bridge.height, bridge.width, 5, 3);
    
    // Draw entry point dot (red dot)
    fill(255, 0, 0);
    noStroke();
    ellipse(bridge.x + bridge.width/2, bridge.y + bridge.height/2, 8, 8);
  }
}

class Projectile {
  constructor(x, y, targetX, targetY, damage, isEnemyAttacker) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.damage = damage;
    this.isEnemyAttacker = isEnemyAttacker; // Track which side created this projectile
    this.speed = 3;
    this.radius = 4;
    this.exploded = false;
    this.explosionTime = 0; // Track when explosion started
    this.blastParticles = null; // Will be set on explosion
    this.isFireball = false; // Track if this is a fireball spell
    this.isArrows = false; // Track if this is an arrows spell
    this.size = 12; // Size of the projectile image
    
    // For fireball and arrows spells, start from player's side
    if (this.isFireball || this.isArrows) {
      this.x = width / 2; // Start from center of screen
      this.y = height - 100; // Start from player's side
      if (this.isFireball) {
        this.radius = fireballradius;
      }
    }
    
    // Calculate direction
    let dx = targetX - x;
    let dy = targetY - y;
    let distance = sqrt(dx * dx + dy * dy);
    this.dx = (dx / distance) * this.speed;
    this.dy = (dy / distance) * this.speed;
    
    // Calculate angle for projectile rotation
    this.angle = atan2(dy, dx);
  }
  
  update() {
    if (!this.exploded) {
      this.x += this.dx;
      this.y += this.dy;
      
      // Check if projectile reached target
      let distanceToTarget = dist(this.x, this.y, this.targetX, this.targetY);
      if (distanceToTarget < 10) {
        this.explode();
        this.dealSplashDamage();
      }
    } else if (this.blastParticles) {
      // Update blast particles
      for (let p of this.blastParticles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1/60; // Assuming 60fps
      }
    }
  }
  
  dealSplashDamage() {
    // Deal splash damage to towers and troops on the opposite side of the attacker
    let targetSide = this.isEnemyAttacker ? "player" : "enemy";
    let splashRadius = 20; // Default splash radius
    
    if (this.isFireball) {
      splashRadius = fireballradius*1.3; // Fireball has larger splash radius
    } else if (this.isArrows) {
      splashRadius = arrowsradius*20; // Arrows have medium splash radius
    }
    
    // Damage towers
    for (let tower of towers) {
      if (tower.side === targetSide) {
        let distance = dist(this.targetX, this.targetY, tower.x, tower.y);
        if (distance < splashRadius) {
          tower.health -= this.damage;
          if (tower.health < 0) {
            tower.health = 0;
          }
        }
      }
    }
    
    // Damage troops
    for (let troop of spawnedCards) {
      if (troop && troop.health > 0 && troop.isEnemy !== this.isEnemyAttacker) {
        let distance = dist(this.targetX, this.targetY, troop.x, troop.y);
        if (distance < splashRadius) {
          troop.health -= this.damage;
          if (troop.health < 0) {
            troop.health = 0;
          }
        }
      }
    }
  }
  
  explode() {
    this.exploded = true;
    this.explosionTime = millis(); // Record when explosion started
    // Create blast particles
    this.blastParticles = [];
    let numParticles = 18; // Default number of particles
    
    if (this.isFireball) {
      numParticles = 25; // More particles for fireball
    } else if (this.isArrows) {
      numParticles = 20; // Medium particles for arrows
    }
    
    for (let i = 0; i < numParticles; i++) {
      let angle = (TWO_PI / numParticles) * i + random(-0.2, 0.2);
      let speed = random(2, 5);
      let particleColor;
      
      if (this.isFireball) {
        particleColor = color(255, random(140,200), 0, 200); // Orange for fireball
      } else if (this.isArrows) {
        particleColor = color(255, 255, 255, 200); // White for arrows
      } else {
        particleColor = color(255, random(140,200), 0, 200); // Default orange
      }
      
      this.blastParticles.push({
        x: this.x,
        y: this.y,
        vx: cos(angle) * speed,
        vy: sin(angle) * speed,
        r: random(3, 7),
        color: particleColor,
        life: 0.3 // seconds
      });
    }
  }
  
  display() {
    if (!this.exploded) {
      // Draw projectile based on type
      if (this.isArrows) {
        // Draw white arrows projectile
        fill(255, 255, 255); // White
        stroke(200, 200, 200);
        strokeWeight(2);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        
        // Add glow effect
        fill(255, 255, 255, 100);
        ellipse(this.x, this.y, this.radius * 4, this.radius * 4);
      } else if (this.isFireball) {
        // Draw fireball image rotated to face the target
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        imageMode(CENTER);
        image(fireballImage, 0, 0, this.size * 8, this.size * 5);
        pop();
      } else {
        // Draw orange projectile (witch)
        fill(255, 165, 0); // Orange
        stroke(255, 100, 0);
        strokeWeight(2);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
        
        // Add glow effect
        fill(255, 200, 100, 100);
        ellipse(this.x, this.y, this.radius * 4, this.radius * 4);
      }
    } else if (this.blastParticles) {
      // Draw blast particles
      noStroke();
      for (let p of this.blastParticles) {
        if (p.life > 0) {
          fill(red(p.color), green(p.color), blue(p.color), map(p.life, 0, 0.3, 0, alpha(p.color)));
          ellipse(p.x, p.y, p.r, p.r);
        }
      }
    }
  }
  
  isDead() {
    // Keep explosion visible for 0.3s
    if (this.exploded) {
      return millis() - this.explosionTime > 300;
    }
    return false;
  }
}

function updateEnemyAI() {
  // Enemy gains elixir over time
  enemyElixir = Math.min(enemyElixir + 0.02, 10); // Gain elixir slowly
  
  // Check if it's time to spawn a unit
  if (millis() - enemyLastSpawn > enemySpawnInterval && enemyElixir >= 2) {
    // Choose a random card from enemy deck
    let availableCards = enemyDeck.filter(card => card.cost <= enemyElixir);
    
    if (availableCards.length > 0) {
      let chosenCard = availableCards[Math.floor(Math.random() * availableCards.length)];
      
      // Spawn enemy unit on enemy side (top area)
      let spawnX = random(50, width - 50);
      let spawnY = random(30, 80); // Spawn in top enemy territory only (above Y=100)
      
      spawnEnemyCard(spawnX, spawnY, chosenCard);
      
      // Deduct elixir and update spawn time
      enemyElixir -= chosenCard.cost;
      enemyLastSpawn = millis();
    }
  }
}

// Spawns an enemy card effect at the drop location
function spawnEnemyCard(x, y, card) {
  if (card.name === "Skeletons") {
    // Spawn 13 skeletons in a fixed diamond formation
    let positions = [
      // Center row (5 skeletons)
      {x: 0, y: 0}, {x: 25, y: 0}, {x: -25, y: 0}, {x: 50, y: 0}, {x: -50, y: 0},
      // Upper rows (4 skeletons)
      {x: 12, y: -20}, {x: -12, y: -20}, {x: 37, y: -20}, {x: -37, y: -20},
      // Lower rows (4 skeletons)
      {x: 12, y: 20}, {x: -12, y: 20}, {x: 37, y: 20}, {x: -37, y: 20}
    ];
    
    for (let i = 0; i < 13; i++) {
      let skeletonX = x + positions[i].x;
      let skeletonY = y + positions[i].y;
      
      let smallSkeleton = new SpawnedCard(skeletonX, skeletonY, {
        speed: card.speed,
        range: card.range,
        spell: card.spell,
        radius: 34,
        name: card.name,
        image: card.image,
        health: card.health,
        damage: card.damage,
        isEnemy: true // Mark as enemy unit
      });
      spawnedCards.push(smallSkeleton);
    }
  } else if (card.name === "Goblin") {
    // Spawn 3 goblins in a triangle formation
    let positions = [
      {x: 0, y: 0},      // Center
      {x: -20, y: -15},  // Left
      {x: 20, y: -15}    // Right
    ];
    
    for (let i = 0; i < 3; i++) {
      let goblinX = x + positions[i].x;
      let goblinY = y + positions[i].y;
      
      let goblin = new SpawnedCard(goblinX, goblinY, {
        speed: card.speed,
        range: card.range,
        spell: card.spell,
        radius: 45,
        name: card.name,
        image: card.image,
        health: card.health,
        damage: card.damage,
        isEnemy: true // Mark as enemy unit
      });
      spawnedCards.push(goblin);
    }
  } else {
    // Create a new spawned card instance for other cards
    let enemyCard = {
      speed: card.speed,
      range: card.range,
      spell: card.spell,
      radius: card.radius,
      name: card.name,
      image: card.image,
      health: card.health,
      damage: card.damage,
      isEnemy: true // Mark as enemy unit
    };
    let spawnedCard = new SpawnedCard(x, y, enemyCard);
    spawnedCards.push(spawnedCard);
  }
}
