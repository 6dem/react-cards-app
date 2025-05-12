import { useEffect, useId, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Badge } from "../../components/Badge/Badge"
import { Button } from "../../components/Button"
import { Loader, SmallLoader } from "../../components/Loader"
import { API_URL } from "../../constants"
import { useFetch } from "../../hooks/useFetch"
import cls from "./QuestionPage.module.css"

export const QuestionPage = () => {
    const checkboxId = useId()
    const navigate = useNavigate()
    const { id } = useParams()
    const [card, setCard] = useState(null)
    const [isChecked, setIsChecked] = useState(false)

    const levelVariant = () => (card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert")
    const completedVariant = () => (card.completed ? "success" : "primary")

    const [fetchCard, isCardLoading] = useFetch(async () => {
        const response = await fetch(`${API_URL}/react-questions/${id}`)
        const data = await response.json()

        setCard(data)
    })

    const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
        const response = await fetch(`${API_URL}/react-questions/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ completed: isChecked }),
        })
        const data = await response.json()

        setCard(data)
    })

    useEffect(() => {
        fetchCard()
    }, [])

    useEffect(() => {
        card !== null && setIsChecked(card.completed)
    }, [card])

    const onCheckboxChangeHandler = () => {
        setIsChecked(!isChecked)
        updateCard(!isChecked)
    }

    return (
        <>
            {isCardLoading && <Loader />}

            {card !== null && (
                <div className={cls.container}>
                    <div className={cls.cardLabels}>
                        <Badge variant={levelVariant()}>Level: {card.level}</Badge>
                        <Badge variant={completedVariant()}>{card.completed ? "Completed" : "Not Comleted"}</Badge>

                        {card?.editDate && <p className={cls.editDate}>Edited: {card.editDate}</p>}
                    </div>

                    <h5 className={cls.cardTitle}>{card.question}</h5>

                    <p className={cls.cardDescription}>{card.description}</p>

                    <div className={cls.cardAnswerWrapper}>
                        <label>short answer: </label>
                        <p className={cls.cardAnswer}>{card.answer}</p>
                    </div>

                    <ul className={cls.resources}>
                        Resources:
                        {card.resources.map((link, index) => {
                            return (
                                <li key={index}>
                                    <a href={link.trim()} target="_blank" rel="noreferrer noopenner">
                                        {link.trim()}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>

                    <label htmlFor={checkboxId} className={cls.cardCheckbox}>
                        <input
                            type="checkbox"
                            id={checkboxId}
                            className={cls.checkbox}
                            checked={isChecked}
                            onChange={onCheckboxChangeHandler}
                            disabled={isCardUpdating}
                        />
                        <span>mark question as completed</span>
                        {isCardUpdating && <SmallLoader />}
                    </label>

                    <Button onClick={() => navigate(`/edit-question/${card.id}`)} isDisabled={isCardUpdating}>
                        Edit
                    </Button>
                    <Button onClick={() => navigate("/")} isDisabled={isCardUpdating}>
                        Back
                    </Button>
                </div>
            )}
        </>
    )
}
