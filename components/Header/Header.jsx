import ReactLogo from "../../src/assets/react.svg"
import { Button } from "../Button"
import cls from "./Header.module.css"

export const Header = () => {
    return (
        <header className={cls.header}>
            <p>
                <img src={ReactLogo} alt="react logo" />
                <span>React Cards</span>
            </p>

            <div className={cls.headerButtons}>
                <Button isDisabled>Add</Button>
                <Button>Log in</Button>
            </div>
        </header>
    )
}
