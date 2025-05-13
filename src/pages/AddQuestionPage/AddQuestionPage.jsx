import { useActionState } from "react"
import { toast } from "react-toastify"
import { Button } from "../../components/Button"
import { Loader } from "../../components/Loader"
import { API_URL } from "../../constants"
import { artificialDelay } from "../../utils/artificial-delay"
import { QuestionForm } from "../../components/QuestionForm/"
import cls from "./AddQuestionPage.module.css"

const createCardAction = async (_prevState, formData) => {
    try {
        await artificialDelay()

        const newQuestion = Object.fromEntries(formData)
        const resources = newQuestion.resources.trim()
        const isClearForm = newQuestion.clearForm

        const response = await fetch(`${API_URL}/react-questions`, {
            method: "POST",
            body: JSON.stringify({
                question: newQuestion.question,
                answer: newQuestion.answer,
                description: newQuestion.description,
                resources: resources.length ? resources.split(",") : [],
                level: +newQuestion.level,
                completed: false,
                editDate: undefined,
            }),
        })

        if (!response.ok) {
            throw new Error(response.statusText)
        }

        toast.success("New question is succesfully created!")

        return isClearForm ? {} : newQuestion
    } catch (error) {
        toast.error(error.message)
        return {}
    }
}

const AddQuestionPage = () => {
    const [formState, formAction, isPending] = useActionState(createCardAction, { clearForm: true })

    return (
        <>
            {isPending && <Loader />}

            <h1 className={cls.formTitle}>Add new question</h1>

            <div className={cls.formContainer}>
                <QuestionForm
                    formState={formState}
                    formAction={formAction}
                    isPending={isPending}
                    submitBtnText={"Add question"}
                />
            </div>
        </>
    )
}

export default AddQuestionPage
