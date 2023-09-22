// Dependencies
import * as React from "react"
import { useGalleryContext } from "../../context/ContextProvider"
import { IVideo } from "../../interfaces/models"
// Components
import { VideoListItem } from "./VideoListItem"
// Styles
import { List } from "../../styles/components/lists.styles"

export const VideoList: React.FC = () => {
	const { gallery } = useGalleryContext()

	if (!gallery?.videos) return <span>Loading...</span>
	return (
		<List>
			{gallery.videos.map((video: IVideo) => (
				<VideoListItem key={video.video_id} video={video} />
			))}
		</List>
	)
}
