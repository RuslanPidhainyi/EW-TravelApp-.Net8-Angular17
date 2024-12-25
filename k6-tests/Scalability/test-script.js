import http from "k6/http";
import { check, sleep } from "k6";

export let options = {
  stages: [
    { duration: "1m", target: 5 },  // Початкове навантаження
    { duration: "2m", target: 10 }, // Плавне збільшення
    { duration: "2m", target: 20 }, // Середнє навантаження
    { duration: "2m", target: 30 }, // Високе навантаження
    { duration: "2m", target: 50 }, // Максимальне навантаження
    { duration: "1m", target: 0 },   // Плавне зниження
  ],
};

const TOKEN = __ENV.TOKEN || "";

export default function () {
  const baseURL = "https://localhost:5001/api";
  const headers = {
    "Content-Type": "application/json",
    
    Authorization: `Bearer ${TOKEN}`,
  };

  // 1) GET /api/posts
  let resGetAll = http.get(`${baseURL}/posts`, { headers });
  check(resGetAll, {
    "GET /posts => 200": (r) => r.status === 200,
  });

  // 2) GET /api/posts/user/username
  let postUsername = "lisa";
  let resGetByUsername = http.get(`${baseURL}/posts/user/` + postUsername, { headers });
  check(resGetByUsername, {
    "GET /posts/user/{username} => 200": (r) => r.status === 200,
  });

  // 3) GET /api/posts/postId
  let postId = 11;  
  let resGetPostById = http.get(`${baseURL}/posts/`+ postId, { headers });
  check(resGetPostById, {
    "GET /posts/{postId} => 200": (r) => r.status === 200,
  });
  
  sleep(1);
}