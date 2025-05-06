import { useNavigate } from "react-router-dom"
import ReactLogo from "../../assets/react.svg"
import { Button } from "../Button"
import cls from "./Header.module.css"

export const Header = () => {
    const navigate = useNavigate()

    return (
        <header className={cls.header}>
            <p onClick={() => navigate("")}>
                <img src={ReactLogo} alt="react logo" />
                <span>React Cards</span>
            </p>

            <div className={cls.headerButtons}>
                <Button onClick={() => navigate("/add-question")}>Add</Button>
                <Button>Log in</Button>
            </div>
        </header>
    )
}
