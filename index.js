const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const argv = require("yargs").argv;

console.log("Light House Tool");
console.log(`----------------------------`);
console.log(argv.url);
const url = argv.url;

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

launchChromeAndRunLighthouse(url).then((results) => {
  console.log(results);
});
