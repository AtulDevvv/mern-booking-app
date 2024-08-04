
import Layout from './Layout/Layout'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout>
        a
      </Layout>}/>
      <Route path="/search" element={<Layout>
        seach page
      </Layout>}/>
      <Route path="/register" element={<Layout>
      <Register/>
      </Layout>}/>
      <Route path="/sign-in" element={<Layout>
      <SignIn/>
      </Layout>}/>

      <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  )
}

export default App