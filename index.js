const express = require("express");
const cors = require("cors");
const app = express();

const scrapRoute = require("./routes/scrapNewsRoute");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/news", scrapRoute);

app.use("/", (req, res, next) => {
  res.status(200).json({
    status: "success",
    msg: "連接成功",
  });
});

app.use("*", (req, res, next) => {
  res.status(404).json({
    status: "error",
    msg: "找不到路由，請確認是否輸入錯誤",
  });
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`伺服器啟動${port}`);
});
