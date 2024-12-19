let gameSeq = [];
let userSeq = [];
let started = false;
let level = 0;

const clickSound = new Audio("./audio/Click.mp3");
const errorSound = new Audio("./audio/error.mp3");
const levelUpSound = new Audio("./audio/LevelUp.mp3");

const MessageBar = document.querySelector("h2");
const allBtnClassNames = ["btn1", "btn2", "btn3", "btn4"];
const allBtns = document.querySelectorAll(".game-buttons");

// adding event listner to enter key to start the game
addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    if (!started) {
      console.log("Key Pressed");

      // starting game
      started = true;

      // setting level to 1
      levelUp();
    }
  }
});

// adding event listner to allbtns
allBtns.forEach((btn, idx) => {
  btn.addEventListener("click", function (e) {
    if (started) {
      clickSound.play();
      userSeq.push(allBtnClassNames[idx]);
      console.log(`userSeq ${userSeq}`);

      // flashing button on user's click
      userFlashBtn(this);

      // checking result
      checkSeq();
    }
  });
});

function levelUp() {
  levelUpSound.play();
  userSeq = [];
  level++;
  MessageBar.innerHTML = `Level ${level}`;
  let randomIndex = Math.floor(Math.random() * 4);
  let randomBtn = document.querySelector(`.${allBtnClassNames[randomIndex]}`);
  console.log(randomBtn);

  // game flashes random btn
  gameFlashBtn(randomBtn);

  // pushing data to game sequence.
  gameSeq.push(allBtnClassNames[randomIndex]);
  console.log(`gameSeq ${gameSeq}`);
}

function gameFlashBtn(btn) {
  btn.classList.add("gameFlash");
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 300);
}

function userFlashBtn(btn) {
  console.log(btn);

  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 300);
}

// checking both sequence

function checkSeq() {
  if (userSeq[userSeq.length - 1] == gameSeq[userSeq.length - 1]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    errorSound.play().then(() => {
      document.body.classList.add("errorBody");
    });
    setTimeout(() => {
      document.body.classList.remove("errorBody");
    }, 500);
    setTimeout(restartGame, 1000);
  }
}

function restartGame() {
  MessageBar.innerHTML = "Game Over!, Press Enter To Restart.";
  started = false;
  level = 0;
  gameSeq = [];
  userSeq = [];
}
