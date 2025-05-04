const items = [
    {
        task: "Выучить React",
        icon: "🦾",
        isCompleted: false,
    },
    {
        task: "Выучить TypeScript",
        icon: "😢",
        isCompleted: false,
    },
    {
        task: "Выучить Javascript",
        icon: "👍",
        isCompleted: true,
    },
]
export const List = () => {
    return (
        <div>
            {items.map((item, index) => {
                return (
                    <section key={index} className={item.isCompleted ? "comleted" : ""}>
                        <span>{item.icon}</span>
                        <h4>{item.task}</h4>
                    </section>
                )
            })}
        </div>
    )
}
