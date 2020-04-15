const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

console.log("Light House Tool");

const launchChrome = (url) => {
  chromeLauncher.launch().then((chrome) => {
    console.log(chrome.port);
    const opts = {
      port: chrome.port,
    };
    lighthouse(url, opts).then((results) => {
      chrome.kill();
      console.log(results.report);
    });
  });
};

launchChrome("http://akf0676.github.io/");
