import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router'
import './index.css'
import MainPage from './pages/MainPage.tsx'
import Quiz from './pages/Quiz.tsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScoreProvider } from './contexts/ScoreContext.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ScoreProvider>
        <HashRouter>
          <Routes>
            <Route index element={<MainPage />} />
            <Route path="/quiz" element={<Quiz />} />
          </Routes>
        </HashRouter>
      </ScoreProvider>
    </QueryClientProvider>
  </StrictMode>,
)
