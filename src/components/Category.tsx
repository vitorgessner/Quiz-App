import type { QuizStateProps } from "../types/QuizTypes"

export const Category = ({quizState} : {quizState : QuizStateProps}) => {
    return (
        <p className="text-center mt-16 text-2xl font-bold">{quizState.category}</p>
    )
}