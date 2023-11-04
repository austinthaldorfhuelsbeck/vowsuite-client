import { copy, footerResourceList } from "../../data/app-constants"
import {
	FooterLink,
	FooterLinkContainer,
	FooterMessage,
	LandingPageFooter,
	LegalContainer,
} from "../../styles/components/footer.style"

function PageFooter() {
	return (
		<LandingPageFooter>
			<LegalContainer>
				<FooterLinkContainer>
					{footerResourceList.map((resource) => (
						<FooterLink key={resource.path} to={resource.path}>
							<>{resource.label}</>
						</FooterLink>
					))}
				</FooterLinkContainer>
				<FooterMessage>{copy.footerMessage}</FooterMessage>
			</LegalContainer>
		</LandingPageFooter>
	)
}

export { PageFooter }
