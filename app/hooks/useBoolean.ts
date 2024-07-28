import { useCallback, useState } from "react"

export default function useBoolean(initialValue: boolean) {
    const [value, setValue] = useState(initialValue)

    return {
        value, 
        toggle: useCallback(() => setValue(value => !value), []),
        setTrue: useCallback(() => setValue(true), []),
        setFalse: useCallback(() => setValue(false), [])
    }
}