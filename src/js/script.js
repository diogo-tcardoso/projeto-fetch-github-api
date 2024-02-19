import { getUser } from "./services/user.js"
import { repos } from "./services/repositories.js"
import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"
import { events } from "./services/events.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if (validateInput(userName)) return
    getUserProfile(userName)
})

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.key
    const isEnterPressed = key == "Enter"
    if (validateInput(userName)) return
    if(isEnterPressed){
        getUserProfile(userName)
    }
})

function validateInput(userName){
    if(userName.length == 0){
        alert('Informe o nome do usuário do GitHub')
        return true
    }
}

async function getUserProfile(userName){
    const userResponse = await getUser(userName)
    if (userResponse.message === 'Not Found'){
        screen.renderUserNotFound()
        return
    }
    const repositoriesResponse = await repos(userName)
    const eventsResponse = await events(userName)
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    screen.renderUser(user)
}