
import Layout from './Layout/Layout'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import AddHotel from './pages/AddHotel';
import { useAppContext } from './contexts/AppContext';

function App() {
  const {isLoggedIn} = useAppContext();
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
      {
        isLoggedIn
 && <> <Route path ="/add-hotel"  element={<Layout><AddHotel/></Layout>}/></>      }

      <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>
  )
}

export default App