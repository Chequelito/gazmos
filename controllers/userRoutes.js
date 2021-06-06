const router = require("express").Router();
const User = require ("../models/user");

router.post("/", (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
    })

.then((userData) => {
    req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.username = userData.id;
    req.session.logIn = true;
    res.json(userData);
    });
})
.catch((err) => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;