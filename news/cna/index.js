// const { chromium } = require("playwright");
const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
const cnaScrap = async (id) => {
  try {
    // const browser = await puppeteer.launch({
    //   headless: "new",
    //   args: ["--disable-setuid-sandbox", "--no-sandbox", "--no-zygote"],
    //   executablePath:
    //     process.env.NODE_ENV === "production"
    //       ? process.env.PUPPETEER_EXECUTABLE_PATH
    //       : puppeteer.executablePath(),
    // });

    // let page = await browser.newPage();
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

    // let count = 0;
    // let maxCount = 2;
    // if (id !== "aall") {
    //   //點擊畫面中的按鈕，讓新聞可以繼續跑
    //   while (count <= maxCount) {
    //     await page.waitForTimeout(200);
    //     await page.click("#SiteContent_uiViewMoreBtn_Style3");
    //     count++;
    //   }
    // }
    const page = await axios.get(`https://www.cna.com.tw/list/${id}.aspx`);
    const $ = cheerio.load(page.data);
    let data = [];
    $(".mainList li").each((el, i) => {
      data.push({
        source: "cna",
        title: $(i).find(".listInfo h2 span").text(),
        date: $(i).find(".date").text(),
        url: $(i).find("a").attr("href"),
        img: $(i).find(".wrap img").attr("data-src") || "",
      });
    });
    // newsItem[i].querySelector(".listInfo h2 span").textContent,
    // newsItem[i].querySelector(".listInfo div").textContent,
    // newsItem[i].querySelector("a").getAttribute("href"),
    // newsItem[i]?.querySelector(".wrap img")?.getAttribute("src") || "",
    // await page.waitForFunction(
    //   async (result) => {
    //     return result && result.length >= 20;
    //   },
    //   {},
    //   result
    // );
    // await browser.close();
    return data;
  } catch (e) {
    return e;
  }
};

module.exports = cnaScrap;
