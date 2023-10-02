// Variables

// dom elements
const wordDomContainer = document.getElementById("wordDomContainer");
const generate = document.getElementById("generate");
let check = document.getElementById("check");
const result = document.getElementById("result");

check.style.display = "none";
let chosenWord;

// game sounds
const winSound = new Audio("assets/sounds/win.mp3");
const loseSound = new Audio("assets/sounds/lose.mp3");

// Event listeners
generate.addEventListener("click", PickRandomWord);
check.addEventListener("click", checkIfCorrect);

// function to remove letters of the chosen word from the dom, before sorting a new word
function removeAllChildren(element) {
  for (let i = element.children.length - 1; i >= 0; i--) {
    element.removeChild(element.children[i]);
  }
}

// function to remove letters from a word
function removeLetters() {
  let splitWord = chosenWord.split("");

  let validIndices = chosenWord.split("");
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * splitWord.length - 1);
    splitWord[randomIndex] = "_";
    validIndices.splice(randomIndex, 1);
  }

  splitWord.forEach((letter) => {
    let td = document.createElement("td");
    td.textContent = letter;

    if (letter === "_") {
      td.setAttribute("contentEditable", true);
      td.addEventListener("click", () => (td.textContent = " "));
      
    }
    wordDomContainer.appendChild(td);
    td.addEventListener("input", () => {
      td.textContent = td.textContent.charAt(0);
      td.addEventListener('onkeyup', toLowerCase(td));
    });
  });
}


//filter every non-letter character and turn the remaining into lowerCase
function toLowerCase(td) {
  let text = td.textContent;

let newText = text.replace(/[^a-z]/gi, '');
  console.log(newText);


  let lowerCaseText = newText.toLowerCase();
  console.log('lowerCaseText', lowerCaseText);

  td.textContent = lowerCaseText;
  console.log('text', text);


}

// main function,  for picking a random word from the array, for the user to guess
function PickRandomWord() {
  if (check.style.display === "none") {
    check.style.display = "inline-block";
  }
  removeAllChildren(wordDomContainer);
  result.textContent = "";
  const wordsList = [
    "adventure",
    "beautiful",
    "chocolate",
    "dangerous",
    "elephant",
    "fascinate",
    "gorgeous",
    "happiness",
    "incredible",
    "juxtapose",
    "knowledge",
    "laboratory",
    "mysterious",
    "necessary",
    "opportunity",
    "pencil",
    "question",
    "radiant",
    "suspicion",
    "unbelievable",
  ];

  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  removeLetters();
  return chosenWord;
}

// function to check if entered word is correct
function checkIfCorrect() {
  let enteredWord = "";

  const tdElements = wordDomContainer.getElementsByTagName("td");

  for (let i = 0; i < tdElements.length; i++) {
    enteredWord += tdElements[i].textContent.trim();
  }

  if (enteredWord == chosenWord) {
    winSound.play();
    result.textContent = "you won!";
  } else if (enteredWord !== chosenWord) {
    loseSound.play();
    result.textContent = "you lose, retry!";
  }
}
