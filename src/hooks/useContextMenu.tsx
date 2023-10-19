import { useEffect, useRef, useState, MouseEvent } from "react"

function useContextMenu() {
	// ref for clicking outside
	const ref = useRef<HTMLDivElement>(null)
	// menu display state
	const [isMenu, setIsMenu] = useState<boolean>(false)
	const [x, setX] = useState<number>(0)
	const [y, setY] = useState<number>(0)

	// handlers functions
	const flipMenu = (currentState: boolean) => setIsMenu(!currentState)
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setX(e.clientX - 150)
		setY(e.clientY + 20)
		flipMenu(isMenu)
	}

	// event listeners
	useEffect(() => {
		const handleClickOutside = (e: any) => {
			// hide when click is outside context menu
			if (ref.current && !ref.current.contains(e.target)) {
				setIsMenu(false)
			}
		}
		// add listener to DOM
		document.addEventListener("click", handleClickOutside, true)
		// cleanup callback
		return () => {
			document.removeEventListener("click", handleClickOutside, true)
		}
	}, [ref, setIsMenu])

	return { ref, isMenu, x, y, handleClick }
}

export { useContextMenu }
