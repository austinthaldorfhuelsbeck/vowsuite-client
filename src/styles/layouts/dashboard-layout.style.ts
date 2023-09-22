import styled from "styled-components"

export const StudioContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 100%;
    min-height: 640px;
    padding: 10px;
`

export const DashboardContainer = styled.div`
    display: flex;
    flex-direction: row;
    /* background-color: var(--dark-aluminium);
    border-radius: 1rem; */
    justify-content: start;
    width: 100%;
    padding: 1rem;
    font-size: 1.6rem;
    line-height: 2.4rem;
`

export const GalleryContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--dark-aluminium);
    border-radius: 1rem;
    min-width: 28rem;
    padding: 1rem;
`

export const GalleryContainerHeader = styled.h4`
    margin-top: 0;
    color: var(--white);
`