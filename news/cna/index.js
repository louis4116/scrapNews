// const { chromium } = require("playwright");

let chrome = {};
let puppeteer;
let options;
const cnaScrap = async (id) => {
  if (process.env.NODE_ENV === "production") {
    chrome = require("@sparticuz/chromium");
    puppeteer = require("puppeteer-core");
  } else {
    puppeteer = require("puppeteer");
  }
  try {
    if (process.env.NODE_ENV === "production") {
      options = {
        headless: "new",
        args: ["--hide-scrollbars", "--disable-web-security"],
        ignoreDefaultArgs: ["--disable-extensions"],
        executablePath: await chrome.executablePath,
        ignoreHTTPSErrors: true,
      };
    } else {
      options = {
        headless: "new",
      };
    }

    let browser = await puppeteer.launch(options);
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
    await page.goto(`https://www.cna.com.tw/list/${id}.aspx`);
    // , {
    //   waitUntil: "domcontentloaded",
    // }
    let count = 0;
    let maxCount = 2;
    if (id !== "aall") {
      //點擊畫面中的按鈕，讓新聞可以繼續跑
      while (count <= maxCount) {
        await page.waitForTimeout(200);
        await page.click("#SiteContent_uiViewMoreBtn_Style3");
        count++;
      }
    }

    const result = await page.evaluate(() => {
      let data = [];

      let newsItem = document.querySelectorAll(".mainList li");
      newsItem.forEach((el, i) => {
        let imgElement = newsItem[i]
          ?.querySelector(".wrap img")
          ?.getAttribute("src");
        if (imgElement) {
          data.push({
            source: "cna",
            title: newsItem[i].querySelector(".listInfo h2 span").textContent,
            date: newsItem[i].querySelector(".listInfo div").textContent,
            url: newsItem[i].querySelector("a").getAttribute("href"),
            img:
              newsItem[i]?.querySelector(".wrap img")?.getAttribute("src") ||
              "",
          });
        } else {
          data.push({
            category: "cna",
            title: newsItem[i].querySelector(".listInfo h2 span").textContent,
            date: newsItem[i].querySelector(".listInfo div").textContent,
            url: newsItem[i].querySelector("a").getAttribute("href"),
          });
        }
      });

      return data;
    });
    // await page.waitForFunction(
    //   async (result) => {
    //     return result && result.length >= 20;
    //   },
    //   {},
    //   result
    // );
    await browser.close();
    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports = cnaScrap;
