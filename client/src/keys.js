console.log("keys.js loaded correctly");
console.log(process.env.REACT_APP_NYT_KEY);
console.log("CONFIG: " + process.env.NYT_KEY);

exports.nyt = {
  key: process.env.REACT_APP_NYT_KEY
};

