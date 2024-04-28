import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ClientEdit } from './components/Clients/ClientEdit'
import { ClientNew } from './components/Clients/ClientNew'
import { ClientRead } from './components/Clients/ClientRead'
import { ClientIndex } from './components/Clients/ClientsIndex'
import { Home } from './components/Home'
import { PeopleIndex } from './components/People/PeopleIndex'
import { PersonEdit } from './components/People/PersonEdit'
import { PersonNew } from './components/People/PersonNew'
import { PersonRead } from './components/People/PersonRead'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/people" element={<PeopleIndex />}/>
        <Route path="/person/:id" element={<PersonRead />}/>
        <Route path="/person/new" element={<PersonNew />}/>
        <Route path="/person/:id/edit" element={<PersonEdit />}/>
        <Route path="/clients" element={<ClientIndex />} />
        <Route path="/client/:id" element={<ClientRead />} />
        <Route path="/client/new" element={<ClientNew />} />
        <Route path="/client/:id/edit" element={<ClientEdit />} />
      </Routes>
    </div>
  );
}

export default App;
