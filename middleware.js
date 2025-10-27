const { session } = require("passport");
const Listing = require("./models/listing");

const ExpressError = require("./utils/ExpressError.js");

const { listingSchema } = require("./schema.js");


const {reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");


module.exports.isLoggedIn = (req, res, next) => {
    // console.log(req.path,"...",req.originalUrl);
    if (!req.isAuthenticated()) {

        //req obj has sessions that travels everrywhere + req.user to confirm if login user or not
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must login before creating lists");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {

        res.locals.redirectUrl = req.session.redirectUrl

    }
    next();
}

module.exports.isOwner = async (req, res, next) => {

    let { id } = req.params;

    let listing = await Listing.findById(id);

    if (!listing.owner._id.equals(res.locals.currUser._id)) {
        req.flash("error", "You Are Not The Owner Of This Listing");
        return res.redirect(`/listings/${id}`)
    }

    next();

}

module.exports.isReviewAuthor = async(req,res,next)=>{

   let {id,reviewId} = req.params; 

   let review = await Review.findById(reviewId);

//    console.log("reviewwww author",review,"...")
   if(!review.author.equals(res.locals.currUser._id)){
         req.flash("error", "You Are Not The Author Of This Review");
        return res.redirect(`/listings/${id}`)
   }
   next();


}

module.exports.validateListing = (req, res, next) => {


    let { error } = listingSchema.validate(req.body);

    //  let errorMsg = error.details.map(el => el.message).join(",");
    // console.log("runnig middleware validation of listing");
    if (error) {
        // throw new ExpressError(400,error)
        throw new ExpressError(400, error);
    } else {
        next();
    }
}

module.exports.validateReview = (req,res,next)=>{
    
    let {error} = reviewSchema.validate(req.body);
    
    //  let errorMsg = error.details.map(el => el.message).join(",");
    // console.log("runnig middleware of validate review");
    if(error){
        // throw new ExpressError(400,error)
        throw new ExpressError(400,error);
    }else{
        next();
    }
}


