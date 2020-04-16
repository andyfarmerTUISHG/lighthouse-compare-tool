const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

console.log("Light House Tool");

const launchChromeAndRunLighthouse = (url) => {
  return chromeLauncher.launch().then((chrome) => {
    const opts = {
      port: chrome.port,
    };
    return lighthouse(url, opts).then((results) => {
      return chrome.kill().then(() => results.report);
    });
  });
};

launchChrome("http://akf0676.github.io/");
