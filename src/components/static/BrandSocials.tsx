import { PropsWithChildren } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons"
import {
	faFacebookF,
	faInstagram,
	faSquareYoutube,
	faTiktok,
	faVimeo,
	IconDefinition,
} from "@fortawesome/free-brands-svg-icons"

import { ICompany, ICompanyUrl } from "../../interfaces/models"
import {
	BrandLink,
	BrandSocialContainer,
} from "../../styles/layouts/gallery-layout.style"

// Data Models
interface IconProps {
	url: ICompanyUrl
}
interface ComponentProps {
	company: ICompany
}

// Components
function BrandIcon({ url }: PropsWithChildren<IconProps>) {
	let icon: IconDefinition = faExternalLinkAlt
	const label: string = url.label.toLowerCase()
	if (label === "facebook") icon = faFacebookF
	if (label === "instagram") icon = faInstagram
	if (label === "tiktok") icon = faTiktok
	if (label === "vimeo") icon = faVimeo
	if (label === "youtube") icon = faSquareYoutube
	return <FontAwesomeIcon icon={icon} />
}

function BrandSocials({ company }: PropsWithChildren<ComponentProps>) {
	return (
		<BrandSocialContainer>
			{company.urls?.map(
				(url) =>
					url.label !== "Website" &&
					url.target !== "" && (
						<BrandLink
							key={url.company_url_id}
							to={url.target}
							target="_blank"
							rel="noopener noreferrer"
						>
							<BrandIcon url={url} />
						</BrandLink>
					),
			)}
		</BrandSocialContainer>
	)
}

export { BrandSocials }
