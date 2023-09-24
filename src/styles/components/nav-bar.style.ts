import { NavLink } from "react-router-dom"
import styled from "styled-components"

export const NavContainer = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	flex-shrink: 0;
	width: 100%;

	box-shadow: rgb(90 95 102) 0-1.5px 0 inset;

	z-index: 300;
	background-color: var(--black);
`

export const NavBarContainer = styled.nav`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-shrink: 0;

	/* responsive */

	height: 80px;
	max-width: 1200px;

	padding: 0 24px;
	margin: 0;
`

export const NavLinkBrand = styled(NavLink)`
	display: flex;
	align-items: center;

	height: 100%;

	/* responsive */

	margin-right: 64px;
`

export const NavLinkLogo = styled.h1`
	color: white;
	margin-top: 1.6rem;
`

export const NavButtonContainer = styled.div`
	display: flex;
	margin-left: 24px;
`

export const NavButton = styled.button`
	min-width: 8.4rem;

	border: 0.1rem solid var(--indigo);
	color: var(--white);
	background: var(--indigo);
	width: 50%;
	font-size: 1.6rem;

	margin-right: 1.6rem;

	font-family: var(--font-primary);
	font-style: normal;
	font-weight: 600;
	line-height: 3.2rem;
	padding: 0.8rem 0;
	border-radius: 0.8rem;
	text-align: center;

	cursor: pointer;
	user-select: none;

	transition: background 0.3s ease-out, color 0.3s ease-out;
`
