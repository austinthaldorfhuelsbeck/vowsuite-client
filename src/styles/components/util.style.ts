import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

export const BlankSpan = styled.span`
	width: fit-content;
	margin: 0;
`

export const BigIcon = styled(FontAwesomeIcon)`
	font-size: 1000%;
	color: var(--aluminium);
	justify-self: center;
	padding: 3rem;
`

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`

export const Divider = styled.hr`
	width: 100%;
`