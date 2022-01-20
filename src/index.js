import { Wordle } from "./Wordle.js"

const MAX_ATTEMPTS = 6
const WORD_LENGTH = 5

const wordle = new Wordle(MAX_ATTEMPTS, WORD_LENGTH)
wordle.setup()