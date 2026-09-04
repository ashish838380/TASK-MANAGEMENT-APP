# TaskFlow – Task Management App

TaskFlow is a full-stack task management application that allows users to create, manage, search, edit, complete, and delete tasks through a simple and responsive web interface.

## 🚀 Features

* Create new tasks
* Add task descriptions
* Mark tasks as completed or pending
* Edit existing tasks
* Delete tasks
* Search tasks
* Filter tasks by:

  * All
  * Pending
  * Completed
* Task statistics
* Progress tracking with a progress bar
* Responsive design for desktop and mobile
* RESTful backend API
* MongoDB database integration

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST API
* CORS
* dotenv

### Database

* MongoDB
* Mongoose
* MongoDB Atlas

## 📁 Project Structure

```text
TASK-MANAGEMENT-APP/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/ashish838380/TASK-MANAGEMENT-APP.git
cd TASK-MANAGEMENT-APP
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another Terminal window and run:

```bash
cd ~/Desktop/TASK-MANAGEMENT-APP/server
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Do not upload your `.env` file or MongoDB password to GitHub.

## ▶️ Run the Application

### Start Backend

```bash
cd server
npm run dev
```

Backend runs on:

```text
http://localhost:5001
```

### Start Frontend

Open another Terminal window:

```bash
cd client
npm run dev
```

Vite will provide a local URL such as:

```text
http://localhost:5173
```

Open that URL in your browser.

## 🔌 API Endpoints

Base URL:

```text
http://localhost:5001/api/tasks
```

| Method | Endpoint         | Description   |
| ------ | ---------------- | ------------- |
| GET    | `/api/tasks`     | Get all tasks |
| POST   | `/api/tasks`     | Create a task |
| PUT    | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## 📊 Task Progress

TaskFlow automatically calculates:

* Total tasks
* Pending tasks
* Completed tasks
* Completion percentage

The progress bar updates automatically whenever a task is completed or uncompleted.

## 🧪 Testing

The backend API supports complete CRUD operations:

* Create
* Read
* Update
* Delete

The application has been tested with MongoDB Atlas and the React frontend.

## 🌐 Deployment

The project can be deployed using:

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

Before deploying the frontend, update the API URL from the local backend URL to the deployed backend URL.

## 🔒 Security

Sensitive environment variables such as MongoDB credentials and JWT secrets are stored in `.env` and excluded from Git using `.gitignore`.

## 👨‍💻 Author

**Ashish Yadav**

GitHub: `ashish838380`
 
## 📄 License

This project is created for educational and development purposes.
