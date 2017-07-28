//=========================   DEPENDENCIES   =========================
var inquirer = require("inquirer");
var fs = require("fs");





//=========================   LINK TO FILES   =========================
var Card = require("./clozeCard.js");






//=========================   VARIABLES   =========================
var text = "";
var cloze = "";
var partial = "";

var cardArray = [];








//=========================   FUNCTIONS   =========================
function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What do you want to do?",
        choices: ["Make a New Flashcard", "Run Flashcards", "Exit Application"],
        name: "mainMenu"
      }
    ])
    .then(function(answers) {

      // Option 1 - Make a new flashcard
      if(answers.mainMenu == "Make a New Flashcard") {
        console.log("You chose 'Make a New Flashcard'");
        createCard();
      }

      // Option 2 - Run flashcards
      if(answers.mainMenu === "Run Flashcards") {
        console.log("You chose 'Run Flashcards'");
        readCardFile();
      }

      // Option 3 - Exit the application
      if(answers.mainMenu === "Exit Application") {
        console.log("You chose 'Exit Application'");
        process.exit();
      }
    });
}




function createCard() {
  // Capture users content for cards
  inquirer
  .prompt([
    {
      type: "input",
      message: "What is the complete text of the question?",
      name: "text"
    },
    {
      type: "input",
      message: "What is the text to remove?",
      name: "cloze"
    }
  ])
  .then(function(answer) {
    // Push content to global variables
    text = answer.text;
    console.log(answer.text);
    console.log("text: " + text);

    cloze = answer.cloze;
    console.log(answer.cloze);
    console.log("cloze: " + cloze);


    // Take user content and create card object
    var currentCard = new Card(answer.text, answer.cloze);
    partial = currentCard.present;
    console.log("partial:" + partial);
    console.log("present:" + currentCard.present);
    console.log("cloze:" + currentCard.cloze);

    // Push new card to cards text file
    fs.appendFile("cards.txt", JSON.stringify(currentCard) + "\n", function(err) {
      if (err) {
        console.log(err);
      }
    });

    cardOrMenu();
  });
}




function cardOrMenu() {
  // Present user with choice to create another card or go to main menu
  inquirer
  .prompt([
    {
      type: "list",
      message: "Do you want to make another card?",
      choices: ["Yes", "No"],
      name: "anotherCard"
    }
  ])
  .then(function(answer){
    if(answer.anotherCard === "Yes") {
      createCard();
    }else {
      mainMenu();
    }
  });
}




function readCardFile() {
  fs.readFile("cards.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }

    cardArray = data.toString().split("\n");

    for(i in cardArray) {
      console.log("this is an item: " + cardArray[i]);
    }

    for (var key in cardArray) {
      console.log("A " + key + " is " + cardArray[key] + ".");
    }
  });
}



//=========================   MAIN   =========================
mainMenu();








//=========================   END   =========================
