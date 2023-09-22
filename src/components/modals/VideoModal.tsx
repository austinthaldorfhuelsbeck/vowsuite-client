// Dependencies
import * as React from "react"
// Components
import { Modal } from "./Modal"

interface VideoModalProps {
	children: JSX.Element
}

export const VideoModal: React.FC<VideoModalProps> = ({ children }) => {
	// state/handlers for isOpen
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	return (
		<>
			<div onClick={openModal}>{children}</div>
			<Modal isOpen={isOpen} closeModal={closeModal}>
				<span>Video Form!</span>
			</Modal>
		</>
	)
}
