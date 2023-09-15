'use strict'

//rank = '5*G','4*G','3*G','2*G','1*G','COL','LTC','MAJ','CPT','1LT','2LT','SGT','PVT','SPY','FLG'
const tileLot = [['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], ['1', '2', '3', '4', '5', '6', '7', '8']]

export const challenge = (attak, deff) => {
    let decision = { 0: 0, 1: 0 }

    if (attak === 0 && deff !== 0) { decision[1] = 2; return decision } // attaker lose the game
    if (attak == deff) {
        if (deff === 0) decision[0] = 2 //attaker captured flag, wins the game
        return decision //call split, both remove piece

    }
    if (attak === 14 && deff === 1) { decision[1] = 1; return decision } //Private eliminate Spy
    if (attak === 1 && deff === 14) { decision[0] = 1; return decision }
    if (attak > deff && deff === 0) { decision[0] = 2; return decision } //attaker captured flag, wins the game
    if (attak > deff) { decision[0] = 1 } else { decision[1] = 1; return decision }

}

export const availableMove = (currentPos) => { //posible move
    const Pos = currentPos.split("")
    const xPos = tileLot[0].indexOf(Pos[0])
    const yPos = tileLot[1].indexOf(Pos[1])
    let canMove = ['', '', '', ''] //left, right, up, down
    if (tileLot[0][xPos - 1] != undefined) { canMove[0] = tileLot[0][xPos - 1] + Pos[1] }
    if (tileLot[0][xPos + 1] != undefined) { canMove[1] = tileLot[0][xPos + 1] + Pos[1] }
    if (tileLot[1][yPos + 1] != undefined) { canMove[2] = Pos[0] + tileLot[1][yPos + 1] }
    if (tileLot[1][yPos - 1] != undefined) { canMove[3] = Pos[0] + tileLot[1][yPos - 1] }

    console.log(canMove)
    return canMove
}

const isOccupied = (targetPos, currPlayer) => {
    let tryMove = [0, 0] //allied, occupied
    if (targetPos['team'] == 0) {
        return tryMove // 0 not occupied
    }
    if (targetPos['team'] == currPlayer['team']) {
        return tryMove = [1, 1] // 1 is allay
    } else {
        return tryMove = [2, 1] // 2 is enemy
    }
}

const getPieceValue = (tileID) => { // is populated
    // tile id , piece team, piece value, 
    // then run playerTurn
    return tileID
}

// export function playerTurn(prep = true, currPlayer = 0, isprevTileClicked = false, prevTileClickedValue = 'A1') {
export function playerTurn(sessionID, loc, piece) {
    console.log(sessionID, loc, piece)
    // oonclick if is current player to turn then = true or false
    //      if not isprevTileClicked
    //          if is clicked tile is occupied then = [0, 0] //0 not occupied, 1 allied, 2 enemy
    //              if occupied allied then run AvailbleMove function = track clicked tile coordinate B5 
    //              if not occupied then end
    //              if occupied enemy then end
    //      else
    //          if is clicked tile is occupied with enemy then
    //              run challenge function = (attack coordinate, deff coordinate) then get its value return decision {0:0, 1:0}
    //                  if there is 2 in decision then 
    //                      end the game and the winner is with 2
    //                  then end turn then change currPlayer 0 to 1 vice versa
    //          else if is occupied with allay then
    //              run player Turn function with isprevTileClicked = false
    //          else if is not occupied then
    //              piece move to target tile then end turn change currPlayer 0 to 1 vice versa
    //          
    //      false - then end
}