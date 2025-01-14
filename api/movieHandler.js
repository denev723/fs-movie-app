require("dotenv").config();
import fetch from "node-fetch";

const APIKEY = process.env.OMDB_AP_KEY;

export default async function hanlder(request, response) {
  const { title, page, id } = JSON.parse(request.body);
  const url = id
    ? `https://www.omdbapi.com?apikey=${APIKEY}c&i=${id}&plot=full`
    : `https://www.omdbapi.com?apikey=${APIKEY}c&s=${title}&page=${page}`;
  const res = await fetch(url);
  const json = await res.json();
  response.status(200).json(json);
}
