const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

console.log("Light House Tool");

const launchChrome = (url) => {
  chromeLauncher.launch({
    startingUrl: url,
  });
};

launchChrome("http://akf0676.github.io/");
