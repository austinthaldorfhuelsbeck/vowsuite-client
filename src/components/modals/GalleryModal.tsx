// Dependencies
import * as React from "react"
// Components
import { Modal } from "./Modal"
import { GalleryForm } from "../forms/GalleryForm"
import { useModal } from "../../hooks/useModal"

interface GalleryModalProps {
	children: JSX.Element
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ children }) => {
	const { isOpen, toggle } = useModal()

	return (
		<>
			<div onClick={toggle}>{children}</div>
			<Modal isOpen={isOpen} toggle={toggle}>
				<GalleryForm toggle={toggle} />
			</Modal>
		</>
	)
}
