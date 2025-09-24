# Taskify - Simple To-Do List App

A clean, beginner-friendly full-stack to-do list application built with React frontend and Node.js/Express backend.

## 🌐 Live Demo
**[🚀 Try Taskify Live](https://kaleidoscopic-sopapillas-e4695c.netlify.app/)**

[![Netlify Status](https://img.shields.io/badge/Netlify-Live-success?style=flat&logo=netlify)](https://kaleidoscopic-sopapillas-e4695c.netlify.app/)
[![Backend Status](https://img.shields.io/badge/Render-Live-success?style=flat&logo=render)](https://taskify1-lwlb.onrender.com/api/health)

- **Frontend**: Deployed on Netlify
- **Backend**: Deployed on Render  
- **Status**: ✅ Fully functional full-stack application

## 🚀 Features

- ✅ Add new tasks with title and description
- ✏️ Edit existing tasks
- 🗑️ Delete tasks with confirmation
- ☑️ Mark tasks as complete/incomplete
- 💾 Persistent JSON file storage
- 📱 Responsive design for mobile and desktop
- 🎨 Clean, minimalist user interface

## 🛠️ Tech Stack

**Frontend:**
- React 18
- JavaScript (ES6+)
- CSS3
- HTML5

**Backend:**
- Node.js
- Express.js
- JSON file storage
- CORS middleware

## 📁 Project Structure

```
taskify/
│
├── backend/                        
│   ├── controllers/                
│   │   └── taskController.js      # Task CRUD operations
│   ├── data/                      
│   │   └── tasks.json             # JSON data storage
│   ├── routes/                    
│   │   └── tasks.js               # API routes
│   ├── server.js                  # Express server setup
│   └── package.json               
│
├── frontend/                      
│   ├── public/                   
│   │   └── index.html            
│   ├── src/
│   │   ├── components/           
│   │   │   ├── TaskForm.js       # Add/Edit task form
│   │   │   ├── TaskItem.js       # Individual task component
│   │   │   └── TaskList.js       # Task list container
│   │   ├── App.js                # Main App component
│   │   ├── index.js              # React entry point
│   │   └── styles.css            # Global styles
│   └── package.json              
│
├── README.md                     
├── .gitignore                   
└── .env                         
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Taskify
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   The server will start on http://localhost:5001

2. **Start the frontend development server** (in a new terminal)
   ```bash
   cd frontend
   npm start
   ```
   The React app will start on http://localhost:3000

3. **Open your browser**
   Navigate to http://localhost:3000 to use the application

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task by ID |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/health` | Health check endpoint |

### Example API Usage

**Create a new task:**
```bash
curl -X POST http://localhost:5001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn React", "description": "Complete React tutorial"}'
```

**Get all tasks:**
```bash
curl http://localhost:5001/api/tasks
```

**Update a task:**
```bash
curl -X PUT http://localhost:5001/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:5001/api/tasks/1
```

## 🚀 Deployment

The application is deployed using modern cloud platforms:

### Production URLs
- **Frontend**: https://kaleidoscopic-sopapillas-e4695c.netlify.app/
- **Backend**: https://taskify1-lwlb.onrender.com

### Deployment Stack
- **Frontend**: Netlify (Static Site Hosting)
- **Backend**: Render (Node.js Web Service)
- **Database**: JSON file storage (Note: ephemeral on Render)

### Deployment Steps
1. **Backend (Render)**:
   - Connected to GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment Variables: `FRONTEND_ORIGIN` set to Netlify URL

2. **Frontend (Netlify)**:
   - Connected to GitHub repository
   - Base Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `build`
   - Environment Variables: `REACT_APP_API_URL` set to Render backend URL

## 📚 Learning Concepts
```

## 🎯 Learning Objectives

This project is designed to help beginners understand:

- **Frontend-Backend Communication:** How React communicates with Express API
- **CRUD Operations:** Create, Read, Update, Delete functionality
- **State Management:** React hooks (useState, useEffect)
- **API Design:** RESTful API principles
- **Error Handling:** Frontend and backend error management
- **File System Operations:** Reading/writing JSON files
- **Component Architecture:** Breaking UI into reusable components

## 🔧 Development Tips

### Backend Development
- The server uses `nodemon` for automatic restarts during development
- Tasks are stored in `backend/data/tasks.json`
- All API routes are prefixed with `/api`
- CORS is enabled for frontend communication

### Frontend Development
- The frontend uses `react-scripts` for development server
- API calls use the proxy configuration to avoid CORS issues
- Components are modular and reusable
- CSS uses modern flexbox and responsive design

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `backend/server.js` or kill the process using the port

2. **API calls failing**
   - Ensure both frontend and backend servers are running
   - Check if the proxy setting in `frontend/package.json` is correct

3. **Tasks not persisting**
   - Verify that the `backend/data/` directory exists
   - Check file permissions for writing to `tasks.json`

## 🚀 Future Enhancements

- [ ] Add task categories/tags
- [ ] Implement task filtering (all, completed, pending)
- [ ] Add due dates and reminders
- [ ] Implement task search functionality
- [ ] Add user authentication
- [ ] Migrate to a proper database (PostgreSQL)
- [ ] Add TypeScript support
- [ ] Implement unit tests

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

This is a learning project, but contributions are welcome! Please feel free to submit issues or pull requests.

## 📞 Support

If you have any questions or run into issues, please create an issue in the repository or reach out for help.

---

**Happy coding! 🎉**# Deployment timestamp: Thu Sep 25 01:01:20 IST 2025
