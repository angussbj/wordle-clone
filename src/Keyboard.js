export class Keyboard {
  constructor(onKeyClick) {
    const keyboard = document.getElementById("keyboard")
    this.keys = new Map();

    ["QWERTYUIOP", "ASDFGHJKL", "\u21A9ZXCVBNM\u232B"].forEach((letters) => {
      let row = document.createElement("div")
      row.classList.add("row")
      keyboard.appendChild(row)
      letters.split('').forEach((letter) => {
        let key = document.createElement("button")
        key.className = "key untested"
        key.innerHTML = letter
        key.onclick = () => onKeyClick(letter)
        row.appendChild(key)
        this.keys.set(letter, key)
      })
    })
  }

  markKeyCorrect(letter) {
    this.keys.get(letter).className = "key correct"
  }

  markKeyPartiallyCorrectIfNotAlreadyCorrect(letter) {
    const key = this.keys.get(letter)
    if (!key.className.includes("key correct")) {
      key.className = "key partially-correct"
    }
  }

  markKeyIncorrect(letter) {
    this.keys.get(letter).className = "key incorrect"
  }

  reset() {
    this.keys.forEach(key => {
      key.className = "key untested"
    })
  }
}