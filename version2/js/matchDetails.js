'use strict'

export const getJSONData = async (sessionID = null, userInfo = null) => {
    let values = []

    await $.get("./php/matchDetails.php", {
        sessionID: sessionID,
        userInfo: userInfo
    }).done(async (data) => {
        values = JSON.parse(data)
    })

    return values
}

export const updateJSONData = async (sessionID = null, userInfo = null, lobbyDetails) => {
    let values = []

    await $.get("./php/updateMatchDetails.php", {
        sessionID: sessionID,
        userInfo: userInfo
    }).done(async (data) => {
        values = JSON.parse(data)
    })

    return values
}

export const insertJSONData = async (lobbyDetails = []) => {
    let values = []

    await $.get("./php/insertMatchDetails.php", {
        lobbyDetails: lobbyDetails
    }).done(async (data) => {
        values = JSON.parse(data)
    })

    return values
}