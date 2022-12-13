"use strict";

(()=>{
    //// Load ////
    // https://stackoverflow.com/questions/25253391/javascript-loading-screen-while-page-loads
    // const wait = (delay = 0) =>
    //     new Promise(resolve => setTimeout(resolve, delay));
    //
    // const setVisible = (elementOrSelector, visible) =>
    //     (typeof elementOrSelector === 'string'
    //             ? document.querySelector("body")
    //             : elementOrSelector
    //     ).style.display = visible ? 'block' : 'none';
    //
    // setVisible('#edit-movie', false);
    // setVisible('#loading', true);
    //
    // document.addEventListener('DOMContentLoaded', () =>
    //     wait(1000).then(() => {
    //         setVisible('#edit-movie', true);
    //         setVisible('#loading', false);
    //     }));

    // document.addEventListener('DOMContentLoaded', () =>
    //     wait(1000).then(() => {
    //         document.getElementById("page").style.display = "block";
    //         document.getElementById("loading").style.display = "none";
    //     }));

    // function loadWait()
    // {
    //     document.getElementById("page").style.display = "block";
    //     document.getElementById("loading").style.display = "none";
    // }
    // document.onload = loadWait();


    var fetchAllURL = "https://woolly-chambray-clef.glitch.me/movies"
// HOW TO GET
    fetch("https://woolly-chambray-clef.glitch.me/movies")
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => console.error(error)); // get all


    function loadMovies() {
        fetch(fetchAllURL)
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
            .catch(error => console.error(error));
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

        fetch(fetchAllURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify
            (newMovie),
        }).
        then(() => fetch(fetchAllURL))
            .then(resp => resp.json())
            .then(loadMovies)
            .catch(error => console.error(error));
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
        }).then(() => fetch(fetchAllURL)).then(resp => resp.json()).then(loadMovies).catch(error => console.error(error));
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
            })).catch(error => console.error(error));
        loadMovies();
    }

    //// HOW TO DELETE////

    $(document).on('click','.deleteButton',function(){
        let dataId = $(this).attr("data-id");
        console.log(dataId);
        fetch(`https://woolly-chambray-clef.glitch.me/movies/${dataId}`, {
            method: "DELETE",
        }).then(() => fetch(fetchAllURL))
            .then(resp => resp.json())
            .then(loadMovies).catch(error => console.error(error));
    });

})();