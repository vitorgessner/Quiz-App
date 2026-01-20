import { useEffect, useState } from 'react'
import { Timer } from 'lucide-react';
import type { TimerProps } from '../types/QuizTypes';

export const TimerComponent = ({ isAnswered, onTimeUp, resetKey } : TimerProps) => {
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        if (isAnswered) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    onTimeUp();
                    return 0;
                }
                return prev - 1;
            })
        }, 1000);

        return () => clearInterval(interval);
    }, [isAnswered, onTimeUp]);

    useEffect(() => {
        setTimeLeft(15);
    }, [resetKey]);

    return (
        <p className="timer"><Timer stroke="white" />
        {timeLeft}
        </p>
    )
}