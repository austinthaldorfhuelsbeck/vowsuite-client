import { IStringHash, ILinkResource } from "../interfaces/common"

export const heroResource: ILinkResource = {
	path: "/studio",
	label: "Check something out →",
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

export const imagePaths: IStringHash = {
	loadingIcon: "https://cdn.auth0.com/blog/hello-auth0/loader.svg",
	defaultUser: "https://i.stack.imgur.com/HQwHI.jpg",
}

export const galleryFonts: string[] = [
	"Georgia",
	"Playflair Display",
	"Roboto Mono",
	"Futura",
]

export const defaultGalleryStyle: IStringHash = {
	font: "Georgia",
	hex1: "#D1B2A2",
	hex2: "#FFEDE4",
	hex3: "#E8BAA3",
}

export const copy: IStringHash = {
	heroTitle: "Deliver videos with Vowsuite",
	heroBody: "It's the best for delivering videos.",
	footerMessage: "Copyright © 2023 Vowsuite, Inc. All Rights Reserved.",
}
