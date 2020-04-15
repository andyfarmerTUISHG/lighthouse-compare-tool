const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

console.log("Light House Tool");

const launchChrome = (url) => {
  chromeLauncher
    .launch({
      startingUrl: url,
    })
    .then((chrome) => {
      console.log(chrome);
      setTimeout(() => chrome.kill(), 3000);
    });
};

launchChrome("http://akf0676.github.io/");
