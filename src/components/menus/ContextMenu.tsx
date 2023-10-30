import React, {
	PropsWithChildren,
	useRef,
	useState,
	useEffect,
	MouseEvent,
} from "react"

import { BlankSpan } from "../../styles/components/util.style"
import { ContextMenuButton } from "../../styles/components/buttons.style"
import { ContextMenuContainer } from "../../styles/components/context-menu.style"

interface ComponentProps {
	button: JSX.Element
	content: JSX.Element
}

function ContextMenu({ button, content }: PropsWithChildren<ComponentProps>) {
	// ref for clicking outside
	const ref = useRef<HTMLDivElement>(null)

	// menu display state
	const [isMenu, setIsMenu] = useState<boolean>(false)
	const flipMenu = (currentState: boolean) => setIsMenu(!currentState)
	const [x, setX] = useState<number>(0)
	const [y, setY] = useState<number>(0)

	// event handlers
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

	return (
		<BlankSpan ref={ref}>
			<ContextMenuButton onClick={handleClick}>
				{button}
			</ContextMenuButton>
			{isMenu && (
				<ContextMenuContainer x={x} y={y}>
					{content}
				</ContextMenuContainer>
			)}
		</BlankSpan>
	)
}

export { ContextMenu }
