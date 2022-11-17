const express = require("express");
const cors = require("cors");

var path = require('path');

const app = express();

//public directory

app.use(express.static(path.join(__dirname, 'public')));
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

// db.sequelize.sync({ force: true}).then(() => {
//   console.log("drop and re-sync db.");

// });

app.get("/", (req, res) => {
  res.json({ message: "Esta es la aplicación de comics" });
});

require("./routes/comic.route.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
