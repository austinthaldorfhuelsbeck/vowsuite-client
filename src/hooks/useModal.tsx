import { useEffect, useRef, useState, MouseEvent } from "react"

function useModal() {
	// ref for clicking outside
	const ref = useRef<HTMLDialogElement>(null)
	// state
	const [isOpen, setIsOpen] = useState(false)

	// handlers
	const toggle = () => {
		setIsOpen(!isOpen)
	}
	const onClick = (e: MouseEvent<HTMLDialogElement>) => {
		e.preventDefault()
		// close if click in background
		if (e.target === ref.current) toggle()
	}

	// open and close when isOpen changes
	useEffect(() => {
		const modalRef = ref
		if (modalRef.current) {
			if (isOpen) {
				modalRef.current.showModal()
			} else {
				modalRef.current.close()
			}
		}
	}, [isOpen])

	return { ref, toggle, onClick }
}

export { useModal }
