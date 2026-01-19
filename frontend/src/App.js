// import { BrowserRouter as Router,Route, Routes,  useLocation} from 'react-router-dom'
// import "bootstrap/dist/css/bootstrap.min.css";


// import Contant from './component/Contant.js'
// import Naveber from './component/Naveber.js'
// import HomePage from './component/HomePage.js'
// import Footer from './component/Footer.js'
// import Signup from './component/Signup.js'
// import Login from './component/Login.js'
// import Logout from './component/Logout.js'
// import AuthForm from './component/AuthForm.js';
// import VoiceLoop from './component/voice/VoiceLoop.js';

// function App () {
//   return (
//     <>
//       <Naveber />
//       <Routes>
//         <Route path='/' element={<HomePage />} />
//         <Route path='/contant' element={<Contant />} />
//         <Route path='/footer' element={<Footer />} />
//         <Route path='/signup' element={<Signup />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/logout' element={<Logout />} />
//         <Route path='/form' element={<AuthForm />} />
//         <Route path='/voic' element={<VoiceLoop />} />



//       </Routes>
//     </>
//   )
// }

// export default App

import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom"; // NO Router here

import { AuthProvider } from "./context/AuthProvider";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./ScrollToTop";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MidPage from "./pages/MidPage";
import IntervewPage from "./pages/IntervewPage";
import Profile from "./pages/Profile";
import Setting from "./pages/Setting";
import Score from "./pages/Score";
import History from "./pages/History";

// Components
import SignupForm from "./components/SignupForm";
import VoiceAssistant from "./pages/voice/VoiceLoop";
import EmotionDetection from "./components/EmotionDetection";
import SpeakQuestions from "./components/Speck";
import InterviewQA from "./components/InterviewQA";

const App = () => {
  return (
    <AuthProvider>
      <ScrollToTop />

      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/java" element={<IntervewPage />} />
            <Route path="/voic" element={<VoiceAssistant />} />
            <Route path="/signup" element={<SignupForm />} />

            <Route path="/midPage/:id" element={<MidPage />} />
            <Route path="/inter/:id" element={<IntervewPage />} />

            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Setting />} />

            <Route path="/cama" element={<EmotionDetection />} />
            <Route path="/speck" element={<SpeakQuestions />} />
            <Route path="/interview" element={<InterviewQA />} />

            <Route path="/score" element={<Score />} />
            <Route path="/history/:id" element={<History />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;

