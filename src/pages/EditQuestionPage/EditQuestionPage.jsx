import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Loader } from "../../components/Loader"
import { API_URL } from "../../constants"
import { useFetch } from "../../hooks/useFetch"
import { EditQuestion } from "./EditQuestion"

export const EditQuestionPage = () => {
    const { id } = useParams()
    const [question, setQuestion] = useState(null)

    const [fetchQuestion, isQuestionLoading] = useFetch(async () => {
        const response = await fetch(`${API_URL}/react-questions/${id}`)
        const data = await response.json()

        setQuestion(data)
    })

    useEffect(() => {
        fetchQuestion()
    }, [])

    return (
        <>
            {isQuestionLoading && <Loader />}
            {question && <EditQuestion initialState={question} />}
        </>
    )
}
