import React, {
	useState,
	MouseEvent,
	PropsWithChildren,
	useEffect,
} from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faChevronDown,
	faCloudDownloadAlt,
	faShareAlt,
} from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { BrandDetails } from "../static/BrandDetails"
import { VideoDownload } from "../static/VideoDownload"
import { baseUrls, copy } from "../../data/app-constants"
import { ICompany, IGallery } from "../../interfaces/models"
import {
	AltHeader,
	AltSubheader,
	BrandInfo,
	CompanyLogo,
	GalleryNavContainer,
	HeaderLink,
	HeaderLinkContainer,
	HeaderLinkWrapper,
} from "../../styles/layouts/gallery-layout.style"
import { Alert } from "../../styles/components/forms.style"
import { usePreview } from "../../hooks/usePreview"

interface ComponentProps {
	company: ICompany
	gallery: IGallery
}

function GalleryNavBar({
	company,
	gallery,
}: PropsWithChildren<ComponentProps>) {
	// status message state and handlers
	const [status, setStatus] = useState<string | undefined>(undefined)
	const onCopy = (e: MouseEvent<SVGSVGElement>) => {
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

	// Context
	const { validUrl, getUrlFromAws } = usePreview()

	// Effects
	useEffect(() => {
		if (company?.img_URL) getUrlFromAws(company.img_URL)
	}, [company, getUrlFromAws])

	return (
		<GalleryNavContainer>
			<CompanyLogo src={validUrl} />
			<BrandInfo>
				<AltHeader>{company.company_name}</AltHeader>
				<Modal
					button={
						<AltSubheader>
							{copy.brandSubheader}
							<FontAwesomeIcon icon={faChevronDown} />
						</AltSubheader>
					}
					content={
						<BrandDetails company={company} imgPath={validUrl} />
					}
				/>
			</BrandInfo>
			<HeaderLinkWrapper>
				<HeaderLinkContainer>
					<Modal
						button={
							<HeaderLink
								onMouseOver={() => {
									if (!status) setStatus("Download media")
								}}
								onMouseLeave={() => setStatus(undefined)}
								icon={faCloudDownloadAlt}
							/>
						}
						content={<VideoDownload gallery={gallery} />}
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
				{status && <Alert>{status}</Alert>}
			</HeaderLinkWrapper>
		</GalleryNavContainer>
	)
}

export { GalleryNavBar }
