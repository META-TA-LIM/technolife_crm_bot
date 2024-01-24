require("express-async-errors");
const express = require("express");
const cors = require("cors");

const routes = require("../routes");

const modules = (app) => {
  app.use(cors({ origin: "*" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/api", routes);

  app.use((error, req, res, next) => {
    res.status(500).json({ message: "Internal Server Error", error: error });
  });
};

module.exports = modules;
