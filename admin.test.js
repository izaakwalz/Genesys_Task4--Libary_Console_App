const Admin_Subject = require('./Admin');
const Users = require('./Users');

const Admin = new Admin_Subject();
const user1 = new Users(Admin);

describe('testing admin functions', (admin, book) => {
	beforeAll(() => {
		admin = Admin.Make_Admin('Ifenna');
		book = Admin.add_books_to_store('Fallen Sky', 'Samson Johnson', 'prose');
		Admin.add_books_to_store('Cross Breed', 'Daniel Smith', 'Drama');
		console.log(book);
		console.log(admin);
	});

	test('if there is any book in the libary', () => {
		expect(Admin.books.length > 1).toBeTruthy();
	});

	test('if observer there is an observer', () => {
		expect(Admin.observers.length > 0).toBeFalsy();
	});

	test('if admin was created', () => {
		expect(Admin.admin_name).toBe('Ifenna');
		expect(Admin.admin).toBe(true);
	});

	test('if book was created', () => {
		const book_data = Admin.books.find((_book) => _book.Name === 'Fallen Sky');
		expect(book_data.Author).toEqual('Samson Johnson');
		expect(book_data.Genre).toEqual('prose');
		expect(book_data.Rented).toBeFalsy();
	});

	// test('if book was removed', () => {});
});

describe('testing user finctions', (user) => {
	beforeAll(() => {
		user1.sign_in('ifena@gmail.com', 'Ifenna');
		user = user1.user_details;
		console.log(user);
	});

	test('if user was signed in', () => {
		expect(user.Email).toBe('ifena@gmail.com');
	});

	test('if observer was added', () => {
		expect(Admin.observers.length > 0).toBeTruthy();
	});
});
