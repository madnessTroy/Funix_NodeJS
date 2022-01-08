// Import
// ExpressJS
const express = require("express");
// Route
const router = express.Router();

router.get("/add-product", (req, res, next) => {
	res.send(`
        <form method="POST" action="/product">
            <input type="text" name="title" />
            <button type="submit">Add product</button>
        </form>
    `);
});
router.post("/product", (req, res, next) => {
	console.log(req.body);
	res.redirect("/");
});

module.exports = router;
