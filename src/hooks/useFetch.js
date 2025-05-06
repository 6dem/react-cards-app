import { useState } from "react"
import { artificialDelay } from "../utils/artificial-delay"

export const useFetch = (callback) => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchFn = async (arg) => {
        try {
            setIsLoading(true)
            setError("")
            await artificialDelay()

            const response = await callback(arg)

            return response
        } catch (error) {
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return [fetchFn, isLoading, error]
}
