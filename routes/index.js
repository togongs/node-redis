const express = require("express");
const router = express.Router();
const redis = require("redis");
const Redis = require("ioredis");
const redisClient = new Redis({
  // redis client 생성
  host: "127.0.0.1",
  port: 6379,
  db: 0,
  password: "1q2w3e4r!@",
});

/* GET home page. */
router.get("/", function (req, res, next) {
  redisClient.get("NAME", (err, result) => {
    console.log(result);
  });
  res.render("index", { title: "Express" });
});

module.exports = router;
