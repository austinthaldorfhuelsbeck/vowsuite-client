import React, { PropsWithChildren } from "react"

import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons"

import { InlineButton } from "../buttons/InlineButton"
import { IGallery, IVideo } from "../../interfaces/models"
import {
	GalleryModalContainer,
	GallerySubheader,
} from "../../styles/layouts/gallery-layout.style"

interface ComponentProps {
	gallery: IGallery
}

function VideoDownload({ gallery }: PropsWithChildren<ComponentProps>) {
	const downloadVideo = (video: IVideo) => {
		// anchor link
		const element: HTMLAnchorElement = document.createElement("a")
		element.href = video.video_URL
		const fileName: string =
			String(gallery.gallery_name) +
			"_" +
			video.video_name +
			video.video_URL.slice(-4)
		element.download = fileName

		// simulate link click
		document.body.appendChild(element)
		element.click()
	}

	return (
		<GalleryModalContainer>
			<GallerySubheader>Downloads</GallerySubheader>
			{gallery.videos.map((video: IVideo) => (
				<InlineButton
					key={video.video_id}
					title={video.video_name}
					icon={faCloudDownloadAlt}
					onClick={() => downloadVideo(video)}
				/>
			))}
		</GalleryModalContainer>
	)
}

export { VideoDownload }
