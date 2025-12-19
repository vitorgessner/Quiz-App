import { useCallback, useState } from 'react';
import { Category } from '../components/Category';
import { useQuery } from '@tanstack/react-query';
import { Question } from '../components/Question';
import { Answers } from '../components/Answers'
import { TimerComponent as Timer } from '../components/Timer';
import { NextQuiz } from '../components/NextQuiz';
import { getQuestion } from '../utils/api';
import type { QuizStateProps, QueryDataResults } from '../types/QuizTypes';
import { Link } from 'react-router';
import { ArrowLeft } from 'lucide-react'

export default function Quiz() {
    const [quizState, setQuizState] = useState<QuizStateProps>({
        isAnswered: false,
        isCorrect: null,
        answers: [],
        correct_answer: null,
        category: null,
        question: null
    });

    const { data, isLoading, error, refetch, isRefetching } = useQuery<QueryDataResults>({
        queryKey: ['question'],
        queryFn: getQuestion
    })

    const setAnswersArray = useCallback(() => {
        const answersArray: Array<string> | null = []
        if (data) {
            data.incorrect_answers.map((answer: string) => {
                answersArray.push(answer);
            })
            answersArray.push(data.correct_answer);
            answersArray.sort()

            if (quizState.answers.length === 0 && !quizState.correct_answer) {
                setQuizState({
                    ...quizState,
                    category: data.category,
                    question: data.question,
                    answers: answersArray ?? [],
                    correct_answer: data.correct_answer
                })
            }
        }
    }, [data, quizState]);

    if (isRefetching) return <h2 className='text-center mt-5'>Loading question...</h2>
    setAnswersArray();

    if (isLoading) return <h2 className='text-center mt-5'>Loading question...</h2>

    if (error) return <h2 className='text-center mt-5'>Error loading question: error.message</h2>

    return (
        <main>
            {data && (
                <div>
                    <Category quizState={quizState} />
                    <Question quizState={quizState} />
                    <Answers quizState={quizState} setQuizState={setQuizState} />
                    <Timer quizState={quizState} setQuizState={setQuizState} />
                    <NextQuiz quizState={quizState} setQuizState={setQuizState} refetch={refetch}/>
                    {quizState.isAnswered && <Link to="/" className="absolute left-1 top-1 p-1 w-fit opacity-70"><ArrowLeft size={15}/></Link>}
                </div>
            )}
        </main>
    )
}