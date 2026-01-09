export type QuizStateProps = {
    isAnswered: boolean;
    isCorrect: boolean | null;
    answers: Array<string>;
    correct_answer: string | null;
    category: string | null;
    question: string | null;
    questionNumber: number;
    timer: number;
    score: Record<string, Record<string, number>> | null
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
    quizState: QuizStateProps
    setQuizState: React.Dispatch<React.SetStateAction<QuizStateProps>>
}

export type AnswersProps = TimerProps

export type CardProps = TimerProps & {
    text: string;
}

export type NextQuizProps = TimerProps