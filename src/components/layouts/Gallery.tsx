import { useEffect, useState } from "react"

import ReactPlayer from "react-player"
import { useParams } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { copy } from "../../data/app-constants"
import { GalleryNavBar } from "../nav/GalleryNavBar"
import { readUser } from "../../services/vs-api/users.service"
import { readGallery } from "../../services/vs-api/galleries.service"
import { VideoCardListItem } from "../lists/VideoCardListItem"
import { ICompany, IGallery, IUser, IVideo } from "../../interfaces/models"
import {
	CardsList,
	SidebarContainer,
	GalleryHeader,
	PlayButton,
} from "../../styles/layouts/gallery-layout.style"
import { usePreview } from "../../hooks/usePreview"

function Gallery() {
	// get ID from URL and find gallery
	// then find company
	const { gallery_id } = useParams()
	const [gallery, setGallery] = useState<IGallery | undefined>(undefined)
	const [company, setCompany] = useState<ICompany | undefined>(undefined)

	// Context
	const imagePreview = usePreview()
	const videoPreview = usePreview()

	// Effects
	useEffect(() => {
		// function to get a gallery and set state
		async function getGalleryResponse(id: string) {
			const galleryResponse: IGallery = (await readGallery(id)).data
			const userResponse: IUser = (
				await readUser(galleryResponse.user_id)
			).data
			setGallery(galleryResponse)
			setCompany(userResponse.company)
		}
		if (gallery_id) getGalleryResponse(gallery_id)
	}, [gallery_id])
	// load images and videos
	useEffect(() => {
		if (gallery?.img_URL) imagePreview.getUrlFromAws(gallery.img_URL)
		if (gallery?.videos[0]?.video_URL)
			videoPreview.getUrlFromAws(gallery.videos[0].video_URL)
	}, [imagePreview, company, videoPreview, gallery])

	if (gallery && company)
		return (
			<SidebarContainer
				url={imagePreview.validUrl || ""}
				font={String(gallery.font_id)}
				hex1={gallery.colors[0]?.value}
				hex2={gallery.colors[1]?.value}
				hex3={gallery.colors[2]?.value}
			>
				<GalleryNavBar company={company} gallery={gallery} />
				<GalleryHeader>{gallery.gallery_name}</GalleryHeader>
				{gallery.videos[0] && (
					<Modal
						button={
							<PlayButton>
								<FontAwesomeIcon icon={faPlayCircle} />
								{copy.galleryHeaderButton}
							</PlayButton>
						}
						content={
							<ReactPlayer
								controls
								width={"80vw"}
								height={"100%"}
								url={videoPreview.validUrl}
							/>
						}
					/>
				)}
				<CardsList>
					{gallery.videos.map(
						(video: IVideo) =>
							video.is_displayed && (
								<VideoCardListItem video={video} />
							),
					)}
				</CardsList>
			</SidebarContainer>
		)
	return <></>
}

export { Gallery }
