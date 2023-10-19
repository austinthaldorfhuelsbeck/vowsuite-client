import React, { useEffect, useState } from "react"

import ReactPlayer from "react-player"
import { useParams } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../menus/Modal"
import { copy } from "../../data/app-constants"
import { GalleryNavBar } from "../nav/GalleryNavBar"
import { readUser } from "../../services/users.service"
import { readGallery } from "../../services/galleries.service"
import { VideoCardListItem } from "../lists/VideoCardListItem"
import { ICompany, IGallery, IUser, IVideo } from "../../interfaces/models"
import {
	CardsList,
	GalleryContainer,
	GalleryHeader,
	PlayButton,
} from "../../styles/layouts/gallery-layout.style"

const useGallery = () => {
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

	return { gallery, company }
}

function Gallery() {
	const { gallery, company } = useGallery()

	if (gallery && company)
		return (
			<GalleryContainer
				url={gallery.img_URL}
				font={gallery.font}
				hex1={gallery.hex1}
				hex2={gallery.hex2}
				hex3={gallery.hex3}
			>
				<GalleryNavBar company={company} gallery={gallery} />
				<GalleryHeader>{gallery.gallery_name}</GalleryHeader>
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
				<CardsList>
					{gallery.videos.map((video: IVideo) => (
						<VideoCardListItem video={video} />
					))}
				</CardsList>
			</GalleryContainer>
		)
	return <></>
}

export { Gallery }
