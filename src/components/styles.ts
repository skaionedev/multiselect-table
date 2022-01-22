import styled from 'styled-components'

export const StyledTable = styled.div`
	border: 1px solid #ccc;
`

export const StyledCell = styled.div<{ selected: boolean }>`
	border: 1px solid #ccc;
	background: ${({ selected }) => (selected ? '#ebebeb' : '#fff')};
	flex-basis: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 6px;
	user-select: none;
	font-family: 'Arial';
`

export const StyledRow = styled.div`
	display: flex;
	width: 100%;
`
