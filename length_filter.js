var fs = require('fs');
const tenK = new Set(fs.readFileSync('dictionaries/tenK.txt').toString().split("\n").map(s => s.trim().toUpperCase()).filter((w) => w.length === 5));
console.log("A")
const fiveHundredK = new Set(fs.readFileSync('dictionaries/fiveHundredK.txt').toString().split("\n").map(s => s.trim().toUpperCase()).filter((w) => w.length === 5));
console.log("B")
const scrabble = new Set(fs.readFileSync('dictionaries/scrabble.txt').toString().split("\n").map(s => s.trim().toUpperCase()).filter((w) => w.length === 5));

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


const small = Array.from(intersection(intersection(fiveHundredK, tenK), scrabble))
const big = Array.from(union(fiveHundredK, union(tenK, scrabble)))

console.log(`export const big_dictionary = ${JSON.stringify(big)}`)
console.log(`export const small_dictionary = ${JSON.stringify(small)}`)