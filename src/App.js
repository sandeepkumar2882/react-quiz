import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Play from './components/Quiz/Play';
import QuizInstructions from './components/Quiz/QuizInstructions';
import QuizSummary from './components/Quiz/QuizSummary';
import ErrorPage from './components/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/play/instructions' element={<QuizInstructions />} />
        <Route path='/play/quiz' element={<Play />} />
        <Route path='/play/summary' element={<QuizSummary />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;