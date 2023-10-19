import { useState } from "react"
import { IAppError } from "src/interfaces/api"
import { ICompany } from "src/interfaces/models"

function useForm(initialState: any) {
	// state
	const [formData, setFormData] = useState<ICompany>(initialState)
	const [success, setSuccess] = useState<boolean>(false)
	const [error, setError] = useState<IAppError | undefined>(undefined)

	// handlers
	const onChange = (e: any) => {
		e.preventDefault()
		setFormData({ ...formData, [e.target.id]: e.target.value })
	}

	return {
		formData,
		setFormData,
		success,
		setSuccess,
		error,
		setError,
		onChange,
	}
}

export { useForm }
