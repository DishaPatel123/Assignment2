/* 
    File name: contact.js (For server side model file)
    Student Name: Disha Patel
        StudentID: 301149367
*/
let mongoos = require("mongoose");

let contactModel = mongoos.Schema({
    contactName: String,
    contactNumber: Number,
    emailAddress: String,
    designation: String,
}, {
    collection: "contacts" // Collection name
});

module.exports = mongoos.model("Contact", contactModel);