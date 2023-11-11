import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled, { keyframes } from "styled-components"

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`

export const PageContent = styled.div`
	flex: 1;
	flex-basis: auto;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	margin-top: 8rem;
	width: 100%;
`

const spinAnimation = keyframes`
	0% { transform: rotate(0deg); }
	100% { transform: rotate(720deg); }
`

export const Loader = styled(FontAwesomeIcon)`
	font-size: 500%;
	margin: auto;
	animation-name: ${spinAnimation};
	animation-duration: 2.5s;
	animation-iteration-count: infinite;
`
