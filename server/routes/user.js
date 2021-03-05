/* 
    File name: contact.js (For server side user route file)
    Student Name: Disha Patel
        StudentID: 301149367
*/

let express = require('express');
let router = express.Router();
// importing user controller.
let userController = require("../controllers/user");

router.get("/login", userController.displayLoginPage);

router.post("/login", userController.displayContactListPage);

router.get("/logout", userController.logout);

module.exports = router