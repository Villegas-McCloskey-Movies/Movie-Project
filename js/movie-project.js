"use strict";

(()=>{
// HOW TO GET
    fetch("https://field-mini-lyric.glitch.me/movies")
        .then(resp => resp.json())
        .then(data => console.log(data)); // get all
    // fetch("https://vast-organic-farm.glitch.me/movies/3")
    // .then(resp => resp.json())
    // .then(data => console.log(data)); // get one

    // HOW TO POST
//     let newMovie = {
//         const: newMovie = {
//             title: ${#add-movie-title},
//             rating: ${#add-rating}
//         };
//         fetch("https://field-mini-lyric.glitch.me/movies", {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify
//     (newMovie),
// }).
//     then(() => fetch("https://field-mini-lyric.glitch.me/movies"))
//         .then(resp => resp.json())
//         .then(movies => console.log(movies));
// }

    ////Add Movie Form////
    let addMovieForm = document.querySelector('#add-movie');

    addMovieForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        const newMovie = {
            title: document.getElementById('add-movie-title').value,
            rating: document.getElementById('add-rating').value
        };

        fetch("https://field-mini-lyric.glitch.me/movies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify
            (newMovie),
        }).
        then(() => fetch("https://field-mini-lyric.glitch.me/movies"))
            .then(resp => resp.json())
            .then(movies => console.log(movies));

    })

    ////Edit Movie Form////

    let editMovieForm = document.querySelector('#edit-movie');

    editMovieForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        const editMovie = {
            title: document.getElementById('edit-movie-title').value,
            rating: document.getElementById('edit-rating').value
        };

        fetch(`https://field-mini-lyric.glitch.me/movies/${dropSelected}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editMovie)
        }).then(() => fetch("https://field-mini-lyric.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));



    })

    ////DropDown Code

    // var dropSelected = ""

    let dropdown = document.getElementById('movie-drop-down');
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = 'Select Movie to Edit';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;

    const url = 'https://field-mini-lyric.glitch.me/movies/';

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
                        option.value = data[i].rating;
                        dropdown.add(option);
                    }
                });
            }
        )
        .catch(function(err) {
            console.error('Fetch Error -', err);
        });

    // Listener for all
    // dropdown.addEventListener('change', updateCoffees);


    //  Search Bar Code
    // var searchInput = document.querySelector("[movie-search]")
    //
    // searchInput.addEventListener("input", searchInput => {
    //     var searchResults = [];
    //     // searchResults.innerHTML = "";
    //     var value = searchInput.target.value.toLowerCase()
    //     coffees.forEach(coffee => {
    //         if (coffee.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 || coffee.roast.toLowerCase().indexOf(value.toLowerCase()) !== -1){
    //             searchResults.push(coffee);
    //         }
    //     });
    //     tbody.innerHTML = renderCoffees(searchResults);
    // })








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
    // fetch("https://field-mini-lyric.glitch.me/movies/7", {
    //     method: "PUT",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(edittedMovie)
    // }).then(() => fetch("https://field-mini-lyric.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));

    // fetch("https://field-mini-lyric.glitch.me/movies/7", {
    //     method: "PATCH",
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(edittedMovie)
    // }).then(() => fetch("https://field-mini-lyric.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));

    // HOW TO DELETE
    // fetch("https://field-mini-lyric.glitch.me/movies/7", {
    //     method: "DELETE"
    // }).then(() => fetch("https://field-mini-lyric.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));


})();