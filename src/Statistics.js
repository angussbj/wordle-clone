export class Statistics {
  constructor(maxAttempts) {
    // In future, we should record the full details and keep them in local storage
    this.wins = 0
    this.losses = 0
    this.streak = 0
    this.maxStreak = 0
    this.graphValues = new Array(maxAttempts).fill(0)
    this.latestAttemptCount = null;

    this.playedView = document.getElementById("played")
    this.winRateView = document.getElementById("win-rate")
    this.streakView = document.getElementById("streak")
    this.maxStreakView = document.getElementById("max-streak")
    this.graphView = document.getElementById("graph")
    this.statsContainer = document.getElementById("stats")
    this.modalBackground = document.getElementById("modal-background")
    this.modalBackground.onclick = () => this.hide()
    document.getElementById("close-stats").onclick = () => this.hide()
    this.bars = []
    this.setupGraph(maxAttempts)
    this.render()
    this.hide()
  }

  setupGraph(maxAttempts) {
    for (let i = 0; i < maxAttempts; i++) {
      const row = document.createElement("div")
      row.classList.add("row")
      this.graphView.appendChild(row)

      const label = document.createElement("div")
      label.innerHTML = (i + 1).toString()
      label.style.fontSize = "14px"
      row.appendChild(label)

      const bar = document.createElement("div")
      bar.classList.add("bar")
      row.appendChild(bar)
      this.bars.push(bar)
    }
  }

  recordWin(attempts) {
    this.wins += 1
    this.streak += 1
    if (this.streak > this.maxStreak) this.maxStreak = this.streak
    this.graphValues[attempts - 1] += 1
    this.latestAttemptCount = attempts
    this.show()
    this.render()
  }

  recordLoss() {
    this.losses += 1
    this.streak = 0
    this.latestAttemptCount = null
    this.show()
    this.render()
  }

  render() {
    const totalGames = this.wins + this.losses
    this.playedView.innerHTML = totalGames.toString()
    this.winRateView.innerHTML = totalGames
      ? (100 * this.wins / totalGames).toFixed(0)
      : "-"
    this.streakView.innerHTML = this.streak
    this.maxStreakView.innerHTML = this.maxStreak
    this.renderGraph()
  }

  renderGraph() {
    const maxValue = Math.max(...this.graphValues)
    for (let i = 0; i < this.graphValues.length; i++) {
      const bar = this.bars[i]
      const value = this.graphValues[i]
      bar.style.width = maxValue
        ? (320 * value / maxValue).toFixed(0) + "px"
        : "0px"
      bar.innerHTML = value.toString()
      bar.style.backgroundColor = i + 1 === this.latestAttemptCount
        ? "#538d4e"
        : "#3a3a3b"
    }
  }

  hide() {
    this.statsContainer.style.visibility = "hidden"
    this.modalBackground.style.visibility = "hidden"
  }

  show() {
    this.statsContainer.style.visibility = "visible"
    this.modalBackground.style.visibility = "visible"
  }
}