const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
const ltnMilitary = async (item) => {
  try {
    const response = await axios.get(`https://def.ltn.com.tw/${item}`);
    const $ = cheerio.load(response.data);
    let data = [];
    $(".article-box").each((i, el) => {
      const title = $(el).find("h3").text().trim();
      const date = $(el).find("span").text().trim();
      const url = $(el).attr("href");
      const img = $(el).find("div img").attr("data-src");

      data.push({
        source: "military",
        title,
        date,
        url,
        img,
      });
    });
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
    // await page.goto(`https://def.ltn.com.tw/${item}`, {
    //   waitUntil: "domcontentloaded",
    // });

    // // await autoScroll({ page, dis: 3000, max: 4 });

    // const result = await page.evaluate(() => {
    //   let data = [];
    //   let newsItem = document.querySelectorAll(".article-box");
    //   newsItem.forEach((el, i) => {
    //     data.push({
    //       source: "military",
    //       title: newsItem[i].querySelector("h3").textContent.trim(),
    //       date: newsItem[i].querySelector("span").textContent.trim(),
    //       url: newsItem[i].getAttribute("href"),
    //       img: newsItem[i].querySelector("div img").getAttribute("data-src"),
    //     });
    //   });
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

module.exports = ltnMilitary;
