let btnAdd = document.getElementById('btn-add');
let listView = document.querySelector('.contact-list');
let form = document.getElementById('form');
let btnCancelForm = document.getElementById('btn-cancel')

// datas 
let contacts = [];

// mode
let editionMode = false;

btnAdd.addEventListener('click', (e) => {
    btnAdd.classList.toggle('d-none');
    form.classList.toggle('d-none');
});

btnCancelForm.addEventListener('click', (e) => {
    // togles visibility
    btnAdd.classList.toggle('d-none');
    form.classList.toggle('d-none');
})


// add action ! 
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let data = new FormData(e.target);

    let timestamp = Date.parse(data.get('birthday'))
    let dateBirth = new Date(timestamp);
   

    let contact = {
        'name' : data.get('name'),
        'prenom' : data.get('prenom'),
        'pays' : data.get('pays'),
        'genre' : data.get('genre'),
        'email' : data.get('email'),
        'telephone' : data.get('telephone'),
        'birthday' : data.get('birthday'),
        'age': (new Date().getFullYear()) - (dateBirth.getFullYear())
        // 'avatar' : data.get('avatar'),
    }

    contacts.push(contact);
    renderListView()
})

// d'afficher la liste
function renderListView() {
    listView.innerHTML = ''

    for (let index =0; index < contacts.length; index++) {
        let temp = `<div class="contact-item d-flex cursor-pointer" onclick="showMore(this)">
            <div class="profile">
                <img src="images/avatar.jpeg" alt="" width="100px" class="img-fluid rounded-circle bg-dark">
            </div>
            <div class="info flex-grow-1 ms-3">
                <h2 class="h4 contact-name">${contacts[index].name + contacts[index].prenom}</h2>
                <p class="m-0">${contacts[index].pays}</p>
                <p class="m-0">${contacts[index].telephone}</p>
                <p class="m-0 more d-none">${contacts[index].email}</p>
                <p class="m-0 more d-none">${contacts[index].genre} <span>${contacts[index].age} ans</span></p>
            </div>
            <div class="actions">
                <button class="btn btn-secondary" onclick="editContact(${index})">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button class="btn btn-danger" onclick="deleteContact(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
        `

        listView.innerHTML += temp
    }


}

function deleteContact(index) {
    contacts.splice(index, 1)
    renderListView();
}

function editContact(index) {
    let contact = contacts[index];
    editionMode = true;

    form.classList.toggle('d-none');
}

function showMore(e) {
    let mores = e.getElementsByClassName('more');
    for (const m of mores) {
        m.classList.toggle('d-none')
    }
}

renderListView()