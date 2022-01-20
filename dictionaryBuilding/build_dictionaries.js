var fs = require('fs');
const tenK = getFiveLetterWordsFrom('tenK.txt')
const fiveHundredK = getFiveLetterWordsFrom('fiveHundredK.txt')
const scrabble = getFiveLetterWordsFrom('scrabble.txt')
const names = getFiveLetterWordsFrom("names.txt")
// console.log(JSON.stringify(Array.from(names)))

function getFiveLetterWordsFrom(fileName) {
  return new Set(
    fs.readFileSync(fileName)
      .toString()
      .split("\n")
      .map(s => s.trim().replace(",", "").toUpperCase())
      .filter((w) => w.length === 5)
  );
}

function union(setA, setB) {
    let _union = new Set(setA)
    for (let elem of setB) {
        _union.add(elem)
    }
    return _union
}

function intersection(setA, setB) {
    let _intersection = new Set()
    for (let elem of setB) {
        if (setA.has(elem)) {
            _intersection.add(elem)
        }
    }
    return _intersection
}

function setMinus(setA, setB) {
  let _union = new Set(setA)
  for (let elem of setB) {
    _union.delete(elem)
  }
  return _union
}


const small = Array.from(setMinus(intersection(intersection(fiveHundredK, tenK), scrabble), names))
const big = Array.from(union(fiveHundredK, union(tenK, scrabble)))

console.log(`export const big_dictionary = new Set(${JSON.stringify(big)})`)
console.log(`export const small_dictionary = ${JSON.stringify(small)}`)