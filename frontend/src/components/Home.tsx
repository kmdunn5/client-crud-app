import { Link } from "react-router-dom"

export function Home() {
  return (
    <header className="App-header">
      <Link to="/persons" >People</Link>
      <Link to="/clients" >Clients</Link>
    </header>
  )
}