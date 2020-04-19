const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const argv = require("yargs").argv;
const url = require("url");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const urlParam = argv.url;
console.log("Light House Tool");
console.log(`____________________________________`);

const launchChromeAndRunLighthouse = (url) => {
  return chromeLauncher.launch().then((chrome) => {
    const opts = {
      port: chrome.port,
    };
    return lighthouse(url, opts).then((results) => {
      return chrome.kill().then(() => {
        return {
          js: results.lhr,
          json: results.report,
        };
      });
    });
  });
};

const compareReports = (from, to) => {
  console.log(`Compare Reports....\n____________________________________`);
  console.log(`Comparing ${from["fetchTime"]} to ${to["fetchTime"]}`);
  console.log(from["finalUrl"] + " " + from["fetchTime"]);
  console.log(to["finalUrl"] + " " + to["fetchTime"]);
};

const getLatestReport = (previousReports) => {
  let dates = [];
  for (let report in previousReports) {
    dates.push(
      new Date(path.parse(previousReports[report]).name.replace(/_/g, ":"))
    );
  }
  const latestReportDateStamp = dates.reduce(function (a, b) {
    return Math.max(a, b);
  });

  return new Date(latestReportDateStamp).toISOString();
};

if (urlParam) {
  const urlObj = new URL(urlParam);
  let directoryName = `reports/${urlObj.hostname.replace("www.", "")}`;

  if (urlObj.pathname !== "/") {
    //if the URL has a pathname, to replace slashes with underscores
    directoryName = directoryName + urlObj.pathname.replace(/\//g, "_");
  }
  if (!fs.existsSync(directoryName)) {
    fs.mkdirSync(directoryName);
  }

  launchChromeAndRunLighthouse(urlParam).then((results) => {
    //console.log(results);

    const previousReports = glob(`${directoryName}/*.json`, {
      sync: true,
    });

    //If we have reports - get ready to compare
    if (previousReports.length) {
      console.log(`Getting Latest Report`);
      let recentReport = getLatestReport(previousReports);

      // IFFE (Immediately invoked function expression) - to get load latest report contents
      const recentReportContents = (() => {
        const reportContents = fs.readFileSync(
          directoryName + "/" + recentReport.replace(/:/g, "_") + ".json",
          "utf8",
          (error, results) => {
            return results;
          }
        );
        return JSON.parse(reportContents);
      })();

      compareReports(recentReportContents, results.js);
    }

    console.log(`Results received - attempt write to disk -${directoryName}`);
    fs.writeFile(
      `${directoryName}/${results.js["fetchTime"].replace(/:/g, "_")}.json`,
      results.json,
      (err) => {
        if (err) throw err;
      }
    );
  });
} else {
  console.log(
    `You have not passed a URL to Lighthouse \n eg node index.js --url xxx`
  );
}
