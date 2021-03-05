/* 
    File name: contact.js (For server side controller file)
     Student Name: Disha Patel
        StudentID: 301149367
*/
let contact = require("../models/contact");

// Displaying contact list from database.
module.exports.displayContactList = (req, res, next) => {
    contact.find((err, contactList) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render("contact/contact_list", { title: "Contact List", contacts: contactList })
        }
    }).sort({contactName:1})
}

// Return contact form for adding details.
module.exports.displayAddContactForm = (req, res, next) => {
    res.render("contact/add_contact", { title: "Add Contact" })
}

// Adding contact details to database.
module.exports.addContactDetails = (req, res, next) => {
    let newContact = contact({
        "contactName": req.body.name,
        "contactNumber": req.body.number,
        "emailAddress": req.body.email,
        "designation": req.body.designation,
    });
    contact.create(newContact, (err, _) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect("/contact")
        }
    })
}

// displaying edit contact form.
module.exports.displayEditContactDetailsForm = (req, res, next) => {
    let id = req.params.id;
    contact.findById(id, (err, bookToUpdate) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render("contact/update_contact", { title: "Update Details", contact: bookToUpdate})
        }
    })
}

// update contact details to database.
module.exports.updateContactDetails = (req, res, next) => {
    let id = req.params.id;
    let updatedContact = contact({
        "_id": id,
        "contactName": req.body.name,
        "contactNumber": req.body.number,
        "emailAddress": req.body.email,
        "designation": req.body.designation,
    });
    contact.updateOne({ _id: id }, updatedContact, (err, _) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect("/contact")
        }
    });
}

// deleting contact from the database.
module.exports.deleteContactDetail = (req, res, next) => {
    let id = req.params.id;
    contact.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.redirect("/contact")
        }
    })
}
