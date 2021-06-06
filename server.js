const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const sequelize = require("./config/index");
const app = express();
const apiRoutes = require("./controllers/userRoutes");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

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


const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(apiRoutes);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening at PORT: ${PORT}`);
    });
});