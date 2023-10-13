// Dependencies
import * as React from "react"
import { useParams } from "react-router-dom"
import { ICompany, IGallery, IUser, IVideo } from "../../interfaces/models"
import { readGallery } from "../../services/galleries.service"
import {
	CompanyLogo,
	BrandContainer,
	GalleryContainer,
	BrandDetails,
	AltHeader,
	AltSubheader,
	GalleryHeader,
	PlayAllButton,
	CardsList,
} from "../../styles/layouts/gallery-layout.style"
import { readUser } from "../../services/users.service"
import { Modal } from "../menus/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faPlayCircle } from "@fortawesome/free-solid-svg-icons"
import { copy } from "../../data/app-constants"
import { VideoCardListItem } from "../lists/VideoCardListItem"

export const Gallery: React.FC = () => {
	// get ID from URL and find gallery
	// then find company
	const { gallery_id } = useParams()
	const [gallery, setGallery] = React.useState<IGallery | undefined>(
		undefined,
	)
	const [company, setCompany] = React.useState<ICompany | undefined>(
		undefined,
	)
	React.useEffect(() => {
		// function to get a gallery and set state
		const getGalleryResponse = async (id: string) => {
			const galleryResponse: IGallery = (await readGallery(id)).data
			const userResponse: IUser = (
				await readUser(galleryResponse.user_id)
			).data
			setGallery(galleryResponse)
			setCompany(userResponse.company)
		}
		if (gallery_id) getGalleryResponse(gallery_id)
	}, [gallery_id])

	if (gallery && company)
		return (
			<GalleryContainer
				url={gallery.img_URL}
				font={gallery.font}
				hex1={gallery.hex1}
				hex2={gallery.hex2}
				hex3={gallery.hex3}
			>
				<BrandContainer>
					<CompanyLogo src={company.img_URL} />
					<BrandDetails>
						<AltHeader>{company.company_name}</AltHeader>
						<Modal
							button={
								<AltSubheader>
									{copy.brandSubheader}
									<FontAwesomeIcon icon={faChevronDown} />
								</AltSubheader>
							}
							content={<></>}
						/>
					</BrandDetails>
				</BrandContainer>
				<GalleryHeader>{gallery.gallery_name}</GalleryHeader>
				<PlayAllButton>
					<FontAwesomeIcon icon={faPlayCircle} />
					{copy.galleryHeaderButton}
				</PlayAllButton>
				<CardsList>
					{gallery.videos.map((video: IVideo) => (
						<VideoCardListItem video={video} />
					))}
				</CardsList>
			</GalleryContainer>
		)
	return <></>
}
