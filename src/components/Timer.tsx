import { useEffect, useRef } from 'react'
import { Timer } from 'lucide-react';
import type { TimerProps } from '../types/QuizTypes';

export const TimerComponent = ({quizState, setQuizState} : TimerProps) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        setQuizState((prev) => ({...prev, isAnswered: false}));
        if (!timerRef.current) {
            timerRef.current = setInterval(() => {
                setQuizState((prev) => ({...prev, timer: prev.timer - 1}));
            }, 1000)
        }

        if (quizState.isAnswered && timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setQuizState((prev) => ({...prev, isAnswered: true}))
        }

        if (quizState.timer < 1 && timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setQuizState((prev) => ({...prev, isAnswered: true, isCorrect: false, 
                score: { ...prev.score, 
                    [prev.category]: { ...prev.score[prev.category], 
                        incorrect: prev.score[prev.category].incorrect + 1
                    }
                }
            }));
        }

        return () => {
            if (timerRef.current)
            clearInterval(timerRef.current);
            timerRef.current = null;
            setQuizState((prev) => ({...prev, isAnswered: true, isCorrect: false}))
        }
    }, [quizState.timer, quizState.isAnswered, setQuizState])



    return (
        <p className="mt-8 flex items-center gap-1 justify-center"><Timer stroke="white" />
        {quizState.timer}
        </p>
    )
}