// Dependencies
import * as React from "react"
import { InlineButton } from "../InlineButton"

interface ClearButtonProps {
	onClear: () => void
}

export const ClearButton: React.FC<ClearButtonProps> = ({ onClear }) => (
	<InlineButton onClick={onClear} icon={null} title="Clear" />
)
