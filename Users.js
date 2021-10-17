function Users (admin_instance) {
    this.admin = admin_instance;
    this.user_borrowed_Books = []
    this.user_details = {}; // Store the details of each user
    this.notification_array = []; // Store all updates notified by admin
    this.validateEmail = (elementValue) => {      
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue); 
    }   
    this.updates = (msg) =>{
    this.notification_array.push(msg)
    return `
            NOTIFICATION DETAILS:    
            Message: ${msg.toUpperCase()}
            From: Admin 
            To: ${this.user_details.Name} 
        `
    }
}

// USING THE PROTOTYPE DESIGN PATTERN TO BUILD PROTOYPE PROPERTIES FOR OBJECTS
Users.prototype = {
    sign_in(email, name){
        const Valid_Email = this.validateEmail(email);
        if(!name) return "enter User's Name Pls"
        if(!Valid_Email) return "Enter a valid email address";
        this.user_details["Name"] = name;
        this.user_details["Email"] = email;
        return this.admin.subscribe(this);    
    },

    sign_out(){
        const signedOut = this.admin.unSubscribe(this.user_details.Name);
        if(!signedOut) return "Can't Sign Out"
        const name = this.user_details.Name;
        this.user_details = {}
        return `${name} Signed_Out Successfully`
    },

    get_all_user_notification(){
        console.log( `${this.user_details.Name}'S NOTIFICATIONS:\n**************************************`)
        this.notification_array.forEach(msg => {
            console.log( `${msg}`)
            console.log("\n");
        })
        return ""
    },

    view_Libaray_store(){
        return this.admin.books;
    },

    Borrow_Book(name_of_book){
        if(!this.user_details.Email) return "Only Signed In Users Can Borrow A Book. Kindly SignIn";
        const foundBook = this.admin.find_book_by_name(name_of_book);
        if(!foundBook) return "Book Not In Book Store";
        if(foundBook.Rented === true) return "Book Has Already Been Lent Out";
        foundBook.Rented = true;
        const rented_book = Object.assign(foundBook)
        rented_book.Rented_By = this.user_details.Name;
        this.admin.rented_books.push(rented_book);
        this.user_borrowed_Books.push(foundBook)
        console.log(`${name_of_book} Book Borrowed Successfully`)
        console.log("SENDING..... RENTED BOOK NOTIFICATION TO ALL USERS");
        return this.admin.notify(`${foundBook.Name} Has Been Lent Out By Admin To User: Username - ${this.user_details.Name} Email - ${this.user_details.Email}`); 
        
    },

    view_user_borrowed_books(){
        console.log(`Borrowed Book List Of ${this.user_details.Name}`);
        if(this.user_borrowed_Books.length > 0){
            return this.user_borrowed_Books
        }else{
            return `No Book Has Been Borrowed By You : ${this.user_details.Name}`
        }
    },

    Return_Book(name_of_book){
        // find if the book is in the user rented book array
        const rentedBookIndex = this.user_borrowed_Books.findIndex(x => x.Name === name_of_book);
        if(rentedBookIndex === -1) return `User Never Borrowed This Book`;
        // set the rented property of book in the books array to false
        const foundBook = this.admin.books.find(x=> x.Name === name_of_book);
        foundBook.Rented = false;
        delete(foundBook.Rented_By)
        // Remove book from admin list of rented books
        const rented_Index = this.admin.rented_books.findIndex(x => x.Name === name_of_book);
        this.admin.rented_books.splice(rented_Index, 1);
        // remove book from list of user rented book
        this.user_borrowed_Books.splice(rentedBookIndex, 1);
        console.log("SENDING..... RETURN BOOK NOTIFICATION TO ALL USERS");
        return this.admin.notify(`User ${this.user_details.Name} Returned A Book Titled: ${name_of_book}`)
    },

}

module.exports = Users