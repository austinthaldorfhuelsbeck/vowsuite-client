import React from "react"

import { copy, footerResourceList } from "../../data/app-constants"
import { PageFooterLink } from "../../styles/layouts/page-layout.style"
import {
	FooterGrid,
	FooterLinkContainer,
	FooterMessage,
	LandingPageFooter,
} from "../../styles/components/footer.style"

function PageFooter() {
	return (
		<LandingPageFooter>
			<FooterGrid>
				<FooterMessage>{copy.footerMessage}</FooterMessage>
				<FooterLinkContainer>
					{footerResourceList.map((resource) => (
						<PageFooterLink
							key={resource.path}
							to={resource.path}
							target="_blank"
							rel="noopener noreferrer"
						>
							<>{resource.label}</>
						</PageFooterLink>
					))}
				</FooterLinkContainer>
			</FooterGrid>
		</LandingPageFooter>
	)
}

export { PageFooter }
