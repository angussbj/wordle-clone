export class Status {
  constructor() {
    this.status = document.getElementById("status")
    this.statusEnum = undefined
  }

  reset() {
    this.status.innerHTML = "Type your guess and press enter"
    this.status.style.color = "#d7dadc"
    this.statusEnum = "PLAYING"
  }

  setLost(target) {
    this.status.innerHTML = `You lose! The word was ${target}`
    this.status.style.color = "#cc5c5c"
    this.statusEnum = "LOST"
  }

  setWon() {
    this.status.innerHTML = "You win!"
    this.status.style.color = "#60cc5c"
    this.statusEnum = "WON"
  }

  isStillPlaying() {
    return this.statusEnum === "PLAYING"
  }
}