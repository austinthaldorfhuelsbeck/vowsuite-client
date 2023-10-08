// Dependencies
import * as React from "react"
import {
	ContentBlockHeader,
	ContentBlockSubheader,
} from "../../styles/components/content-block.style"
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons"
import { BigIcon } from "../../styles/components/util.style"
import { copy } from "../../data/app-constants"

export const VideosNotFound: React.FC = () => {
	return (
		<>
			<ContentBlockHeader>{copy.videosNotFoundHeader}</ContentBlockHeader>
			<ContentBlockSubheader>
				{copy.videosNotFoundSubheader}
			</ContentBlockSubheader>
			<BigIcon icon={faVideoSlash} />
		</>
	)
}
