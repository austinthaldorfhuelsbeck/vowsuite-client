import { MouseEvent, PropsWithChildren, useEffect, useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsis, faFolder, faLink } from "@fortawesome/free-solid-svg-icons"

import { useStatus } from "../../hooks/useStatus"
import { IGallery } from "../../interfaces/models"
import { ContextMenu } from "../menus/ContextMenu"
import { baseUrls, copy } from "../../data/app-constants"
import { Alert } from "../../styles/components/forms.style"
import { readGallery } from "../../services/vs-api/galleries.service"
import {
	useGalleryContext,
	useUserContext,
} from "../../context/ContextProvider"
import {
	galleryContextList,
	renderModalContextMenu,
} from "../../data/modal-context-lists"
import {
	ContextListButton,
	ContextListItem,
	List,
	SelectorListItem,
	SidebarLabel,
} from "../../styles/components/lists.styles"
import { ButtonTitle } from "../../styles/components/buttons.style"

// Data Models
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
	async function onClick(e: MouseEvent<HTMLLabelElement>) {
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
			aria-selected={currentGallery.gallery_id === gallery?.gallery_id}
		>
			<SidebarLabel onClick={onClick}>
				<FontAwesomeIcon icon={faFolder} />
				{" " + currentGallery.gallery_name}
			</SidebarLabel>
			<ContextMenu
				button={<ContextListButton icon={faEllipsis} />}
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
