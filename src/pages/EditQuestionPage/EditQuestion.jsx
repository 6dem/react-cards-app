import { useActionState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Loader } from "../../components/Loader"
import { QuestionForm } from "../../components/QuestionForm"
import { API_URL } from "../../constants"
import { useFetch } from "../../hooks/useFetch"
import { artificialDelay } from "../../utils/artificial-delay"
import { dateFormat } from "../../utils/dateFormat"
import cls from "./EditQuestionPage.module.css"

const editCardAction = async (_prevState, formData) => {
    try {
        await artificialDelay()

        const newQuestion = Object.fromEntries(formData)
        const resources = newQuestion.resources.trim()
        const isClearForm = newQuestion.clearForm
        const questionId = newQuestion.questionId

        const response = await fetch(`${API_URL}/react-questions/${questionId}`, {
            method: "PATCH",
            body: JSON.stringify({
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(",") : [],
                level: +newQuestion.level,
                completed: false,
                editDate: dateFormat(new Date()),
            }),
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        toast.success("The question is edited succesfully!")

        return isClearForm ? {} : newQuestion
    } catch (error) {
        toast.error(error.message)
        return {}
    }
}

export const EditQuestion = ({ initialState = {} }) => {
    const navigate = useNavigate()
    const [formState, formAction, isPending] = useActionState(editCardAction, { ...initialState, clearForm: false })

    const [removeQuestion, isQuestionRemoving] = useFetch(async () => {
        const response = await fetch(`${API_URL}/react-questions/${initialState.id}`, { method: "DELETE" })
        const questionId = await response.id

        toast.success(`The question ${questionId} has been succesfully removed!`)
        navigate("/")
    })

    const onRemoveQuestionHandler = () => {
        const isRemove = confirm("Are you sure?")

        isRemove && removeQuestion()
    }

    return (
        <>
            {(isPending || isQuestionRemoving) && <Loader />}

            <h1 className={cls.formTitle}>Edit new question</h1>

            <div className={cls.formContainer}>
                <button
                    className={cls.removeBtn}
                    disabled={isPending || isQuestionRemoving}
                    onClick={onRemoveQuestionHandler}
                >
                    X
                </button>
                <QuestionForm
                    formState={formState}
                    formAction={formAction}
                    isPending={isPending || isQuestionRemoving}
                    submitBtnText={"Edit question"}
                />
            </div>
        </>
    )
}
