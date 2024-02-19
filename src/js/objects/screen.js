import { user } from "./user.js"

const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(userData){
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${userData.avatarUrl}" alt="Foto do perfil do usuário" />
                                            <div class="data">
                                                <h1>${userData.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                                <p>${userData.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                                </br>
                                                <p>Followers: ${userData.followers ?? 'Não está sendo seguido por ninguém 😢'}
                                                </p>
                                                <p>Following: ${userData.following ?? 'Não está seguindo ninguém 😢'}</p>
                                            </div>
                                      </div>`

        let repositoriesItens = ""
        user.repositories.forEach(repo => {
            let language = repo.language ? repo.language : "Sem linguagem"
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}
                                    <p>🍴${repo.forks} ⭐${repo.stargazers_count} 👀${repo.watchers} 💻${language}</p>
                                    </a></li>`
        })
        console.log(user.repositories)
        if(user.repositories.length > 0) {
            this.userProfile.innerHTML +=`<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                          </div>`
        }

        let eventsItens = ""
        let filteredEvents = user.events.filter(event => (event.type === 'CreateEvent' || event.type ==='PushEvent'))
        let firstTenEvents = filteredEvents.slice(0, 10)
        firstTenEvents.forEach(evt => {
            if (evt.payload.commits && evt.payload.commits.length > 0) {
                eventsItens += `<li>${evt.repo.name} - ${evt.payload.commits[0].message}</li>`;
            } else {
                eventsItens += `<li>${evt.repo.name} - 'Não possui mensagem'</li>`;
            }
        })
        if(filteredEvents.length > 0) {
            this.userProfile.innerHTML +=`<div class="events section">
                                            <h2>Eventos</h2>
                                            <ul>${eventsItens}</ul>
                                          </div>`
        }
    },
    renderUserNotFound(){
        this.userProfile.innerHTML = '<h3>Usuário não encontrado</h3>'
    }
}

export { screen }