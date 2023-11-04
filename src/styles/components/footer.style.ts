import { Link } from "react-router-dom"
import styled from "styled-components"

export const LandingPageFooter = styled.footer`
	display: flex;
	justify-content: space-between;
	flex-shrink: 0;
	width: 100%;
	background-color: var(--black);
	margin-top: 2rem;
	padding: 0 1rem;
`

export const FooterMessage = styled.p`
	text-align: left;
	font-weight: 100;
	margin: 0;
`

export const LegalContainer = styled.div`
	color: var(--light-aluminium);
	font-weight: 500;
	text-align: center;
	line-height: 2rem;
`

export const FooterLinkContainer = styled.div`
	display: flex;
	justify-content: flex-start;
`

export const FooterLink = styled(Link)`
	letter-spacing: 0.001rem;
	margin: 0 1rem;
	color: var(--white);
	&:active,
	&:visited {
		color: var(--white);
	}
	&:hover {
		color: var(--aluminium);
	}
`
