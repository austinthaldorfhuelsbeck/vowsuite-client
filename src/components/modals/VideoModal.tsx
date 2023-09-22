// Dependencies
import * as React from "react"
// Components
import { Modal } from "./Modal"
import { useModal } from "../../hooks/useModal"

interface VideoModalProps {
	children: JSX.Element
}

export const VideoModal: React.FC<VideoModalProps> = ({ children }) => {
	// state/handlers for isOpen
	const { isOpen, toggle } = useModal()

	return (
		<>
			<div onClick={toggle}>{children}</div>
			<Modal isOpen={isOpen} toggle={toggle}>
				<span>Video Form!</span>
			</Modal>
		</>
	)
}
