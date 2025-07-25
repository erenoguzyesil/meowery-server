const express = require("express");
const fetch = require("node-fetch");

const app = express();
const port = 3000;

// require('dotenv').config();

function pickRandomElement(array) {
  let randomIndex = Math.floor(Math.random() * array.length);
  let randomElement = array[randomIndex];

  return randomElement;
}

const gifSearchTerms = [
  "cat",
  "cats",
  "funny cat",
  "funny cats",
  "cute cat",
  "cute cats",
  "cat love",
];

app.get("/", async (request, response) => {
  const apiKey = process.env.TENOR_API_KEY;
  const clientKey = "meow";

  const limit = Math.floor(Math.random() * 50) + 1;
  const randomSearchTerm = pickRandomElement(gifSearchTerms);

  const url =
    "https://tenor.googleapis.com/v2/search?q=" +
    randomSearchTerm +
    "&key=" +
    apiKey +
    "&client_key" +
    clientKey +
    "&limit=" +
    limit;

  fetch(url).then((response2) => {
    let gifResults = response2.json().results;

    response.send(pickRandomElement(gifResults).media_formats.gif.url);

    console.log('meow!');
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
