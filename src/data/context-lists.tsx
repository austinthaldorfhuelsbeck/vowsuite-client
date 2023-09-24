import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ModalResource } from "../interfaces/common"
import { ContextListItem } from "../styles/components/lists.styles"
import { ButtonTitle } from "../styles/components/buttons.style"
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons"
import { VideoForm } from "../components/forms/VideoForm"
import { VideoDeleteForm } from "../components/forms/ConfirmDeleteForm"
import { VideoDeleteButton } from "../components/buttons/api/VideoDeleteButton"

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
