import type { QuizStateProps } from "./QuizTypes";

export type CategoryDataResults = {
    id: number;
    name: string;
}

export type ScoreboardProps = {
    quizState: QuizStateProps;
    setQuizState: React.Dispatch<React.SetStateAction<QuizStateProps>>;
}