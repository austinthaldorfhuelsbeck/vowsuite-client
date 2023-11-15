import { PropsWithChildren } from "react"

import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons"

import { IGallery, IVideo } from "../../interfaces/models"
import {
	GalleryModalContainer,
	GallerySubheader,
} from "../../styles/layouts/gallery-layout.style"
import { TransparentButton } from "../../styles/components/buttons.style"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { usePreview } from "../../hooks/usePreview"

interface ComponentProps {
	gallery: IGallery
}

function VideoDownload({ gallery }: PropsWithChildren<ComponentProps>) {
	// Context
	const { validUrl, getUrlFromAws } = usePreview()

	async function downloadVideo(name: string) {
		await getUrlFromAws(name)
		// anchor link
		const element: HTMLAnchorElement = document.createElement("a")
		if (validUrl) element.href = validUrl
		const fileName: string =
			String(gallery.gallery_name) + "_" + validUrl?.slice(-4)
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
					onClick={() => downloadVideo(video.video_URL)}
				>
					<FontAwesomeIcon icon={faCloudDownloadAlt} />
					{" " + video.video_name}
				</TransparentButton>
			))}
		</GalleryModalContainer>
	)
}

export { VideoDownload }
