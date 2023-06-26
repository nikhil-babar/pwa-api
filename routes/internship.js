const bodyParser = require("body-parser");
const {
  fetchInternships,
  addToBookmark,
  deleteFromBookmark,
  getBookmarked,
  getNewest,
} = require("../controllers/internshipController");

const router = require("express").Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(require('express').json())

router.get("/", fetchInternships);
router.post("/", addToBookmark);
router.delete("/", deleteFromBookmark);
router.get("/bookmark", getBookmarked)
router.get("/newest", getNewest)

module.exports = router;
