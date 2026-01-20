import React, { createContext, useEffect, useState } from "react";

type Score = Record<string, { correct: number, incorrect: number }>;

type ScoreContextType = {
    score: Score;
    updateScore: (category: string, isCorrect: boolean) => void;
    resetScore: () => void;
};

const ScoreContext = createContext<ScoreContextType | null>(null);

export const ScoreProvider = ({children} : { children: React.ReactNode }) => {
    const [score, setScore] = useState<Score>(() => {
        const saved = localStorage.getItem('score');
        return saved ? JSON.parse(saved) : {};
    });

    useEffect(() => {
        localStorage.setItem('score', JSON.stringify(score));
    }, [score]);

    const updateScore = (category: string, isCorrect: boolean) => {
        setScore(prev => {
            const categoryScore = prev[category] ?? { correct: 0, incorrect: 0 };
            return {
                ...prev,
                [category]: {
                    ...categoryScore,
                    [isCorrect ? 'correct' : 'incorrect']:
                        categoryScore[isCorrect ? 'correct' : 'incorrect'] + 1
                }
            };
        });
    };

    const resetScore = () => setScore({});

    return (
        <ScoreContext.Provider value={{ score, updateScore, resetScore }}>
            {children}
        </ScoreContext.Provider>
    );
}

export default ScoreContext;