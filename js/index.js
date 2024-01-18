document.addEventListener('DOMContentLoaded',getMonsters)

let currentPage = 1
function getMonsters(){
    fetch('http://localhost:3000/monsters')
    .then (res => res.json())
    .then (data => {
        const monsterContainer = document.getElementById('monster-container')
        const monsters = data.slice(0, 50)
        monsterContainer.innerHTML = ''

        monsters.forEach(monster => {
            const newData = document.createElement('div')
            const nameHead = document.createElement('h2')
            const age = document.createElement('h4')
            const description = document.createElement('p')

            nameHead.innerHTML = monster.name
            age.innerHTML = `Age: ${monster.age}`
            description.innerHTML = `Bio: ${monster.description}`

            newData.appendChild(nameHead)
            newData.appendChild(age)
            newData.appendChild(description)
            monsterContainer.appendChild(newData)
    })
    /* At the bottom of the list show show buttons
    to load more monsters "<=, =>"
*/
        // grab the prevButton
        const prevButton = document.getElementById('back');
  
        // grab the nextButton
        const nextButton = document.getElementById('forward');
  
        // Add event listeners to the buttons
        prevButton.addEventListener('click', loadPreviousMonsters);
        nextButton.addEventListener('click', loadNextMonsters);
    })
        function loadPreviousMonsters() {
        if (currentPage > 1) {
          currentPage--
          getMonsters()
        }
        }
      
        function loadNextMonsters() {
        currentPage++
        getMonsters()
        }
    /*create a form above the monsters
    "name..., age..., and description... (placeholders)"
    w/ a "create" button*/
    const createMonster = document.getElementById('create-monster')
    const monsterForm = document.createElement('form')
    const nameInput = document.createElement('input')
    nameInput.setAttribute('id', 'name-input')
    nameInput.placeholder = "name..."
    const ageInput = document.createElement('input')
    ageInput.setAttribute('id', 'age-input')
    ageInput.placeholder = "age..."
    const descriptionInput = document.createElement('input')
    descriptionInput.setAttribute('id', 'description-input')
    descriptionInput.placeholder = "description..."

    monsterForm.appendChild(nameInput)
    monsterForm.appendChild(ageInput)
    monsterForm.appendChild(descriptionInput)
    createMonster.appendChild(monsterForm)

    const createButton = document.createElement('button')
    createButton.setAttribute('id', 'create-button')
    createButton.innerHTML = "Create"
    createButton.addEventListener('submit',createEvent)
    monsterForm.appendChild(createButton)

   /*when the button is clicked
    the monster should be added to the list*/
    function createEvent(event){
        event.preventDefault()
        const name = nameInput.value
        const age = ageInput.value
        const description = descriptionInput.value

        const newMonster = {
            name: name,
            age: age,
            description: description
        }

        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify(newMonster)
          })
            .then(response => response.json())
            .then(data => {

        const newDataInput = document.createElement('div')
        const nameHeadInput = document.createElement('h2')
        const newAgeInput = document.createElement('h4')
        const newDescriptionInput = document.createElement('p')
        const monsterContainer = document.getElementById('monster-container')

        nameHeadInput.innerHTML = data.name
        newAgeInput.innerHTML = data.age
        newDescriptionInput.innerHTML = data.description

        newDataInput.appendChild(nameHeadInput)
        newDataInput.appendChild(newAgeInput)
        newDataInput.appendChild(newDescriptionInput)
        monsterContainer.appendChild(newDataInput)
    })
    .catch(error => {
        console.error("Error:", error);
      });
    }

    }