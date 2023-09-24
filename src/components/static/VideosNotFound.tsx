// Dependencies
import * as React from "react"
import {
	ContentBlockHeader,
	ContentBlockSubheader,
} from "../../styles/components/content-block.style"
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons"
import { BigIcon } from "../../styles/components/util.style"

export const VideosNotFound: React.FC = () => {
	return (
		<>
			<ContentBlockHeader>Gallery Empty</ContentBlockHeader>
			<ContentBlockSubheader>
				Click New Video to upload to the gallery
			</ContentBlockSubheader>
			<BigIcon icon={faVideoSlash} />
		</>
	)
}
