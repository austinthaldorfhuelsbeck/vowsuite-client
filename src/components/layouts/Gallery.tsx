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

function Gallery() {
	// get ID from URL and find gallery
	// then find company
	const { gallery_id } = useParams()
	const [gallery, setGallery] = useState<IGallery | undefined>(undefined)
	const [company, setCompany] = useState<ICompany | undefined>(undefined)
	useEffect(() => {
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
			<SidebarContainer
				url={gallery.img_URL}
				font={String(gallery.font_id)}
				hex1={gallery.colors[0].value}
				hex2={gallery.colors[1].value}
				hex3={gallery.colors[2].value}
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
								url={gallery.videos[0].video_URL}
							/>
						}
					/>
				)}
				<CardsList>
					{gallery.videos.map((video: IVideo) => (
						<VideoCardListItem video={video} />
					))}
				</CardsList>
			</SidebarContainer>
		)
	return <></>
}

export { Gallery }
