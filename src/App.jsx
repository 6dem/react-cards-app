import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom"
import { AuthProvider } from "./auth/AuthProvider"
import { MainLayout } from "./components/MainLayout"
import { useAuth } from "./hooks/useAuth"
import { AddQuestionPageLazy } from "./pages/AddQuestionPage"
import { EditQuestionPageLazy } from "./pages/EditQuestionPage"
import { ForbiddenPage } from "./pages/ForbiddenPage"
import { HomePage } from "./pages/HomePage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { QuestionPage } from "./pages/QuestionPage"

const ProtectedRoutes = () => {
    const { isAuth } = useAuth()
    const location = useLocation()

    return isAuth ? <Outlet /> : <Navigate to="/forbidden" state={{ from: location.pathname }} replace={true} />
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/forbidden" element={<ForbiddenPage />} />
                        <Route path="/question/:id" element={<QuestionPage />} />

                        <Route element={<ProtectedRoutes />}>
                            <Route path="/edit-question/:id" element={<EditQuestionPageLazy />} />
                            <Route path="/add-question" element={<AddQuestionPageLazy />} />
                        </Route>

                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
