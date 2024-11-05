"use client";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { questionsAtom } from "@/store";
import { toast } from "react-hot-toast";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

export default function StudentDashboard() {
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions");
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        toast.error("Failed to fetch questions. Please try again later.");
      }
    };
    fetchQuestions();
  }, [setQuestions]);

  const handleAnswer = (answerIndex: number) => {
    setAnswers([...answers, answerIndex]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score++;
      }
    });
    return (score / questions.length) * 100;
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
            <p className="text-lg mb-4">Your score: {calculateScore()}%</p>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div key={index} className="p-4 border rounded">
                  <p className="font-medium">{q.question}</p>
                  <p className="text-green-600">
                    Correct answer: {q.options[q.correctAnswer]}
                  </p>
                  <p
                    className={
                      answers[index] === q.correctAnswer
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    Your answer: {q.options[answers[index]]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <h2 className="text-xl font-semibold mb-4">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className="w-full p-3 text-left border rounded hover:bg-gray-50"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
