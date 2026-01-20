import type React from "react";

export type QuizStateProps = {
    isAnswered: boolean;
    isCorrect: boolean | null;
    answers: Array<string>;
    correct_answer: string | null;
    category: string | null;
    question: string | null;
    questionNumber: number;
    timer: number;
    score: Record<string, Record<string, number>> | null;
    categoryId: number | null 
};

export type QueryDataResults = {
    type: string,
    difficulty: string
    category: string
    question: string
    correct_answer: string
    incorrect_answers: Array<string>
}

export type TimerProps = {
    isAnswered: boolean;
    onTimeUp: () => void;
    resetKey: number
}

export type AnswersProps = {
    answers: Array<string>;
    correctAnswer: string | undefined;
    isAnswered: boolean;
    onAnswer: (isCorrect: boolean) => void;

}

export type CardProps = {
    answer: string;
    correctAnswer: string | undefined;
    // category: string;
    onAnswer: (isCorrect: boolean) => void;
    isAnswered: boolean
}

export type NextQuizProps = {
    disabled: boolean;
    onClick: () => void;
}

export type CategorySelectionProps = {
    selectedCategory: number | null;
    onCategoryChange: React.Dispatch<React.SetStateAction<number | null>>;
    disabled: boolean
}