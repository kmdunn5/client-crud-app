import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { ClientEdit } from './components/Clients/ClientEdit'
import { ClientNew } from './components/Clients/ClientNew'
import { ClientRead } from './components/Clients/ClientRead'
import { ClientIndex } from './components/Clients/ClientsIndex'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Home } from './components/Home'
import { Nav } from './components/Nav'
import { PeopleIndex } from './components/People/PeopleIndex'
import { PersonEdit } from './components/People/PersonEdit'
import { PersonNew } from './components/People/PersonNew'
import { PersonRead } from './components/People/PersonRead'

const router = createBrowserRouter([
  {
    element: <ClientApp />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/persons',
        element: <PeopleIndex />,
      },
      {
        path:"/persons/:id",
        element:<PersonRead />
        // I would add these loaders in if I had more time
        // loader: ({ params }) => axios.get(),
      },
      {
        path: "/persons/new",
        element: <PersonNew />
      },
      {
        path: '/persons/:id/edit',
        element: <PersonEdit />,
      },
      {
        path: '/clients',
        element: <ClientIndex />,
      },
      {
        path: '/clients/:id',
        element: <ClientRead />,
      },
      {
        path: '/clients/new',
        element: <ClientNew />,
      },
      {
        path: '/clients/:id/edit',
        element: <ClientEdit />,
      },
      {
        element: <Home />,
        index: true,
      },
    ],
  },
])

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

function ClientApp() {
  return(
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export default App;
