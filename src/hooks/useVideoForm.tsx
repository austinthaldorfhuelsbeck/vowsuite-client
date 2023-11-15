import { ChangeEvent, SyntheticEvent, useState } from "react"

import { IGallery, IUser, IVideo } from "../interfaces/models"
import { IApiResponse, IAppError } from "../interfaces/api"
import { initialVideoData } from "../data/initial-data"
import {
	useGalleryContext,
	useUserContext,
	useVideoContext,
} from "../context/ContextProvider"
import { createVideo, updateVideo } from "../services/vs-api/videos.service"
import { readUser } from "../services/vs-api/users.service"
import { readGallery } from "../services/vs-api/galleries.service"

function useVideoForm(
	handleSuccess: () => void,
	handleError: (e: IAppError) => void,
) {
	// context
	const { setUser } = useUserContext()
	const { gallery, setGallery } = useGalleryContext()
	const { video, setVideo } = useVideoContext()
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
	function onCheck(e: ChangeEvent<any>) {
		setFormData({ ...formData, is_displayed: !formData.is_displayed })
	}
	function onClear(e: SyntheticEvent<HTMLButtonElement>) {
		e.preventDefault()
		setFormData(blankForm)
	}
	function onReset(e: SyntheticEvent) {
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
			// update context
			const updatedGallery: IGallery = (
				await readGallery(response.data.gallery_id)
			).data
			const updatedUser: IUser = (await readUser(updatedGallery.user_id))
				.data
			setVideo(response.data)
			setGallery(updatedGallery)
			setUser(updatedUser)
			// update success banner, clear data
			handleSuccess()
			onReset(e)
		}
		if (response.error) {
			// update error banner
			handleError(response.error)
		}
	}

	return {
		formData,
		setFormData,
		onChange,
		onClear,
		onCheck,
		onReset,
		onSubmit,
	}
}

export { useVideoForm }
