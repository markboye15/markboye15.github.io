'use strict'
import { randomize } from './userInfo.js'
import { delay } from './main.js'
import * as updateMatchRecord from './matchDetails.js'

const playerListEle = (player1, player2) => {
    const tbody = document.createElement('tbody');
    const tableEle = document.getElementById("creatorPlayerList")
    tbody.innerHTML = `<tr class="">
        <td>${player1}</td><td>host</td><td><a class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover" href="#"></a></td>
        </tr>`
    if (player2 != '') {
        tbody.innerHTML += `<tr class="">
        <td>${player2}</td><td>waiting</td><td><a class="link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover" href="#">kick</a></td>
        </tr>`
    }
    tableEle.removeChild(tableEle.lastChild)
    tableEle.appendChild(tbody)
}

export async function waitingLobby(lobbySessionID = null, userInfo = null, run = true) {
    //check matchdetails every sec check if player2 is ready 
    let count = 0
    while (run) {
        const matchDetails = await updateMatchRecord.getJSONData(lobbySessionID)
        console.log(count, matchDetails['updateStatus'])
        count++
        if (count == 10) run = false
        await delay(500)
    }
}

export async function lobbyRoomDetails(sessionID = null, userInfo = null) {
    const details = await updateMatchRecord.getJSONData(sessionID, userInfo)
    console.log(details)
    if (details['players'][1]['name'] == userInfo) {
        $("[id$='Form']").addClass("d-none")
        $("#creatorlobbyRoomForm").removeClass("d-none")

        // creator form
        const lobbyRoomName = "ROOM : " + details['roomName']
        // const waitingText = "waiting (1/2) &nbsp;"
        $("#creatorLobbyRoomName").html(lobbyRoomName)
        $("#creatorLobbyGameDurationVal").val(details['gameDuration'])
        $("#creatorLobbyPerTurnDurationVal").val(details['perTurnDuration'])
        playerListEle(details['players'][1]['name'], details['players'][2]['name'])

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.delete('sid');
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        history.replaceState({}, document.title, newUrl + "&sid=" + sessionID);
    } else {
        // join form
    }

    await waitingLobby(sessionID)
}

async function insertMatchDetails(info) {
    let matchDetails =
    {
        sessionID: 'ID' + randomize(),
        roomName: info['name'],
        status: 'lobby', // [lobby, prep, ingame, done]
        updateStatus: 1, // auto-increment trigger when session is active
        isRank: info['isRank'],
        rankRange: 0,
        gameDuration: info['duration'],
        perTurnDuration: info['perTurnDuration'],
        players: {
            1: { // if not 2/2 lobby won't start -- waiting room
                name: info['creatorName'], // player name
                ready: true,  // lobby status
                prepstatus: false, // Preparation status -- ready to battle
                tileFormation: [], // array of formation 
                currentMove: ''
            },
            2: {
                name: '',
                ready: false,
                prepstatus: false,
                tileFormation: [],
                currentMove: ''
            }
        }
    }

    await updateMatchRecord.insertJSONData(matchDetails)
    await lobbyRoomDetails(matchDetails['sessionID'], info['creatorName'])

    return matchDetails['sessionID']
}

export async function createLobby(userInfo = null) {
    let newLobbyInfo = []
    newLobbyInfo['name'] = ($("#lobbyNameVal").val()) ? $("#lobbyNameVal").val() : "room" + randomize()
    newLobbyInfo['pass'] = $("#roomPasswordVal").val()
    newLobbyInfo['isRank'] = $("#changeRankModeVal").is(":checked")
    newLobbyInfo['duration'] = $("#gameDurationVal").val()
    newLobbyInfo['perTurnDuration'] = $("#perTurnDurationVal").val()
    newLobbyInfo['creatorName'] = userInfo['pl']

    return await insertMatchDetails(newLobbyInfo)

}
