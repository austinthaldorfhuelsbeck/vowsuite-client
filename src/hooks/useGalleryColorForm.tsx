import { ChangeEvent, SyntheticEvent, useState } from "react"

import { IGalleryColor } from "../interfaces/models"
import { useGalleryContext } from "../context/ContextProvider"
import { IApiResponse, IAppError } from "../interfaces/api"
import {
	createGalleryColor,
	updateGalleryColor,
} from "../services/vs-api/galleries.service"

function useGalleryColorForm(
	handleSuccess: () => void,
	handleError: (e: IAppError) => void,
	initialData?: IGalleryColor,
) {
	// Context
	const { gallery } = useGalleryContext()
	const blankFormData: IGalleryColor = {
		gallery_color_id: new Date().valueOf(),
		gallery_id: gallery?.gallery_id || 0,
		value: "#ffffff",
		created_at: new Date(),
		updated_at: new Date(),
	}

	// State
	const [formData, setFormData] = useState<IGalleryColor>(
		initialData || blankFormData,
	)

	// Handlers
	function onChange(e: ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		if (initialData) setFormData(initialData)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		// call API
		const response: IApiResponse = initialData
			? await updateGalleryColor(formData)
			: await createGalleryColor(formData)
		if (response.data) {
			// update context
			handleSuccess()
		}
		if (response.error) {
			handleError(response.error)
		}
	}

	return { formData, onChange, onReset, onSubmit }
}

export { useGalleryColorForm }
