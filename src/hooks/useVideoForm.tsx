import { ChangeEvent, SyntheticEvent, useState } from "react"

import { IVideo } from "../interfaces/models"
import { IApiResponse, IAppError } from "../interfaces/api"
import { initialVideoData } from "../data/initial-data"
import { useGalleryContext, useVideoContext } from "../context/ContextProvider"
import { createVideo, updateVideo } from "../services/videos.service"

function useVideoForm(
	handleSuccess: () => void,
	handleError: (e: IAppError) => void,
) {
	// context
	const { video } = useVideoContext()
	const { gallery } = useGalleryContext()
	// determine initial form data from context
	const blankForm: IVideo = {
		...initialVideoData,
		gallery_id: gallery ? gallery.gallery_id : initialVideoData.gallery_id,
	}
	const initialData: IVideo = video || blankForm

	// state
	const [formData, setFormData] = useState<IVideo>(initialData)

	// handlers
	function onChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}
	function onClear(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData(blankForm)
	}
	function onReset(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData(initialData)
	}
	async function onSubmit(e: SyntheticEvent) {
		e.preventDefault()
		// call API
		const response: IApiResponse = video
			? await updateVideo(formData)
			: await createVideo(formData)

		if (response.data) {
			console.log(response.data)
			// update context
			// setUser((await getUser(response.data.user_id)).data)
			// setGallery(response.data)
			// setVideo(request)
			// update success banner
			handleSuccess()
		}
		if (response.error) {
			// update error banner
			handleError(response.error)
		}
	}

	return { formData, setFormData, onChange, onClear, onReset, onSubmit }
}

export { useVideoForm }
