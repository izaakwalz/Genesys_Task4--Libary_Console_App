function Admin_Subject (){
    // initialize class variables
    this.observers = [];
    this.books = [];
    this.rented_books = [];
    this.admin = false;
    this.find_book_by_name = (name) => 
        {  
           const foundBook = this.books.find(x => x.Name === name);
           return foundBook
        };
    // Function returns true if user is signed in
    this.check_user_is_Signed_in = (email)=>{
        const user = this.observers.find(x => x.user_details.Email === email)
        return user ? true : false
    }
}

// USING THE PROTOTYPE DESIGN PATTERN TO BUILD PROTOYPE PROPERTIES FOR OBJECTS
Admin_Subject.prototype = {
    // set one as admin
    Make_Admin(admin_name){
        this.admin_name = admin_name;
        this.admin = true;
        return `${this.admin_name} Is The Admin Of The Libarary \n`
    },

    // Admin CRUD Build
    add_books_to_store(name, author, genre){
        if(!this.admin) return "Only admins can add to store"
        const book = {};
        book["Name"] = name;
        book["Author"] = author;
        book["Genre"] = genre;
        book["Rented"] = false
        this.books.push(book)
        console.log(`SENDING OUT ${name} BOOK ADDITION NOTIFICATIONS TO ALL SUBSCRIBED USERS`);
        return this.notify(`Book with name ${name} was added successfully by admin by: ${Date()}`)
    },

    update_book_from_store(name, new_name, new_author, new_genre){
        if(!this.admin) return "Only admins can update book in store"
        const foundBook = this.find_book_by_name(name)
        if(!foundBook) return `Boook with name ${name} is not found`
        new_name && (foundBook["Name"] = newName);
        newGenre && (foundBook["Author"] = new_author);
        newNumber && (foundBook["Genre"] = new_genre);
        console.log(`SENDING OUT ${name} BOOK UPDATE NOTIFICATIONS TO ALL SUBSCRIBED USERS`);
        return this.notify(`Book with name ${name} was updated successfully by admin by: ${Date()}`)
    },

    delete_book_from_store(name){
        if(!this.admin) return "Only admins can delete a book in store"
        const foundBook = this.find_book_by_name(name)
        if(!foundBook) return `Boook with name ${name} is not found`
        this.books.splice(this.books.indexOf(foundBook), 1)
        console.log(`SENDING OUT ${name} BOOK DELETION NOTIFICATIONS TO ALL SUBSCRIBED USERS`);
        return this.notify(`Book with name ${name} was deleted successfully by admin by: ${Date()}`)
    },

    /* 
        Using the Observer Design Pattern to build up 
        the subscribe, unsubscribe and notify methods   

    */
    subscribe(obj){
        this.observers.push(obj)
        return `User: ${obj.user_details.Name} Has Subscribed Successfully You Can Now Borrow Successfully From Libary\n`
    },

    unSubscribe(name){
       const index =  this.observers.findIndex(x => x.user_details.Name === name);
       return this.observers.splice(index,1)
    },

    notify(msg){
        this.observers.forEach(observer=>{
            console.log(observer.updates(msg))
        })
        return "NOTIFICATION SENT TO ALL USERS \n"
    },
    // Function To Return A List of All Subscribed Users
    get_all_observers(){
        this.observers.forEach(observer=>{
            console.log(observer.user_details)
       })
       return ""
    },
    
    // Get All Rented Books
    get_all_rented_book(){
        if(this.rented_books.length > 0){
            return this.rented_books
        }else{
            return "No Book Has Been Rented"
        }

    }
}

module.exports = Admin_Subject