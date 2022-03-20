require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const connectDb = require("./db/connect");
const productsRouter = require("./routes/products");

const notFoundMiddleWare = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Store API");
});

app.use("/api/v1/products", productsRouter);

// middleware

app.use(notFoundMiddleWare);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listenin to port ${port}...`));
  } catch (error) {}
};

start();
