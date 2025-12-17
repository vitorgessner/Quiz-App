import type { AnswersProps, CardProps } from "../types/QuizTypes"

export const Answers = ({ quizState, setQuizState }: AnswersProps) => {
    return (
        <div className='grid grid-cols-2 gap-4 mx-9'>
            {quizState.answers.map((answer : string) => {
                if (answer === quizState.correct_answer) return <Card text={answer} quizState={quizState} setQuizState={setQuizState} />
                return <Card text={answer} quizState={quizState} setQuizState={setQuizState}/>
            }
            )}
        </div>
    )
}

const Card = ({ text, quizState, setQuizState }: CardProps) => {
    return (
        <article className={quizState.isAnswered ? (text === quizState.correct_answer ? 'border-green-500' : 'border-red-500') : 'border-white'}>
            <button
                onClick={() => {
                    console.log(text, quizState.correct_answer)
                    if (text === quizState.correct_answer) {
                        setQuizState((prev) => ({ ...prev, isAnswered: true, isCorrect: true }))
                    } else {
                        setQuizState((prev) => ({ ...prev, isAnswered: true, isCorrect: false }))
                    }
                }}>
                {text}
            </button>
        </article>
    )
}