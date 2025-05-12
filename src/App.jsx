import { BrowserRouter, Route, Routes } from "react-router-dom"
import { MainLayout } from "./components/MainLayout"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { QuestionPage } from "./pages/QuestionPage"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/forbidden" element={<div>NO WAY</div>} />
                    <Route path="/add-question" element={<div>Add question</div>} />
                    <Route path="/edit-question/:id" element={<div>Edit question</div>} />
                    <Route path="/question/:id" element={<QuestionPage />} />

                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
