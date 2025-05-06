import { Button } from "../Button"
import cls from "./QuestionCard.module.css"

export const QuestionCard = () => {
    return (
        <div className={cls.card}>
            <div className={cls.cardLabels}>
                <div>Level: 1</div>
                <div>Not Comleted</div>
            </div>

            <h5 className={cls.cardTitle}>Что такое JSX?</h5>

            <div className={cls.cardAnswerWrapper}>
                <label>short answer: </label>
                <p className={cls.cardAnswer}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, voluptatem?
                </p>
            </div>

            <Button onClick={() => {}}>View</Button>
        </div>
    )
}
