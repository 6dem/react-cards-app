import { useId } from "react"
import { SearchIcon } from "../icons"
import cls from "./SearchInput.module.css"

export const SearchInput = (props) => {
    const inputId = useId()

    return (
        <div className={cls.inputContainer}>
            <label htmlFor={inputId}>
                <SearchIcon className={cls.searchIcon} />
            </label>
            <input
                type="text"
                id={inputId}
                className={cls.input}
                placeholder="search..."
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}
