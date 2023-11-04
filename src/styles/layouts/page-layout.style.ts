import styled from "styled-components"

export const PageContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	/* height: 100%; */
	width: 100%;
`

export const PageContent = styled.div`
	flex: 1;
	flex-basis: auto;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	margin-top: 8rem;
	/* max-width: 120rem; */
	width: 100%;
`

export const Loader = styled.div`
	height: 5rem;
	width: 5rem;
	margin: auto;
	animation: spin 2s infinite linear;
`
