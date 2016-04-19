module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true
  },
  globals: {
    sinon: true,
    expect: true
  },
  rules: {
    'dot-notation': [
      2,
      {
        'allowKeywords': true
      }
    ],
  }
};

