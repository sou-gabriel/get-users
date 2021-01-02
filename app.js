const getUsersButton = document.querySelector('[data-users="get"]')
const usersContainer = document.querySelector('.main__users-container')
const clearUsersButton = document.querySelector('[data-users="clear"]')
const inputSearchUsers = document.querySelector('input[name="search"]')
const deleteCardButton = document.querySelector('.card__close')

const getUsers = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      users.forEach((user) => {
        usersContainer.innerHTML += `
          <div class="card appear">
            <p class="card__name">
              <small>Nome:</small>
              ${user.name}
            </p>
            <p class="card__username">
              <small>Usuário:</small>
              ${user.username}
            </p>
            <a class="card__website" href="${user.website}">Acesse meu website</a>
          </div> 
        `
      })      
    })
    .catch(error => console.log(error))
}

const setUsersContainerVisibility = isToShow => {
  if (isToShow) {
    usersContainer.classList.remove('hidden')
    return
  }

  usersContainer.classList.add('hidden')
}

const clearUsers = () => usersContainer.innerHTML = null
 
const filterUsers = (inputValue, usersCards, isUserMatched) => {
  return usersCards.filter(userCard => {
    const paragraphUserName = userCard.querySelector('.card__name')
    const isMatch = paragraphUserName.textContent.toLowerCase().includes(inputValue)
    return isUserMatched ? isMatch : !isMatch
  })
}

const setCardVisibility = (usersCards, classToRemove, classToAdd) => {
  usersCards.forEach(card => {
    card.classList.remove(classToRemove)
    card.classList.add(classToAdd)
  })
}

const hideUsers = (inputValue, usersCards) => {
  const users = filterUsers(inputValue, usersCards, false)
  console.log('oi')
  setCardVisibility(users, 'appear', 'hidden')
}

const showUsers = (inputValue, usersCards) => {
  const users = filterUsers(inputValue, usersCards, true)
  setCardVisibility(users, 'hidden', 'appear')
}

const searchUsers = event => {
  const inputValue = event.target.value.toLowerCase().trim()  

  const usersCards = Array.from(usersContainer.children)

  hideUsers(inputValue, usersCards)
  showUsers(inputValue, usersCards)
}

getUsersButton.addEventListener('click', () => {
  getUsers()
  setUsersContainerVisibility(true)
})
clearUsersButton.addEventListener('click', () => {
  clearUsers()
  setUsersContainerVisibility(false)
})
inputSearchUsers.addEventListener('input', searchUsers)
