import { getUser } from "./services/user.js"
import { repos } from "./services/repositories.js"
import { user } from "./objects/user.js"
import { screen } from "./objects/screen.js"

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
    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    screen.rederUser(user)

}

// function getUserRepositories(userName){
//     repos(userName).then(reposData => {
//         let repositoriesItens = ""
//         reposData.forEach(repo => {
//             repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">"${repo.name}"</a></li>`
//         })

//         document.querySelector('.profile-data').innerHTML +=`
//             <div class="repositories section">
//                 <h2>Repositórios</h2>
//                 <ul>${repositoriesItens}</ul>
//             </div>`
//     })
// }