const express = require("express");
const router = express.Router({mergeParams:true});

const Listing = require("../models/listing");
const Review = require("../models/review");

const wrapAsync = require("../utils/wrapAsync.js");

const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");



//reviews post
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//DELETE REVIEW
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destoryReview));

module.exports = router;