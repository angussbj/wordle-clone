export class PlayAgainButton {
  constructor(reset) {
    const gamespace = document.getElementById("gamespace")
    this.button = document.createElement("button")
    this.button.innerHTML = "Play again"
    this.button.classList.add("button")
    gamespace.appendChild(this.button)
    this.button.onclick = reset
    this.button.style.visibility = "hidden"
  }

  show() {
    this.button.style.visibility = "visible"
  }

  hide() {
    this.button.style.visibility = "hidden"
  }
}