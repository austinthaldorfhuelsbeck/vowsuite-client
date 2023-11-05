import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../components/menus/Modal"
import { ModalResource } from "../interfaces/common"
import { UserForm } from "../components/forms/UserForm"
import { VideoForm } from "../components/forms/VideoForm"
import { ButtonTitle } from "../styles/components/buttons.style"
import { ContextListItem } from "../styles/components/lists.styles"
import {
	GalleryDeleteForm,
	VideoDeleteForm,
} from "../components/forms/ConfirmDeleteForm"

export const renderModalContextMenu = (resources: ModalResource[]) =>
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
		content: <VideoDeleteForm />,
	},
]

export const galleryContextList: ModalResource[] = [
	{
		button: (
			<ContextListItem>
				<FontAwesomeIcon icon={faTrash} />
				<ButtonTitle>Delete Gallery</ButtonTitle>
			</ContextListItem>
		),
		content: <GalleryDeleteForm />,
	},
]

export const profileContextList: ModalResource[] = [
	{
		button: (
			<ContextListItem>
				<FontAwesomeIcon icon={faPencil} />
				<ButtonTitle>Edit User Details</ButtonTitle>
			</ContextListItem>
		),
		content: <UserForm />,
	},
]
