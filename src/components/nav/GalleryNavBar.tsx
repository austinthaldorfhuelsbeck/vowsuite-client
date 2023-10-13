// Dependencies
import * as React from "react"
import { ICompany, IGallery } from "../../interfaces/models"
import {
	AltHeader,
	AltSubheader,
	GalleryNavContainer,
	BrandInfo,
	CompanyLogo,
	HeaderLink,
	HeaderLinkContainer,
	HeaderLinkWrapper,
	HeaderStatusMessage,
} from "../../styles/layouts/gallery-layout.style"
import { Modal } from "../menus/Modal"
import { baseUrls, copy } from "../../data/app-constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { BrandDetails } from "../static/BrandDetails"
import {
	faChevronDown,
	faCloudDownloadAlt,
	faShareAlt,
} from "@fortawesome/free-solid-svg-icons"

interface GalleryNavBarProps {
	company: ICompany
	gallery: IGallery
}

export const GalleryNavBar: React.FC<GalleryNavBarProps> = ({
	company,
	gallery,
}) => {
	// status message state and handlers
	const [status, setStatus] = React.useState<string | undefined>(undefined)
	const onCopy = (e: React.MouseEvent<SVGSVGElement>) => {
		e.preventDefault()
		// function to copy text
		const copyText = async (text: string) => {
			try {
				await navigator.clipboard.writeText(text)
				setStatus("Link successfully copied!")
			} catch (err) {
				console.error("Failed to copy: ", err)
			}
		}
		const url: string = `${baseUrls.galleryPage}/${gallery.gallery_id}`
		copyText(url)
	}

	return (
		<GalleryNavContainer>
			<CompanyLogo src={company.img_URL} />
			<BrandInfo>
				<AltHeader>{company.company_name}</AltHeader>
				<Modal
					button={
						<AltSubheader>
							{copy.brandSubheader}
							<FontAwesomeIcon icon={faChevronDown} />
						</AltSubheader>
					}
					content={<BrandDetails company={company} />}
				/>
			</BrandInfo>
			<HeaderLinkWrapper>
				<HeaderLinkContainer>
					<HeaderLink
						onMouseOver={() => {
							if (!status) setStatus("Download media")
						}}
						onMouseLeave={() => setStatus(undefined)}
						icon={faCloudDownloadAlt}
					/>
					<HeaderLink
						onMouseOver={() => {
							if (!status) setStatus("Copy share link")
						}}
						onMouseLeave={() => setStatus(undefined)}
						onClick={onCopy}
						icon={faShareAlt}
					/>
				</HeaderLinkContainer>
				{status && <HeaderStatusMessage>{status}</HeaderStatusMessage>}
			</HeaderLinkWrapper>
		</GalleryNavContainer>
	)
}
