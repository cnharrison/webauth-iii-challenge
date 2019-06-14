const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile.js");

const server = express();
const db = knex(knexConfig);

server.use(express.json());
server.use(helmet());

const port = 3300;
server.listen(port, function() {
  console.log(`\nusers api 👨‍🔬👨‍🔧👨‍🍳👩‍🌾 http://localhost:${port} ===\n`);
});
