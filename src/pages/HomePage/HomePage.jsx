import { useEffect, useState } from "react"
import { QuestionCard } from "../../components/QuestionCard"
import { API_URL } from "../../constants"
import cls from "./HomePage.module.css"

export const HomePage = () => {
    const [questions, setQuestions] = useState([])

    const getQuestions = async () => {
        try {
            const response = await fetch(`${API_URL}/react-questions`)
            const questions = await response.json()

            setQuestions(questions)

            console.log("questions:", questions)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getQuestions()
    }, [])

    return (
        <>
            {questions.map((card, index) => {
                return <QuestionCard className={cls} card={card} key={index} />
            })}
        </>
    )
}
