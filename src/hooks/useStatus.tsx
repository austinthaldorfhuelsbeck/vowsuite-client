import { useState } from "react"

import { IAppError } from "../interfaces/api"

export const useStatus = () => {
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<IAppError | undefined>(undefined)

	function handleClear() {
		setSuccess(false)
		setError(undefined)
	}

	function handleSuccess() {
		setSuccess(true)
		setTimeout(handleClear, 3000)
	}

	function handleError(error: IAppError) {
		setError(error)
		setTimeout(handleClear, 3000)
	}

	return {
		success,
		error,
		handleClear,
		handleSuccess,
		handleError,
	}
}
