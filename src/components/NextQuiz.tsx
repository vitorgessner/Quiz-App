import type { NextQuizProps } from "../types/QuizTypes"

export const NextQuiz = ({quizState, setQuizState, refetch} : NextQuizProps) => {
    return (
        <button className="mx-auto border-2 rounded-md py-2 px-3 mt-4 w-fit border-black
         bg-slate-600 text-white font-bold disabled:opacity-50 disabled:cursor-default"
                disabled={!quizState.isAnswered}
                onClick={async () => {
                    await refetch()
                    setQuizState({
                        ...quizState,
                        isAnswered: false,
                        answers: [],
                        category: null,
                        correct_answer: null,
                        isCorrect: false,
                        question: null,
                    })
                }}>Next Question</button>
    )
}