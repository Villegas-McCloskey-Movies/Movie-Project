"use strict";

(()=>{
// HOW TO GET
    fetch("https://field-mini-lyric.glitch.me/movies").then(resp => resp.json()).then(data => console.log(data)); // get all
    // fetch("https://vast-organic-farm.glitch.me/movies/3").then(resp => resp.json()).then(data => console.log(data)); // get one

    // HOW TO POST
    let newMovie = {document
    const newMovie = {

        title: ${#add-movie-title},
        rating: ${#add-rating},
    };
    fetch("https://field-mini-lyric.glitch.me/movies", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    }).then(() => fetch("https://field-mini-lyric.glitch.me/movies")).then(resp => resp.json()).then(movies => console.log(movies));

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