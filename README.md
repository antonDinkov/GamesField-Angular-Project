# 🎮 GamesField

## 📌 Description
GamesField is a web application for discovering, playing, and sharing games.  
Users can:
- Browse the game catalog
- View details for each game
- Play games
- Like games
- Create games
- Play only high rating games
- Track their last played game (**Last Played**)
- Manage their profile and favorites list

## 🚀 Technologies
### Front-End:
- **Angular** (Standalone Components, RxJS, BehaviorSubject, Redux, Geolocation, Angular Animation, Unit tests, Guards, etc.)
- HTML5 / CSS3
- TypeScript
- Deployment - GitHub Pages

### Back-End:
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- Cloud - Cloudinary for Profile pictures
- Cloud - Atlas for JSON
- Deployment - Render.com
- JWT Authentication

## 🗄️ Architecture
frontend/
├── src/app/
│ ├── core/ # Services, guards, interceptors, pipes
│ ├── shared/ # Common, error-page, footer, navigation, utils
│ ├── features/ # Home, details, profile, auth, catalog, filter, search, create
│ └── models/ # BackendError, delete, game, gameDetailsResponse, user
backend/
├── src/
│ ├── controllers/ # Handle HTTP requests
│ ├── services/ # Business logic
│ ├── models/ # Mongoose schemas
│ └── routes/ # API routes definitions

## 🔑 Key Features
- 🔹 **User Registration / Login**
- 🔹 **Game Catalog**
- 🔹 **Game Details**
- 🔹 **Edit Delete**
- 🔹 **Likes, View and Play Count**
- 🔹 **Last Played Game**
- 🔹 **User Profile**
- 🔹 **Edit Delete Picture Upload**

## ⚙️ Installation & Setup
Frontend:
npm install

Back-End:
npm install

Start the backend server:
npm start
Start the Angular application:
ng serve
Start tests:
npm run tests

ENJOY!
