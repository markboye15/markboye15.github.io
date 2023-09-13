import { createBoardGame, createPrepTiles } from './boardTiles.js'
import { challenge, availableMove } from './tileDetails.js'
// import { readFormation, onPrepSelectPiece } from './preparation.js'

const checkSession = async () => {
    const currentURL = window.location.href
    const params = new URLSearchParams(currentURL.split('?')[1])
    const queryParams = {}
    for (const [key, value] of params) {
        queryParams[key] = value

    }

    if (queryParams['battle'] !== null) {
        if (queryParams['p'] !== null) {

        } else {
            //---
        }
    }

    return queryParams
}

$(window).ready(() => {
    $(window).on("load", async () => {
        const playing = await checkSession()

        if (playing['battle'] !== undefined) {
            console.log(playing['p'])
            $("#mainMenuForm").addClass("d-none")
            $("#newGameForm").addClass("d-none")
            $("#overlay").addClass("d-none")
        }
        $("#newGame").on("click", () => {
            $("#mainMenuForm").addClass("d-none")
            $("#newGameForm").removeClass("d-none")
        })



        // readFormation()
    })
})

createBoardGame();
createPrepTiles();





