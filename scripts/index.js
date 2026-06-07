const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const cardTemplate = document.querySelector("#card__template").content;
const cardsContainer = document.querySelector(".cards__list");

const editProfile = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-popup");
const editProfileCloseBtn = editProfileModal.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileForm = document.querySelector("#edit-profile-form");
const inputName = document.querySelector(".popup__input_type_name");
const inputDescription = document.querySelector(
  ".popup__input_type_description",
);

const addButtonCard = document.querySelector(".profile__add-button");
const addCardModal = document.querySelector("#new-card-popup");
const closeCardModal = addCardModal.querySelector(".popup__close");
const addCardForm = document.querySelector("#new-card-form");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputCardLink = document.querySelector(".popup__input_type_url");

const imageModal = document.querySelector("#image-popup");
const modalImageElement = document.querySelector(".popup__image");
const modalCaptionElement = document.querySelector(".popup__caption");
const closeImageModalBtn = imageModal.querySelector(".popup__close");

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  openModal(editProfileModal);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeModal(editProfileModal);
}

function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

function handleImageClick(name, link) {
  modalImageElement.src = link;
  modalImageElement.alt = name;
  modalCaptionElement.textContent = name;
  openModal(imageModal);
}

function getCardElement(
  name = "Sin título",
  link = "./images/placeholder.jpg",
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  likeButton.addEventListener("click", handleLikeClick);
  deleteButton.addEventListener("click", handleDeleteCard);
  cardImage.addEventListener("click", function () {
    handleImageClick(name, link);
  });

  return cardElement;
}

function renderCards(name, link, container) {
  const newCard = getCardElement(name, link);
  container.prepend(newCard);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCards(inputCardName.value, inputCardLink.value, cardsContainer);
  closeModal(addCardModal);
}

initialCards.forEach(function (card) {
  renderCards(card.name, card.link, cardsContainer);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);

editProfile.addEventListener("click", function () {
  handleOpenEditModal();
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

addButtonCard.addEventListener("click", function () {
  openModal(addCardModal);
});

closeCardModal.addEventListener("click", function () {
  closeModal(addCardModal);
});

addCardForm.addEventListener("submit", handleCardFormSubmit);

closeImageModalBtn.addEventListener("click", function () {
  closeModal(imageModal);
});
