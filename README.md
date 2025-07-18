
# foodyup 🍔

A full-stack Food Ordering Web App built using the MERN Stack (MongoDB, Express, React, Node.js). Users can browse food items, add them to a cart, place orders, and track order status. Admins can manage listings and view orders.

---

## 🚀 Features

- 🛒 Browse food categories & items
- 🔐 JWT-based authentication
- 🧺 Cart system with quantity management
- 💸 Order placement & payment integration (e.g., Razorpay)
- 📦 My Orders page with order history



---

## 🛠️ Tech Stack

| Tech        | Usage                           |
|-------------|----------------------------------|
| MongoDB     | Database                        |
| Express.js  | Backend server                  |
| React.js    | Frontend user interface         |
| Node.js     | Backend runtime                 |
| Context API | State management (cart, auth)   |
| JWT         | User authentication             |               |
| Razorpay    | Payment Gateway (optional)      |

---------------------------------

## 📁 Folder Structure

GoFood/
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── utils/
│ └── server.js
│
├── mernapp/ (Frontend)
│ ├── src/
│ │ ├── components/
│ │ ├── screens/
│ │ ├── context/
│ │ └── App.js
│ └── public/
│
└── README.md

---------------------------------

## 🔧 Setup Instructions

### 1. Clone the Repo

git clone https://github.com/<your-username>/Foodyupp-.git
cd Foodyupp-

---------------------------------
2. Backend Setup
cd backend
npm install
# Add your .env file
node server.js

---------------------------------
3. Frontend Setup
cd ../mernapp
npm install
npm start

 Environment Variables
 Create a .env file in the backend/ folder with:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

---------------------------------
## 🚀 Project Demo

🎥 [(https://shorturl.at/SaNMT)]([(https://shorturl.at/SaNMT)])



✅ Status
This project is under active development. Future plans include:
Admin dashboard
Real-time order tracking
UI enhancements

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

📄 License
MIT

🙋‍♀️ Author
Built with ❤️ by Tanvi Sandbhor
