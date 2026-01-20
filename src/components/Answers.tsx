import type { AnswersProps, CardProps } from "../types/QuizTypes"

export const Answers = ({ answers, correctAnswer, isAnswered, onAnswer }: AnswersProps) => {
    return (
        <div className='grid grid-cols-2 gap-4'>
            {answers.map((answer: string) => {
                return <Card key={answer} answer={answer} correctAnswer={correctAnswer} onAnswer={onAnswer} isAnswered={isAnswered} />
            }
            )}
        </div>
    )
}

const handleClick = ({ answer, correctAnswer, onAnswer }: { answer: string, correctAnswer: string, onAnswer: (isCorrect: boolean) => void }) => {
    const isCorrect = answer === correctAnswer;
    onAnswer(isCorrect);
}

const Card = ({ answer, correctAnswer, onAnswer, isAnswered }: CardProps) => {
    return (
        <article className={isAnswered ? (answer === correctAnswer ? 'border-green-500 opacity-70' : 'border-red-500 opacity-70') : 'border-gray-400'}>
            <button className="cardButton" disabled={isAnswered} onClick={() => {
                if (correctAnswer)
                handleClick({ answer, correctAnswer, onAnswer })
            }}>{answer}</button>
        </article>
    )
}