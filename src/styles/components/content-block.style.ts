import styled from "styled-components"

export const ContentBlockContainer = styled.div`
	display: grid;
	width: 100%;
	padding: 1rem;
	margin-left: 2rem;
	background-color: rgba(255, 255, 255, 0.08);
	border-radius: 0.5rem;
`

export const ContentBlockHeader = styled.h4`
	margin-top: 0;
	color: var(--white);
`

export const ContentBlockSubheader = styled.p`
	font-family: monospace;
	font-size: 65%;
	margin-left: 1rem;
`

export const ContentBlockListItem = styled.li`
	width: 30rem;
	display: inline-grid;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	background: hsla(0, 0%, 100%, 0.12);
	border-radius: 5px;
	padding: 0.8rem;
	margin: 1.2rem;

	&:hover {
		transform: scale(1.03);
		background: hsla(0, 0%, 100%, 0.219);
	}

	& h4 {
		margin: 1.5rem auto auto 0;
		color: var(--aluminium);
	}
`

export const ContentBlockImg = styled.img`
	display: block;
	width: 27rem;
	height: 18rem;
	object-fit: cover;
	margin-top: 1rem;
	margin-bottom: 1rem;
	margin-left: auto;
	margin-right: auto;
`
