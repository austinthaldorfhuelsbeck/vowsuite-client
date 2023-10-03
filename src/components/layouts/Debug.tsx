// Dependencies
import * as React from "react"
import { useUserContext } from "../../context/ContextProvider"
// Styles
import {
	ContentBlockContainer,
	ContentBlockHeader,
	ContentBlockImg,
	ContentBlockListItem,
} from "../../styles/components/content-block.style"
import { IGallery, IUser, IVideo } from "../../interfaces/models"
import { List } from "../../styles/components/lists.styles"
import { Link } from "react-router-dom"

export const Debug: React.FC = () => {
	const { userMetadata } = useUserContext()

	const renderVideos = (videos: IVideo[]) => (
		<List>
			{videos.map((video: IVideo) => (
				<ContentBlockListItem key={video.video_id}>
					<Link
						to={video.video_URL}
						target="_blank"
						rel="noopener noreferrer"
					>
						<ContentBlockHeader>
							{video.video_name}
						</ContentBlockHeader>
					</Link>
					<h6>{`ID: ${video.video_id}`}</h6>

					<h6>{`Downloads: ${video.downloads}`}</h6>
					<h6>{`Views: ${video.views}`}</h6>
					<h6>{`Displayed? ${video.is_displayed}`}</h6>
					<h6>{`Img URL: ${video.img_URL}`}</h6>
					<ContentBlockImg src={video.img_URL} />
				</ContentBlockListItem>
			))}
		</List>
	)

	const renderGalleries = (galleries: IGallery[]) => (
		<List>
			{galleries.map((gallery: IGallery) => (
				<ContentBlockListItem key={gallery.gallery_id}>
					<ContentBlockHeader>
						{gallery.gallery_name}
					</ContentBlockHeader>
					<h6>{`ID: ${gallery.gallery_id}`}</h6>
					<h6>{`Hex1: ${gallery.hex1}`}</h6>
					<h6>{`Hex2: ${gallery.hex2}`}</h6>
					<h6>{`Hex3: ${gallery.hex3}`}</h6>
					<h6>{`Font: ${gallery.font}`}</h6>
					<h6>{`Img URL: ${gallery.img_URL}`}</h6>
					<ContentBlockImg src={gallery.img_URL} />
					<ContentBlockHeader>Videos:</ContentBlockHeader>
					{gallery.videos.length
						? renderVideos(gallery.videos)
						: "No videos."}
				</ContentBlockListItem>
			))}
		</List>
	)

	const renderUser = (userMetadata: IUser) => (
		<ContentBlockContainer>
			<ContentBlockHeader>{userMetadata.user_name}</ContentBlockHeader>
			<h6>{userMetadata.email}</h6>
			<ContentBlockHeader>Company:</ContentBlockHeader>
			<h6>{userMetadata.company.company_name}</h6>
			<h6>{`Site: ${userMetadata.company.website_URL}`}</h6>
			<h6>{`Facebook: ${userMetadata.company.facebook_URL}`}</h6>
			<h6>{`Instagram: ${userMetadata.company.instagram_URL}`}</h6>
			<h6>{`TikTok: ${userMetadata.company.tiktok_URL}`}</h6>
			<h6>{`Vimeo: ${userMetadata.company.vimeo_URL}`}</h6>
			<h6>{`Youtube: ${userMetadata.company.youtube_URL}`}</h6>
			<ContentBlockHeader>Galleries:</ContentBlockHeader>
			{userMetadata.galleries
				? renderGalleries(userMetadata.galleries)
				: "No galleries."}
		</ContentBlockContainer>
	)

	return userMetadata ? (
		renderUser(userMetadata)
	) : (
		<ContentBlockHeader>No user found</ContentBlockHeader>
	)
}
