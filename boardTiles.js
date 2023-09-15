'use strict'

import { onPrepSelectPiece } from './preparation.js'
import { playerTurn } from './tileDetails.js'

const boardTiles = [['left', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'right'], ['bottom', '1', '2', '3', '4', '5', '6', '7', '8', 'top']] //col, row
const rank = ['5G', '4G', '3G', '2G', '1G', 'COL', 'LTC', 'MAJ', 'CPT', '1LT', '2LT', 'SGT', 'PVT', 'SPY', 'FLG']
const sessionID = 1 //randomize


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

    $("#" + col + row).on('click', () => {
        const tileLoc = col + row
        const tilePieceDetails = $("#" + col + row).attr("data-occupied") 
        playerTurn(sessionID, tileLoc,tilePieceDetails)
    })
}

function insertPieceImg(rank, color) {
    const boardTile = document.getElementById('A1')
    const pieceElem = document.createElement('img')

    pieceElem.width = boardTile.offsetWidth - 2
    pieceElem.className = "img-piece"
    pieceElem.src = "./img/gog" + rank + color + ".png"
    document.getElementById("prep" + rank).appendChild(pieceElem)
    // if(rank == "5G") document.getElementById("A1").appendChild(pieceElem)

}

export const createPrepTile = (rank, team = 0) => {
    const tileElem = document.createElement('div')
    tileElem.id = "prep" + rank
    tileElem.dataset.info = [team, rank]
    tileElem.onclick = "console.log('allo')"
    // tileElem.className = "grid-item"
    document.getElementById("prepBoard").appendChild(tileElem)

    insertPieceImg(rank, (team) ? 'w' : '')

    $("#prep" + rank).on('click', () => {
        const peice = $("#prep" + rank).attr("data-info")
        onPrepSelectPiece(sessionID, peice)
    })
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