'use strict'

// new game
// create lobby - lobby name, then create - generate session - save to database
// waiting for opponent - then start
// session should have : id session, player1 name, player2 name  ,type (rank / normal), game duration, per turn duration, isPaused
// open stage preparation (side of the board). other player cannot see other board. Player can change color (black or white) default is white
// list of available pieces. with button that put avialable pieces random into board

// select available piece then select where tile on board should put it.
// right click tile with piece will remove piece back to avialable pieces


// ready to battle

// battle session : player turn : player 1 or 2 

// start new game
// join current game
// rules and instruction


// start new game
// preparation




//POST session -  team 1 or team2 // session id 

// battle session, team = 1 or 2, ready = true or false
export const readFormation = () => {
    //read player1 formation from board 1 to 3 //read data set : ['0', 'A3']
    const playerBoard = [[], []]
    const colName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    for (let i = 1; i <= 3; i++) {
        colName.map((ele) => {
            const datasetOf = document.getElementById(ele + i).dataset.occupied
            playerBoard[0].push(datasetOf) //A1 to I1, A2 to I2 ....

        })
    }

    for (let i = 6; i <= 8; i++) {
        colName.map((ele) => {
            const datasetOf = document.getElementById(ele + i).dataset.occupied
            playerBoard[1].push(datasetOf) //A6 to I6, A8 to I8 ....

        })
    }

    return playerBoard
}

export const onPrepSelectPiece = async (sessionID, piece) => {

    $.post("./getMatchData.php", {
        sessionID: sessionID,
        player: 'mark1',
        piece: piece
    }).done((data) => {
        console.log(data)
    })

    // const matchDetails = await fetch('./_matchData.json')
    //     .then((res) => res.json())
    //     .then((json) => { return json })


    // const matchDetailsFilter = matchDetails.filter(item => item.sessionID === 2)
    // const currentMove = matchDetailsFilter[0]['player1']['currentMove']
    // console.log(currentMove)
    // if (currentMove === null) {

    // }
    // console.log(matchDetails)
}


const battleDetails = {
    1: {
        sessionID: 'kjsd1932',
        status: '', //onLobby, preparation, end
        turns: 0, // 0 player1, 1 player2
        player1: {
            name: 'mark1',
            lineup: '',
            ready: true // true or false
        },
        player2: {
            name: 'mark1',
            lineup: '', //1 A to I, 2 A to I
            ready: true // true or false
        },
        winner: null // player1 player2 null
    }
}

