// let chrome = {};
// let puppeteer;

// if ((process.env.NODE_ENV = "production")) {
//   chrome = require("@sparticuz/chromium");
//   puppeteer = require("puppeteer-core");
// } else {
//   puppeteer = require("puppeteer");
// }
import * as playwright from "playwright-aws-lambda";
// const { chromium } = require("playwright");
const ltnMilitary = async (item) => {
  let browser;
  const options = {
    headless: true, // 无头模式
    args: ["--hide-scrollbars", "--disable-web-security"],
  };
  // if ((process.env.NODE_ENV = "production")) {
  //   options = {
  //     headless: "new",
  //     args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
  //     ignoreDefaultArgs: ["--disable-extensions"],
  //     executablePath: await chrome.executablePath(),
  //   };
  // } else {
  //   options = {
  //     headless: "new",
  //   };
  // }
  browser = await playwright.launchChromium(options);
  let page = await browser.newPage();
  // await page.setRequestInterception(true);
  // page.on("request", (request) => {
  //   if (
  //     request.resourceType() === "image" ||
  //     request.resourceType() === "stylesheet" ||
  //     request.resourceType() === "font"
  //   )
  //     request.abort();
  //   else request.continue();
  // });
  await page.goto(`https://def.ltn.com.tw/${item}`, {
    waitUntil: "domcontentloaded",
  });

  // await autoScroll({ page, dis: 3000, max: 4 });

  const result = await page.evaluate(() => {
    let data = [];
    let newsItem = document.querySelectorAll(".article-box");
    newsItem.forEach((el, i) => {
      data.push({
        source: "military",
        title: newsItem[i].querySelector("h3").textContent.trim(),
        date: newsItem[i].querySelector("span").textContent.trim(),
        url: newsItem[i].getAttribute("href"),
        img: newsItem[i].querySelector("div img").getAttribute("data-src"),
      });
    });
    return data;
  });
  // await page.waitForFunction(
  //   (result) => {
  //     return result && result.length >= 20;
  //   },
  //   {},
  //   result
  // );
  await browser.close();
  return result;
};

module.exports = ltnMilitary;
