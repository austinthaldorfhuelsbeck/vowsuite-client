import styled from "styled-components"

export const DashboardContainer = styled.div`
	margin: 2rem;
	width: 100%;
`

export const DashboardBlock = styled.div`
	background-color: rgba(255, 255, 255, 0.08);
	border-radius: 0.5rem;
	margin: 1.5rem 0;
`

export const ContentContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-shrink: 0;
	width: 100%;
`

export const DashboardHeader = styled.h4`
	margin: 1rem auto 1rem 1rem;
	color: var(--white);
	cursor: default;
`

export const StudioContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: start;
	width: 100%;
`

export const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	background-color: var(--dark-aluminium);
	min-width: 28rem;
	margin: none;
`

export const SidebarSection = styled.div`
	padding-right: 2rem;
`

export const DashboardSubheader = styled.p`
	font-family: monospace;
	font-size: 65%;
	margin-left: 1rem;
	cursor: default;
`

export const DashboardListItem = styled.li`
	display: inline-grid;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
	transition: 0.3s;
	background: hsla(0, 0%, 100%, 0.12);
	border-radius: 5px;
	padding: 0.8rem;
	margin: 1.2rem;

	&:hover {
		background: hsla(0, 0%, 100%, 0.219);
	}

	& h4 {
		margin: 1.5rem auto auto 0;
		color: var(--aluminium);
	}
`

export const StudioHeaderContainer = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-shrink: 0;
	height: 6rem;
	max-height: 8rem;
	width: 100%;
	max-width: 1200px;
	padding-left: 1rem;
	margin: 0;
`

export const DashboardImg = styled.img`
	display: block;
	width: 27rem;
	height: 18rem;
	object-fit: cover;
	cursor: pointer;
	margin-top: 1rem;
	margin-bottom: 1rem;
	margin-left: auto;
	margin-right: auto;
`

export const DashboardCenterContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`