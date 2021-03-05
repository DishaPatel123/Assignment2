/* 
    File name: user.js (For server side model file)
    Student Name: Disha Patel
        StudentID: 301149367
*/

let mongoos = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose")

let User = mongoos.Schema({
    username: {
        type: String,
        default: "",
        trim: true,
        required: "Username is required."
    },
    // password: {
    //     type: String,
    //     default: "",
    //     trim: true,
    //     required: "Password is required."
    // },
    email: {
        type: String,
        default: "",
        trim: true,
        required: "Email address is required"
    },
    displayName: {
        type: String,
        default: "",
        trim: true,
        required: "Display name is required"
    },
    created: {
        type: Date,
        default: Date.now,
    },
    update: {
        type: Date,
        default: Date.now,
    }
}, {
    collection: "users"
}
);

// Config option for user model.
let options = ({missingPasswordError: "Wrong / Missing Password"})
// adding options to the plugins.
User.plugin(passportLocalMongoose, options)
module.exports.User =  mongoos.model("User", User);
