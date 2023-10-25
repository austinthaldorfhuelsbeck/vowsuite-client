import { useState } from "react"

import { IAppError } from "../interfaces/api"

function useMessage() {
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<IAppError | undefined>(undefined)

	function clear() {
		setSuccess(false)
		setError(undefined)
	}

	function updateWithSuccess() {
		setSuccess(true)
	}

	function updateWithError(err: IAppError) {
		setError(err)
	}

	return {
		success,
		updateWithSuccess,
		updateWithError,
		error,
		clear,
	}
}

export { useMessage }
