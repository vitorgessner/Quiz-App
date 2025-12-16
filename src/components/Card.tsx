import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getQuestion } from "../utils/api";
import { useState } from "react";

type CardProps = {
    text: string;
    isCorrect: boolean;
    isAnswered: boolean;
    setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>
}

export const Answers = () => {
    const [isAnswered, setIsAnswered] = useState(false);
    // const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['question'],
        queryFn: getQuestion
    })

    const answers : Array<string> = []
    query.data?.results[0].incorrect_answers.forEach((answer: string) => answers.push(answer))
    answers.push(query.data?.results[0].correct_answer);
    answers.sort()

    return (
        <div className='grid grid-cols-2 gap-4 mx-9'>
            {answers.map((answer) => {
                if (answer === query.data?.results[0].correct_answer) return <Card text={answer} isCorrect={true} isAnswered={isAnswered} setIsAnswered={setIsAnswered}/>
                return <Card text={answer} isCorrect={false} isAnswered={isAnswered} setIsAnswered={setIsAnswered}/>
            }
            )}
        </div>
    )
}

const Card = ({text, isCorrect, isAnswered, setIsAnswered}: CardProps) => {
    return (
        <article className={isAnswered ? (isCorrect ? 'border-green-500' : 'border-red-500') : 'border-white'}>
            <button 
            onClick={() => setIsAnswered(true)}>
                {text}
            </button>
        </article>
    )
}