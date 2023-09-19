import { buttonFunc } from './buttonFunc.js'
import { userInfo } from './userInfo.js'
import { lobbyRoomDetails } from './createLobby.js'

export function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))

}

async function preparation(run = true) {
    let count = 0
    while (run) {

        count++
        if (count == 1) run = false
        await delay(1000)

    }
}

async function inGame(run = true) {
    while (run) {
        run = false
        await delay(1000)
    }
}



$(window).ready(() => {
    $(window).on('load', async () => {
        buttonFunc()
        const user = await userInfo()

        if ((user['pl'] != null || user['pl'] != '') && (user['sid'] != null || user['sid'] != null)) {
            await lobbyRoomDetails(user['sid'], user['pl'])
        }
        
    })
})


