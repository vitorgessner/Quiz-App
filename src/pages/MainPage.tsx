import { Link } from 'react-router';

function MainPage() {
  return (
    <>
      <h1 className="text-center mt-20">Quiz App</h1>
      <p className="text-center mt-8">Guess some trivia :)</p>
      <Link to="/quiz" className="my-8 mx-auto">Start</Link>
    </>
  )
}

export default MainPage
