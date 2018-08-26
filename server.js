const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3001;
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//serve static assets
if(process.env.NODE_ENV === "production"){
  app.use(express.static("client/build"));
}

//API ROUTES HERE
app.use(routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//mongo db connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fauxYorkTimesRedux")

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
})