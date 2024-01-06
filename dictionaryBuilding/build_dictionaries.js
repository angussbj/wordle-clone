var fs = require('fs');
const tenK = getFiveLetterWordsFrom('tenK.txt')
const fiveHundredK = getFiveLetterWordsFrom('fiveHundredK.txt')
const scrabble = getFiveLetterWordsFrom('scrabble.txt')
const names = getFiveLetterWordsFrom("names.txt")
const commonPlurals = getFiveLetterWordsFrom("commonPlurals.txt")
const bad = getFiveLetterWordsFrom("bad.txt")
const manualExclusions = getFiveLetterWordsFrom("manualExclusions.txt")
const manualAdditionsHard = getFiveLetterWordsFrom("manualAdditionsHard.txt")

class SetWrapper {
  constructor(set) {
    this.set = set
  }

  union(other) {
    let _union = new Set(this.set)
    for (let elem of other) {
      _union.add(elem)
    }
    return new SetWrapper(_union)
  }

  intersection(other) {
    let _intersection = new Set()
    for (let elem of other) {
      if (this.set.has(elem)) {
        _intersection.add(elem)
      }
    }
    return new SetWrapper(_intersection)
  }

  minus(other) {
    let _diff = new Set(this.set)
    for (let elem of other) {
      _diff.delete(elem)
    }
    return new SetWrapper(_diff)
  }
}

function getFiveLetterWordsFrom(fileName) {
  return new Set(
    fs.readFileSync(fileName)
      .toString()
      .split(/\n|\r|\r\n/)
      .map(s => s.trim().replace(",", "").toUpperCase())
      .filter((w) => w.length === 5)
  );
}

const small = Array.from(
  new SetWrapper(tenK)
    .intersection(scrabble)
    .minus(names)
    .minus(commonPlurals)
    .union(manualAdditionsHard)
    .minus(manualExclusions)
    .minus(bad)
    .set
)
const big = Array.from(
  new SetWrapper(fiveHundredK)
    .union(tenK)
    .union(scrabble)
    .set
)

console.log(`export const big_dictionary = new Set(${JSON.stringify(big)})`)
console.log(`export const small_dictionary = ${JSON.stringify(small)}`)

// Write to a file
// fs.writeFile("temp.txt", big.join('\n'), () => {})
