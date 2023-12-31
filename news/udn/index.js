const autoScroll = require("../../util/autoScroll");
const cheerio = require("cheerio");
const axios = require("axios");
const puppeteer = require("puppeteer");

const udnScrapy = async (item) => {
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
    const page = await axios.get(
      `https://udn.com/news/breaknews/1/${item}#breaknews`
    );
    const $ = cheerio.load(page.data);
    let data = [];
    $(
      ".context-box__content.story-list__holder.story-list__holder--full .story-list__news"
    ).each((i, el) => {
      data.push({
        source: "udn",
        title: $(el).find(".story-list__text h2").text().trim(),
        date: $(el).find(".story-list__time").text(),
        url: $(el).find(".story-list__text h2 a").attr("href"),
        img: $(el).find(".story-list__image img").attr("data-src"),
        summary: $(el).find(".story-list__text p a").text(),
      });
    });
    // let count = 0;
    // let maxCount = 2;
    // while (count <= maxCount) {
    //   //自動滾動 獲取更多新聞
    //   await autoScroll({ page, dis: 1200, max: 3 });
    //   count++;
    // }

    // const result = await page.evaluate(() => {
    //   //抓取dom 來獲取頁面上的新聞資料
    //   let data = [];
    //   let newsList = document.querySelectorAll(
    //     ".context-box__content.story-list__holder.story-list__holder--full .story-list__news"
    //   );
    //   for (let i = 0; i < newsList.length; i++) {
    //     data.push({
    //       source: "udn",
    //       title: newsList[i]
    //         .querySelector(".story-list__text h2")
    //         ?.textContent.trim(),
    //       date: newsList[i].querySelector(".story-list__time")?.textContent,
    //       url: newsList[i]
    //         .querySelector(".story-list__text h2 a")
    //         ?.getAttribute("href"),
    //       img: newsList[i]
    //         .querySelector(".story-list__image img")
    //         ?.getAttribute("data-src"),
    //       summary: newsList[i].querySelector(".story-list__text p a")
    //         ?.textContent,
    //     });
    //   }

    //   return data;
    // });
    // await page.waitForFunction(
    //   (result) => {
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

module.exports = udnScrapy;
