const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const argv = require("yargs").argv;
const url = require("url");
const fs = require("fs");

const urlParam = argv.url;

if (urlParam) {
  const urlObj = new URL(urlParam);
  let directoryName = `reports/ ${urlObj.hostname.replace("www.", "")}`;

  if (urlObj.pathname !== "/") {
    //if the URL has a pathname, to replace slashes with underscores
    directoryName = directoryName + urlObj.pathname.replace(/\//g, "_");
  }
  if (!fs.existsSync(directoryName)) {
    fs.mkdirSync(directoryName);
  }

  console.log("Light House Tool");
  console.log(`----------------------------`);

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

  launchChromeAndRunLighthouse(urlParam).then((results) => {
    console.log(results);
  });
} else {
  console.log(
    `You have not passed a URL to Lighthouse \n eg node index.js --url xxx`
  );
}
