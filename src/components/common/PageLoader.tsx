import React from "react"

import { imagePaths } from "../../data/app-constants"
import { Loader } from "../../styles/layouts/page-layout.style"

function PageLoader() {
	return (
		<Loader>
			<img src={imagePaths.loadingIcon} alt="Loading..." />
		</Loader>
	)
}

export { PageLoader }
