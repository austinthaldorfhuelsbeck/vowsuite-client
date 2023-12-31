import styled from "styled-components"
import { List } from "../components/lists.styles"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface SidebarContainerProps {
	url: string
	font: string
	hex1: string
	hex2: string
	hex3: string
}

export const SidebarContainer = styled.div<SidebarContainerProps>`
	display: flex;
	flex-direction: column;
	height: 100%;
	background-image: ${(SidebarContainerProps) =>
		`linear-gradient(rgba(0, 0, 0, 0.6),
		rgba(0, 0, 0, 0.2)),url(${SidebarContainerProps.url})`};
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
	transition: all 300ms;

	h1,
	h4 {
		font-family: ${(GalleryHeaderProps) => GalleryHeaderProps.font};
		font-weight: 200;
	}

	h5,
	h6 {
		text-transform: uppercase;
		margin: 0.5rem 0 0 0;
		font-size: 100%;
		letter-spacing: 0.2rem;
		font-weight: 100;
	}

	a,
	h6 {
		color: ${(GalleryHeaderProps) => GalleryHeaderProps.hex1};
		transition: all 300ms;
		&:hover {
			color: var(--white);
		}
	}

	hr,
	a {
		border-color: ${(GalleryHeaderProps) => GalleryHeaderProps.hex2};
	}

	hr {
		opacity: 30%;
		margin: 2rem;
	}

	button {
		background-color: ${(GalleryHeaderProps) => GalleryHeaderProps.hex2};
		margin-bottom: 1rem;

		&:hover {
			background-color: ${(GalleryHeaderProps) =>
				GalleryHeaderProps.hex3};
			color: ${(GalleryHeaderProps) => GalleryHeaderProps.hex2};
		}
	}
`

export const GalleryNavContainer = styled.div`
	display: flex;
	flex-direction: row;
	padding: 2rem 2rem 0.5rem;
`

export const BrandInfo = styled.div`
	padding: 1rem 0 0 2rem;
`

export const BrandLink = styled(Link)`
	width: 4rem;
	height: 4rem;
	cursor: pointer;
	font-size: 150%;
	text-align: center;
	padding: 0.5rem 1rem;
	border: solid;
	border-radius: 100%;
	margin: 2rem 0.5rem 0 0.5rem;
`

export const CompanyLogo = styled.img`
	border-radius: 100%;
	width: 7rem;
	height: 7rem;
	margin-bottom: 2rem;
`

export const GalleryHeader = styled.h1`
	padding: 6rem;
	font-size: 700%;
	color: var(--white);
`

export const GallerySubheader = styled.h5`
	padding-bottom: 2rem;
`

export const AltHeader = styled.h4`
	color: var(--white);
	margin: 0;
`

export const AltSubheader = styled.h6`
	cursor: pointer;
`

export const PlayButton = styled.button`
	max-width: 20rem;
	margin-left: 7rem;
	padding: 1.5rem;
	font-size: 200%;
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
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 1rem;
	grid-auto-rows: auto;

	@media (max-width: 1545px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (max-width: 1150px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 780px) {
		grid-template-columns: repeat(1, 1fr);
	}
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

export const GalleryModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 120%;
`

export const BrandSocialSubheader = styled.h5`
	color: var(--white);
`

export const BrandSocialContainer = styled.div`
	display: flex;
`

export const HeaderLinkWrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: auto;
	align-items: end;
`

export const HeaderLinkContainer = styled.div`
	margin-top: 0.5rem;
`

export const HeaderLink = styled(FontAwesomeIcon)`
	font-size: 250%;
	padding: 1rem;
	margin: 0 0.5rem 0 0.5rem;
	background: rgb(255, 255, 255, 0.2);
	border-radius: 0.5rem;
	cursor: pointer;

	transition: all 300ms;
	&:hover {
		background: rgb(255, 255, 255, 0.4);
	}
`
