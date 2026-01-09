import type { AnswersProps, CardProps } from "../types/QuizTypes"
import { decodeHtml } from "../utils/decodeHtml"

export const Answers = ({ quizState, setQuizState }: AnswersProps) => {
    return (
        <div className='grid grid-cols-2 gap-4'>
            {quizState.answers.map((answer : string) => {
                if (answer === quizState.correct_answer) return <Card key={answer} text={answer} quizState={quizState} setQuizState={setQuizState}/>
                return <Card key={answer} text={answer} quizState={quizState} setQuizState={setQuizState}/>
            }
            )}
        </div>
    )
}

const handleClick = ({text, quizState, setQuizState } : CardProps) => {
    if (text === quizState.correct_answer) {
        setQuizState(prev => { 
            const category = prev.category && decodeHtml(prev.category);
            if (!category) return prev;
            if (!prev.score) return prev;

            const categoryScore = prev.score[category] ?? {
                correct: 0,
                incorrect: 0
            }
            return {...prev, isAnswered: true, 
            score: { ...prev.score, 
                [category]: { ...categoryScore, 
                    correct: categoryScore.correct + 1 } } }})
    } else {
        setQuizState(prev => { 
            const category = prev.category && decodeHtml(prev.category);
            if (!category) return prev;
            if (!prev.score) return prev;

            const categoryScore = prev.score[category] ?? {
                correct: 0,
                incorrect: 0
            }
            return {...prev, isAnswered: true, 
            score: { ...prev.score, 
                [category]: { ...categoryScore, 
                    incorrect: categoryScore.incorrect + 1 } } }})
    }
}

const Card = ({ text, quizState, setQuizState }: CardProps) => {
    const decodedString = decodeHtml(text);
    return (
        <article className={quizState.isAnswered ? (text === quizState.correct_answer ? 'border-green-500 opacity-70' : 'border-red-500 opacity-70') : 'border-gray-400'}>
            <button className="cardButton" disabled={quizState.isAnswered} onClick={() => handleClick({ text, quizState, setQuizState })}>{decodedString}</button>
        </article>
    )
}