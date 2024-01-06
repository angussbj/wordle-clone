var fs = require('fs');
const tenK = getWordsFrom('tenK.txt')
const twentyK = getWordsFrom('twentyK.txt')
const fiveHundredK = getWordsFrom('fiveHundredK.txt')
const scrabble = getWordsFrom('scrabble.txt')
const names = getWordsFrom("names.txt")
const commonPlurals = getWordsFrom("commonPlurals.txt")
const bad = getWordsFrom("bad.txt")
const manualExclusions = getWordsFrom("manualExclusions.txt")

function getWordsFrom(fileName) {
  return new Set(
    fs.readFileSync(fileName)
      .toString()
      .split(/\n|\r|\r\n/)
      .map(s => s.trim().replace(",", "").toUpperCase())
  );
}

const words = intersection(scrabble, tenK)
const sorted = Array.from(words).sort()
const wordsByPrefix = {}
const wordsByPostfix = {}

sorted.forEach((pre, i) => {
  let j = i + 1
  while (j < sorted.length && sorted[j].startsWith(pre)) {
    post = sorted[j].slice(pre.length)
    if (words.has(post)) {
      if (wordsByPrefix[pre] !== undefined) {
        wordsByPrefix[pre].push(sorted[j])
      } else {
        wordsByPrefix[pre] = [sorted[j]]
      }

      if (wordsByPostfix[post] !== undefined) {
        wordsByPostfix[post].push(sorted[j])
      } else {
        wordsByPostfix[post] = [sorted[j]]
      }
    }
    j += 1
  }
})

console.log(wordsByPrefix)
console.log(wordsByPostfix)

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


// const small = Array.from(setMinus(setMinus(setMinus(setMinus(intersection(intersection(fiveHundredK, tenK), scrabble), names), commonPlurals), manualExclusions), bad))
// const big = Array.from(union(fiveHundredK, union(tenK, scrabble)))
//
// console.log(`export const big_dictionary = new Set(${JSON.stringify(big)})`)
// console.log(`export const small_dictionary = ${JSON.stringify(small)}`)
