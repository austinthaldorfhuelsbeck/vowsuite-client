import { ChangeEvent, SyntheticEvent, useState } from "react"
import { IApiResponse } from "../../interfaces/api"
import {
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
import { IBaseGallery } from "../../interfaces/models"
import { updateGallery } from "../../services/vs-api/galleries.service"
import { readUser } from "../../services/vs-api/users.service"
import { useStatus } from "../useStatus"

function useBaseGalleryForm(baseGallery: IBaseGallery) {
	// context
	const { setUser } = useUserContext()
	const { setGallery } = useGalleryContext()
	const { success, error, handleSuccess, handleError } = useStatus()

	// state
	const [formData, setFormData] = useState<IBaseGallery>(baseGallery)

	// handlers
	function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData(baseGallery)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		// call API
		const response: IApiResponse = await updateGallery(formData)
		if (response.data) {
			// update context
			setUser((await readUser(response.data.user_id)).data)
			setGallery(response.data)
			// useStatus
			handleSuccess()
		}
		if (response.error) {
			// useStatus
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

export { useBaseGalleryForm }
