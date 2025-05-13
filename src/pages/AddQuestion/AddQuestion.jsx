import { useActionState } from "react"
import { toast } from "react-toastify"
import { Button } from "../../components/Button"
import { Loader } from "../../components/Loader"
import { API_URL } from "../../constants"
import { artificialDelay } from "../../utils/artificial-delay"
import cls from "./AddQuestion.module.css"

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

export const AddQuestion = () => {
    const [formState, formAction, isPending] = useActionState(createCardAction, { clearForm: true })

    return (
        <>
            {isPending && <Loader />}

            <h1 className={cls.fromTitle}>Add new question</h1>

            <div className={cls.formContainer}>
                <form action={formAction} className={cls.form}>
                    <div className={cls.formControl}>
                        <label htmlFor="questionField">Question: </label>
                        <textarea
                            defaultValue={formState.question}
                            name="question"
                            id="questionField"
                            cols="30"
                            rows="2"
                            required
                            placeholder="please enter a question"
                        ></textarea>
                    </div>

                    <div className={cls.formControl}>
                        <label htmlFor="answerField">Short answer: </label>
                        <textarea
                            defaultValue={formState.answer}
                            name="answer"
                            id="answerField"
                            cols="30"
                            rows="2"
                            required
                            placeholder="please enter a short answer"
                        ></textarea>
                    </div>

                    <div className={cls.formControl}>
                        <label htmlFor="descriptionField">Description: </label>
                        <textarea
                            defaultValue={formState.description}
                            name="description"
                            id="descriptionField"
                            cols="30"
                            rows="5"
                            required
                            placeholder="please enter a description"
                        ></textarea>
                    </div>

                    <div className={cls.formControl}>
                        <label htmlFor="resourcesField">Resources: </label>
                        <textarea
                            defaultValue={formState.resources}
                            name="resources"
                            id="resourcesField"
                            cols="30"
                            rows="2"
                            placeholder="please enter a resources separated by commas"
                        ></textarea>
                    </div>

                    <div className={cls.formControl}>
                        <label htmlFor="levelField">Level: </label>
                        <select name="level" id="levelField" defaultValue={formState.level}>
                            <option value="" disabled>
                                Question level
                            </option>
                            <hr />
                            <option value="1">1 - easiest</option>
                            <option value="2">2 - medium</option>
                            <option value="3">3 - hardest</option>
                        </select>
                    </div>
                    <label htmlFor="clearFormField" className={cls.clearFormControl}>
                        <input
                            className={cls.checkbox}
                            type="checkbox"
                            name="clearForm"
                            id="clearFormField"
                            defaultChecked={formState.clearForm}
                            disabled={isPending}
                        />
                        <span>clear form after submitting?</span>
                    </label>
                    <Button isDisabled={isPending}>Add question</Button>
                </form>
            </div>
        </>
    )
}
