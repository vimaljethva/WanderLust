const express = require("express");
const router = express.Router({ mergeParams: true });

const Listing = require("../models/listing");

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")
const upload = multer({ storage})






//new route
router.get("/new", isLoggedIn,listingController.renderNewForm)



//INDEX ROUTE
//create route 
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn, upload.single("listing[image]"),validateListing, wrapAsync(listingController.createListing));

// .post(upload.single("listing[image]"),(req,res)=>{
//     res.send(req.file);
// })


//Show Route
//Update route
router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( isLoggedIn, isOwner, upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing))


//edit route
router.get("/:id/edit", isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;
