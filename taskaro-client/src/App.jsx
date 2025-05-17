import './App.css'
import { ThemeProvider } from './context/Theme-Provider'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Layout from './components/Layout'
import DashBoard from './screens/DashBoard'

function App() {

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme='dark'>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route  element={<Layout/>}>
              <Route path='/allTask' element={<DashBoard  allTask={true}/>} />
              <Route path='/today' element={<DashBoard  allTask={false}/>} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

    </>
  )
}

export default App
