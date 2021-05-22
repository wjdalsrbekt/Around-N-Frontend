import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9997/happyhouse",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
  },
});
