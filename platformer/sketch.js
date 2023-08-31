let player, groundSensor, answer, grass, brick, water, coins, segments;
let grassImg, waterImg, coinsImg, charactersImg, emptyImg, brickImg, answerImg;
let num1, num2, ans;

let posAns = [];

let canMove = true;

let tiles = [];

let fontt;

let score = 0;

function preload() {
    grassImg = loadImage('grass.png');
    waterImg = loadImage('water.png');
    coinsImg = loadImage('coin.png');
    brickImg = loadImage('brick.png');
    answerImg = loadImage('answer.png');
    emptyImg = loadImage('empty.png');
    charactersImg = loadImage('characters.png');
    fontt = loadFont('font.ttf');
}

function setup() {
    new Canvas(200, 160, "pixelated");
    world.gravity.y = 10;
    allSprites.pixelPerfect = true;

    textFont(fontt);

    grass = new Group();
    grass.layer = 0;
    grass.collider = 'static';
    grass.img = grassImg;
    grass.tile = 'g';

    answer = new Group();
    answer.layer = 0;
    answer.collider = 'static';
    answer.img = emptyImg;
    answer.tile = 'a';

    brick = new Group();
    brick.layer = 0;
    brick.collider = 'static';
    brick.img = brickImg;
    brick.tile = 'b';

    water = new Group();
    water.layer = 2;
    water.collider = 'static';
    water.img = waterImg;
    water.h = 8;
    water.tile = 'w';

    coins = new Group();
    coins.collider = 'static';
    coins.spriteSheet = coinsImg;
    coins.addAni({
        w: 16,
        h: 16,
        row: 0,
        frames: 14
    });
    coins.tile = 'c';

    //create an array of strings to be used as the tiles, and then randomly add prefefined segments onto it
    tiles = [
        '      ',
        '      ',
        '      ',
        '      ',
        '      ',
        '      ',
        '      ',
        '      ',
        '      ',
        'gggggg'
    ];

    segments = [
        [
            '                        ',
            '                        ',
            '                        ',
            '                        ',
            '                        ',
            '          ccc           ',
            '          bbb           ',
            '                        ',
            '     ccc       c c      ',
            'gggggggggwwwwwggggg  ggg'
        ],
        [
            '                                     ',
            '                                     ',
            '                                     ',
            '                                     ',
            '                                     ',
            '                         ccc         ',
            '                        ccccc        ',
            '                       bbb bbb       ',
            '         cc                          ',
            'ggg  gg  gg  gg  gggg             ggg'
        ],
        [
            '                                                        ',
            '                                                        ',
            '                        ccccccccc                       ',
            '                      ggggggggggggg                     ',
            '                 bbb                  ggg               ',
            '          bbb                              ggg          ',
            '    ccc                                         ggg     ',
            '    bbb                                                 ',
            '                                                        ',
            'gggwwwwwggggggg                                     gggg'
        ]
    ];
    addSegment(segments[floor(random(segments.length))]);
    addSegment([
        '              ',
        '              ',
        '              ',
        '              ',
        '              ',
        '     aaaa     ',
        '              ',
        '              ',
        '              ',
        'gggggggggggggg'
    ]);
    addSegment(segments[floor(random(segments.length))]);

    new Tiles(
        tiles,
        8,
        8,
        16,
        16
    );

    player = new Sprite(48, 100, 12, 12);
    player.layer = 1;
    player.anis.w = 16;
    player.anis.h = 16;
    player.anis.offset.y = 1;
    player.anis.frameDelay = 8;
    player.spriteSheet = charactersImg;
    player.addAnis({
        idle: {
            row: 0,
            frames: 4
        },
        knockback: {
            row: 0,
            frames: 1
        },
        run: {
            row: 1,
            frames: 3
        },
        jump: {
            row: 1,
            col: 3,
            frames: 2
        }
    });
    player.ani = 'idle';
    player.rotationLock = true;

    // IMPORTANT! prevents the player from sticking to the sides of walls
    player.friction = 0;

    player.overlaps(coins, collectCoin);

    // This groundSensor sprite is used to check if the player
    // is close enough to the ground to jump. But why not use
    // `player.colliding(grass)`? Because then the player could
    // jump if they were touching the side of a wall!
    // Also the player's collider bounces a bit when it hits
    // the ground, even if its bounciness is set to 0. When
    // making a platformer, you want the player to be able to
    // jump even right after they landed a jump.
    // This approach was inspired by this tutorial:
    // https://www.iforce2d.net/b2dtut/jumpability
    groundSensor = new Sprite(48, 106, 6, 16, 'none');
    groundSensor.visible = false;
    groundSensor.overlaps(grass);
    groundSensor.overlaps(brick);

    textAlign(CENTER, CENTER);
}

function collectCoin(player, coin) {
    coin.remove();
    score++;
}

function createQuestion(type) {
    if (type == 'add') {
        num1 = floor(random(1, 10));
        num2 = floor(random(1, 10));
        ans = num1 + num2;
    } else if (type == 'sub') {
        num1 = floor(random(1, 10));
        num2 = floor(random(1, 10));
        ans = num1 - num2;
    } else if (type == 'mult') {
        num1 = floor(random(1, 10));
        num2 = floor(random(1, 10));
        ans = num1 * num2;
    } else if (type == 'div') {
        num1 = floor(random(1, 10));
        num2 = floor(random(1, 10));
        ans = num1 / num2;
    }
	//fill posAns array with 4 random numbers that are not the answer but are close
	posAns = [];
	for (let i = 0; i < 4; i++) {
		let num = floor(random(ans - 5, ans + 5));
		while (num == ans) {
			num = floor(random(ans - 5, ans + 5));
		}
		posAns.push(num);
	}
	//replace a random slot with ans
	let ran = floor(random(0, 4));
	posAns[ran] = ans;
	ans = ran;
}

function addSegment(segment) {
    for (let i = 0; i < tiles.length; i++) {
        tiles[i] += segment[i];
    }
}

function mousePressed() {
	let one = 0;
    for (let i = 0; i < tiles.length; i++) {
        let set = tiles[i].split("");
        for (let j = 0; j < set.length; j++) {
            let tile = set[j];
            let x = j * 16 - player.x + 48;
            let y = i * 16;
            if (mouseX > x && mouseX < x + 16 && mouseY > y && mouseY < y + 16) {
                if (tile === 'a') {
                    if (set[j - 1] === 'a') {
                        if (set[j - 2] === 'a') {
                            if (set[j - 3] === 'a') {
                                one = 4;
                            } else {
                                one = 3;
                            }
                        } else {
                            one = 2;
                        }
                    } else {
                        one = 1;
                    }
                    if (ans+1 == one) {
						set[j] = ' ';
						if (one == 4) {
							set[j - 1] = ' ';
							set[j - 2] = ' ';
							set[j - 3] = ' ';
						} else if (one == 3) {
							set[j - 1] = ' ';
							set[j - 2] = ' ';
							set[j + 1] = ' ';
						} else if (one == 2) {
							set[j - 1] = ' ';
							set[j + 1] = ' ';
							set[j + 2] = ' ';
						} else if (one == 1) {
							set[j + 1] = ' ';
							set[j + 2] = ' ';
							set[j + 3] = ' ';
						}
						tiles[i] = set.join("");
                        canMove = true;
						score += 10;
                    } else {
                        score -= 10;
                    }
                }
            }
        }
    }
}

function drawAnswerTiles() {
    for (let i = 0; i < tiles.length; i++) {
        let set = tiles[i].split("");
        for (let j = 0; j < set.length; j++) {
            let tile = set[j];
            let x = j * 16 - player.x + 48;
            let y = i * 16;

            if (tile === 'a') {
                image(answerImg, x, y);
            }
        }
    }
}


function draw() {
    background('skyblue');
    fill(255);

    drawAnswerTiles();

    stroke(0);
    strokeWeight(3);
    textSize(25);

    if (!canMove) {
        //display question
        text("What is " + num1 + ' + ' + num2, 110, 43);
        //display answer choices on blocks
        textSize(10);
        noStroke();
        fill(0);
        text(posAns[0], 87.4, 87.37);
        text(posAns[1], 87.4 + 16, 87.37);
        text(posAns[2], 87.4 + 32, 87.37);
        text(posAns[3], 87.4 + 48, 87.37);
    }

    // have the ground sensor follow the player, but offset it
    // so that it's at the player's feet
    groundSensor.moveTowards(player.x, player.y + 6, 1);

    // make the player slower in water
    if (groundSensor.overlapping(water)) {
        player.drag = 20;
        player.friction = 10;
    } else {
        player.drag = 0;
        player.friction = 0;
    }

    if (groundSensor.overlapping(grass) ||
        groundSensor.overlapping(water) || groundSensor.overlapping(brick)) {
        if (kb.presses('up') || kb.presses('space')) {
            player.ani = 'jump';
            player.vel.y = -4.5;
        }
    }

    // Check if the player has reached the segment with answer blocks
    if (tiles[5].indexOf('a') == floor(player.x / 16) + 2 && canMove) {
        canMove = false; // Set canMove to false to stop the player
        createQuestion('add');
    }

    if (canMove) {
        if (kb.pressing('left')) {
            player.ani = 'run';
            player.vel.x = -1.5;
            player.mirror.x = true;
        } else if (kb.pressing('right')) {
            player.ani = 'run';
            player.vel.x = 1.5;
            player.mirror.x = false;
        } else {
            player.ani = 'idle';
            player.vel.x = 0;
        }
    } else {
        player.ani = 'idle';
        player.vel.x = 0;
    }

    // if player falls, reset them
    if (player.y > 400) {
        player.speed = 0;
        player.x = 48;
        player.y = 100;
    }

    camera.x = player.x + 52;
}