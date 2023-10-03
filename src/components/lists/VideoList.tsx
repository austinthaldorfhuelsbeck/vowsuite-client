// Dependencies
import * as React from "react"
import { useGalleryContext } from "../../context/ContextProvider"
import { IVideo } from "../../interfaces/models"
// Components
import { VideoListItem } from "./VideoListItem"
import { VideosNotFound } from "../static/VideosNotFound"
// Styles
import { List } from "../../styles/components/lists.styles"

export const VideoList: React.FC = () => {
	const { gallery } = useGalleryContext()

	if (!gallery?.videos || gallery?.videos.length === 0)
		return <VideosNotFound />
	return (
		<List>
			{gallery.videos.map((video: IVideo) => (
				<VideoListItem key={video.video_id} video={video} />
			))}
		</List>
	)
}
