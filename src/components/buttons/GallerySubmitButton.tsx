// Dependencies
import * as React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import {
	useGalleriesContext,
	useGalleryContext,
} from "../../context/ContextProvider"
import { createGallery, updateGallery } from "../../services/galleries.service"
// Data
import { IBaseGallery } from "../../interfaces/models"
// Components
import { InlineButton } from "./InlineButton"

interface GallerySubmitButtonProps {
	formData: IBaseGallery
	handleClear: () => void
}

export const GallerySubmitButton: React.FC<GallerySubmitButtonProps> = ({
	formData,
	handleClear,
}) => {
	// auth0
	const { getAccessTokenSilently } = useAuth0()
	// context
	const { gallery, setGallery } = useGalleryContext()
	const { galleries, setGalleries } = useGalleriesContext()

	const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault()
		// function to update or create a gallery
		// update or create depends on if gallery_id is undefined
		const getGalleryResponse = async (
			formData: IBaseGallery,
			id: number | undefined,
		) => {
			const audienceURL = process.env.REACT_APP_AUTH0_AUDIENCE
			try {
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: audienceURL,
						scope: "read:current_user",
					},
				})
				// API call
				if (id) {
					await updateGallery(accessToken, formData, id)
				} else {
					await createGallery(accessToken, formData)
				}
				// update list context
				setGalleries([...galleries, { ...formData, videos: [] }])
				// update selected gallery context
				setGallery({ ...formData, videos: [] })
				// clear form
				handleClear()
			} catch (error: any) {
				throw new Error(error)
			}
		}
		// call the async function on submit
		getGalleryResponse(formData, gallery?.gallery_id)
	}

	return <InlineButton onClick={handleSubmit} icon={null} title="Submit" />
}
