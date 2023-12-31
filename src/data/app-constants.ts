import { IStringHash, ILinkResource } from "../interfaces/common"

export const heroResource: ILinkResource = {
	path: "/studio",
	label: "Check out the Studio →",
}

export const footerResourceList: ILinkResource[] = [
	{
		path: "/terms",
		label: "Terms of Service",
	},
	{
		path: "/privacy",
		label: "Privacy Policy",
	},
]

export const baseUrls: IStringHash = {
	homePage: "http://localhost:4040",
	galleryPage: "http://localhost:4040/galleries",
}

export const imagePaths: IStringHash = {
	loadingIcon: "https://cdn.auth0.com/blog/hello-auth0/loader.svg",
	defaultUser: "https://i.stack.imgur.com/HQwHI.jpg",
}

export const defaultGalleryStyle: IStringHash = {
	font: "Georgia",
	hex1: "#D1B2A2",
	hex2: "#FFEDE4",
	hex3: "#E8BAA3",
}

export const defaultFonts: string[] = [
	"Playfair Display",
	"Georgia",
	"Roboto Mono",
	"Futura",
]

export const copy: IStringHash = {
	heroTitle: "Deliver videos with Vowsuite",
	heroBody: "It's the best for delivering videos.",
	footerMessage: "Copyright © 2023 Vowsuite, Inc. All Rights Reserved.",
	confirmDeleteMessage:
		"Deleting is permanent. You will not be able to recover this object.",
	formSuccess: "Success!",
	linkCopySuccess: "Link has been copied successfully!",
	galleryNotFoundHeader: "No Gallery Selected",
	galleryNotFoundSubheader:
		"Select a Gallery, or click New Gallery to create your first gallery",
	videosNotFoundHeader: "Gallery Empty",
	videosNotFoundSubheader: "Click New Video to upload to the gallery",
	brandSubheader: "Learn more ",
	brandDetailsSubheader: " Visit website",
	brandDetailsSocial: "Follow us",
	galleryHeaderButton: " Play",
	videoCardSubheader: " Play film",
	brandDetailsCopyright: "Made with Vowsuite",
	companyFormHeader: "Company Details",
	companyFormSubheader: "Font",
	confirmDeleteHeader: "Are you sure?",
	galleryFormHeader: "Gallery Details",
	userFormHeader: "User Details",
	videoFormHeader: "Video Details",
	sidebarHeader: "Galleries",
	newGalleryButtonHeader: "New Gallery",
	galleryLIOpen: "View Gallery",
	galleryLICopy: "Copy Link",
	galleryLICopySuccess: "Link copied!",
	companyTabNew: "New Company",
}
