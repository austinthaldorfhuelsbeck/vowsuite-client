import { useState } from "react"

import { IAppError } from "../interfaces/api"

export const useStatus = () => {
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<IAppError | undefined>(undefined)

	function handleClear() {
		setSuccess(false)
		setError(undefined)
	}

	return {
		success,
		error,
		handleClear,
	}
}
