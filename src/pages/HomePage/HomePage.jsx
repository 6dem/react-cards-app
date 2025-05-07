import { useEffect, useState } from "react"
import { Loader } from "../../components/Loader"
import { QuestionCardList } from "../../components/QuestionCardList"
import { API_URL } from "../../constants"
import { useFetch } from "../../hooks/useFetch"

export const HomePage = () => {
    const [questions, setQuestions] = useState([])
    const [searchValue, setSearchValue] = useState("")

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`)
        const questions = await response.json()

        setQuestions(questions)
        return questions
    })

    useEffect(() => {
        getQuestions("react-questions")
    }, [])

    const onSearchChangeValueHandler = (event) => {
        setSearchValue(event.target.value)
    }

    return (
        <>
            <input type="text" value={searchValue} onChange={onSearchChangeValueHandler} />
            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            <QuestionCardList cards={questions} />
        </>
    )
}
