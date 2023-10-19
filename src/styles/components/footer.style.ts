import styled from "styled-components"

export const LandingPageFooter = styled.footer`
	display: flex;
	justify-content: center;
	flex-shrink: 0;

	width: 100%;

	margin-top: 2.4rem;

	background-color: var(--dark-aluminium);

	color: var(--light-aluminium);
	font-weight: 500;
	text-align: center;

	/* responsive */

	font-size: 1.6rem;
	line-height: 2.4rem;
`

export const FooterGrid = styled.div`
	display: grid;
	grid-template-rows: auto auto;
	grid-template-columns: 1.5fr 1fr auto;
	column-gap: 2.4rem;

	width: 100%;
	max-width: 120rem;

	/* responsive */

	padding: 3.2rem;
`

export const FooterMessage = styled.p`
	text-align: left;
	margin: 0 0 1.4rem;
	font-weight: 500;
`

export const FooterLinkContainer = styled.div`
	display: grid;
	row-gap: 0.8rem;
`
