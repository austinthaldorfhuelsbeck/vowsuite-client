export interface IStringHash {
	[label: string]: string
}

export interface ILinkResource {
	path: string
	label: string
}

export interface ModalResource {
	button: JSX.Element
	content: JSX.Element
}
