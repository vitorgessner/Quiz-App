import { useQueryClient } from "@tanstack/react-query";
import type { NextQuizProps } from "../types/QuizTypes"

export const NextQuiz = ({ quizState, setQuizState }: NextQuizProps) => {
    const queryClient = useQueryClient();
    return (
        <button className="mx-auto border-2 rounded-md py-2 px-3 mt-4 w-fit border-black
         bg-slate-600 text-white font-bold disabled:opacity-50 disabled:cursor-default"
            disabled={!quizState.isAnswered}
            onClick={async () => {
                if (quizState.questionNumber >= 49) {
                    await queryClient.invalidateQueries({queryKey: ['question']});

                    return setQuizState({
                        ...quizState,
                        isAnswered: false,
                        answers: [],
                        category: null,
                        correct_answer: null,
                        isCorrect: false,
                        question: null,
                        questionNumber: 0,
                        timer: 15,
                    })
                }

                return setQuizState({
                    ...quizState,
                    isAnswered: false,
                    answers: [],
                    category: null,
                    correct_answer: null,
                    isCorrect: false,
                    question: null,
                    questionNumber: quizState.questionNumber + 1,
                    timer: 15
                })
            }}>Next Question</button>
    )
}