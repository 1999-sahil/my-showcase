import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/homepage'

function App() {

  return (
    <main className='min-h-screen w-full bg-neutral-50 dark:bg-[#0e100f]'>
      <Router>
        <Routes>
          {/** Default Routes */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
