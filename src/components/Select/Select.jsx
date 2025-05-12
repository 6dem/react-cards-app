import cls from "./Select.module.css"

export const Select = ({ value, onChange, options, className = cls.select }) => {
    return (
        <select value={value} onChange={onChange} className={className}>
            {options.map(({ value, label }, index) =>
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
