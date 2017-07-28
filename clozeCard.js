//=========================   DEPENDENCIES   =========================
var inquirer = require("inquirer");



//=========================   CONSTRUCTOR   =========================
function clozeCard(text, cloze) {
  this.text = text;
  this.cloze = cloze;
  this.present = this.text.replace(cloze, "___________________");

}


module.exports = clozeCard;









//=========================   END   =========================
