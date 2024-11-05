"use client";
import { useState } from "react";
import { useAtom } from "jotai";
import { questionsAtom } from "@/store";
import { toast } from "react-hot-toast";

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export default function InstructorDashboard() {
  const [questions, setQuestions] = useAtom(questionsAtom);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
  });

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentQuestion({
      ...currentQuestion,
      question: e.target.value,
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({
      ...currentQuestion,
      options: newOptions,
    });
  };

  const handleCorrectAnswerChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentQuestion({
      ...currentQuestion,
      correctAnswer: parseInt(e.target.value),
    });
  };

  const addQuestion = async () => {
    if (
      currentQuestion.question &&
      currentQuestion.options.every((opt) => opt)
    ) {
      try {
        const response = await fetch("/api/questions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(currentQuestion),
        });
        const data = await response.json();
        if (response.ok) {
          setQuestions([...questions, data]);
          setCurrentQuestion({
            question: "",
            options: ["", "", "", ""],
            correctAnswer: 0,
          });
          toast.success("Question created successfully!");
        } else {
          toast.error("Failed to create question. Please try again.");
        }
      } catch (error) {
        toast.error("An error occurred while creating the question.");
      }
    } else {
      toast.error("Please fill in all the fields correctly.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create Quiz</h1>
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Question
            </label>
            <input
              type="text"
              value={currentQuestion.question}
              onChange={handleQuestionChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your question"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Options
            </label>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correct Answer
            </label>
            <select
              value={currentQuestion.correctAnswer}
              onChange={handleCorrectAnswerChange}
              className="w-full p-2 border rounded"
            >
              {currentQuestion.options.map((_, index) => (
                <option key={index} value={index}>
                  Option {index + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={addQuestion}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Added Questions</h2>
          {questions.map((q, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <p className="font-medium">{q.question}</p>
              <ul className="ml-4 mt-2">
                {q.options.map((option, optIndex) => (
                  <li
                    key={optIndex}
                    className={
                      optIndex === q.correctAnswer ? "text-green-600" : ""
                    }
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
