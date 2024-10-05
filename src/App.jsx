import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './Pages/HomePage';
import Home  from "./Pages/Home";
import About from './Pages/About';
import Browse from './Pages/Browse';
import NotFound from './Pages/NotFound';
import Detail from './Pages/Detail';


const App = () => {
  
  return (
    <BrowserRouter>
              <Routes>
                 <Route exact path='/' element={<HomePage />} />
                 <Route path='/Home' element={<Home />} /> 
                 <Route path='/About' element={<About />} />
                 <Route path='/Browse' element={<Browse />} />
                 <Route path='/Detail/:asin' element={<Detail />} />

                 <Route path='*' element={<NotFound />} />
              </Routes>
    </BrowserRouter>
  )
}

export default App

