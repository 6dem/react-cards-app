import { useNavigate } from "react-router-dom"
import ReactLogo from "../../assets/react.svg"
import { AUTH_STORAGE } from "../../constants"
import { useAuth } from "../../hooks/useAuth"
import { Button } from "../Button"
import { ThemeToggler } from "../ThemeToggler/ThemeToggler"
import cls from "./Header.module.css"

export const Header = () => {
    const navigate = useNavigate()
    const { isAuth, setIsAuth } = useAuth()

    const loginHandler = () => {
        localStorage.setItem(AUTH_STORAGE, !isAuth)
        setIsAuth(!isAuth)
    }

    return (
        <header className={cls.header}>
            <p onClick={() => navigate("")}>
                <img src={ReactLogo} alt="react logo" />
                <span>React Cards</span>
            </p>

            <div className={cls.headerButtons}>
                {isAuth && <Button onClick={() => navigate("/add-question")}>Add</Button>}
                <Button onClick={loginHandler} isActive={!isAuth}>
                    {isAuth ? "Log out" : "Log in"}
                </Button>
                <ThemeToggler />
            </div>
        </header>
    )
}
