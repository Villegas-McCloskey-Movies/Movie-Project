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
                        '<button id="edit-button" class="btn btn-primary"> Edit </button>' +
                        '<button class="deleteButton btn btn-primary" data-id="' + movies[i].id +'"> Delete </button>' +
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
            .then(movies => console.log(movies));

    })

    ////Edit Movie Form////

    let editMovieForm = document.querySelector('#edit-movie');

    editMovieForm.addEventListener("submit", (e) =>{
        e.preventDefault();

        const movieId = document.getElementById('movie-drop-down').value;
        console.log(movieId);

        const editMovie = {
            title: document.getElementById('edit-movie-title').value,
            rating: document.getElementById('edit-rating').value
        };

        fetch(`https://woolly-chambray-clef.glitch.me/movies/${movieId}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editMovie)
        }).then(() => fetch("https://woolly-chambray-clef.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));
        loadMovies();
    })

    //// DropDown Code ////

    let dropdown = document.getElementById('movie-drop-down');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select Movie to Edit';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'https://woolly-chambray-clef.glitch.me/movies/';

    fetch(url)
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.warn('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function(data) {
                    let option;
                    // var dropselected = data[i].id

                    for (let i = 0; i < data.length; i++) {
                        option = document.createElement('option');
                        option.text = data[i].title;
                        option.value = data[i].id;
                        dropdown.add(option);
                    }
                });
            }
        )
        .catch(function(err) {
            console.error('Fetch Error -', err);
        });

    // Listener for Movie Title Select
    var dropDownSelect = document.getElementById("movie-drop-down")
    dropDownSelect.addEventListener('change', copyTextValueTitle);

    function copyTextValueTitle() {
        var dropId = document.getElementById("movie-drop-down").value;
        fetch("https://woolly-chambray-clef.glitch.me/movies/" + dropId)
            .then(resp => resp.json().then(function(data) {
                document.getElementById("edit-movie-title").value = data.title;
                document.getElementById("edit-rating").value = data.rating;
            }));
    }



    //// HOW TO DELETE////

    // let deleteMovieForm = document.querySelector('.deleteButton');

    $( ".deleteButton" ).click(function() {
        let dataId = $(this).attr("data-id");
        // let dataId = $(this).data("id");
        console.log(dataId);
    });



    // deleteMovieForm.addEventListener("submit", (e) => {
    //     e.preventDefault();

        // const buttonAttribute = $('.deleteButton').attr('data-id="' + movies[i].id +' "')
        // console.log(buttonAttribute);
        //
        // const movieId = document.getElementById('delete-drop-down').value;
        // console.log(movieId);
        //
        // const deleteMovie = {
        //     rating: document.getElementById('edit-rating').value
        // };
        //
        // fetch(`https://woolly-chambray-clef.glitch.me/movies/${movieId}`, {
        //     method: "DELETE",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(deleteMovie)
        // }).then(() => fetch("https://woolly-chambray-clef.glitch.me/movies"))
        //     .then(resp => resp.json())
        //     .then(movies => console.log(movies));

    // })




})();