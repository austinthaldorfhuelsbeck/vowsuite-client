import { PropsWithChildren } from "react"

import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons"

import { IGallery, IVideo } from "../../interfaces/models"
import {
	GalleryModalContainer,
	GallerySubheader,
} from "../../styles/layouts/gallery-layout.style"
import { TransparentButton } from "../../styles/components/buttons.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

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
				<TransparentButton
					key={video.video_id}
					onClick={() => downloadVideo(video)}
				>
					<FontAwesomeIcon icon={faCloudDownloadAlt} />
					{" " + video.video_name}
				</TransparentButton>
			))}
		</GalleryModalContainer>
	)
}

export { VideoDownload }
