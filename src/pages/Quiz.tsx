import { Timer } from 'lucide-react';
import { Category } from '../components/Category';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Question } from '../components/Question';
import { Answers } from '../components/Card'

const queryClient = new QueryClient();

export default function Quiz() {
    return (
        <main>
            <QueryClientProvider client={queryClient}>
                <Category />
                <Question />
                <Answers />
            <p className="mt-8 flex items-center gap-1 justify-center"><Timer stroke="white" />01:00</p>
            </QueryClientProvider>
        </main>
    )
}