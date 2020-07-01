const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelButton = addMovieModal.querySelector(".btn--passive");
const addButton = cancelButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const initialText = document.getElementById("entry-text");
const referenceElement = document.getElementById("movie-list");
const deleteMovieModel = document.getElementById("delete-modal");
const deleteCencelButton = deleteMovieModel.querySelector(".btn--passive");
const deleteOKButton = deleteMovieModel.querySelector(".btn--danger");

const Movies = [];

const initialTextLogic = () => {
  if (Movies.length === 0) {
    initialText.style.display = "block";
  } else {
    initialText.style.display = "none";
  }
};

const closeMovieButtonHandler = () => {
  addMovieModal.classList.remove("visible");
  toggleBackdrop();
};

const addMovieButtonHandler = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};
const clearInputs = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};
const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
  clearInputs();
};

const backdropHandler = () => {
  closeMovieButtonHandler();
  deleteMovieNodes();
  toggleBackdrop();
};

const cancelButtonHandler = () => {
  closeMovieButtonHandler();

  clearInputs();
};

const deleteMovie = (movieId) => {
  let index = 0;
  for (const currMovie of Movies) {
    if (currMovie.id === movieId) {
      break;
    }

    index++;
  }
  Movies.splice(movieId, 1);

  referenceElement.children[index].remove();
  deleteMovieModel.classList.remove("visible");
  toggleBackdrop();
  initialTextLogic();
  //referenceElement.removeChild(referenceElement.children[movieId]);
};

const deleteMovieNodes = () => {
  deleteMovieModel.classList.remove("visible");
  toggleBackdrop();
};
let id;
const movieID = (mid) => {
  id = mid;
};

const getID = () => {
  return id;
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModel.classList.add("visible");
  console.log("in Handlerrr delete movie", movieId);
  toggleBackdrop();
  movieID(movieId);
};

const deleteCencelButtonHandler = () => {
  deleteMovieModel.classList.remove("visible");
  toggleBackdrop();
};

const deleteOKButtonHandler = () => {
  deleteMovie(getID());
  console.log("in Handlerrr deleteOK Button", getID());
};

const updateUI = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";

  newMovieElement.innerHTML = `
 <div class="movie-element__image">
 <img src="${imageUrl}" alt="${title}">
</div>
<div class="movie-element__info">
 <h2>${title}</h2>
 <p>${rating}/5 stars</p>
</div>
`;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  referenceElement.append(newMovieElement);
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageURLValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageURLValue.trim() === "" ||
    ratingValue.trim() === "" ||
    ratingValue < 0 ||
    ratingValue > 5
  ) {
    alert("The input is invalid!..(Please,Enter valid Input Values)");
  } else {
    const movieData = {
      id: Math.random().toString(),
      title: titleValue,
      URL: imageURLValue,
      rating: ratingValue,
    };

    Movies.push(movieData);

    closeMovieButtonHandler();
    initialTextLogic();
    updateUI(movieData.id, movieData.title, movieData.URL, movieData.rating);
    clearInputs();
  }
};

startAddMovieButton.addEventListener("click", addMovieButtonHandler);
backdrop.addEventListener("click", backdropHandler);
cancelButton.addEventListener("click", cancelButtonHandler);
addButton.addEventListener("click", addMovieHandler);
deleteCencelButton.addEventListener("click", deleteCencelButtonHandler);
deleteOKButton.addEventListener("click", deleteOKButtonHandler);
