import { useMemo, useState } from 'react';
import { Category } from '../components/Category';
import { useQuery } from '@tanstack/react-query';
import { Question } from '../components/Question';
import { Answers } from '../components/Answers'
import { TimerComponent as Timer } from '../components/Timer';
import { NextQuiz } from '../components/NextQuiz';
import { getQuestion } from '../utils/api';
import type { QueryDataResults } from '../types/QuizTypes';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react'
import { Scoreboard } from '../components/Scoreboard';
import { CategorySelection } from '../components/CategorySelection';
import { useScore } from '../hooks/useScore';
import { transfromQuestion } from '../utils/transformQuestion';

export default function Quiz() {
    const [isAnswered, setIsAnswered] = useState(false);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    const { updateScore, resetScore } = useScore();

    const { data, isLoading, error, isRefetching } = useQuery<Array<QueryDataResults>>({
        queryKey: ['question', selectedCategory],
        queryFn: async () => {
            const results = selectedCategory ? await getQuestion(selectedCategory) : await getQuestion();
            return results.map(transfromQuestion);
        }
    })

    const currentQuestion = data?.[questionNumber];
    const answers = useMemo(() => {
        if (!currentQuestion) return [];
        return [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort();
    }, [currentQuestion])

    const handleAnswer = (isCorrect: boolean) => {
        if (!currentQuestion) return;
        setIsAnswered(true);
        updateScore(currentQuestion.category, isCorrect)
    };

    const handleNext = () => {
        if (questionNumber >= 49) {
            setQuestionNumber(0);
        } else {
            setQuestionNumber(prev => prev + 1);
        }
        setIsAnswered(false);
    }

    if (isRefetching) return <h2 className='text-center mt-5'>Loading questions...</h2>

    if (isLoading) return <h2 className='text-center mt-5'>Loading questions...</h2>

    if (error) return <h2 className='text-center mt-5'>Error loading questions: {error.message}</h2>

    return (
        <main>
            {data && (
                <div className='mainDivContainer'>
                    <main className='main'>
                        <Category category={currentQuestion?.category} />
                        <Question question={currentQuestion?.question} />
                        <Answers
                            answers={answers}
                            correctAnswer={currentQuestion?.correct_answer}
                            isAnswered={isAnswered}
                            onAnswer={handleAnswer} />
                        <Timer
                            isAnswered={isAnswered}
                            onTimeUp={() => handleAnswer(false)}
                            resetKey={questionNumber} />
                        <NextQuiz
                            disabled={!isAnswered}
                            onClick={handleNext} />
                        {isAnswered && <Link to="/" className="nextQuiz"><ArrowLeft size={15} /></Link>}
                        <CategorySelection
                            selectedCategory={selectedCategory}
                            onCategoryChange={setSelectedCategory}
                            disabled={!isAnswered} />
                        <button className='border-2 p-2 rounded-md absolute left-2 bottom-2' onClick={resetScore}>Reset Score</button>
                    </main>
                    <aside className='md:mx-auto md:w-max xl:my-4'>
                        <Scoreboard />
                    </aside>
                </div>
            )}
        </main>
    )
}