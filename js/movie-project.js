"use strict";

(()=>{
// HOW TO GET
    fetch("https://woolly-chambray-clef.glitch.me/movies")
        .then(resp => resp.json())
        .then(data => console.log(data)); // get all


    function loadMovies() {
        fetch("https://woolly-chambray-clef.glitch.me/movies")
            .then(resp => resp.json().then(function(data) {
                var movies = data;
                let movieCards = '';
                for (let i = 0; i < movies.length; i ++) {
                    movieCards += '<div class="card" style="width: 18rem;">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">' + movies[i].id + '</h5>' +
                        '<h6 class="card-subtitle mb-2 text-muted">' + movies[i].title + '</h6>' +
                        '<p class="card-text">' + movies[i].rating + '</p>' +
                        '<button id="edit-button" class="edit-button btn btn-primary" data-id="' + movies[i].id +'"> Edit </button>' +
                        '<button id="deleteB" class="deleteButton btn btn-primary" data-id="' + movies[i].id +'"> Delete </button>' +
                        ' </div>' +
                        '</div>'
                }
                $('#movie-cards').html(movieCards);
            }))
    }

    loadMovies();

    ////Add Movie Form////

    let addMovieForm = document.querySelector('#add-movie');

    addMovieForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        const newMovie = {
            title: document.getElementById('add-movie-title').value,
            rating: document.getElementById('add-rating').value
        };

        fetch("https://woolly-chambray-clef.glitch.me/movies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify
            (newMovie),
        }).
        then(() => fetch("https://woolly-chambray-clef.glitch.me/movies"))
            .then(resp => resp.json())
            .then(loadMovies);
    });

    //// Edit Movie Form ////

    $(document).on('click','.edit-button',function(){
        let dataId = $(this).attr("data-id");
        console.log(dataId);

        copyTextValueTitle(dataId);

        // const movieId = document.getElementById('movie-drop-down').value;
        // console.log(movieId);

    });


    $(document).on('click', '#edit-b', function(){
        const editMovie = {
            id: parseFloat(document.getElementById('cardId').value),
            title: document.getElementById('edit-movie-title').value,
            rating: parseFloat(document.getElementById('edit-rating').value)
        };
        console.log(editMovie);

        fetch(`https://woolly-chambray-clef.glitch.me/movies/${editMovie.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editMovie)
        }).then(() => fetch("https://woolly-chambray-clef.glitch.me/movies")).then(resp => resp.json()).then(loadMovies);
        alert("Changes Made to Movie.");
        // }).then(() => fetch("https://woolly-chambray-clef.glitch.me/movies")).then(resp => resp.json()).then(movies =>  loadMovies());
        // alert("Changes Made to Movie.");
    });


    //// Pre-fill Form Code ////

    function copyTextValueTitle(cardId) {
        fetch("https://woolly-chambray-clef.glitch.me/movies/" + cardId)
            .then(resp => resp.json().then(function(data) {
                document.getElementById("edit-movie-title").value = data.title;
                document.getElementById("edit-rating").value = data.rating;
                document.getElementById("cardId").value = cardId;
            }));
        loadMovies();
    }

    //// HOW TO DELETE////

    // let deleteMovieForm = document.querySelector('.deleteButton');

    $(document).on('click','.deleteButton',function(){
        let dataId = $(this).attr("data-id");
        console.log(dataId);

        fetch(`https://woolly-chambray-clef.glitch.me/movies/${dataId}`, {
            method: "DELETE",
        }).then(() => fetch("https://woolly-chambray-clef.glitch.me/movies"))
            .then(resp => resp.json())
            .then(loadMovies);
    });

})();