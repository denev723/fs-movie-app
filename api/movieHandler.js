require("dotenv").config();
import fetch from "node-fetch";

const { OMDB_API_KEY } = process.env;

export default async function hanlder(request, response) {
  const { title, page, id } = JSON.parse(request.body);
  const url = id
    ? `https://www.omdbapi.com?apikey=${OMDB_API_KEY}c&i=${id}&plot=full`
    : `https://www.omdbapi.com?apikey=${OMDB_API_KEY}c&s=${title}&page=${page}`;
  const res = await fetch(url);
  const json = await res.json();
  response.status(200).json(json);
}
