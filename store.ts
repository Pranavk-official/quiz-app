import { atom } from "jotai";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

export const questionsAtom = atom<Question[]>([]);
