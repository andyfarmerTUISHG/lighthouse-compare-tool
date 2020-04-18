const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const argv = require("yargs").argv;

console.log("Light House Tool");
console.log(`----------------------------`);
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

if (url) {
  launchChromeAndRunLighthouse(url).then((results) => {
    console.log(results);
  });
} else {
  throw `You have not passed a URL to Lighthouse \n eg node index.js --url xxx`;
}
