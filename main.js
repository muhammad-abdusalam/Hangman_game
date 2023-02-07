// Select Elements
// Picture Box
let pictureBox = document.querySelector(".picture-box");
// Letters Box
let lettersContainer = document.querySelector(".letters");
// Guessed Letters Container
let guessedContainer = document.querySelector(".guessed-letters");

// Generate Letters
const allLetters = "abcdefghijklmnopqrstuvwxyz";

let arrayOfLetters = Array.from(allLetters);

arrayOfLetters.forEach((letter) => {
  // Create letter Box
  let letterSpan = document.createElement("span");
  letterSpan.className = "letter-box";
  // Create Letter Text
  let letterTextNode = document.createTextNode(letter);
  // Add Letter Text To Letter Box
  letterSpan.appendChild(letterTextNode);
  // Add Letter Box To The Page
  lettersContainer.append(letterSpan);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: ["Muhammad", "Abo Bakr", "Omar", "Othman", "Ali"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Get Categories
const allCate = Object.keys(words);
// Generate Random number from 0 to 3(allCate.length - 1)
let randomNumber = Math.floor(Math.random() * allCate.length);
// Get Random Category Name
let randomKey = allCate[randomNumber];
// Get Random Category Value
let randomValue = words[randomKey];
// Get Random Word From Category Value
let randomWord = randomValue[Math.floor(Math.random() * randomValue.length)];

// console.log(randomNumber);
// console.log(randomKey);
// console.log(randomValue);
// console.log(randomWord);

// Set Categories Info
document.querySelector(".game-info .cate span").innerHTML = randomKey;

// Split The Choosen Word
let choosenArr = Array.from(randomWord.toLowerCase());
// console.log(choosenArr);

// Create Empty Box To Contain Guessed Letters Depend On word Length
choosenArr.forEach((letter) => {
  let emptySpan = document.createElement("span");

  if (letter === " ") {
    emptySpan.className = "has-space";
  }

  // Add Spans To The Page
  guessedContainer.appendChild(emptySpan);
});

// Set Attempt Letters
let attemptLetters = new Set(choosenArr);
// console.log(attemptLetters);
// Set Good && Wrong Attempts
let goodAttempt = 0;
let wrongAttempts = 0;

// #Events
// Clicking On Letters
document.addEventListener("click", (e) => {
  // Set Choose Status
  let chooseStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // Get Clicked letter
    let clickedLetter = e.target.innerHTML.toLowerCase();
    console.log(clickedLetter);
    // Loop On Choosen Word Letters
    choosenArr.forEach((wordLetter, letterIndex) => {
      if (clickedLetter === wordLetter) {
        // Change Status
        chooseStatus = true;
        console.log(`Founded At Index: ${letterIndex}`);
        // Select Empty Spans
        let listOfEmptySpans = Array.from(guessedContainer.children);
        // Loop On All Empty Spans
        listOfEmptySpans.forEach((span, spanIndex) => {
          if (spanIndex === letterIndex) {
            // Put Correct Letters At Correct Positions
            span.innerHTML = clickedLetter;
          }
        });
        console.log(listOfEmptySpans);
      }
    });
    // Out Of The Loop
    console.log(chooseStatus);

    if (chooseStatus === false) {
      // Increase Wrong Attempts
      wrongAttempts++;
      // Add Wrong Class To Picture Box
      pictureBox.classList.add(`wrong-${wrongAttempts}`);

      // Play Failure Sound
      document.querySelector(".failure").play();

      // End The Game After 8 Wrong Attempts
      if (wrongAttempts === 8) {
        endGame(false);

        lettersContainer.classList.add("finished");
      }
    } else {
      // Increase Good Attempts
      goodAttempt++;
      document.querySelector(".success").play();

      // End Game After Guessing The Word Correctly
      if (goodAttempt === attemptLetters.size) {
        endGame(true);

        lettersContainer.classList.add("finished");
      }
    }
  }
});

// #Functions
function endGame(state) {
  if (state === false) {
    // Create PopUp Div
    let popUp = document.createElement("div");
    popUp.className = "popup-fail";
    let popUpText = document.createTextNode(
      `Game Over, The Word Is: ${randomWord}`
    );

    popUp.append(popUpText);

    // Show PopUp On The Page
    document.body.append(popUp);
  } else {
    // Create PopUp Div
    let popUp = document.createElement("div");
    popUp.className = "popup-success";
    let popUpText = document.createTextNode("You Won !");

    popUp.append(popUpText);

    // Show PopUp On The Page
    document.body.append(popUp);
  }
}
