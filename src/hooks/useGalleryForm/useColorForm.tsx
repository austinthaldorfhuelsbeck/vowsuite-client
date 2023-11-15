import { ChangeEvent, SyntheticEvent, useState } from "react"

import { useStatus } from "../useStatus"
import { IApiResponse } from "../../interfaces/api"
import { IGalleryColor } from "../../interfaces/models"
import {
	createGalleryColor,
	updateGalleryColor,
} from "../../services/vs-api/galleries.service"

function useGalleryColorForm(color: IGalleryColor) {
	// Context
	const { success, error, handleSuccess, handleError } = useStatus()

	// State
	const [formData, setFormData] = useState<IGalleryColor>(color)

	// Handlers
	async function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		const newData: IGalleryColor = { ...formData, [name]: value }
		setFormData(newData)
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		if (color) setFormData(color)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		const response: IApiResponse = color
			? await updateGalleryColor(formData)
			: await createGalleryColor(formData)
		if (response.data) {
			handleSuccess()
		}
		if (response.error) {
			handleError(response.error)
		}
	}

	return {
		formData,
		setFormData,
		onChange,
		onReset,
		onSubmit,
		success,
		error,
	}
}

export { useGalleryColorForm }
