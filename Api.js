// Require The User and Admin Constructor Functions
const Users = require("./Users")
const Admin_Subject = require("./Admin")

// Make Instance Of Admin
const admin1 = new Admin_Subject();
console.log("           SKOLAR BOOK LENDING CONSOLE APP               ");
console.log("*****  Making An Admin  *****");
console.log(admin1.Make_Admin("Ifenna"));

// Creating 3  User Instances
const user1 = new Users(admin1);
const user2 = new Users(admin1)
const user3 = new Users(admin1);

// Users Sign Up
console.log("*****  3 Users Are Subscribing To The Admin As Observers  ***** \n");
console.log(user1.sign_in("ifena@gmail.com", "Ifenna"));
console.log(user2.sign_in("edu@gmail.com", "Chinedu"));
console.log("*****  Testing SignUp with Wrong Email Pattern  *****\n");
console.log(user3.sign_in("pascalgmail.com", "Pascal"));
console.log(user3.sign_in("pascal@gmail.com", "Pascal"));
console.log("***** Testing User SignOut Functionality *****");
console.log(user3.sign_out());

// Admin Crud Build Up

console.log("***** Adding New Books To Book Store *****");
admin1.add_books_to_store("Fallen Sky", "Samson Johnson", "prose")
admin1.add_books_to_store("Cross Breed", "Daniel Smith", "Drama")
admin1.add_books_to_store("Tempest", " William Shakespere", "prose")
admin1.add_books_to_store("Awakening", "Daniel Smith", "prose")

console.log("**** Deleting Book From Store *****");
admin1.delete_book_from_store("Tempest")

// Users Borrow Book Functionality
console.log("*****  Testing Borrow Book Functionality For UnSigned User  ***** \n");
console.log(user3.Borrow_Book("Fallen Sky") + "\n");
console.log("*****  Testing Borrow Book Functionality For SignedIn User  ***** \n");
console.log(user1.Borrow_Book("Fallen Sky"))
console.log(user2.Borrow_Book("Awakening"));
console.log(user2.Borrow_Book("Cross Breed"));

// Viewing User 2 lsit of borrowed books
console.log("*****  Getting A List Of A User's Borrowed Book  *****");
console.table(user2.view_user_borrowed_books())

// User Return Book Functionality
console.log("*****  Testing Return Book Functionality  ***** \n");
console.log(user2.Return_Book("Awakening"));

// Getting All Notifications Of A Particualr User
console.log("***** Getting All Notifications Recieved By A particular User ***** \n");
console.log(user1.get_all_user_notification());

// View Of Book Libary
console.log("***** Viewing... The Book Store ****");
console.table(user1.view_Libaray_store());

// view all subscribed users
console.log("*****  Viewing... All Subscribed Users  *****");
console.log(admin1.get_all_observers());











