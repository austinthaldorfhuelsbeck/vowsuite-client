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
	BrandSocialSubheader,
	CompanyLogo,
	GalleryModalContainer,
} from "../../styles/layouts/gallery-layout.style"
import { Divider } from "../../styles/components/util.style"

interface ComponentProps {
	company: ICompany
	imgPath: string | undefined
}

function BrandDetails({ company, imgPath }: PropsWithChildren<ComponentProps>) {
	return (
		<GalleryModalContainer>
			<CompanyLogo src={imgPath} />
			<AltHeader>{company.company_name}</AltHeader>
			<Divider />
			<Link
				to={
					company.urls?.filter((url) => url.label === "Website")[0]
						.target
				}
				target="_blank"
				rel="noopener noreferrer"
			>
				<AltSubheader>
					<FontAwesomeIcon icon={faExternalLinkSquareAlt} />
					{copy.brandDetailsSubheader}
				</AltSubheader>
			</Link>
			<Divider />
			<BrandSocialSubheader>
				{copy.brandDetailsSocial}
			</BrandSocialSubheader>
			<BrandSocials company={company} />
			<Divider />
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
