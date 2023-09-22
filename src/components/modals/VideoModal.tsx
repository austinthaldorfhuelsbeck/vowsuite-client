// Dependencies
import * as React from "react"
// Components
import { Modal } from "./Modal"
import { VideoForm } from "../forms/VideoForm"
import { useModal } from "../../hooks/useModal"

interface VideoModalProps {
	children: JSX.Element
}

export const VideoModal: React.FC<VideoModalProps> = ({ children }) => {
	const { isOpen, toggle } = useModal()

	return (
		<>
			<div onClick={toggle}>{children}</div>
			<Modal isOpen={isOpen} toggle={toggle}>
				<VideoForm toggle={toggle} />
			</Modal>
		</>
	)
}
