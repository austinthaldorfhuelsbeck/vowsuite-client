import React, { PropsWithChildren } from "react"

import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons"

import { BrandSocials } from "./BrandSocials"
import { ICompany } from "../../interfaces/models"
import { baseUrls, copy } from "../../data/app-constants"
import {
	AltHeader,
	AltSubheader,
	BrandDetailsDivider,
	BrandSocialSubheader,
	CompanyLogo,
	GalleryModalContainer,
} from "../../styles/layouts/gallery-layout.style"

type ComponentProps = {
	company: ICompany
}

function BrandDetails({ company }: PropsWithChildren<ComponentProps>) {
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

export { BrandDetails }
