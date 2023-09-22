// Dependencies
import * as React from "react"
// Components
import { Modal } from "./Modal"

interface GalleryModalProps {
	children: JSX.Element
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ children }) => {
	// state/handlers for isOpen
	const [isOpen, setIsOpen] = React.useState<boolean>(false)
	const openModal = () => setIsOpen(true)
	const closeModal = () => setIsOpen(false)

	return (
		<>
			<div onClick={openModal}>{children}</div>
			<Modal isOpen={isOpen} closeModal={closeModal}>
				<span>Gallery Form!</span>
			</Modal>
		</>
	)
}
