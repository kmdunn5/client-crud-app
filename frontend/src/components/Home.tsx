import { Link } from "react-router-dom"

export function Home() {
  return (
    <header className="App-header">
      <Link to="/people" >People</Link>
      <Link to="/clients" >Clients</Link>
      {/* <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a> */}
    </header>
  )
}