const puppeteer = require("puppeteer");
const axios = require("axios");
const cheerio = require("cheerio");
const autoScroll = require("../../util/autoScroll");
const ltnScrap = async (item) => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox", "--no-sandbox", "--no-zygote"],
      executablePath:
        process.env.NODE_ENV === "production"
          ? process.env.PUPPETEER_EXECUTABLE_PATH
          : puppeteer.executablePath(),
    });
    let page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (
        request.resourceType() === "image" ||
        request.resourceType() === "stylesheet" ||
        request.resourceType() === "font"
      )
        request.abort();
      else request.continue();
    });
    await page.goto(`https://news.ltn.com.tw/list/breakingnews/${item}`);
    await autoScroll({ page, dis: 3000, max: 3 });
    const temp = await page.content();
    const $ = cheerio.load(temp);
    let data = [];
    $(".list li").each((i, el) => {
      data.push({
        source: "ltn",
        title: $(el).find(".title").text(),
        date: $(el).find("span").text(),
        url: $(el).find("a").attr("href"),
        img: $(el).find("img").attr("data-src"),
      });
    });
    // const result = await page.evaluate(() => {
    //   let data = [];
    //   let newsTilteTit = document.querySelectorAll(".tit");
    //   let newsImg = document.querySelectorAll(".lazy_imgs_ltn");
    //   for (let i = 0; i < newsTilteTit.length; i++) {
    //     let href = newsTilteTit[i].getAttribute("href");
    //     let img = newsImg[i].getAttribute("data-src");
    //     data.push({
    //       source: "ltn",
    //       date: newsTilteTit[i].querySelector("span").textContent,
    //       title: newsTilteTit[i].querySelector("div").querySelector("h3")
    //         .textContent,
    //       url: href,
    //       img: img,
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

module.exports = ltnScrap;
