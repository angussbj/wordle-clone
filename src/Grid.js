export class Grid {
  constructor(maxAttempts, wordLength) {
    this.wordLength = wordLength
    this.squares = new Map()

    const grid = document.getElementById("grid")
    for (let wordIndex = 0; wordIndex < maxAttempts; wordIndex++) {
      let row = document.createElement("div")
      row.classList.add("row")
      grid.appendChild(row)
      for (let charIndex = 0; charIndex < wordLength; charIndex++) {
        const square = document.createElement("div")
        square.classList.add("square")
        row.appendChild(square)
        this.squares.set(Grid.toSquareKey({wordIndex, charIndex}), square)
      }
    }
  }

  getWord(wordIndex) {
    let word = ""
    for (let charIndex = 0; charIndex < this.wordLength; charIndex++) {
      word += this.squares.get(Grid.toSquareKey({ wordIndex, charIndex })).innerHTML
    }
    return word
  }

  set(coords, value) {
    this.squares.get(Grid.toSquareKey(coords)).innerHTML = value
  }

  reset() {
    this.squares.forEach(square => {
      square.innerHTML = ""
      square.className = "square"
    })
  }

  markSquareCorrect(coords) {
    this.squares.get(Grid.toSquareKey(coords)).classList.add("correct")
  }

  markSquarePartiallyCorrect(coords) {
    this.squares.get(Grid.toSquareKey(coords)).classList.add("partially-correct")
  }

  markSquareIncorrect(coords) {
    this.squares.get(Grid.toSquareKey(coords)).classList.add("incorrect")
  }

  static toSquareKey({wordIndex, charIndex}) {
    return `${wordIndex},${charIndex}`
  }
}