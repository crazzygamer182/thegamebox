let num = 1;
let phrase = " ";
let  phrases = [
  " ",
  "You always make me feel loved",
  "You're honest with me",
  "You call me spiderman",
  "You always care about me, if I'm okay, upset, etc.",
  "Because you let me be your baby",
  "Because you're my little baby",
  "You always reassure me about things even when you don't wanna talk about it",
  "You're sooo cute and small",
  "You listen to me when I talk about random stuff",
  "You send me cats and say it’s us                                      (it is us)",
  "You deal with me being busy and you're okay with it",
  "You tell me when you're upset",
  "You don't give up on the relationship when you get upset",
  "When you get upset you’re patient with me",
  "You play Minecraft with me even though you didn’t want to",
  "You use your nails on me",
  "You try Indian food even though it’s spicy for you",
  "You give me so many kisses",
  "You don't get mad when I fall asleep while talking",
  "You say ew and stuff about other guys",
  "You're the best girlfriend ever",
];

function setup() {
  createCanvas(800, 500);
  prepare();
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  if (month() == 7) {
    num = day() - 17;
  } else {
    num = day() + 14;
  }
  phrase = phrases[num];
  textFont(fontt);
  background(random(155)+100, random(155)+100, random(155)+100);
  textSize(wh/15);
  text("Why I love you", wh/2, ht*(1/4));
  textSize(wh/20);
  text("Reason #" + num + ":", wh/2, ht*(2/5));
  textSize(wh/25);
  text(phrase, 0, ht*(3/5), wh);
  if (day() == 25) {
    imageMode(CENTER);
    image(pet, ht*(4.35/5), wh/2, pet.width/(wh/300), pet.height/(wh/300))
  }
}

function preload() {
  pet = loadImage("pet.png");
  fontt = loadFont("Comfortaa-Regular.ttf");
}

function prepare() {
  if (800 * (windowHeight / 500) < windowWidth) {
    wh = 800 * (windowHeight / 500);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 500 * (windowWidth / 800);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
}

function centerCanvas() {
  this.cx = (windowWidth - width) / 2;
  this.cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}