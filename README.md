# 🎬 MovieMate

A modern, responsive movie database web application built with React and Node.js, featuring a beautiful UI with light/dark mode toggle.

## ✨ Features

- **🎭 Movie Search**: Search for movies using the TMDb API
- **📱 Responsive Design**: Optimized for mobile, tablet, and desktop
- **🌙 Dark/Light Mode**: Beautiful theme toggle with persistent settings
- **🎨 Modern UI**: Clean, modern interface with smooth animations
- **📖 Movie Details**: Detailed movie information with posters and descriptions
- **🔍 Real-time Search**: Instant search results as you type
- **📱 Mobile-First**: 3 cards per row on mobile/tablet, 5 on desktop

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern UI framework
- **React Router** - Client-side routing
- **CSS3** - Custom styling with CSS variables
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### APIs
- **TMDb API** - Movie database and search

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TMDb API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Chandrakancharla/MovieMate.git
   cd MovieMate
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in the root directory
   echo "TMDB_API_KEY=your_tmdb_api_key_here" > .env
   ```
   
   Get your TMDb API key from: https://www.themoviedb.org/settings/api

4. **Start the development servers**
   ```bash
   # Start backend server (from root directory)
   npm start
   
   # Start frontend server (in a new terminal, from root directory)
   cd frontend
   npm start
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📱 Responsive Design

- **Mobile (≤480px)**: 3 movie cards per row
- **Tablet (768px-1023px)**: 3 movie cards per row
- **Desktop (1024px+)**: 5 movie cards per row

## 🎨 Features in Detail

### Light/Dark Mode
- Toggle between light and dark themes
- Settings persist across browser sessions
- Smooth transitions between themes

### Movie Search
- Real-time search functionality
- Displays movie posters, titles, and release years
- Click on any movie card to view detailed information

### Movie Details
- Comprehensive movie information
- High-quality movie posters
- Back navigation to home page

### Responsive Layout
- Mobile-first design approach
- Optimized for all screen sizes
- Touch-friendly interface

## 🏗️ Project Structure

```
Movie-Database/
├── backend/
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
├── frontend/
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   ├── App.css        # Main styles
│   │   └── themes.js      # Theme management
│   └── package.json       # Frontend dependencies
├── .env                   # Environment variables
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:
```
TMDB_API_KEY=your_tmdb_api_key_here
```

### API Endpoints
- `GET /api/search?query=movie_name` - Search movies
- `GET /api/movie/:id` - Get movie details

## 🚀 Deployment

### Frontend (React)
```bash
cd frontend
npm run build
```

### Backend (Node.js)
Deploy to platforms like:
- Heroku
- Vercel
- Railway
- Render

## 🔒 Security Notes

### Frontend Dependencies
The frontend has some security vulnerabilities in development dependencies. To fix them:

```bash
cd frontend
npm audit fix --force
```

**Note**: This may update `react-scripts` to a newer version, which could introduce breaking changes. Test thoroughly after updating.

### Environment Variables
- Never commit your `.env` file to version control
- Use environment variables for all sensitive data
- The backend will exit if `TMDB_API_KEY` is not configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDb](https://www.themoviedb.org/) for providing the movie database API
- [React](https://reactjs.org/) for the amazing frontend framework
- [Express](https://expressjs.com/) for the robust backend framework

## 📞 Contact

- **GitHub**: [@Chandrakancharla](https://github.com/Chandrakancharla)
- **Project Link**: [https://github.com/Chandrakancharla/MovieMate](https://github.com/Chandrakancharla/MovieMate)

---

Made with ❤️ by Chandrakancharla 