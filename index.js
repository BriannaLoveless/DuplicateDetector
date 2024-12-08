import { stringSimilarity } from "string-similarity-js";
import fs from 'node:fs';

const data = fs.readFileSync('./input/advertisers.txt', 'utf8').split("\r\n");
let output = {}
// const test = ["42nd Street Moon", "42nd Street Moon LLC", "Publix"]

function compare(value, array) {
    output[value] = []
    array.forEach((nextValue) => {
      if (value == nextValue) {
        return;
      } else {
        let score = {
          advertiserName: nextValue,
          score: stringSimilarity(value, nextValue)
        }
        output[value].push(score)
      }
    })
  }

function outputMatches() {
  
}
  
data.forEach((v, idx) => compare(v, data))
// test.forEach((v, idx) => compare(v, test))
console.log(output)
