/*
import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore';
import './Tailwind.css'
 

const QuizApp = ({ app }) => {
  const db = getFirestore();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('useEffect is running...');

    const fetchRandomQuestions = async () => {
      try {
        console.log('Fetching questions...');
        const data = await getDocs(collection(db, 'QuizQuestions'));
        console.log('Fetching1questions...');
        const allQuestions = data.docs.map(doc => doc.data());
        console.log('All questions:', allQuestions);

  
        // Shuffle questions to get a random order
        const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
  
        // Select the first 3 questions
        const selectedQuestions = shuffledQuestions.slice(0, 3);
        setQuestions(selectedQuestions);
        setQuizCompleted(false);
        console.log('Questions loaded:', selectedQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    // Fetch questions
    fetchRandomQuestions();
  }, [db]);

  
  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);

    // Check if the selected answer is correct
    if (answerIndex === questions[currentQuestion]?.Correct_Answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      } else {
        // Quiz completed
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const renderQuizContent = () => (
    <div>
      <h3>Question {currentQuestion + 1}</h3>
      <p>{questions[currentQuestion]?.Question}</p>
      <div>
        <div>
        {[questions[currentQuestion]?.Option1, questions[currentQuestion]?.Option2].map(
          (option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              
            >
              {option}
            </button>
          )
        )}
        </div>
      </div>
      {selectedAnswer !== null && (
        <div>
          <p>
            {selectedAnswer === questions[currentQuestion]?.Correct_Answer
              ? 'Correct!'
              : 'Incorrect!'}
          </p>
          <p>
            Correct Answer: {questions[currentQuestion]?.Correct_Answer === 0
              ? questions[currentQuestion]?.Option1
              : questions[currentQuestion]?.Option2}
          </p>
        </div>
      )}
    </div>
  );

  const renderQuizCompleted = () => (
    // Content remains unchanged...
    <div>
      <h3>Quiz Completed</h3>
      <p>Your final score is: {score} out of {questions.length}</p>
    </div>
  );
  

  return (
    <div>
      <div>QUIZ</div>
      
      
      {loading ? (
        // Loading screen
        <p>Blah Blah</p>

      ) : quizCompleted ? (
        // Quiz completed screen
        renderQuizCompleted()
      ) : (
        // Quiz content
        renderQuizContent()
      )}
    </div>
  );
};

export default QuizApp;
*/

import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, query, where, doc, setDoc } from 'firebase/firestore';
import './common/Tailwind.css';
import Header from './common/Header';
 

const QuizApp = ({ app }) => {
  const db = getFirestore();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomQuestions = async () => {
      try {
        const data = await getDocs(collection(db, 'QuizQuestions'));
        const allQuestions = data.docs.map(doc => doc.data());
        const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
        const selectedQuestions = shuffledQuestions.slice(0, 3);
        setQuestions(selectedQuestions);
        setQuizCompleted(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomQuestions();
  }, [db]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);

    if (answerIndex === questions[currentQuestion]?.Correct_Answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const renderQuizContent = () => (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl mb-4">{`Question ${currentQuestion + 1}`}</h3>
      <p className="mb-8">{questions[currentQuestion]?.Question}</p>
      
      <div className="flex justify-center space-x-4">
        {["Option1", "Option2"].map((option, index) => (
          <div
            key={index}
            className={`bg-gray-300 p-4 rounded-md ${
              selectedAnswer !== null &&
              (selectedAnswer === questions[currentQuestion]?.Correct_Answer
                ? "bg-green-300"
                : "bg-red-300")
            }`}
          >
            <button
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className="w-full"
            >
              {questions[currentQuestion]?.[option]}
            </button>
          </div>
        ))}
      </div>

      {selectedAnswer !== null && (
        <div className="mt-4">
          <p className="text-xl">
            {selectedAnswer === questions[currentQuestion]?.Correct_Answer
              ? "Correct!"
              : "Incorrect!"}
          </p>
          <p>
            Correct Answer:{" "}
            {questions[currentQuestion]?.Correct_Answer === 0
              ? questions[currentQuestion]?.Option1
              : questions[currentQuestion]?.Option2}
          </p>
        </div>
      )}
    </div>
  );

  const renderQuizCompleted = () => (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl">Quiz Completed</h3>
      <p>Your final score is: {score} out of {questions.length}</p>
    </div>
  );

  return (
    <>
    <Header/>
    <div>
      {loading ? (
        <p>Loading questions...</p>
      ) : quizCompleted ? (
        renderQuizCompleted()
      ) : (
        renderQuizContent()
      )}
    </div>
    </>
  );
};

export default QuizApp;