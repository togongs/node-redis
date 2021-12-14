const express = require("express");
const app = express();
const dotenv = require("dotenv");
const Redis = require("ioredis");

dotenv.config();

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//router
const router = require("./routes");

//routing
app.use("/", router);

// 레디스 클라이언트 생성
// const client = redis.createClient({
//   host: "redis-server", // 도커 환경일때
//   // host:"redis-18804.xxxx.us-east-1-4.ec2.cloud.redislabs.com",
//   // 도커환경 아닌 Redis Cloud
//   port: 6379, // redis 기본포트
// });

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

// set은 key와 value 한 쌍을 저장
redis.set("number", 8);
redis.get("number", function (err, data) {
  console.log(data);
});

// key value 한 쌍에 여러값
redis.hmset("codigm", {
  goormIDE: "cloud service",
  goormEDU: "edu service",
});
redis.hget("codigm", "goormIDE", function (err, value) {
  // codigm의 해시테이블에서 goormIDE 값 가져오기
  if (err) throw err;
  console.log("goormIDE is : " + value); // 해당 값 출력
});

// app.get("/", (req, res) => {
//   redis.get("number", (err, number) => {
//     // 현재 숫자를 가져온다
//     redis.set("number", parseInt(number) + 1);
//     res.send("숫자가 1씩 올라갑니다. 숫자: " + number);
//   });
// });

module.exports = app;
