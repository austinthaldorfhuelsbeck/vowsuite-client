import styled, { css } from "styled-components"

export const List = styled.ul`
    list-style: none;
    padding-inline-start: 0;
`

export const SelectorListItem = styled.li`
    background-color: rgba(255, 255, 255, 0.08);
    cursor: pointer;
    padding: 1rem;
    padding-bottom: 2.5rem;
    margin-top: 1.6rem;
    padding-top: 1.5rem;
    color: rgba(206, 206, 206, 1);
    font-size: 14px;
    line-height: 16px;
    list-style-type: none;
    border-radius: 0 1rem 1rem 0;
    width: 100%;

    &:hover {
        color: var(--white);
        background-color: rgba(255, 255, 255, 0.15);

        & label {
            text-decoration-line: underline;
            text-decoration-style: solid;
            text-decoration-color: var(--indigo);
            text-decoration-thickness: 2px;
            text-underline-offset: 8px;
        }
    }

    ${props => props["aria-selected"] && css`
        color: var(--white);
        background-color: rgba(255, 255, 255, 0.15);

        & label {
            text-decoration-line: underline;
            text-decoration-style: solid;
            text-decoration-color: var(--indigo);
            text-decoration-thickness: 2px;
            text-underline-offset: 8px;
        }
    `}
`