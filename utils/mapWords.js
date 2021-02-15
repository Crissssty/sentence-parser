/**
 * @param words An array of strings to be processed.
 *
 * @return Returns an object with words mapped by their starting letter, and two
 * extra object mapped on the "used" and "order" keys, that hold the indexes
 * of used words and the order in which they were found and used.
 */
function mapWords(words) {
  const reducer = (accum, word) => {
    if (accum[word.charAt(0)]) {
      accum[word.charAt(0)].push(word);
    } else {
      accum[word.charAt(0)] = [word];
      accum.used[word.charAt(0)] = [];
    }
    return accum;
  };

  return words.reduce(reducer, {
    used: {},
    order: [],
    readOrderItem: function (orderItem) {
      const char = orderItem.substr(0, 1);
      const index = Number(orderItem.substr(1));
      const word = this[char][index];
      return { char, index, word };
    },
    popLastUsedWord: function () {
      if (this.order.length === 0) {
        return null;
      }
      const orderItem = this.readOrderItem(this.order.pop());
      this.used[orderItem.char].pop();
      return orderItem;
    },
    addOrderItem: function (char, index) {
      this.used[char].push(index);
      this.order.push(`${char}${index}`);
    },
    orderToWordArray: function () {
      const extractWord = (item) => this.readOrderItem(item).word;
      return this.order.map(extractWord);
    },
    reset: function () {
      this.used = {};
      this.order = [];
    },
  });
}

module.exports = mapWords;