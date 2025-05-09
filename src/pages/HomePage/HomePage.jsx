import { useEffect, useMemo, useRef, useState } from "react"
import { Button } from "../../components/Button"
import { Loader } from "../../components/Loader"
import { QuestionCardList } from "../../components/QuestionCardList"
import { SearchInput } from "../../components/SearchInput"
import { API_URL } from "../../constants"
import { useFetch } from "../../hooks/useFetch"
import cls from "./HomePage.module.css"

const DEFAULT_PER_PAGE = 12

export const HomePage = () => {
    const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`)
    const [activePageNumber, setActivePageNumber] = useState(1)
    const [questions, setQuestions] = useState({})
    const [searchValue, setSearchValue] = useState("")
    const [sortSelectValue, setSortSelectValue] = useState("")

    const controlsContainerRef = useRef()

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`)
        const questions = await response.json()

        setQuestions(questions)
        return questions
    })

    const cards = useMemo(() => {
        if (!questions?.data) return []
        if (!searchValue.trim()) return questions.data
        return questions.data.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()))
    }, [questions, searchValue])

    const pagination = useMemo(() => {
        const totalCardsCount = questions?.pages || 0
        return Array(totalCardsCount)
            .fill(0)
            .map((_, index) => index + 1)
    }, [questions])

    useEffect(() => {
        getQuestions(`react-questions${searchParams}`)
    }, [searchParams])

    const onSearchChangeValueHandler = (event) => {
        setSearchValue(event.target.value)
    }

    const onSortSelectChangeHandler = (event) => {
        setSortSelectValue(event.target.value)
        setActivePageNumber(1)
        setSearchParams(`?_page=1&_per_page=${DEFAULT_PER_PAGE}&${event.target.value}`)
    }

    const paginationHandler = (event) => {
        if (event.target.tagName === "BUTTON") {
            setActivePageNumber(+event.target.textContent)
            setSearchParams(`?_page=${event.target.textContent}&_per_page=${DEFAULT_PER_PAGE}&${sortSelectValue}`)
        }
        controlsContainerRef.current.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            <div className={cls.controlsContainer} ref={controlsContainerRef}>
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

            <QuestionCardList cards={cards} />

            {cards.length === 0 ? (
                <p className={cls.noCards}>no cards...</p>
            ) : (
                <div className={cls.paginationContainer} onClick={paginationHandler}>
                    {pagination.map((value) => {
                        return (
                            <Button isActive={value === activePageNumber ? true : false} key={value}>
                                {value}
                            </Button>
                        )
                    })}
                </div>
            )}
        </>
    )
}
