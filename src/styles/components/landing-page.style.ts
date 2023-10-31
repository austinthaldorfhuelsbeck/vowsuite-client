import styled from "styled-components"

export const HeroBannerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	background: var(--pink-yellow-gradient);
	color: var(--black);
	margin: 0 auto;
	padding: 3.2rem 6.4rem;
`

export const HeroBannerHeadline = styled.h1`
	letter-spacing: -1.5px;
	margin: 2.4rem 0 8px 0;
	font-size: 4.8rem;
	color: var(--white);
`

export const HeroBannerDescription = styled.p`
	max-width: 58rem;
	text-align: center;
	margin-bottom: 3.2rem;
	font-size: 20px;
	line-height: 3.2rem;
`

export const HeroButton = styled.button`
	border: 0;
	border-radius: 0.8rem;
	background-color: var(--white);
	font-family: var(--font-primary);
	font-weight: 600;
	color: var(--black);
	cursor: pointer;
	user-select: none;
	transition: background 0.3s ease-out, color 0.3s ease-out;
	min-width: 10rem;
	padding: 1.6rem 1.6rem;
	font-size: 1.6rem;
	line-height: 2.4rem;
`
