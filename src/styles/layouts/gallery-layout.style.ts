import styled from "styled-components"
import { List } from "../components/lists.styles"

interface GalleryContainerProps {
	url: string
	font: string
	hex1: string
	hex2: string
	hex3: string
}

export const GalleryContainer = styled.div<GalleryContainerProps>`
	display: flex;
	flex-direction: column;
	height: 100%;
	background-image: ${(GalleryContainerProps) =>
		`linear-gradient(rgba(0, 0, 0, 0.6),
		rgba(0, 0, 0, 0.2)),url(${GalleryContainerProps.url})`};
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;

	h1,
	h4 {
		font-family: ${(GalleryHeaderProps) => GalleryHeaderProps.font};
		font-weight: 200;
	}

	h6 {
		text-transform: uppercase;
		margin: 0.5rem 0 0 0;
		font-size: 100%;
		color: ${(GalleryHeaderProps) => GalleryHeaderProps.hex1};
		letter-spacing: 0.2rem;
		font-weight: 100;
	}

	button {
		background-color: ${(GalleryHeaderProps) => GalleryHeaderProps.hex2};
	}
`

export const BrandContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: 2rem 2rem 0.5rem;
`

export const BrandDetails = styled.div`
	padding: 1rem 0 0 2rem;
`

export const AltHeader = styled.h4`
	color: var(--white);
	margin: 0;
`

export const AltSubheader = styled.h6`
	cursor: pointer;
`

export const CompanyLogo = styled.img`
	border-radius: 100%;
	width: 7rem;
	height: 7rem;
`

export const GalleryHeader = styled.h1`
	padding: 6rem;
	font-size: 700%;
	color: var(--white);
`
export const PlayAllButton = styled.button`
	max-width: 20rem;
	margin-left: 7rem;
	padding: 1.5rem;
	font-size: 200%;
	font-family: sans-serif;
	text-transform: uppercase;
	color: var(--white);
	letter-spacing: 0.1rem;
	font-weight: 100;
	cursor: pointer;
	border: none;
	border-radius: 3rem;

	transition: all 300ms;
	&:hover {
		transform: scale(1.08);
	}
`
export const CardsList = styled(List)`
	margin: auto 0 3rem 4rem;
	display: flex;
	flex-direction: row;
`

interface CardContainerProps {
	url: string
}

export const CardImageContainer = styled.li<CardContainerProps>`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding: 2rem;
	margin: 1rem;
	min-width: 35rem;
	height: 20rem;
	border-radius: 2rem;
	cursor: pointer;
	box-shadow: 0 0 3rem 4px rgba(0, 0, 0, 0.5);
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;

	background-image: ${(CardContainerProps) =>
		`linear-gradient(rgba(0, 0, 0, 0.1) 0%,
		rgba(0, 0, 0, 0.5) 70%,
		rgba(0, 0, 0, 0.9) 100%),url(${CardContainerProps.url})`};

	transition: all 300ms;
	&:hover {
		transform: scale(1.08);
		box-shadow: 0 0 3rem 4px rgba(255, 255, 255, 0.2);
	}
`

export const CardPlayIcon = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: auto;
	background: rgba(255, 255, 255, 0.6);
	width: 7rem;
	height: 4.5rem;
	border-radius: 0.5rem;
	color: rgba(0, 0, 0, 0.85);
	font-size: 300%;
`
