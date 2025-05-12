import { useEffect, useMemo, useRef, useState } from "react"
import { Loader } from "../../components/Loader"
import { Pagination } from "../../components/Pagination"
import { QuestionCardList } from "../../components/QuestionCardList"
import { SearchInput } from "../../components/SearchInput"
import { Select } from "../../components/Select"
import { API_URL } from "../../constants"
import { useFetch } from "../../hooks/useFetch"
import cls from "./HomePage.module.css"

const DEFAULT_PER_PAGE = 12

const sortOptions = [
    { value: "", label: "sort by" },
    { value: "hr", label: "" },
    { value: "_sort=level", label: "Level ↑" },
    { value: "_sort=-level", label: "Level ↓" },
    { value: "_sort=completed", label: "Completed 1st" },
    { value: "_sort=-completed", label: "Incomplete 1st" },
]

const countOptions = [
    { value: "12", label: "12" },
    { value: "20", label: "20" },
    { value: "40", label: "40" },
    { value: "60", label: "60" },
]

export const HomePage = () => {
    const [searchParams, setSearchParams] = useState(`?_page=1&_per_page=${DEFAULT_PER_PAGE}`)
    const [activePageNumber, setActivePageNumber] = useState(1)
    const [questions, setQuestions] = useState({})
    const [searchValue, setSearchValue] = useState("")
    const [sortSelectValue, setSortSelectValue] = useState("")
    const [countSelectValue, setCountSelectValue] = useState(`${DEFAULT_PER_PAGE}`)

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
        setSearchParams(`?_page=1&_per_page=${countSelectValue}&${event.target.value}`)
    }

    const onCountSelectChangeHandler = (event) => {
        setCountSelectValue(event.target.value)
        setActivePageNumber(1)
        setSearchParams(`?_page=1&_per_page=${event.target.value}&${sortSelectValue}`)
    }

    const paginationHandler = (event) => {
        if (event.target.tagName === "BUTTON") {
            setActivePageNumber(+event.target.textContent)
            setSearchParams(`?_page=${event.target.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`)
            controlsContainerRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <>
            <div className={cls.controlsContainer} ref={controlsContainerRef}>
                <SearchInput value={searchValue} onChange={onSearchChangeValueHandler} />

                <Select value={sortSelectValue} onChange={onSortSelectChangeHandler} options={sortOptions} />
                <Select value={countSelectValue} onChange={onCountSelectChangeHandler} options={countOptions} />
            </div>

            {isLoading && <Loader />}
            {error && <p>{error}</p>}

            <QuestionCardList cards={cards} />

            {cards.length === 0 ? (
                <p className={cls.noCards}>no cards...</p>
            ) : (
                pagination.length > 1 && (
                    <Pagination onClick={paginationHandler} pages={pagination} activePageNumber={activePageNumber} />
                )
            )}
        </>
    )
}
