import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ClientIndex } from './components/Clients/ClientsIndex'
import { Home } from './components/Home'
import { PeopleIndex } from './components/People/PeopleIndex'
import { PersonRead } from './components/People/PersonRead'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/person/:id" element={<PersonRead />}/>
        <Route 
          path='/people'
          element={<PeopleIndex />}
          // loader={async ({ params }) => {
          //   return fetch(
          //     `/fake/api/teams/${params.id}.json`
          //   );
          // }}
          // action={async ({ request }) => {
          //   return updateFakeTeam(await request.formData());
          // }}
        />
        <Route path='/clients' element={<ClientIndex />} />
      </Routes>
    </div>
  );
}

export default App;
