import ReactLoader from "../../assets/react.svg"
import cls from "./Loader.module.css"

export const Loader = () => {
    return (
        <div className={cls.backdrop}>
            <div className={cls.loader}>
                <img src={ReactLoader} />
            </div>
        </div>
    )
}
