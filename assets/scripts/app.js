const movieModal = document.getElementById("add-modal");
const deleteMovieModal = document.getElementById("delete-modal");
const cancelMovieModal = movieModal.querySelector(
	".modal__actions .btn.btn--passive"
);
const confirmMovieModal = movieModal.querySelector(
	".modal__actions .btn.btn--success"
);
const movieModalInputs = movieModal.querySelectorAll("input");
const addButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const moviesList = [];
const deleteMovie = (id) => {
	const movieUl = document.getElementById("movie-list");
	let index = 0;
	for (const movie of moviesList) {
		if (movie.id === id) {
			break;
		}
		index++;
	}
	moviesList.splice(index, 1);
	movieUl.children[index].remove();
	closeBackdropHandler();
};
const toggleMovieDeleteModalHandler = (id) => {
	deleteMovieModal.classList.add("visible");
	backdrop.classList.toggle("visible");
	const cancelBtn = deleteMovieModal.querySelector(".btn--passive");
	let confirmBtn = deleteMovieModal.querySelector(".btn--danger");
	confirmBtn.replaceWith(confirmBtn.cloneNode(true));
	confirmBtn = deleteMovieModal.querySelector(".btn--danger");
	cancelBtn.removeEventListener("click", closeBackdropHandler);
	cancelBtn.addEventListener("click", closeBackdropHandler);
	confirmBtn.addEventListener("click", deleteMovie.bind(null, id));
};
const updateEntryText = () => {
	const entryText = document.getElementById("entry-text");
	if (moviesList.length === 0) {
		entryText.style.display = "block";
	} else {
		entryText.style.display = "none";
	}
};
const renderNewMovieElement = ({ id, title, imageUrl, rating }) => {
	const movieUl = document.getElementById("movie-list");
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
	newMovieElement.addEventListener(
		"click",
		toggleMovieDeleteModalHandler.bind(null, id)
	);
	movieUl.append(newMovieElement);
};
const clearMovieModalInputs = () => {
	for (const input of movieModalInputs) {
		input.value = "";
	}
};
const toggleMovieModalHandler = () => {
	movieModal.classList.toggle("visible");
	backdrop.classList.toggle("visible");
};
const closeBackdropHandler = () => {
	backdrop.classList.remove("visible");
	movieModal.classList.remove("visible");
	deleteMovieModal.classList.remove("visible");
	clearMovieModalInputs();
	updateEntryText();
};
const addMovieModalHandler = () => {
	const userInputs = [...movieModalInputs];
	const [title, imageUrl, rating] = userInputs.map((e) => e.value.trim());
	if (!title || !imageUrl || !rating || +rating < 1 || +rating > 5) {
		alert("Please enter valid values");
	} else {
		const newMovie = {
			id: Math.random().toString() + title,
			title,
			imageUrl,
			rating,
		};
		moviesList.push(newMovie);
		renderNewMovieElement(newMovie);
		closeBackdropHandler();
	}
};

addButton.addEventListener("click", toggleMovieModalHandler);
backdrop.addEventListener("click", closeBackdropHandler);
cancelMovieModal.addEventListener("click", closeBackdropHandler);
confirmMovieModal.addEventListener("click", addMovieModalHandler);
