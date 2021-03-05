/* 
    File name: client.js (For client side browser)
   Student Name: Disha Patel
        StudentID: 301149367
*/
if (document.title == "Home") {
    document.getElementById("aboutMe").onclick = function () {
        location.href = "/about"; // It will redirect to about page from home page.
    };
}
else if (document.title == "About Me") {
    document.getElementById("downloadResume").onclick = function () {
        location.href = "/public/assets/disha_resume.pdf"; // It will allow user to show PDF file.
    };
}
// Contact List delete alert conformation.
else if (document.title == "Contact List") {
    let deleteButtons = document.querySelectorAll("#delete");
    for (deleteButton of deleteButtons) {
        deleteButton.addEventListener('click',(event) => {
            if(!confirm("Do you want to delete this item?")){
                event.preventDefault();
                windows.location.assign("/contact/");
            }
        });
    }
}

