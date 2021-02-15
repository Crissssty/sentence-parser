const iterateSentence = require('../utils/iterateSentence.js');
const mapWords = require('../utils/mapWords.js');
const expect = require('chai').expect;

describe('#mapWords', function () {
  it('should build mapWords object with exact keys', function() {
    expect(mapWords(['apple', 'pear', 'grape', 'cherry'])).to.have.keys(['a', 'p', 'g', 'c', 'addOrderItem', 'order', 'orderToWordArray','popLastUsedWord', 'readOrderItem', 'reset', 'used']);
  });
});

describe('#iterateSentence', function () {
  it('order "the quick brown fox"', function() {
    expect(iterateSentence('thequickbrownfox', ['quick', 'brown', 'the', 'fox'])).to.deep.equal(['the', 'quick', 'brown', 'fox'])
  });
  it('order "bed bath and beyond"', function() {
    expect(iterateSentence('bedbathandbeyond', ['bed', 'bath', 'bedbath', 'and', 'beyond'])).to.deep.equal(['bed', 'bath', 'and', 'beyond'])
  });
  it('order "this was a nice challenge"', function() {
    expect(iterateSentence('thiswasanicechallenge', ['nice', 'was', 'this', 'a', 'challenge'])).to.deep.equal(['this', 'was', 'a', 'nice', 'challenge']);
  });
  it('order first paragraph of lorem ipsum', function() {
    let loremIpsum = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`.toLowerCase().replace(/[^A-z]/, ' ');

    const loremIpsumArray = loremIpsum
      .split(' ')
      .sort()
      .filter((word) => word);

    expect(iterateSentence(loremIpsum.replace(/ /g, ''), loremIpsumArray)).to.deep.equal(loremIpsum
      .split(' ')
      .filter((word) => word))
  });
});