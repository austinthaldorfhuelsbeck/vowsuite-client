// Dependencies
import * as React from "react"
// Data
import { imagePaths } from "../../utils/app-constants"
// Styles
import { Loader } from "../../styles/layouts/page-layout.style"

export const PageLoader: React.FC = () => {
	return (
		<Loader>
			<img src={imagePaths.loadingIcon} alt="Loading..." />
		</Loader>
	)
}
