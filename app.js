const getUsersButton = document.querySelector('[data-js="get-users"]')
const usersContainer = document.querySelector('.users-container')
const clearUsersButton = document.querySelector('[data-js="clear-users"]')
const inputSearchUser = document.querySelector('[data-js="search"]')
const deleteCardButton = document.querySelector('.card__close')

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  return await response.json()
}

const generateUserCards = async () => {
  const users = await fetchUsers()

  users.forEach(({ name, username, website }) => {
    usersContainer.innerHTML += `
      <div class="card appear">
        <p class="paragraph paragraph-name">
          <small>Nome:</small>
          ${name}
        </p>
        <p class="paragraph paragraph-username">
          <small>Usuário:</small>
          ${username}
        </p>
        <a class="link-website" href="${website}">Acesse meu website</a>
      </div> 
    `
  })
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
    const paragraphUserName = userCard.querySelector('.paragraph-name')
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
  generateUserCards()
  setUsersContainerVisibility(true)
})

clearUsersButton.addEventListener('click', () => {
  clearUsers()
  setUsersContainerVisibility(false)
})

inputSearchUser.addEventListener('input', searchUsers)
