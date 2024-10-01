import Home from './components/pages/home/Home';
import Cur from './components/pages/cur/Cur';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Admin from './components/pages/admin/Admin';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={
              <Home />
            } />
            <Route path='cur'>
              <Route path=':id' element={
                <Cur/>
              }/>
            </Route>
            <Route path='admin' element={<Admin/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
