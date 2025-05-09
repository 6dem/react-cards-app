import cls from "./Select.module.css"

export const Select = (props) => {
    return (
        <select value={props.value} onChange={props.onChange} className={cls.select}>
            {props.options.map(({ value, label }, index) =>
                value === "hr" ? (
                    <hr key={index} />
                ) : (
                    <option key={value} value={value}>
                        {label}
                    </option>
                ),
            )}
        </select>
    )
}
