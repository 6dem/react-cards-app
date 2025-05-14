import { useContext } from "react"
import { AuthContext } from "../auth/AuthProvider/AuthProvider"

export const useAuth = () => {
    return useContext(AuthContext)
}
