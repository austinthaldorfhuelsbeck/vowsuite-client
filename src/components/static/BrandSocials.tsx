import React, { PropsWithChildren } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faFacebookF,
	faInstagram,
	faSquareYoutube,
	faTiktok,
	faVimeo,
} from "@fortawesome/free-brands-svg-icons"

import { ICompany } from "../../interfaces/models"
import {
	BrandLink,
	BrandSocialContainer,
} from "../../styles/layouts/gallery-layout.style"

type ComponentProps = {
	company: ICompany
}

function BrandSocials({ company }: PropsWithChildren<ComponentProps>) {
	return (
		<BrandSocialContainer>
			{company.facebook_URL && (
				<BrandLink
					to={company.facebook_URL}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FontAwesomeIcon icon={faFacebookF} />
				</BrandLink>
			)}
			{company.instagram_URL && (
				<BrandLink
					to={company.instagram_URL}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FontAwesomeIcon icon={faInstagram} />
				</BrandLink>
			)}
			{company.tiktok_URL && (
				<BrandLink
					to={company.tiktok_URL}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FontAwesomeIcon icon={faTiktok} />
				</BrandLink>
			)}
			{company.vimeo_URL && (
				<BrandLink
					to={company.vimeo_URL}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FontAwesomeIcon icon={faVimeo} />
				</BrandLink>
			)}
			{company.youtube_URL && (
				<BrandLink
					to={company.youtube_URL}
					target="_blank"
					rel="noopener noreferrer"
				>
					<FontAwesomeIcon icon={faSquareYoutube} />
				</BrandLink>
			)}
		</BrandSocialContainer>
	)
}

export { BrandSocials }
