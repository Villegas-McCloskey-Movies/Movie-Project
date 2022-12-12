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
                            '<a href="#" class="card-link"> + Link + </a>' +
                            '<a href="#" class="card-link"> + Link or Button + </a>' +
                       ' </div>' +
                    '</div>'
            }
            $('#movie-cards').html(movieCards);
        }))
    }

    loadMovies();

    //// Add Movie Function ////

    function addMovieFunction() {
        fetch("https://woolly-chambray-clef.glitch.me/movies")
            .then(resp => resp.json().then(function(data) {
                console.log(data);
                let id = data.length + 1;
                const newMovie = {
                    id: id,
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
            }));
    }

    // addMovieFunction()

    let addMovieForm = document.querySelector('#add-button');
    addMovieForm.addEventListener("submit", addMovieFunction)


// =>{
    //     // addMovieFunction.preventDefault();
    //     // const newMovie = {
    //     //     id: "https://woolly-chambray-clef.glitch.me/movies/".array.length + 1,
    //     //     title: document.getElementById('add-movie-title').value,
    //     //     rating: document.getElementById('add-rating').value
    //     // };
    //     //
    //     // fetch("https://woolly-chambray-clef.glitch.me/movies", {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Content-Type': 'application/json',
    //     //     },
    //     //     body: JSON.stringify
    //     //     (newMovie),
    //     // }).
    //     // then(() => fetch("https://woolly-chambray-clef.glitch.me/movies"))
    //     //     .then(resp => resp.json())
    //     //     .then(movies => console.log(movies));
    //
    // })


    //// Edit Movie Form ////

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

    //// Listener for Movie Title Select ////

    var dropDownSelect = document.getElementById("movie-drop-down")
    dropDownSelect.addEventListener('change', copyTextValueTitle);

    function copyTextValueTitle() {
        var dropId = document.getElementById("movie-drop-down").value;
        fetch("https://woolly-chambray-clef.glitch.me/movies/" + dropId)
            .then(resp => resp.json().then(function(data) {
                // document.getElementById("edit-movie-title").value = "";
                // document.getElementById("edit-rating").value = "";
                console.log(data);
                document.getElementById("edit-movie-title").value = data.title;
                document.getElementById("edit-rating").value = data.rating;
            }));
    }



// HOW TO DELETE

    let deleteMovieForm = document.querySelector('#delete-button');

    deleteMovieForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const deleteId = document.getElementById('movie-drop-down').value;
        console.log(deleteId);

        // const deleteMovie = {
        //     rating: document.getElementById('edit-rating').value
        // };

        fetch(`https://woolly-chambray-clef.glitch.me/movies/${deleteId}`, {
            method: "DELETE"
        }).then(() => fetch("https://woolly-chambray-clef.glitch.me/movies"))
            .then(resp => resp.json())
            .then(movies => console.log(movies));

    })



    // HOW TO UPDATE
    // const complexMovie = {
    //     title: "Be Kind Rewind",
    //     director: "Michael Gondry",
    //     release_date: 2008,
    //     cast: ["Yasiin Bey", "Jack Black", "Danny Glover"]
    // };
    //
    // const edittedMovie = {
    //     title: "The Never-Ending Story"
    // }
    //
    // fetch("https://thirsty-woolly-chambray-clef.me/movies/7", {
    //     method: "PUT",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(edittedMovie)
    // }).then(() => fetch("https://woolly-chambray-clef.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));

    // fetch("https://thirsty-woolly-chambray-clef.me/movies/7", {
    //     method: "PATCH",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(edittedMovie)
    // }).then(() => fetch("https://woolly-chambray-clef.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));

    // HOW TO DELETE
    // fetch("https://woolly-chambray-clef.glitch.me/movies/7", {
    //     method: "DELETE"
    // }).then(() => fetch("https://woolly-chambray-clef.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));


})();



// fetch("https://woolly-chambray-clef.glitch.me/movies/3")
// .then(resp => resp.json())
// .then(data => console.log(data)); // get one

// HOW TO POST
//     let newMovie = {
//         const: newMovie = {
//             title: ${#add-movie-title},
//             rating: ${#add-rating}
//         };
//         fetch("https://woolly-chambray-clef.glitch.me/movies", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify
//     (newMovie),
// }).
//     then(() => fetch("https://woolly-chambray-clef.glitch.me/movies"))
//         .then(resp => resp.json())
//         .then(movies => console.log(movies));
// }

