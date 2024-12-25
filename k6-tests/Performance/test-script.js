import http from "k6/http";
import { sleep, check } from "k6";

export let options = {
  vus: 300,//100,
  duration: "60s",
};

// Зчитуємо токен зі змінних оточення (ENV).
const token = __ENV.TOKEN || "";

export default function () {
  let headers = {
    Authorization: `Bearer ${token}`,
  };

  let res = http.get("https://localhost:5001/api/posts", { headers });

  check(res, { "status is 200": (r) => r.status === 200 });

  sleep(1);
}


/*
Żebyś uruchomc test musimy: 
    1 - być w tecie "k6-tests\Perfomance",
    2 - w termenarze wpisać taką komende


k6 run --env TOKEN=<Bearer token> test-script.js    

example:

k6 run --env TOKEN=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIxMiIsInVuaXF1ZV9uYW1lIjoiZGF2ZSIsIm5iZiI6MTczNDU0OTQ0MCwiZXhwIjoxNzM1MTU0MjQwLCJpYXQiOjE3MzQ1NDk0NDB9.v9ovDNvZ3MLuzL0DFKC4H56FLdecbbG3utL1ZVZv3zBZU97zXXeMuvJrraFO4YKaop_pd7hJQAhESQRQJrlPrw test-script.js
*/