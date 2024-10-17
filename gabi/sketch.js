let screen = 0; // Start from the initial screen
let heartback;
let Photo2;
let Photo3;
let Photo4;
let Photo5;
let Photo6;
let Photo7;
let Photo8;
let Photo9;
let Photo10;
let Photo11;
let Photo12;
let Photo13;
let galleryImages = [];
let galleryDescriptions = []; // <-- Added array to store descriptions
let scrollValue = 0;
let shownImage = -1;

// Button Definitions
let galleryButton = {
  x: 100,
  y: 300,
  width: 80, // Smaller width
  height: 40, // Smaller height
  label: "Gallery",
};

let datesButton = {
  x: 300,
  y: 300,
  width: 130, // Smaller width
  height: 40, // Smaller height
  label: "Important Dates",
};

let envelopeButton = {
  x: 200,
  y: 200,
  width: 60, // Smaller width
  height: 50, // Smaller height
};

// Back Button Definition
let backButton = {
  x: 50, // Top-left corner (with some padding)
  y: 30,
  width: 80,
  height: 40,
  label: "Back",
};

// Transition Variables
let transitioning = false;
let transitionAlpha = 0;
let transitionSpeed = 13; // Adjust for faster/slower transitions
let nextScreen = 0;
let fadeIn = false;
let fadeOut = false;

function preload() {
  // Ensure the image path is correct. Place 'heartbackground.webp' in the same directory or update the path.
  heartback = loadImage("heartbackground.webp");

  for (let i = 2; i < 14; i++) {
    galleryImages.push(loadImage("Photo" + i + ".jpg"));

    // <-- Added custom descriptions for each image
    switch (i) {
      case 2:
        galleryDescriptions.push(
          " When you went and got your nails done and i got a hiar cut and got you flowers."
        );
        break;
      case 3:
        galleryDescriptions.push(
          "When you went and got your nails done and i got a hiar cut and got you flowers."
        );
        break;
      case 4:
        galleryDescriptions.push(
          "when we went to deer lake and sat at that bench by that other couple that wouldn't stop staring at us."
        );
        break;
      case 5:
        galleryDescriptions.push(
          "when we where hanging out with your sister at tims and then went on a walk and sat at a bench near the school."
        );
        break;
      case 6:
        galleryDescriptions.push(
          "first time we madeout when we went to confedration and sat at the hill on top of the parking lot. "
        );
        break;
      case 7:
        galleryDescriptions.push(
          "we did the heart trend with our hands at deer lake and then took a picture."
        );
        break;
      case 8:
        galleryDescriptions.push(
          "we did the heart trend with our hands at deer lake "
        );
        break;
      case 9:
        galleryDescriptions.push(
          "we had that random couple take a picture of us and the guy said do you want the bofriend pictures or the girlfriend pictures."
        );
        break;
      case 10:
        galleryDescriptions.push(
          "we had that random couple take a picture of us and the guy said do you want the bofriend pictures or the girlfriend pictures."
        );
        break;
      case 11:
        galleryDescriptions.push(
          "when we went to leahs house and watched white chicks "
        );
        break;
      case 12:
        galleryDescriptions.push(
          "when we went to deer lake and sat at that bench by that other couple that wouldn't stop staring at us."
        );
        break;
      case 13:
        galleryDescriptions.push(
          "when we went to the mall and got our photos taken at the photo booth you where buying a gift for leah and we met up with Misha and Bonita "
        );
        break;
      default:
        galleryDescriptions.push("No description available.");
    }
  }
}

function setup() {
  if (400 * (windowHeight / 400) < windowWidth) {
    wh = 400 * (windowHeight / 400);
    ht = windowHeight;
  } else {
    wh = windowWidth;
    ht = 400 * (windowWidth / 400);
  }
  cnv = createCanvas(wh, ht);
  centerCanvas();
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  noCursor(); // Hide the default cursor
  strokeWeight(2);
}

function centerCanvas() {
  this.cx = (windowWidth - width) / 2;
  this.cy = (windowHeight - height) / 2;
  cnv.position(cx, cy);
}

function draw() {
  background(255); // Clear the background
  push();
  scale(width / 400, height / 400);

  // Draw the heart background if loaded
  if (heartback) {
    image(heartback, 0, 0, 200, 200);
    image(heartback, 200, 0, 200, 200);
    image(heartback, 0, 200, 200, 200);
    image(heartback, 200, 200, 200, 200);
  }

  // Draw elements based on the current screen
  if (screen === 0) {
    displayInitialScreen();
  } else if (screen === 1) {
    displayMainMenu();
  } else if (screen === 2) {
    displayGallery();
  } else if (screen === 3) {
    displayImportantDates();
  } else if (screen === 4) {
    displayEnvelopeScreen();
  }

  // Handle Transition Overlay
  if (transitioning) {
    fill(0, transitionAlpha);
    rect(400 / 2, 400 / 2, width, height); // Overlay with black

    if (fadeOut) {
      transitionAlpha += transitionSpeed;
      if (transitionAlpha >= 255) {
        transitionAlpha = 255;
        screen = nextScreen;
        fadeOut = false;
        fadeIn = true;
      }
    } else if (fadeIn) {
      transitionAlpha -= transitionSpeed;
      if (transitionAlpha <= 0) {
        transitionAlpha = 0;
        transitioning = false;
        fadeIn = false;
      }
    }
  }
  pop();
  // Draw the heart cursor on top with black stroke
  if (screen >= 0) {
    push();
    translate(mouseX, mouseY);
    // Draw black stroke
    fill(255, 0, 0);
    stroke(0); // Black stroke
    strokeWeight(2);
    heart(0, 0, 18);
    pop();
  }
}

// Function to display the initial screen
function displayInitialScreen() {
  fill(255, 255, 255);
  stroke(0);
  textSize(30);
  text("Happy one month GABI ", 400 / 2, 150);

  // Button to proceed to main menu
  drawButton(400 / 2, 400 / 2 + 40, 120, 50, "Click Here");
}

// Function to display the main menu with three buttons
function displayMainMenu() {
  // Gallery Button
  strokeWeight(3);
  stroke(0);
  fill(255, 255, 255);
  textSize(60);
  text("Main menu", 200, 100);
  noStroke();
  drawButton(
    galleryButton.x,
    galleryButton.y,
    galleryButton.width,
    galleryButton.height,
    galleryButton.label
  );

  // Important Dates Button
  drawButton(
    datesButton.x,
    datesButton.y,
    datesButton.width,
    datesButton.height,
    datesButton.label
  );

  // Envelope Button (Custom Design)
  drawEnvelopeButton(
    envelopeButton.x,
    envelopeButton.y,
    envelopeButton.width,
    envelopeButton.height
  );
}

// Function to display the Gallery screen
function displayGallery() {
  fill(255, 255, 255);
  textSize(30);
  stroke(0);
  text("Gallery Screen", 200, 100 - scrollValue);
  noStroke();
  // Draw Back Button
  drawButton(
    backButton.x,
    backButton.y - scrollValue,
    backButton.width,
    backButton.height,
    backButton.label
  );
  imageNum = 0;
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 2; j++) {
      rectMode(CORNER);
      stroke(100, 0, 0);
      strokeWeight(8);
      rect(
        150 * j + 60,
        200 * i + 140 - scrollValue,
        galleryImages[imageNum].width / 3,
        galleryImages[imageNum].height / 3,
        2,
        2
      );
      rectMode(CENTER);
      image(
        galleryImages[imageNum],
        150 * j + 60,
        200 * i + 140 - scrollValue,
        galleryImages[imageNum].width / 3,
        galleryImages[imageNum].height / 3
      );
      imageNum++;
    }
  }

  if (shownImage != -1) {
    rectMode(CORNER);
    stroke(100, 0, 0);
    strokeWeight(8);
    rect(
      100,
      80,
      galleryImages[shownImage].width / 2,
      galleryImages[shownImage].height / 2,
      2,
      2
    );
    rectMode(CENTER);
    image(
      galleryImages[shownImage],
      100,
      80,
      galleryImages[shownImage].width / 2,
      galleryImages[shownImage].height / 2
    );

    // <-- Added Description Box
    fill(255, 255, 255, 220); // Semi-transparent background
    stroke(0);
    rect(200, -150 + galleryImages[shownImage].height / 4 + 60, 220, 80, 10); // Adjust position and size as needed

    fill(233, 0, 0);
    noStroke();
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text(
      galleryDescriptions[shownImage], // Display corresponding description
      200, // x position
      35+ galleryImages[shownImage].height / 100, // y position
      200, // max width
      60 // max height
    );
  }
}

function mouseWheel(event) {
  scrollValue += event.delta;
  if (scrollValue < 0) {
    scrollValue = 0;
  }
  if (scrollValue > 960) {
    scrollValue = 960;
  }
}

// Function to display the Important Dates screen
function displayImportantDates() {
  fill(0, 0, 0);
  textSize(30);
  stroke(0);
  fill(255, 255, 255);
  rect(200, 200, 300, 275, 5, 5);
  fill(0, 0, 0);
  text("Important Dates!", 200, 100);
  fill(255, 0, 0);
  noStroke();
  textSize(10);
  text(
    "There have been many important moments. that we have shared \ntogether, Gabi and I will treasure and remember every single one \n   of them because I love you                                                                ",
    200,
    140
  );
  fill(0);
  textSize();
  text(
    " \n \n \n \n\n •September 3: I first realized I loved you.        \n             •September 14: when I asked you to be my girlfriend.\n•September 18: when we had our first kiss.   \n                               •September 27: first time we said I love you(you did it over text). \n         •September 28: First time we said I love in person.\n •October 6:You gave me a hair tie.                 \n •October 14: one month In.                             ",
    165,
    175
  );
  fill(255, 255, 255);

  // Draw Back Button
  drawButton(
    backButton.x,
    backButton.y,
    backButton.width,
    backButton.height,
    backButton.label
  );
}

// Function to display the Envelope screen
function displayEnvelopeScreen() {
 stroke(255,0,0)
  rect(200,225,320,320,5)
  fill(250,250,220);
  textSize(24);
  noStroke()
  strokeWeight(2)
  rect(200,225,300,300,5,5)
 fill(255,255,255)
  stroke(170,0,0)
  text("Envelope Screen",  200, 100);
  fill(200,0,0)
  noStroke(0)
  textSize(12)
  text("Gabi, I just want you to know how much I appreciate you and the joy you bring into my life. Your smile brightens my day, and your presence lifts my spirits no matter what. You've helped me see the best in myself, making me feel valued and supported in a way that's so special. You're not only beautiful on the outside, but your kindness and strength make you even more amazing. I'm incredibly lucky to have you in my life this last month has been the best month of my life, and I cherish every moment we share. \n from Abdel" ,200,200,290,)
heart(280,280,90) 
  fill(255)
 textSize(40)
  text("A+G",280,315,200,)
  // Draw Back Button
  drawButton(
    backButton.x,
    backButton.y,
    backButton.width,
    backButton.height,
    backButton.label
  );
}

// Detect mouse clicks to change the screen
function mousePressed() {
  if (!transitioning) {
    if (shownImage != -1 && screen == 2) {
      shownImage = -1;
      return;
    }
    imageNum = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 2; j++) {
        if (
          mouseX / (width / 400) > 150 * j + 60 &&
          mouseX / (width / 400) <
            150 * j + 60 + galleryImages[imageNum].width / 3 &&
          mouseY / (width / 400) > 200 * i + 140 - scrollValue &&
          mouseY / (width / 400) <
            200 * i + 140 - scrollValue + galleryImages[imageNum].height / 3 &&
          screen == 2
        ) {
          shownImage = imageNum;
        }
        imageNum++;
      }
    }
    if (screen === 0) {
      // Check if "Click Here" button is pressed
      if (
        mouseX / (width / 400) > 400 / 2 - 60 &&
        mouseX / (width / 400) < 400 / 2 + 60 &&
        mouseY / (width / 400) > 400 / 2 + 40 - 25 &&
        mouseY / (width / 400) < 400 / 2 + 40 + 25
      ) {
        initiateTransition(1);
      }
    } else if (screen === 1) {
      // Check Gallery Button
      if (
        mouseX / (width / 400) > galleryButton.x - galleryButton.width / 2 &&
        mouseX / (width / 400) < galleryButton.x + galleryButton.width / 2 &&
        mouseY / (width / 400) > galleryButton.y - galleryButton.height / 2 &&
        mouseY / (width / 400) < galleryButton.y + galleryButton.height / 2
      ) {
        initiateTransition(2);
      }

      // Check Important Dates Button
      if (
        mouseX / (width / 400) > datesButton.x - datesButton.width / 2 &&
        mouseX / (width / 400) < datesButton.x + datesButton.width / 2 &&
        mouseY / (width / 400) > datesButton.y - datesButton.height / 2 &&
        mouseY / (width / 400) < datesButton.y + datesButton.height / 2
      ) {
        initiateTransition(3);
      }

      // Check Envelope Button
      if (
        mouseX / (width / 400) > envelopeButton.x - envelopeButton.width / 2 &&
        mouseX / (width / 400) < envelopeButton.x + envelopeButton.width / 2 &&
        mouseY / (width / 400) > envelopeButton.y - envelopeButton.height / 2 &&
        mouseY / (width / 400) < envelopeButton.y + envelopeButton.height / 2
      ) {
        initiateTransition(4);
      }
    } else {
      // For screens 2, 3, 4, check if Back Button is pressed
      if (
        mouseX / (width / 400) > backButton.x - backButton.width / 2 &&
        mouseX / (width / 400) < backButton.x + backButton.width / 2 &&
        mouseY / (width / 400) > backButton.y - backButton.height / 2 &&
        mouseY / (width / 400) < backButton.y + backButton.height / 2
      ) {
        initiateTransition(1);
      }
    }
  }
}

// Function to initiate screen transition
function initiateTransition(targetScreen) {
  transitioning = true;
  fadeOut = true;
  nextScreen = targetScreen;
}

// Function to draw a standard rectangular button
function drawButton(x, y, w, h, label) {
  fill(255, 0, 0);
  stroke(0); // Black stroke
  rect(x, y, w, h, 10);

  fill(255);
  noStroke();
  textSize(14);
  text(label, x, y);
}

// Function to draw an envelope-shaped button
function drawEnvelopeButton(x, y, w, h) {
  push();
  translate(x, y);

  heart(0, height / 10000, 10);

  // Draw envelope base
  fill(255, 255, 255);
  stroke(0); // Black stroke
  rect(0, 0, w, h, 5);

  // Draw envelope flap
  fill(255, 255, 255);
  stroke(0); // Black stroke
  triangle(-w / 2, 0 - 23, 0, h / 2 - 23, w / 2, 0 - 23);
  fill(255, 0, 0);
  heart(0, height / 1000000000000000000000000000, 10);
  pop();
}

// Function to draw a heart shape
function heart(x, y, size) {
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
}
