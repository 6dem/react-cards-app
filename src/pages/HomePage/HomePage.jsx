import { useEffect, useState } from "react"
import { QuestionCardList } from "../../components/QuestionCardList"
import { API_URL } from "../../constants"

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
            <QuestionCardList cards={questions} />
        </>
    )
}
