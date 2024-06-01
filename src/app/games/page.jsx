"use client";

import { useState, useEffect } from 'react';
import { startConfetti } from '../../../utils/confetti';
import Footer from '../../../utils/Footer';
import Navbar from '../../../utils/Navbar';

const questions = [
  {
    question: [
      "2x + 3y - z = 6",
      "x + 2y - 4z = 8",
      "x + y + 4z = 4"
    ],
    answer: { x: 1, y: 2, z: -1 }
  },
  {
    question: [
      "3x + 4y + z = 10",
      "2x - y + 3z = 5",
      "x + y - 2z = 1"
    ],
    answer: { x: 1, y: 2, z: 1 }
  },
  {
    question: [
      "x - y + z = 4",
      "2x + y - z = 6",
      "3x + y + z = 9"
    ],
    answer: { x: 1, y: 2, z: 1 }
  },
  {
    question: [
      "2x + y - 3z = 7",
      "x - 4y + z = 3",
      "x + 2y + z = 6"
    ],
    answer: { x: 1, y: 1, z: -1 }
  },
  {
    question: [
      "x + y + z = 6",
      "2x - y + 3z = 14",
      "x + 2y - z = 5"
    ],
    answer: { x: 1, y: 2, z: 3 }
  }
];

function getRandomQuestions() {
  return questions.sort(() => 0.5 - Math.random());
}

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    setShuffledQuestions(getRandomQuestions());
  }, []);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleButtonClick = () => {
    setShowQuestion(true);
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const checkAnswer = () => {
    const userValues = userAnswer.replace(/\s+/g, '').split(',').map(Number);
    if (userValues.length === 3 &&
        userValues[0] === currentQuestion.answer.x &&
        userValues[1] === currentQuestion.answer.y &&
        userValues[2] === currentQuestion.answer.z) {
      startConfetti();
      setFeedback("Jawaban Anda Benar!");
    } else {
      setFeedback("Jawaban Anda Salah. Coba Lagi.");
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setUserAnswer("");
      setFeedback("");
    } else {
      setFeedback("Selamat, Anda telah menyelesaikan semua soal!");
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar className="sticky top-0 " />
      <div className="flex flex-col items-center justify-center flex-grow bg-gray-100">
        <div className='p-10 bg-white shadow-lg rounded-lg w-full max-w-2xl'>
          {!showQuestion ? (
            <div className="flex flex-col items-center">
              <p className='font-bold text-3xl text-primary mb-8'>Press Start</p>
              <button onClick={handleButtonClick} className='btn btn-secondary py-2 px-16 rounded-full'>Start</button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <p className='font-bold text-3xl text-primary mb-4 '>
                {feedback === "Jawaban Anda Benar!" ? "Jawaban Anda Benar!" : "Jawab Pertanyaan Ini !"}
              </p>
              <div className="text-center mb-10">
                {currentQuestion?.question.map((line, index) => (
                  <p key={index} className="text-lg">{line}</p>
                ))}
              </div>
              {feedback !== "Jawaban Anda Benar!" && (
                <input
                  type="text"
                  value={userAnswer}
                  onChange={handleInputChange}
                  className='input input-bordered w-full max-w-xs mb-4'
                  placeholder='Masukkan jawaban sebagai x,y,z'
                />
              )}
              {feedback === "Jawaban Anda Benar!" && (
                <div className="text-center mb-4">
                  <p className="text-lg font-bold">x = {currentQuestion.answer.x}, y = {currentQuestion.answer.y}, z = {currentQuestion.answer.z}</p>
                </div>
              )}
              <button
                onClick={feedback === "Jawaban Anda Benar!" ? nextQuestion : checkAnswer}
                className='btn btn-secondary py-2 px-14 rounded-full mb-4'
              >
                {feedback === "Jawaban Anda Benar!" ? "Next" : "Submit"}
              </button>
              {feedback && feedback !== "Jawaban Anda Benar!" && (
                <div className="mt-4">
                  <p className={`font-bold text-lg ${feedback === "Jawaban Anda Benar!" ? 'text-green-500' : 'text-red-500'}`}>{feedback}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className='py-2 text-center fixed bottom-0 right-0 left-0  '>

      <Footer className=" text-white " />
      </div>
    </div>
  );
}
