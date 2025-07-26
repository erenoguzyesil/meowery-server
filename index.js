const express = require("express");
const { rateLimit } = require("express-rate-limit");
const fetch = require("node-fetch");

const app = express();
const port = 3001;

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

const apiKey = process.env.TENOR_API_KEY;
const clientKey = "meow";

const limiter = rateLimit({
  windowMs: 10 * 1000,
  limit: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

app.use(limiter);

app.post("/", async (request, response) => {
  const gifResultsLimit = Math.floor(Math.random() * 50) + 1;
  const randomSearchTerm = pickRandomElement(gifSearchTerms);

  const url =
    "https://tenor.googleapis.com/v2/search?q=" +
    randomSearchTerm +
    "&key=" +
    apiKey +
    "&client_key" +
    clientKey +
    "&limit=" +
    gifResultsLimit;

  fetch(url).then(async (response2) => {
    let gifResults = (await response2.json()).results;

    response.send(pickRandomElement(gifResults).media_formats.gif.url);
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
