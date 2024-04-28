import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ClientIndex } from './components/Clients/ClientsIndex'
import { Home } from './components/Home'
import { PeopleIndex } from './components/People/PeopleIndex'
import { PersonNew } from './components/People/PersonNew'
import { PersonRead } from './components/People/PersonRead'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/person/:id" element={<PersonRead />}/>
        <Route path="/person/new" element={<PersonNew />}/>
        <Route path="/people" element={<PeopleIndex />}/>
        <Route path="/clients" element={<ClientIndex />} />
      </Routes>
    </div>
  );
}

export default App;
