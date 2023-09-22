import styled from "styled-components"

export const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;

    width: 100%;
    min-height: 640px;

    /* responsive */

    padding: 48px;
`

export const ContentTitle = styled.h1`
    margin-top: 0;
    color: var(--white);
`

export const ContentBody = styled.p`
    font-size: 1.6rem;
    line-height: 2.4rem;
`