import { useEffect, useMemo, useState } from "react"
import { Loader } from "../../components/Loader"
import { QuestionCardList } from "../../components/QuestionCardList"
import { SearchInput } from "../../components/SearchInput"
import { API_URL } from "../../constants"
import { useFetch } from "../../hooks/useFetch"
import cls from "./HomePage.module.css"

export const HomePage = () => {
    const [questions, setQuestions] = useState([])
    const [searchValue, setSearchValue] = useState("")
    const [sortSelectValue, setSortSelectValue] = useState("")

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`)
        const questions = await response.json()

        setQuestions(questions)
        return questions
    })

    const cards = useMemo(() => {
        return questions.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()))
    }, [questions, searchValue])

    useEffect(() => {
        getQuestions(`react-questions?${sortSelectValue}`)
    }, [sortSelectValue])

    const onSearchChangeValueHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const onSortSelectChangeHandler = (event) => {
        setSortSelectValue(event.target.value)
    }

    return (
        <>
            <div className={cls.controlsContainer}>
                <SearchInput value={searchValue} onChange={onSearchChangeValueHandler} />

                <select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={cls.select}>
                    <option value="">sort by</option>
                    <hr />
                    <option value="_sort=level">Level ↑</option>
                    <option value="_sort=-level">Level ↓</option>
                    <option value="_sort=completed">Completed 1st</option>
                    <option value="_sort=-completed">Incomplete 1st</option>
                </select>
            </div>

            {isLoading && <Loader />}
            {error && <p>{error}</p>}
            {cards.length === 0 && <p className={cls.noCards}>no cards...</p>}

            <QuestionCardList cards={cards} />
        </>
    )
}
