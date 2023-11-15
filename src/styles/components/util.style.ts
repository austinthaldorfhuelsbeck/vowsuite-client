import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"

export const BlankSpan = styled.span`
	width: fit-content;
	margin: 0;
`

export const BigIcon = styled(FontAwesomeIcon)`
	font-size: 800%;
	color: var(--aluminium);
	text-align: center;
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