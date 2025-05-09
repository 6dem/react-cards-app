import { Button } from "../Button"
import cls from "./Pagination.module.css"

export const Pagination = (props) => {
    return (
        <div className={cls.paginationContainer} onClick={props.onClick}>
            {props.pages.map((number) => {
                return (
                    <Button isActive={number === props.activePageNumber ? true : false} key={number}>
                        {number}
                    </Button>
                )
            })}
        </div>
    )
}
