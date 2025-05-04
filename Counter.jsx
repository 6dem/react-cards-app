import { useState } from "react"
import { Button } from "./components/Button/Button"

export const Counter = () => {
    const [count, setCount] = useState(0)

    const setCounterHandler = () => {
        setCount((count) => count + 1)
    }

    console.log("Render")

    return <Button onClick={setCounterHandler}> Counter is {count} </Button>
}
