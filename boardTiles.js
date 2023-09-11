'use strict'

const boardTiles = [['left', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'right'], ['bottom', '1', '2', '3', '4', '5', '6', '7', '8', 'top']] //col, row
const rank = ['5G', '4G', '3G', '2G', '1G', 'COL', 'LTC', 'MAJ', 'CPT', '1LT', '2LT', 'SGT', 'PVT', 'SPY', 'FLG']

const createTile = (col, row) => {
    const tileElem = document.createElement('div')
    tileElem.id = col + row
    tileElem.dataset.occupied = [0, 0]
    tileElem.className = "grid-item " + 'a' + col + 'Tile-a' + row + 'Tile'

    if ((col === 'left' || col === 'right') && !(row == 'top' || row == 'bottom')) {
        tileElem.innerHTML = row
    }

    if (!(col === 'left' || col === 'right') && (row == 'top' || row == 'bottom')) {
        tileElem.innerHTML = col
    }


    document.getElementById("boardGame").appendChild(tileElem)
}

const createPrepTile = (rank) => {
    const tileElem = document.createElement('div')
    tileElem.id = "prep" + rank
    tileElem.dataset.occupied = [0, 0]
    // tileElem.className = "grid-item"
    document.getElementById("prepBoard").appendChild(tileElem)
}

export function createBoardGame(tiles = boardTiles) {
    tiles[1].toReversed().map(rEle => {
        tiles[0].map(cEle => {
            createTile(cEle, rEle)
        })
    })
}

export function createPrepTiles(tiles = rank) {
    tiles.map(ele => {
        createPrepTile(ele)
    })
}