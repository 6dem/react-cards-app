import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./components/MainLayout"
import { HomePage } from "./pages/HomePage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/main" element={<div>Main component 😍</div>} />
                    <Route path="/forbidden" element={<div>NO WAY</div>} />
                    <Route path="/add-question" element={<div>Add question</div>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
