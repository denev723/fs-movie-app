require("dotenv").config();
import fetch from "node-fetch";

export default async function hanlder(request, response) {
  const { title, page, id } = JSON.parse(request.body);
  const url = id
    ? `https://omdbapi.com?apikey=${process.env.APIKEY}c&i=${id}&plot=full`
    : `https://omdbapi.com?apikey=${process.env.APIKEY}c&s=${title}&page=${page}`;
  const res = await fetch(url);
  const json = await res.json();
  response.status(200).json(json);
}
