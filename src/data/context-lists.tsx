import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ModalResource } from "../interfaces/common"
import { ContextListItem } from "../styles/components/lists.styles"
import { ButtonTitle } from "../styles/components/buttons.style"
import { faLink, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { VideoForm } from "../components/forms/VideoForm"
import { VideoDeleteForm } from "../components/forms/ConfirmDeleteForm"
import { VideoDeleteButton } from "../components/buttons/api/VideoDeleteButton"
import { GalleryForm } from "../components/forms/GalleryForm"
import { GalleryDeleteButton } from "../components/buttons/api/GalleryDeleteButton"
import { Modal } from "../components/menus/Modal"
import { GalleryLink } from "../components/static/GalleryLink"
import { UserProfileForm } from "../components/forms/UserProfileForm"

export const renderMenu = (resources: ModalResource[]) =>
	resources.map((resource, index) => (
		<Modal
			key={index}
			button={resource.button}
			content={resource.content}
		/>
	))

export const videoContextList: ModalResource[] = [
	{
		button: (
			<ContextListItem>
				<FontAwesomeIcon icon={faPencil} />
				<ButtonTitle>Edit Video</ButtonTitle>
			</ContextListItem>
		),
		content: <VideoForm />,
	},
	{
		button: (
			<ContextListItem>
				<FontAwesomeIcon icon={faTrash} />
				<ButtonTitle>Delete Video</ButtonTitle>
			</ContextListItem>
		),
		content: (
			<VideoDeleteForm>
				<VideoDeleteButton />
			</VideoDeleteForm>
		),
	},
]

export const galleryContextList: ModalResource[] = [
	{
		button: (
			<ContextListItem>
				<FontAwesomeIcon icon={faPencil} />
				<ButtonTitle>Edit Gallery</ButtonTitle>
			</ContextListItem>
		),
		content: <GalleryForm />,
	},
	{
		button: (
			<ContextListItem>
				<FontAwesomeIcon icon={faTrash} />
				<ButtonTitle>Delete Gallery</ButtonTitle>
			</ContextListItem>
		),
		content: (
			<VideoDeleteForm>
				<GalleryDeleteButton />
			</VideoDeleteForm>
		),
	},
]

export const profileContextList: ModalResource[] = [
	{
		button: (
			<ContextListItem>
				<FontAwesomeIcon icon={faPencil} />
				<ButtonTitle>Edit User Profile</ButtonTitle>
			</ContextListItem>
		),
		content: <UserProfileForm />,
	},
]
