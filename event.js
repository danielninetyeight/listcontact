const REGEX_NUMBER = /^[0][42][12][426][0-9]{7}$/;
const REGEX_NAME = /^[A-Z]{1}[a-z ]+[A-Z]{1}[a-z]*$/;
const numberInput = document.querySelector('#number-input');
const nameInput = document.querySelector('#name-input');
const form = document.querySelector('#form');
const formBtn = document.querySelector('.form-btn');
const List = document.querySelector('#List');
const ListItem = document.querySelector('.ListItem')
const nameList = document.querySelector('#Name-List');
const deletBtn = document.querySelector('.delete-btn');
const editBtn = document.querySelector('.edit-icon');
const editBtn2 = document.querySelector('.edit-btn');
const editandoSave = document.querySelector ('.editando-save');
const contactNumberSpace = document.querySelector('.contact-number-space');
const contactNameSpace = document.querySelector('.contact-name-space')

let inputValidation = false;
let nameValidation = false;

const validateInput = (input, regexValidation) => {

    if (inputValidation && nameValidation) {
        formBtn.disabled = false;
    } else {
        formBtn.disabled = true;
    }


    if (input.value === '') {
        input.classList.remove('red');
        input.classList.remove('green');
    } else if (regexValidation) {
        input.classList.remove('red');
        input.classList.add('green');
    } else {
        input.classList.remove('green');
        input.classList.add('red');
    }


}


numberInput.addEventListener('input', e => {
    inputValidation = REGEX_NUMBER.test(e.target.value);
    validateInput(numberInput, inputValidation)
});


nameInput.addEventListener('input', e =>{
    nameValidation = REGEX_NAME.test(e.target.value)
    validateInput(nameInput, nameValidation)
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const li = document.createElement('li');
    li.classList.add('ListItem');
    li.innerHTML = `

    <button class="delete-btn">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="delete-icon"> <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>  </button>



        <input class="contact-number-space" type="text" value="${numberInput.value}" readonly>
        <input class="contact-name-space" type="text" value=" ${nameInput.value}" readonly>

        <button class="edit-btn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="edit-icon">
            <path stroke-linecap="round" stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
         </button>
    `;

    List.append(li);
    localStorage.setItem('list', List.innerHTML); // Guardar en locale storage



    nameInput.value ='';
    nameValidation = false;

    validateInput(nameInput);

    numberInput.value ='';
    inputValidation = false;

    validateInput(numberInput);

});

const getContacts = () => {
    if (localStorage.getItem('list')) {
        List.innerHTML = localStorage.getItem('list');
    }
}

getContacts();

List.addEventListener('click', e => {
    if (e.target.closest('.delete-btn')) {
        const button = e.target.closest('.delete-btn');
        button.parentElement.remove();
        localStorage.setItem('list', List.innerHTML);

    }

    if (e.target.closest('.edit-btn')) {
        const button = e.target.closest('.edit-btn');
        let editInput = button.parentElement.children [1];
        let editInput2 = button.parentElement.children [2];

        if (button.classList.contains('editando'))

        {
            button.classList.remove('editando');
            button.innerHTML = 'Editar';
            editInput.setAttribute('readonly', 'true');

            editInput2.setAttribute('readonly', 'true');

            editInput.setAttribute('value', editInput.value);

            editInput2.setAttribute('value', editInput2.value);



            button.classList.add('editando-save');

            localStorage.setItem('list', List.innerHTML);
        } else {
            
            let nameValidation2 = false;
            let inputValidation2 = false;
            const añdadirBtn = document.querySelector('.form-btn')       
            console.log(añdadirBtn);    

            button.innerHTML = 'Guardar';
            button.classList.add('editando');

            editInput.addEventListener('input', e => {
                inputValidation2 = REGEX_NUMBER.test(e.target.value);
                validateInput(e.target, inputValidation2)
                if (inputValidation2) {
                    button.disabled = false;
                } else {
                    button.disabled = true;
                    añdadirBtn.disabled = true;
                }
    
            });

            editInput2.addEventListener('input', e => {
                nameValidation2 = REGEX_NAME.test(e.target.value)
                validateInput(e.target, nameValidation2)
                if (nameValidation2) {
    
                    button.disabled = false;
                } else {
                    button.disabled = true;
                    añdadirBtn.disabled = true;
                }    
            })

            editInput.removeAttribute('readonly');
            button.classList.add('editando-save');
            editInput2.removeAttribute('readonly');
        }

        
    }

});


