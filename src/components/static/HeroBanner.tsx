import React from "react"

import { Link } from "react-router-dom"

import { copy, heroResource } from "../../data/app-constants"
import {
	HeroBannerContainer,
	HeroBannerDescription,
	HeroBannerHeadline,
	HeroButton,
} from "../../styles/components/landing-page.style"

function HeroBanner() {
	return (
		<HeroBannerContainer>
			<HeroBannerHeadline>{copy.heroTitle}</HeroBannerHeadline>
			<HeroBannerDescription>{copy.heroBody}</HeroBannerDescription>
			<Link to={heroResource.path}>
				<HeroButton>{heroResource.label}</HeroButton>
			</Link>
		</HeroBannerContainer>
	)
}

export { HeroBanner }
