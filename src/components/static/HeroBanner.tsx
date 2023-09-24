// Dependencies
import * as React from "react"
import { Link } from "react-router-dom"
// Data
import { copy, heroResource } from "../../data/app-constants"
// Styles
import {
	HeroBannerContainer,
	HeroBannerDescription,
	HeroBannerHeadline,
	HeroButton,
} from "../../styles/components/landing-page.style"

export const HeroBanner: React.FC = () => {
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
