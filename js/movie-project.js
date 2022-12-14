"use strict";

(() => {
    $(window).on("load", function () {
        $('#loading').hide();
    });

    var fetchAllURL = "https://woolly-chambray-clef.glitch.me/movies"

    //// Load Movie Cards Function ////
    function loadMovies(movies) {
        return fetch(fetchAllURL)
            .then(resp => resp.json().then(function (data) {
                renderMovieCard(data)
            }))
            .catch(error => console.error(error));
    }

    loadMovies();

    function renderMovieCard(data) {
        let movieCards = '';
        for (let i = 0; i < data.length; i++) {
            movieCards += '<div class="card" style="width: 18rem;">' +
                '<div class="card-body">' +
                '<h5 class="card-title">' + data[i].id + '</h5>' +
                '<h5 class="card-subtitle mb-2">' + data[i].title + '</h5>' +
                '<p class="card-text">' + 'Rating: ' + data[i].rating + '</p>' +
                '<button id="edit-button" class="edit-button btn btn-primary" data-id="' + data[i].id + '"> Edit </button>' +
                '<button id="deleteB" class="deleteButton btn btn-primary" data-id="' + data[i].id + '"> Delete </button>' +
                '<button id="OmdbButton" class="omdbButton btn btn-primary" data-id="' + data[i].title + '"> OMDB </button>' +
                ' </div>' +
                '</div>'
        }
        $('#movie-cards').html(movieCards);
    }

    //// Search Movies ////
    var searchInput = document.querySelector("[data-search]")

    searchInput.addEventListener("keyup", searchInput => {
        var searchResults = [];
        var value = searchInput.target.value.toLowerCase()
        fetch("https://woolly-chambray-clef.glitch.me/movies")
            .then(resp => resp.json())
            .then(data => {
                data.forEach(movie => {
                    if (movie.title.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
                        searchResults.push(movie);
                    }
                })
                renderMovieCard(searchResults)
            });
    })

    //// Toggle for Edit Form ////
    $(document).on('click', '.edit-button', function () {
        $("#edit-movie").toggleClass("hidden");
    });

    ////Add Movie Form////
    let addMovieForm = document.querySelector('#add-movie');
    addMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newMovie = {
            title: document.getElementById('add-movie-title').value,
            rating: document.getElementById('add-rating').value
        };
        fetch(fetchAllURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify
            (newMovie),
        }).then(() => fetch(fetchAllURL))
            .then(resp => resp.json())
            .then(loadMovies)
            .then($('#add-movie')[0].reset())
            .catch(error => console.error(error));
    });

    //// Edit Movie Form ////
    $(document).on('click', '.edit-button', function () {
        let dataId = $(this).attr("data-id");
        copyTextValueTitle(dataId);
    });
    $(document).on('click', '#edit-b', function (e) {
        e.preventDefault();
        const editMovie = {
            id: parseFloat(document.getElementById('cardId').value),
            title: document.getElementById('edit-movie-title').value,
            rating: parseFloat(document.getElementById('edit-rating').value)
        };
        fetch(`https://woolly-chambray-clef.glitch.me/movies/${editMovie.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editMovie)
        }).then(() => fetch(fetchAllURL)).then(resp => resp.json()).then(loadMovies).then($('#add-movie')[0].reset()).catch(error => console.error(error));
    });

    //// Toggle for Edit Form ////
    $(document).on('click', '#edit-b', function () {
        $("#edit-movie").toggleClass("hidden");
    });

    //// Pre-fill Form Code ////
    function copyTextValueTitle(cardId) {
        fetch("https://woolly-chambray-clef.glitch.me/movies/" + cardId)
            .then(resp => resp.json().then(function (data) {
                document.getElementById("edit-movie-title").value = data.title;
                document.getElementById("edit-rating").value = data.rating;
                document.getElementById("cardId").value = cardId;
            })).catch(error => console.error(error));
        loadMovies();
    }

    //// HOW TO DELETE////
    $(document).on('click', '.deleteButton', function () {
        let dataId = $(this).attr("data-id");
        console.log(dataId);
        fetch(`https://woolly-chambray-clef.glitch.me/movies/${dataId}`, {
            method: "DELETE",
        }).then(() => fetch(fetchAllURL))
            .then(resp => resp.json())
            .then(loadMovies).catch(error => console.error(error));
    });

    //// OMDB ////
    ////https://stackoverflow.com/questions/69859607/how-do-i-get-the-data-from-api-using-javascript-and-ajax////
    $(document).on('click', '.omdbButton', function () {
        let dataId = $(this).attr("data-id");
        var omdbAPI = new XMLHttpRequest();
        var omdbURL = `http://www.omdbapi.com/?t=${dataId.replace(" ", "%20")}&type=movie&apikey=` + OMDB_API_KEY;
        omdbAPI.open("get", omdbURL, true);
        omdbAPI.onload = function (event) {
            event.preventDefault();
            if (this.status === 200) {
                var result = JSON.parse(this.responseText);
                console.log(result);
                var output = "";
                for (var i in result) {
                    output =
                        '<div class="user">' +
                        '<h3>Title: ' + result.Title + '</h3>' +
                        '<img src="' + result.Poster + '" alt="poster">' +
                        '</div>';
                }
            } else {
                alert("No results");
            }
            document.getElementById('movie-cards').innerHTML = output;
        }
        omdbAPI.send();
    });

})();