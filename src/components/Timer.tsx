import { useEffect, useRef } from 'react'
import { Timer } from 'lucide-react';
import type { TimerProps } from '../types/QuizTypes';
import { decodeHtml } from '../utils/decodeHtml';

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
            setQuizState(prev => {
                if (!prev.category || !prev.score) return prev;

                const decodedCategory = decodeHtml(prev.category);
                
                return {...prev, isAnswered: true, 
                score: { ...prev.score, 
                    [decodedCategory]: { ...prev.score[decodedCategory], 
                        incorrect: prev.score[decodedCategory].incorrect + 1
                    }
                }
            }});
        }

        return () => {
            if (timerRef.current)
            clearInterval(timerRef.current);
            timerRef.current = null;
            setQuizState((prev) => ({...prev, isAnswered: true}))
        }
    }, [quizState.timer, quizState.isAnswered, setQuizState])



    return (
        <p className="timer"><Timer stroke="white" />
        {quizState.timer}
        </p>
    )
}