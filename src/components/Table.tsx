import { useRef, useState } from 'react'
import { StyledCell, StyledRow, StyledTable } from './styles'

const Table = ({ cellsNumber }: Props) => {
	function initState() {
		return new Array(cellsNumber).fill('').map((item, index) => {
			return {
				index: index,
				type: 'row',
				cells: new Array(cellsNumber).fill('').map((cell, indx) => ({
					index: indx,
					type: 'cell',
					selected: false
				}))
			}
		})
	}

	const [state, setState] = useState(initState)
	const startRef = useRef({} as Coordinates)

	const [isPressed, setIsPressed] = useState(false)

	function handleMouseDown(row: Row, cell: Cell) {
		setIsPressed(true)
		startRef.current = {
			row: row.index,
			cell: cell.index,
			selected: !cell.selected
		}
		setState(_ => {
			const cloneState = initState()
			const target = cloneState[row.index].cells[cell.index]
			target.selected = !target.selected
			return cloneState
		})
	}

	function handleMouseUp() {
		setIsPressed(false)
	}
	function handleMouseMove(cell: Cell, row: Row) {
		if (!isPressed) return

		setState(_ => {
			const cloneItems = initState()
			const start = startRef.current
			const isRowIncrement = start.row < row.index
			const isCellIncrement = start.cell < cell.index

			if (isRowIncrement) {
				for (let i = start.row; i <= row.index; i++) {
					if (isCellIncrement) {
						for (let j = start.cell; j <= cell.index; j++) {
							cloneItems[i].cells[j].selected = true
						}
					} else {
						for (let j = start.cell; j >= cell.index; j--) {
							cloneItems[i].cells[j].selected = true
						}
					}
				}
			} else {
				for (let i = start.row; i >= row.index; i--) {
					if (isCellIncrement) {
						for (let j = start.cell; j <= cell.index; j++) {
							cloneItems[i].cells[j].selected = true
						}
					} else {
						for (let j = start.cell; j >= cell.index; j--) {
							cloneItems[i].cells[j].selected = true
						}
					}
				}
			}

			return cloneItems
		})
	}

	return (
		<StyledTable>
			{state.map((row, index) => {
				return (
					<StyledRow key={index} data-type={row.type} data-id={row.index}>
						{row.cells.map((cell, indx) => (
							<StyledCell
								selected={cell.selected}
								onMouseDown={() => handleMouseDown(row, cell)}
								onMouseUp={handleMouseUp}
								onMouseEnter={() => handleMouseMove(cell, row)}
								key={indx}
							>
								X{row.index}/ Y{cell.index}
							</StyledCell>
						))}
					</StyledRow>
				)
			})}
		</StyledTable>
	)
}

export default Table

interface Props {
	cellsNumber: number
}

interface Cell {
	index: number
	type: string
	selected: boolean
}

interface Row {
	index: number
	type: string
}
interface Coordinates {
	cell: number
	row: number
	selected: boolean
}
