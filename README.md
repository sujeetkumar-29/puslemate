# PulseMate - Healthcare Appointment Booking System

A comprehensive healthcare appointment booking platform that connects patients with doctors through an intuitive web interface. The system includes separate portals for patients, doctors, and administrators.

## 🏗️ Project Structure

```
sujeetkumar-29-puslemate/
├── frontend/          # Patient-facing React application
├── admin/            # Admin & Doctor dashboard React application  
├── backend/          # Node.js/Express API server
└── README.md         # Project documentation
```

## 🌟 Features

### Patient Portal (Frontend)
- Browse and search doctors by specialty
- View doctor profiles and ratings
- Book appointments with available doctors
- Manage personal appointments and profile
- FAQ section and contact information
- Responsive design with modern UI

### Admin Portal
- **Admin Dashboard**: Comprehensive system overview
- **Doctor Management**: Add, edit, and manage doctor profiles
- **Appointment Management**: View and manage all appointments
- **Analytics**: Track system usage and performance

### Doctor Portal
- **Doctor Dashboard**: Personal appointment overview
- **Appointment Management**: View and manage patient appointments
- **Profile Management**: Update personal and professional information

### Backend API
- RESTful API with authentication and authorization
- Secure file upload handling with Cloudinary integration
- MongoDB database integration
- Role-based access control (Admin, Doctor, User)

## 🛠️ Technology Stack

### Frontend & Admin
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Build Tool**: Vite
- **Linting**: ESLint

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **File Upload**: Multer middleware

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account for image storage

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sujeetkumar-29/puslemate.git
   cd sujeetkumar-29-puslemate
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Install Admin Panel Dependencies**
   ```bash
   cd ../admin
   npm install
   ```

### Environment Configuration

Create `.env` files in the backend directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Configuration
PORT=4000
```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run server
   ```

2. **Start the Frontend (Patient Portal)**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Start the Admin Panel**
   ```bash
   cd admin
   npm run dev
   ```

The applications will be available at:
- Frontend: `http://localhost:5173`
- Admin Panel: `http://localhost:5174`
- Backend API: `http://localhost:4000`

## 📁 Detailed Structure

### Backend Architecture
```
backend/
├── server.js              # Main server file
├── config/
│   ├── cloundinary.js     # Cloudinary configuration
│   └── mongodb.js         # MongoDB connection setup
├── controllers/           # Business logic controllers
├── middlewares/           # Authentication & file upload middleware
├── models/               # MongoDB data models
└── routes/               # API route definitions
```

### Frontend Components
```
frontend/src/
├── components/           # Reusable UI components
├── pages/               # Page-level components
├── context/             # React Context for state management
└── assets/              # Static assets and configurations
```

### Admin Panel Structure
```
admin/src/
├── components/          # Shared UI components (Navbar, Sidebar)
├── context/            # Context providers for different user roles
└── pages/
    ├── Admin/          # Admin-specific pages
    └── Doctor/         # Doctor-specific pages
```

## 🔐 Authentication & Authorization

The system implements role-based access control with three user types:

- **Users/Patients**: Can book appointments and manage their profile
- **Doctors**: Can manage their appointments and profile
- **Admins**: Full system access including user and doctor management

Authentication is handled through JWT tokens with role-specific middleware protection.

## 📊 API Endpoints

### User Routes
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Doctor Routes
- `GET /api/doctor/list` - Get all doctors
- `GET /api/doctor/profile` - Get doctor profile
- `PUT /api/doctor/profile` - Update doctor profile

### Admin Routes
- `POST /api/admin/add-doctor` - Add new doctor
- `GET /api/admin/appointments` - Get all appointments
- `GET /api/admin/dashboard` - Get dashboard statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Sujeet Kumar** - *Initial work* - [@sujeetkumar-29](https://github.com/sujeetkumar-29)

## 🙏 Acknowledgments

- React community for excellent documentation
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the excellent database solution
- All contributors who have helped with this project

## 📞 Support

For support, email sujeetkr503@gmail.com or create an issue in the GitHub repository.

---

**Happy Coding! 🚀**
