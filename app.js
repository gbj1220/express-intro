const express = require("express");
const logger = require("morgan");
const path = require("path");

const indexRouter = require("./router/index");
const teamRouter = require("./router/team")


const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


const PORT = process.env.PORT || 3000;


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/team", teamRouter);


app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

