// Dependencies
import * as React from "react"

interface ModalFormProps {
	isOpen: boolean
	closeModal: () => void
	children: JSX.Element
}

export const Modal: React.FC<ModalFormProps> = ({
	isOpen,
	closeModal,
	children,
}) => {
	// ref object
	const modalRef = React.useRef<HTMLDialogElement>(null)

	// event listeners
	const onEscape = (e: React.KeyboardEvent<HTMLDialogElement>) => {
		if (e.key === "Escape") closeModal()
	}

	const onCancel = React.useCallback(() => closeModal(), [closeModal])
	const onClick = React.useCallback(
		(e: MouseEvent) => {
			const { current: el } = modalRef
			if (e.target === el) closeModal()
		},
		[closeModal],
	)
	const onAnimEnd = React.useCallback(() => {
		const ref = modalRef
		if (ref.current && !isOpen) ref.current.close()
	}, [isOpen])

	// open and close when isOpen changes
	React.useEffect(() => {
		const ref = modalRef
		if (ref.current && isOpen) ref.current.showModal()
	}, [isOpen])

	return (
		<dialog
			ref={modalRef}
			onClose={closeModal}
			onKeyDown={onEscape}
			onCancel={onCancel}
			onClick={() => onClick}
			onAnimationEnd={onAnimEnd}
		>
			{children}
		</dialog>
	)
}
