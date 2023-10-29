import { ChangeEvent, SyntheticEvent, useState } from "react"
import { IApiResponse, IAppError } from "../interfaces/api"
import { useGalleryContext, useUserContext } from "../context/ContextProvider"
import { IBaseGallery } from "../interfaces/models"
import { initialGalleryData } from "../data/initial-data"
import { createGallery, updateGallery } from "../services/galleries.service"
import { getUser } from "../services/users.service"

function useGalleryForm(
	handleSuccess: () => void,
	handleError: (e: IAppError) => void,
) {
	// context
	const { user, setUser } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()
	// determine initial form data from context
	let initialData: IBaseGallery = initialGalleryData
	if (user) {
		if (gallery) {
			// load selected gallery and userID
			initialData = { ...gallery, user_id: user.user_id }
		} else {
			// load userID to initial data
			initialData = {
				...initialGalleryData,
				user_id: user.user_id,
			}
		}
	}

	// state
	const [formData, setFormData] = useState<IBaseGallery>(initialData)

	// handlers
	function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	function onClear(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData({ ...initialGalleryData, user_id: initialData.user_id })
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData(initialData)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		// call API
		const response: IApiResponse = gallery
			? await updateGallery(formData)
			: await createGallery(formData)
		if (response.data) {
			// update context
			setUser((await getUser(response.data.user_id)).data)
			setGallery(response.data)
			// useStatus
			handleSuccess()
		}
		if (response.error) {
			// useStatus
			handleError(response.error)
		}
	}

	return { formData, setFormData, onChange, onClear, onReset, onSubmit }
}

export { useGalleryForm }
