const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const sequelize = require("sequelize");
const SequelizeStore = require("connect-session-sequelize");
const app = express();

const PORT = process.env.PORT || 3001

const hbs = exphbs.create({
  helpers: {
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  }
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.use(routes);

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening at PORT: ${PORT}`);
    });
});