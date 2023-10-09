// Dependencies
import * as React from "react"
// Styles
import { BlankSpan } from "../../styles/components/util.style"
import { ContextMenuContainer } from "../../styles/components/context-menu.style"
import { ContextMenuButton } from "../../styles/components/buttons.style"

interface ContextMenuProps {
	button: JSX.Element
	content: JSX.Element
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
	button,
	content,
}) => {
	// ref for clicking outside
	const ref = React.useRef<HTMLDivElement>(null)

	// menu display state
	const [isMenu, setIsMenu] = React.useState<boolean>(false)
	const flipMenu = (currentState: boolean) => setIsMenu(!currentState)
	const [x, setX] = React.useState<number>(0)
	const [y, setY] = React.useState<number>(0)

	// event handlers
	const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		setX(e.clientX - 150)
		setY(e.clientY + 20)
		flipMenu(isMenu)
	}

	// event listeners
	React.useEffect(() => {
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
