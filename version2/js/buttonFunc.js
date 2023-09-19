import { createLobby } from "./createLobby.js"
import { userInfo } from './userInfo.js'

function removeSessionID() {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete('sid');
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  history.replaceState({}, document.title, newUrl);
}

export function buttonFunc() {
  $("#newGame").on("click", () => {
    removeSessionID()
    $("#newGameForm").removeClass("d-none")
    $("#mainMenuForm").addClass("d-none")
  })
  $("#joinLobby").on("click", () => {
    $("#lobbyRoomListForm").removeClass("d-none")
    $("#mainMenuForm").addClass("d-none")
  })
  $("#createLobby").on("click", async () => {
    const username = await userInfo()
    const sessionID = await createLobby(username)
  })
  $(".join-Link-btn").on("click", () => {
    $("#joinlobbyRoomForm").removeClass("d-none")
    $("#lobbyRoomListForm").addClass("d-none")
  })

  $(".go-back-btn").on("click", () => {
    removeSessionID()
    $("#mainMenuForm").removeClass("d-none")
    $(".go-back-btn").parent().parent().parent().addClass("d-none")
  })
}