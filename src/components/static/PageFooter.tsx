// Dependencies
import * as React from "react"
// Data
import { copy, footerResourceList } from "../../data/app-constants"
// Components
import { PageFooterLink } from "../../styles/layouts/page-layout.style"
// Styles
import {
	FooterGrid,
	FooterLinkContainer,
	FooterMessage,
	LandingPageFooter,
} from "../../styles/components/footer.style"

export const PageFooter: React.FC = () => {
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
