// Dependencies
import * as React from "react"
import { ICompany } from "../../interfaces/models"
import {
	AltHeader,
	AltSubheader,
	GalleryModalContainer,
	BrandDetailsDivider,
	BrandSocialSubheader,
	CompanyLogo,
} from "../../styles/layouts/gallery-layout.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons"
import { baseUrls, copy } from "../../data/app-constants"
import { BrandSocials } from "./BrandSocials"
import { Link } from "react-router-dom"

interface BrandDetailsProps {
	company: ICompany
}

export const BrandDetails: React.FC<BrandDetailsProps> = ({ company }) => {
	return (
		<GalleryModalContainer>
			<CompanyLogo src={company.img_URL} />
			<AltHeader>{company.company_name}</AltHeader>
			<BrandDetailsDivider />
			<Link
				to={company.website_URL}
				target="_blank"
				rel="noopener noreferrer"
			>
				<AltSubheader>
					<FontAwesomeIcon icon={faExternalLinkSquareAlt} />
					{copy.brandDetailsSubheader}
				</AltSubheader>
			</Link>
			<BrandDetailsDivider />
			<BrandSocialSubheader>
				{copy.brandDetailsSocial}
			</BrandSocialSubheader>
			<BrandSocials company={company} />
			<BrandDetailsDivider />
			<Link
				to={baseUrls.homePage}
				target="_blank"
				rel="noopener noreferrer"
			>
				<AltSubheader>{copy.brandDetailsCopyright}</AltSubheader>
			</Link>
		</GalleryModalContainer>
	)
}
