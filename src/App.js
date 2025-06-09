// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import "./App.css";
// import Sidebar from "./components/Sidebar";
// import Footer from "./components/Footer";
// import Carousel from "./components/Carousel";
// import MoodTracker from "./components/MoodTracker";
// import Chatbot from "./components/Chatbot";
// import TherapyBooking from "./pages/TherapyBooking";
// import StressRelief from "./components/StressRelief/StressRelief";
// import { refreshToken } from "./auth";

// // Import pages
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";

// // Import Stress Relief Activities
// import Games from "./components/StressRelief/Games/Games";
// import MemoryMatch from "./components/StressRelief/Games/MemoryMatch";
// import BubblePop from "./components/StressRelief/Games/BubblePop";
// import BalloonPopGame from "./components/StressRelief/Games/BalloonPopGame";
// import MentalHealthEducation from "./components/StressRelief/Education/MentalHealthEducation";
// import CBTExercises from "./components/StressRelief/CBT/CBTExercises";

// // Function to check authentication properly
// const isAuthenticated = () => {
//   const token = localStorage.getItem("accessToken");
//   return token !== null && token !== "undefined";
// };

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());

//   // Refresh Token on App Load
//   useEffect(() => {
//     const refreshUserToken = async () => {
//       const newToken = await refreshToken();
//       if (newToken) {
//         setIsLoggedIn(true);
//       } else {
//         setIsLoggedIn(false);
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//       }
//     };
//     refreshUserToken();
//   }, []);

//   return (
//     <Router>
//       <div className="App">
//         {/* Sidebar remains visible for easy navigation */}
//         <Sidebar />

//         {/* Main Content Area */}
//         <div className="main-content">
//           <Routes>
//             {/* Public Routes (Accessible without login) */}
//             <Route path="/" element={<><Home /><Carousel /></>} />
//             <Route path="/about" element={<About />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />

//             {/* Protected Routes (Require authentication) */}
//             <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
//             <Route path="/mood-tracker" element={isLoggedIn ? <MoodTracker /> : <Navigate to="/login" />} />
//             <Route path="/chat" element={isLoggedIn ? <Chatbot /> : <Navigate to="/login" />} />
//             <Route path="/therapy-booking" element={isLoggedIn ? <TherapyBooking /> : <Navigate to="/login" />} />

//             {/* Stress Relief Routes */}
//             <Route path="/stress-relief" element={<StressRelief />} />
//             <Route path="/stress-relief/games" element={<Games />} />
//             <Route path="/stress-relief/games/memory" element={<MemoryMatch />} />
//             <Route path="/stress-relief/games/bubblepop" element={<BubblePop />} />
//             <Route path="/stress-relief/games/balloonpop" element={<BalloonPopGame />} />
//             <Route path="/stress-relief/education" element={<MentalHealthEducation />} />
//             <Route path="/stress-relief/cbt" element={<CBTExercises />} />

//             {/* Redirect unknown routes to Home */}
//             <Route path="*" element={<Navigate to="/" />} />
//           </Routes>

//           {/* Footer remains constant */}
//           <Footer />
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;



import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Components
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Carousel from "./components/Carousel";
import Chatbot from "./components/Chatbot";
import TherapyBooking from "./pages/TherapyBooking";
import MoodTracker from "./components/Moodtracker";
import StressRelief from "./components/StressRelief/StressRelief";

// Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Stress Relief Activities
import Games from "./components/StressRelief/Games/Games";
import MemoryMatch from "./components/StressRelief/Games/MemoryMatch";
import BubblePop from "./components/StressRelief/Games/BubblePop";
import DoodleCanvas from "./components/StressRelief/Games/DoodleCanvas";
import BalloonPopGame from "./components/StressRelief/Games/BalloonPopGame";
import WordFlowPuzzle from "./components/StressRelief/Games/Wordflow";
import MentalHealthEducation from "./components/StressRelief/Education/MentalHealthEducation";
import CBTExercises from "./components/StressRelief/CBT/CBTExercises";
import WordScrambleGame from "./components/StressRelief/Games/Wordscramble";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Sidebar remains visible for easy navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<><Home /><Carousel /></>} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Now all routes are public */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/mood-tracker" element={<MoodTracker />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/therapy-booking" element={<TherapyBooking />} />

            {/* Stress Relief */}
            <Route path="/stress-relief" element={<StressRelief />} />
            <Route path="/stress-relief/games" element={<Games />} />
            <Route path="/stress-relief/games/memory" element={<MemoryMatch />} />
            <Route path="/stress-relief/games/bubblepop" element={<BubblePop />} />
            <Route path="/stress-relief/games/wordflowpuzzle" element={<WordFlowPuzzle />} />
            <Route path="/stress-relief/games/wordscramble" element={<WordScrambleGame />} />
            <Route path="/stress-relief/games/doodlecanvas" element={<DoodleCanvas />} />
            <Route path="/stress-relief/games/balloonpop" element={<BalloonPopGame />} />
            <Route path="/stress-relief/education" element={<MentalHealthEducation />} />
            <Route path="/stress-relief/cbt" element={<CBTExercises />} />

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

          {/* Footer always visible */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

