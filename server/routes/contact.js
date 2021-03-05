/* 
    File name: contact.js (For server side route file)
    Student Name: Disha Patel
        StudentID: 301149367
*/
let express = require('express');
let router = express.Router();
let contactController = require("../controllers/contact")
let passport = require('passport')

// Setting the require Auth function for the authentication verification if user is logged in or not.
function requireAuth(req,res,next) {
    if (!req.isAuthenticated()){
        return res.redirect("/login")
    }
    next()
}

router.get("/", requireAuth, contactController.displayContactList)

// getting contact page form for adding contact details
router.get("/add", requireAuth, contactController.displayAddContactForm)

// adding contact details
router.post("/add", requireAuth, contactController.addContactDetails)

// get edit contact form
router.get("/edit/:id", requireAuth, contactController.displayEditContactDetailsForm)

// update edited contact
router.post("/edit/:id", requireAuth, contactController.updateContactDetails)

// delete contact
router.get("/delete/:id", requireAuth, contactController.deleteContactDetail)

module.exports = router