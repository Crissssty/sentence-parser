const mapWords = require('./mapWords.js');
const parseSentenceAndFindFirstWord = require('./parseSentence.js');

const iterateThroughSentenceString = (sentence, mappedWords, lastWordIsNotGood) => {
  if (mappedWords.length) {
    mappedWords = mapWords(mappedWords);
  }
  const sentenceParserResult = parseSentenceAndFindFirstWord(
    sentence,
    mappedWords,
    lastWordIsNotGood
  );
  const newSentence = sentenceParserResult.sentence;
  ({ mappedWords, lastWordIsNotGood } = sentenceParserResult);

  if (!newSentence) {
    return mappedWords.orderToWordArray();
  }

  return iterateThroughSentenceString(newSentence, mappedWords, lastWordIsNotGood);
};

module.exports = iterateThroughSentenceString;
