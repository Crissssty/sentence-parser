/**
 * This function tries to find a word that matches the beginning of the
 * sentence. If such a word is found it will remove it from the sentence, and
 * will add it to the object that traces used words, "mappedWords.used". It also
 * handles the case in which a word was previously used and ended up without
 * being able to continue the sentence, when a word was removed and another one
 * matching the sentence beginning cannot be found. In that case it resets the
 * traces in "mappedWords" and sets the sentence to an empty string.
 *
 * @param sentence A string that holds the rest of the sentence that needs to be
 * parsed.
 * @param mappedWords An object that holds the words given in the beginning and
 * a trace of the currently used ones.
 * @param lastWordIsNotGood A Boolean type variable that will be given a value if a
 * previous used word should fail to continue the sentence, so as to know
 */
const parseSentenceAndFindFirstWord = (sentence, mappedWords, lastWordIsNotGood) => {
  let char = sentence.charAt(0);
  let removedObject;
  if (lastWordIsNotGood) {
    removedObject = mappedWords.popLastUsedWord();
    if (!removedObject && mappedWords.order.length === 0) {
      mappedWords.reset();
      return { sentence: '', mappedWords, lastWordIsNotGood: true };
    }
    sentence = removedObject.word + sentence;
    char = removedObject.char;
  }

  const wordsList = mappedWords[char];

  const foundIndex = wordsList.findIndex(
    (word, index) =>
      sentence.startsWith(word) &&
      !mappedWords.used[char].includes(index) &&
      (removedObject === undefined || index > removedObject.index)
  );

  if (foundIndex !== -1) {
    mappedWords.addOrderItem(char, foundIndex);
    sentence = sentence.substr(wordsList[foundIndex].length);
  }

  return { sentence, mappedWords, lastWordIsNotGood: foundIndex === -1 };
};

module.exports = parseSentenceAndFindFirstWord;