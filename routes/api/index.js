const router = require("express").Router();
const bookRoutes = require("./books");
const articleRoutes = require("./articles");

// Book routes
router.use("/books", bookRoutes);

// Book routes
router.use("/articles", articleRoutes);

module.exports = router;
