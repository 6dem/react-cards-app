import { useNavigate } from "react-router-dom"
import { Badge } from "../Badge/Badge"
import { Button } from "../Button"
import cls from "./QuestionCard.module.css"

export const QuestionCard = (props) => {
    const navigate = useNavigate()

    const levelVariant = props.card.level === 1 ? "primary" : props.card.level === 2 ? "warning" : "alert"
    const completedVariant = props.card.completed ? "success" : "primary"

    return (
        <div className={cls.card}>
            <div className={cls.cardLabels}>
                <Badge variant={levelVariant}>Level: {props.card.level}</Badge>
                <Badge variant={completedVariant}>{props.card.completed ? "Completed" : "Not Comleted"}</Badge>
            </div>

            <h5 className={cls.cardTitle}>{props.card.question}</h5>

            <div className={cls.cardAnswerWrapper}>
                <label>short answer: </label>
                <p className={cls.cardAnswer}>{props.card.answer}</p>
            </div>

            <Button onClick={() => navigate(`/question/${props.card.id}`)}>View</Button>
        </div>
    )
}
