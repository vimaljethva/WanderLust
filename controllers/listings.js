const Listing = require("../models/listing");

module.exports.index = async (req, res, next) => {

    const allListings = await Listing.find({});

    res.render("listings/index.ejs", { allListings });

}

module.exports.renderNewForm =  (req, res) => {


    res.render("listings/new.ejs");


};

module.exports.showListing = async (req, res, next) => {

    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");

    console.log("consoling listing ",listing);
    if (!listing) {
        // console.log("excecuting");
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    // console.log(req.user);
    // console.log(listing);


    res.render("listings/show.ejs", { listing });

}

module.exports.createListing = async (req, res, next) => {

    let url = req.file.path;
    let filename = req.file.pathname;

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename}

    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");

}
module.exports.renderEditForm = async (req, res, next) => {


    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        // console.log("excecuting");
        req.flash("error", "Listing you requested for does not exist");
        return res.redirect("/listings");
    }

    let originalUrl = listing.image.url ;
    originalUrl = originalUrl.replace("/upload","/upload/ar_1.0,c_fill,w_250/r_max/f_auto");
    await listing.save();

    


    res.render("listings/edit.ejs", { listing,originalUrl });

};

module.exports.updateListing = async (req, res, next) => {

    let { id } = req.params;
   
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); 
    
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.pathname;

    listing.image = {url,filename};
    await listing.save()
    }


    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);

}

module.exports.destroyListing = async (req, res, next) => {

    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    // console.log("deleted listing",deletedListing);
    res.redirect("/listings");
}