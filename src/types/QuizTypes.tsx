import type { RefetchOptions, QueryObserverResult } from "@tanstack/react-query";

export type QuizStateProps = {
    isAnswered: boolean;
    isCorrect: boolean | null;
    answers: Array<string>;
    correct_answer: string | null;
    category: string | null;
    question: string | null;
};

export type QueryData = {
    results: Array<QueryDataResults>;
}

export type QueryDataResults = {
    type: string,
    difficulty: string
    category: string
    question: string
    correct_answer: string
    incorrect_answers: Array<string>
}

export type TimerProps = {
    quizState: QuizStateProps
    setQuizState: React.Dispatch<React.SetStateAction<QuizStateProps>>
}

export type AnswersProps = {
    quizState: QuizStateProps
    setQuizState: React.Dispatch<React.SetStateAction<QuizStateProps>>
}

export type CardProps = {
    text: string;
    quizState: QuizStateProps;
    setQuizState: React.Dispatch<React.SetStateAction<QuizStateProps>>;
}

export type NextQuizProps = {
    quizState: QuizStateProps,
    setQuizState: React.Dispatch<React.SetStateAction<QuizStateProps>>,
    refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<QueryDataResults, Error>>,
    // cb: () => void;
}