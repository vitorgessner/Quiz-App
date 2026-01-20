// import { useQueryClient } from "@tanstack/react-query";
import type { NextQuizProps } from "../types/QuizTypes"

export const NextQuiz = ({ disabled, onClick }: NextQuizProps) => {
    return (
        <button className="mx-auto border-2 rounded-md py-2 px-3 mt-4 w-fit border-black
         bg-slate-600 text-white font-bold disabled:opacity-50 disabled:cursor-default"
            disabled={disabled}
            onClick={onClick}>Next Question</button>
    )
}