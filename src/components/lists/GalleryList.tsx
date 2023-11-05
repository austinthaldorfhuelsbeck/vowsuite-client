import { MouseEvent, PropsWithChildren, useEffect, useState } from "react"

import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faEllipsis,
	faExternalLinkSquareAlt,
	faFolder,
	faLink,
} from "@fortawesome/free-solid-svg-icons"

import { useStatus } from "../../hooks/useStatus"
import { IGallery } from "../../interfaces/models"
import { ContextMenu } from "../menus/ContextMenu"
import { baseUrls, copy } from "../../data/app-constants"
import { Alert } from "../../styles/components/forms.style"
import { ButtonTitle } from "../../styles/components/buttons.style"
import {
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
import {
	galleryContextList,
	renderModalContextMenu,
} from "../../data/context-lists"
import {
	ContextListItem,
	List,
	SelectorListItem,
} from "../../styles/components/lists.styles"
import { readGallery } from "../../services/galleries.service"

interface ContextMenuProps {
	gallery: IGallery | undefined
}

interface ListItemProps {
	currentGallery: IGallery
}

function GalleryContextMenu({ gallery }: PropsWithChildren<ContextMenuProps>) {
	// Context
	const { success, handleSuccess } = useStatus()

	// Constants
	const galleryUrl: string = `${baseUrls.galleryPage}/${gallery?.gallery_id}`

	// Handlers
	function onCopy(e: MouseEvent<HTMLLIElement>) {
		e.preventDefault()
		// function to copy text
		const copyText = async (text: string) => {
			try {
				await navigator.clipboard.writeText(text)
				handleSuccess()
			} catch (err) {
				console.error(err)
			}
		}
		if (gallery) copyText(galleryUrl)
	}

	return (
		<>
			<ContextListItem>
				<Link to={galleryUrl} target="_blank" rel="noopener noreferrer">
					<FontAwesomeIcon icon={faExternalLinkSquareAlt} />
					<ButtonTitle>{copy.galleryLIOpen}</ButtonTitle>
				</Link>
			</ContextListItem>
			{renderModalContextMenu(galleryContextList)}
			<ContextListItem onClick={onCopy}>
				<FontAwesomeIcon icon={faLink} />
				<ButtonTitle>{copy.galleryLICopy}</ButtonTitle>
			</ContextListItem>
			{success && <Alert success>{copy.galleryLICopySuccess}</Alert>}
		</>
	)
}

function GalleryListItem({ currentGallery }: PropsWithChildren<ListItemProps>) {
	// Context
	const { gallery, setGallery } = useGalleryContext()

	// Handlers
	async function onClick(e: MouseEvent<HTMLLIElement>) {
		e.preventDefault()
		const foundGallery: IGallery = (
			await readGallery(String(currentGallery.gallery_id))
		).data
		setGallery(foundGallery)
	}

	// highlights if selected, sets selected on click
	// selected is determined if gallery is equal to context gallery
	return (
		<SelectorListItem
			aria-selected={currentGallery === gallery}
			onClick={onClick}
		>
			<ButtonTitle>
				<FontAwesomeIcon icon={faFolder} />
				{" " + currentGallery.gallery_name}
			</ButtonTitle>
			<ContextMenu
				button={<FontAwesomeIcon icon={faEllipsis} />}
				content={<GalleryContextMenu gallery={gallery} />}
			/>
		</SelectorListItem>
	)
}

function GalleryList() {
	// Context
	const { user } = useUserContext()

	// State
	const [listedGalleries, setListedGalleries] = useState<
		(IGallery | undefined)[]
	>([])

	// Effects
	useEffect(() => {
		// Function to get a list of full galleries
		async function validateGalleries(galleries: IGallery[]) {
			console.log("Effect run. Galleries: ", galleries)
			setListedGalleries(galleries)
		}
		if (user?.galleries?.length) validateGalleries(user.galleries)
	}, [user])

	return (
		<List>
			{listedGalleries.length ? (
				listedGalleries.map(
					(currentGallery: IGallery | undefined) =>
						currentGallery && (
							<GalleryListItem
								key={currentGallery.gallery_id}
								currentGallery={currentGallery}
							/>
						),
				)
			) : (
				<></>
			)}
		</List>
	)
}

export { GalleryList }
