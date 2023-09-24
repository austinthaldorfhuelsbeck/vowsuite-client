// Dependencies
import * as React from "react"
import { useModal } from "../../hooks/useModal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
// Styles
import {
	ModalDialog,
	ModalDialogContainer,
	ModalFormCancel,
} from "../../styles/components/modal.style"
import { BlankDiv } from "../../styles/components/util.style"

interface ModalRefs {
	button: JSX.Element
	content: JSX.Element
}

export const Modal: React.FC<ModalRefs> = ({ button, content }) => {
	// ref object
	const modalRef = React.useRef<HTMLDialogElement>(null)
	// modal opener hook
	const { isOpen, toggle } = useModal()

	// event listeners
	const onBackgroundClick = (e: React.MouseEvent<HTMLDialogElement>) => {
		e.preventDefault()
		if (e.target === modalRef.current) toggle()
	}

	// open and close when isOpen changes
	React.useEffect(() => {
		const ref = modalRef
		if (ref.current) {
			if (isOpen) {
				ref.current.showModal()
			} else {
				ref.current.close()
			}
		}
	}, [isOpen])

	return (
		<>
			<BlankDiv onClick={toggle}>{button}</BlankDiv>
			<ModalDialog ref={modalRef} onClick={onBackgroundClick}>
				<ModalDialogContainer>
					<>
						<ModalFormCancel onClick={toggle}>
							<FontAwesomeIcon icon={faXmark} />
						</ModalFormCancel>
						{content}
					</>
				</ModalDialogContainer>
			</ModalDialog>
		</>
	)
}
