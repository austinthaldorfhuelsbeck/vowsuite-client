import React from "react"

import { VideoListItem } from "./VideoListItem"
import { IVideo } from "../../interfaces/models"
import { VideosNotFound } from "../static/VideosNotFound"
import { List } from "../../styles/components/lists.styles"
import { useGalleryContext } from "../../context/ContextProvider"

function VideoList() {
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

export { VideoList }
