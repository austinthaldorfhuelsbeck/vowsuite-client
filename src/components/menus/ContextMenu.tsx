import React, { PropsWithChildren } from "react"

import { BlankSpan } from "../../styles/components/util.style"
import { ContextMenuButton } from "../../styles/components/buttons.style"
import { ContextMenuContainer } from "../../styles/components/context-menu.style"
import { useContextMenu } from "src/hooks/useContextMenu"

type ComponentProps = {
	button: JSX.Element
	content: JSX.Element
}

function ContextMenu({ button, content }: PropsWithChildren<ComponentProps>) {
	const { ref, isMenu, x, y, handleClick } = useContextMenu()

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
