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
import { Scoreboard } from '../components/Scoreboard';

export default function Quiz() {
    const [quizState, setQuizState] = useState<QuizStateProps>({
        isAnswered: false,
        isCorrect: null,
        answers: [],
        correct_answer: null,
        category: null,
        question: null,
        questionNumber: 0,
        timer: 15,
        score: null,
    });

    const { data, isLoading, error, isRefetching } = useQuery<Array<QueryDataResults>>({
        queryKey: ['question'],
        queryFn: getQuestion
    })

    const setAnswersArray = useCallback(() => {
        let currentQuestion: QueryDataResults;

        if (data) {
            currentQuestion = data[quizState.questionNumber];
            const answersArray: Array<string> | null = []
            currentQuestion.incorrect_answers.map((answer: string) => {
                answersArray.push(answer);
            })
            answersArray.push(currentQuestion.correct_answer);
            answersArray.sort()

            if (quizState.answers.length === 0 && !quizState.correct_answer) {
                setQuizState({
                    ...quizState,
                    category: currentQuestion.category,
                    question: currentQuestion.question,
                    answers: answersArray ?? [],
                    correct_answer: currentQuestion.correct_answer
                })
            }
        }
    }, [data, quizState]);

    setAnswersArray();

    if (isRefetching) return <h2 className='text-center mt-5'>Loading questions...</h2>

    if (isLoading) return <h2 className='text-center mt-5'>Loading questions...</h2>

    if (error) return <h2 className='text-center mt-5'>Error loading questions: error.message</h2>

    return (
        <main>
            {data && (
                <div className='mx-9'>
                    <main>
                        <Category quizState={quizState} />
                        <Question quizState={quizState} />
                        <Answers quizState={quizState} setQuizState={setQuizState} />
                        <Timer quizState={quizState} setQuizState={setQuizState} />
                        <NextQuiz quizState={quizState} setQuizState={setQuizState} />
                        {quizState.isAnswered && <Link to="/" className="absolute left-1 top-1 p-1 w-fit opacity-70"><ArrowLeft size={15} /></Link>}
                    </main>
                    <aside>
                        <Scoreboard quizState={quizState} setQuizState={setQuizState}/>
                    </aside>
                </div>
            )}
        </main>
    )
}