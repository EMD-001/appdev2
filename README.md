##  Deployed API

The project is deployed and accessible at:

🔗 https://simple-book-api-zd6g.onrender.com/

---

##  How to Use the API

You can access the API using any HTTP client such as **Thunder Client** and **Postman**

---

## 🔐 Authentication Endpoints

| Method | Endpoint              | Description       |
|--------|-----------------------|-------------------|
| POST   | `/api/auth/signup`    | Register a user   |
| POST   | `/api/auth/signin`    | Login and get JWT |

> 📌 Make sure to use the returned **token** as a Bearer token in Authorization headers when accessing protected routes.

---

## 📚 Book Endpoints

| Method | Endpoint           | Description        | 
|--------|--------------------|--------------------|
| GET    | `/api/books`       | Get all books      | 
| POST   | `/api/books`       | Create a book      | 
| PUT    | `/api/books/:id`   | Update a book      | 
| DELETE | `/api/books/:id`   | Delete a book      | 



##  Notes

- Ensure that your MongoDB Atlas connection is active.
- You must whitelist your IP address on Atlas to allow the API to connect.
