import { big_dictionary, small_dictionary } from "./dictionary.js"
import { randomInt } from "./utilities.js"
import { Keyboard } from "./Keyboard.js"
import { Grid } from "./Grid.js"
import { Status } from "./Status.js"
import { PlayAgainButton } from "./PlayAgainButton.js"

export class Wordle {
  constructor(maxAttempts, wordLength) {
    this.maxAttempts = maxAttempts
    this.wordLength = wordLength
    this.target = undefined
    this.cursor = undefined
    this.button = undefined
    this.keyboard = new Keyboard((key) => this.onKeyClick(key));
    this.grid = new Grid(maxAttempts, wordLength);
    this.status = new Status()
    this.playAgainButton = new PlayAgainButton(() => this.reset())
  }

  setup() {
    this.setupKeyPressListener()
    this.reset()
  }

  setupKeyPressListener() {
    const handleKeyPress = (event) => {
      if (this.status.isStillPlaying()) {
        if (event.key === "Enter") this.submitGuess()
        if (event.key === "Backspace") this.backspace()
        if (event.key.match(/^[a-zA-Z]$/) && !event.metaKey && !event.ctrlKey) {
          this.type(event.key)
        }
      } else {
        if (event.key === "Enter") this.reset()
      }
    }
    document.addEventListener("keydown", handleKeyPress)
  }

  onKeyClick(key) {
    if (this.status.isStillPlaying()) {
      if (key === "\u21A9") this.submitGuess()
      else if (key === "\u232B") this.backspace()
      else this.type(key)
    }
  }

  reset() {
    console.log("Hi")
    this.grid.reset()
    this.keyboard.reset()
    this.status.reset()
    this.chooseRandomTarget()
    this.playAgainButton.hide()
    this.cursor = { wordIndex: 0, charIndex: 0 }
  }

  chooseRandomTarget() {
    this.target = small_dictionary[randomInt(small_dictionary.length)]
  }

  submitGuess() {
    const word = this.grid.getWord(this.cursor.wordIndex);
    if (this.cursor.charIndex === this.wordLength && big_dictionary.has(word)) {
      this.check({ wordIndex: this.cursor.wordIndex, word })
      this.cursor.wordIndex += 1
      this.cursor.charIndex = 0
    }
  }

  // TODO: convert to pure function?
  check({ wordIndex, word }) {
    const targetLetters = this.target.split('')
    const guessLetters = word.split('')

    for (let charIndex = 0; charIndex < this.wordLength; charIndex++) {
      if (targetLetters[charIndex] === guessLetters[charIndex]) {
        this.grid.markSquareCorrect({ wordIndex, charIndex })
        this.keyboard.markKeyCorrect(targetLetters[charIndex])
        targetLetters[charIndex] = null
        guessLetters[charIndex] = null
      }
      if (targetLetters.filter(x => !!x).length === 0) this.recordWin()
    }

    for (let charIndex = 0; charIndex < this.wordLength; charIndex++) {
      const value = guessLetters[charIndex]
      if (value) {
        if (targetLetters.includes(value)) {
          this.grid.markSquarePartiallyCorrect({ wordIndex, charIndex })
          this.keyboard.markKeyPartiallyCorrectIfNotAlreadyCorrect(value)
          targetLetters[targetLetters.indexOf(value)] = null
          guessLetters[charIndex] = null
        } else {
          this.grid.markSquareIncorrect({ wordIndex, charIndex })
          this.keyboard.markKeyIncorrect(value)
        }
      }
    }
    if (this.status.isStillPlaying() && wordIndex === this.maxAttempts - 1) this.recordLoss()
  }

  recordLoss() {
    this.status.setLost(this.target)
    this.playAgainButton.show()
  }

  recordWin() {
    this.status.setWon()
    this.playAgainButton.show()
  }

  type(char) {
    if (this.cursor.charIndex < this.wordLength) {
      this.grid.set(this.cursor, char.toUpperCase())
      this.cursor.charIndex += 1
    }
  }

  backspace() {
    if (this.cursor.charIndex > 0) {
      this.cursor.charIndex -= 1
      this.grid.set(this.cursor, "")
    }
  }
}