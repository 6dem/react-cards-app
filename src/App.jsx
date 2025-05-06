import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "../components/MainLayout"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/main" element={<div>Main component 😍</div>} />
                    <Route path="/forbidden" element={<div>NO WAY</div>} />
                    <Route path="/add-question" element={<div>Add question</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
