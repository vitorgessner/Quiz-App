import { useEffect, useRef, useState } from 'react'
import { Timer } from 'lucide-react';
import type { TimerProps } from '../types/QuizTypes';

export const TimerComponent = ({quizState, setQuizState} : TimerProps) => {
    const [time, setTime] = useState<number>(15);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        setQuizState((prev) => ({...prev, isAnswered: false}));
        if (!timerRef.current) {
            timerRef.current = setInterval(() => {
                setTime((prev) => prev - 1);
            }, 1000)
        }

        if (quizState.isAnswered && timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setQuizState((prev) => ({...prev, isAnswered: true}))
        }

        if (time < 1 && timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setQuizState((prev) => ({...prev, isAnswered: true, isCorrect: false}));
        }

        return () => {
            if (timerRef.current)
            clearInterval(timerRef.current);
            timerRef.current = null;
            setQuizState((prev) => ({...prev, isAnswered: true, isCorrect: false}))
        }
    }, [time, quizState.isAnswered, setQuizState])



    return (
        <p className="mt-8 flex items-center gap-1 justify-center"><Timer stroke="white" />
        {time}
        </p>
    )
}