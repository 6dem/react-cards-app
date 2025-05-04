import { Counter } from "../Counter"
import { List } from "../List"
import "./App.css"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"

function App() {
    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank" rel="noreferrer noopener">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer noopener">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <Counter />
                <hr />
                <List />
            </div>
        </>
    )
}

export default App
