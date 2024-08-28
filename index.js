const buttons = document.querySelectorAll('.slider-btn')
const images = document.querySelectorAll('.slider-image')

const changeButtons = document.querySelectorAll('.changeModal')


document.querySelector('.burger').addEventListener('click', function () {
    this.classList.toggle('active');
    document.querySelector('nav').classList.toggle('open')
})




function changeButtonColor(event) {
    let element = event.target;
    for (let i = 0; i < 3; i++) {
        buttons[i].classList.remove('active')
    }
    element.classList.add('active')
}

function changeImages() {
    let element = event.target;
    let index;
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains('active')) { index = i }
    }

    for (let i = 0; i < images.length; i++) {
        images[i].classList.remove('hidden')
    }

    let hiddenIndex = [index + 3, index + 4];
    let hiddenIndexCorrect = [];

    for (let item of hiddenIndex) {
        if (item > images.length - 1) { item = item - images.length; }
        hiddenIndexCorrect.push(item)
    }

    for (let i = 0; i < hiddenIndexCorrect.length; i++) {
        images[hiddenIndexCorrect[i]].classList.add('hidden');
    }
}

for (let i = 0; i < 3; i++) {
    buttons[i].addEventListener('click', changeButtonColor);
    buttons[i].addEventListener('click', changeImages);
}

let filters = document.querySelectorAll('input[name="season"]')
let cards = document.querySelectorAll('.fav-iten')

function changeRadioButton() {
    let element = event.target;
    element.setAttribute('checked', 'true');
}

function changeCards() {
    let element = event.target;

    for (let i = 0; i < cards.length; i++) {
        if (!(cards[i].classList.contains('hidden'))) {
            // let description = cards[i].querySelector('.fav-description')
            // description.style.animation ="hiddenAnimation 3s"
            cards[i].classList.add('hidden')
        }

        if (cards[i].classList.contains(element.id)) { cards[i].classList.remove('hidden') }
    }
}

for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener('click', changeRadioButton);
    filters[i].addEventListener('click', changeCards);
}


// <!-- меню профиля -->

function openProfileMenu () {
document.getElementsByClassName('profile-icon')[0].addEventListener('click', function () {
    document.querySelector('.profile-menu').classList.toggle('hidden')
})

}

openProfileMenu()


// <!-- модальное окно -->

document.querySelector('.callModal').addEventListener('click', function () {
    document.querySelector('.pop-up-wrapper').classList.toggle('hidden')
    document.querySelector('.profile-menu').classList.toggle('hidden')
})
document.querySelector('.action-link.callModal').addEventListener('click', function () {
    document.querySelector('.pop-up-wrapper').classList.toggle('hidden')

})

document.querySelector('.callModalLog').addEventListener('click', function () {
    document.querySelector('.log-in-wrapper').classList.toggle('hidden')
    document.querySelector('.profile-menu').classList.toggle('hidden')
})
document.querySelector('.action-link.callModalLog').addEventListener('click', function () {
    document.querySelector('.log-in-wrapper').classList.toggle('hidden')

})




// <!-- закрытие модальных окон -->


document.querySelector('.pop-up-wrapper .close-button').addEventListener('click', function () {
    document.querySelector('.pop-up-wrapper').classList.toggle('hidden')
})

document.querySelector('.log-in-wrapper .close-button').addEventListener('click', function () {
    document.querySelector('.log-in-wrapper').classList.toggle('hidden')

})

document.querySelector('.my-profile-wrapper .close-button').addEventListener('click', function () {
    document.querySelector('.my-profile-wrapper').classList.toggle('hidden')

})

document.querySelector('.buyBook-wrapper .close-button').addEventListener('click', function () {
    document.querySelector('.buyBook-wrapper').classList.toggle('hidden')

})
 
// смена поп-апов



function changeModal() {
    document.querySelector('.pop-up-wrapper').classList.toggle('hidden');
    document.querySelector('.log-in-wrapper').classList.toggle('hidden');
}


for (let i = 0; i < changeButtons.length; i++) {
    changeButtons[i].addEventListener('click', changeModal);
}

// for (const input of inputs) {
//     input.value = localStorage[`input_${input.name}`] || '';
//     input.addEventListener('change', function () {
//         localStorage[`input_${this.name}`] = this.value;
//     });
// }
// регистрация юзера +генерация номера карточки + хранение в local storage

const inputs = document.querySelectorAll('.pop-up-wrapper .localStarage');
const regForm = document.getElementById('register-form');

function getCardNumber() {
    min = Math.ceil(1152921504606846976);
    max = Math.floor(18446744073709551615);
    return (Math.floor(Math.random() * (max - min + 1)) + min).toString(16);
}
  
regForm.addEventListener('submit', function () {
    for (const input of inputs) {
        localStorage[`input_${input.name}`] = input.value;
        }
        localStorage['card-number'] = getCardNumber();
        localStorage['visits'] = 1;
        localStorage['books'] = 0;

       
    });

    
// замена иконки профиля

const userName  = localStorage.getItem('input_first-name-reg');
const userLastName = localStorage.getItem('input_last-name-reg');
const userEmail  = localStorage.getItem('input_email-reg');

function changeProfile (name, lastname) {
    const initials = name.charAt(0)+lastname.charAt(0);
    const initialsSection = document.createElement("div");
    initialsSection.textContent = initials;
    initialsSection.classList.add('profile-icon')
    document.getElementById("profile-icon").replaceWith(initialsSection);
}

if (userName) {
   changeProfile(userName, userLastName);
   openProfileMenu();
   addClue(userName, userLastName);
}

// при клике на buy открывается модальное логин

const buyButtons = document.querySelectorAll('.fav-description .action-link');
let buyButtonClicked;
let rentedBook;

if (!userEmail){
buyButtons.forEach (function(buyButton) {
    buyButton.addEventListener('click', function () {
        document.querySelector('.log-in-wrapper').classList.toggle('hidden')
    } )
})}

if (userEmail) {
    buyButtons.forEach (function(buyButton) {
        buyButton.addEventListener('click', function (event) {
            document.querySelector('.buyBook-wrapper').classList.toggle('hidden');
            buyButtonClicked = buyButton;
            let bookWrapper = buyButton.parentElement
            rentedBook = bookWrapper.querySelector('h4').textContent +', '+bookWrapper.querySelector('.author').textContent.slice(3);
            

            
        } )
    })

}


// добавление подсказки имени
function addClue (name, lastname) {
    const clue  = name+ ' '+lastname;
    document.querySelector(".profile-icon").setAttribute('title', clue)
}

// замена меню при логине
const profileList = document.querySelectorAll('.profileItem')

if (userEmail) {
    profileList.forEach(function(profileListItem) {
        profileListItem.classList.toggle('hidden')
    })}

// открытие модального My profile

document.querySelector('.callMyProfile').addEventListener('click', function () {
    document.querySelector('.my-profile-wrapper').classList.toggle('hidden')
    document.querySelector('.profile-menu').classList.toggle('hidden')
    document.querySelector(".count-visits").textContent = localStorage.getItem('visits')
    document.querySelector(".count-books").textContent = localStorage.getItem('books')
    document.querySelector(".card-number").textContent = localStorage.getItem('card-number')
})

// лог аут
function logOut () {
    localStorage.clear();
    location.reload()
}

document.querySelector('.log-out').addEventListener('click', logOut )



// счетчик посещений
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', function () {
    let visitsNumber = +localStorage.getItem('visits')+1;
    localStorage['visits'] = visitsNumber;
})

// кнопка копирования в буфер обмена

document.querySelector('.copy-button').addEventListener('click', function () {
    navigator.clipboard.writeText(document.querySelector(".card-number").innerText)
})


// проверка на заполненность полей
const buyBookForm = document.querySelector('.buy-book-form');
const buyBookButton = document.querySelector('.buy-book-submit');

buyBookForm.addEventListener('change', changeFormHandler);

function changeFormHandler() {
  if (buyBookForm.checkValidity()) {
    buyBookButton.removeAttribute('disabled');
  }
}

// ограничение на заполнение числами

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }

  
  // изменения при сабмите формы покупки
  buyBookForm.addEventListener('submit', function () {
    event.preventDefault();
    buyButtonClicked.textContent = 'Own';
    buyButtonClicked.classList.add('disabled-link');
    document.querySelector('.buyBook-wrapper').classList.toggle('hidden');
    let visitsNumber = +localStorage.getItem('books')+1;
    localStorage['books'] = visitsNumber;
    let newRentBook = document.createElement('li');
    newRentBook.textContent = rentedBook;
    let rentList = document.querySelector('.rentedBooks')
    rentList.appendChild(newRentBook)

})