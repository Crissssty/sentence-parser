const readline = require('readline-sync');

const iterateThroughSentenceString = require('./utils/iterateSentence.js');

const sentenceString = readline.question('Input the sentence string:\n', {defaultInput: 'thequickbrownfox'}).trim();
let wordsString = readline.question('Input the words array (either comma separated or as a real JS object):\n').replace(/'/, '"').replace(/ /, '').trim();

if (!wordsString.includes('"')) {
  wordsString = `"${wordsString.replace(/,/g, '","')}"`;
}
if (!wordsString.startsWith('[') && !wordsString.endsWith(']')) {
  wordsString = `[${wordsString}]`;
}
const words = JSON.parse(wordsString);

console.log(iterateThroughSentenceString(sentenceString, words));
