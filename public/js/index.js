const TOKEN = "2abbf7c3-245b-404f-9473-ade729ed4653";
let errorHandling = document.querySelector( '.errorHandling' );

function fetchUpdateBookmark(bookmarkid, title, desc, url, rating){
    let urlreq = `/api/bookmark/${bookmarkid}`;
    console.log(title);
    let data = {
        id : bookmarkid,
        title : title,
        description : desc,
        url : url,
        rating : rating
    };
    let settings = {
        method : 'PATCH',
        headers : {
            Authorization : `Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    }

    let results = document.querySelector( '.bookmark-list');

    fetch( urlreq, settings )
        .then( response =>{
            if(response.ok){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            errorHandling.innerHTML="";
            results.innerHTML = "";
            console.log(responseJSON);

            fetchGetAllBookmarks();
        })
        .catch( err => {
            errorHandling.innerHTML = err.message;
        })
}

function fetchGetAllBookmarks(){
    let url = `/api/bookmarks`;

    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${TOKEN}`
        }
    }

    let results = document.querySelector( '.bookmark-list');

    fetch( url, settings )
        .then( response =>{
            if(response.ok){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            errorHandling.innerHTML="";

            for( let i = 0; i < responseJSON.length; i ++){
                results.innerHTML += `<div> Title: ${responseJSON[i].title} , id: ${responseJSON[i].id} , url: ${responseJSON[i].url} , rating: ${responseJSON[i].rating} </div>`;
            }
            
        })
        .catch( err => {
            errorHandling.innerHTML = err.message;
        })
}

function fetchGetBookmark(title){
    let url = `/api/bookmark?title=${title}`;

    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${TOKEN}`
        }
    }

    let results = document.querySelector( '.bookmark-list');

    fetch( url, settings )
        .then( response =>{
            if(response.ok){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            errorHandling.innerHTML="";
            results.innerHTML = "";
            console.log(responseJSON);
            results.innerHTML += `<div> Title: ${responseJSON[0].title} , id: ${responseJSON[0].id} , url: ${responseJSON[0].url} , rating: ${responseJSON[0].rating} </div>`;
        })
        .catch( err => {
            errorHandling.innerHTML = err.message;
        })
}

function fetchDeleteBookmark(id){
    let url = `/api/bookmark/${id}`;
    let settings = {
        method : 'DELETE',
        headers : {
            Authorization : `Bearer ${TOKEN}`,
        }
    }

    let results = document.querySelector( '.bookmark-list');

    fetch( url, settings )
        .then( response =>{
            if(response.ok){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            errorHandling.innerHTML="";
            results.innerHTML= "";

            fetchGetAllBookmarks();
        })
        .catch( err => {
            errorHandling.innerHTML = err.message;
        })
}

function fetchAddBookmark(title, desc, url, rating){
    let urlreq = "/api/bookmarks";
    let data = {
        title : title,
        description : desc,
        url : url,
        rating : rating
    };
    let settings = {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify( data )
    }

    let results = document.querySelector( '.bookmark-list');

    fetch( urlreq, settings )
        .then( response =>{
            if(response.ok){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            errorHandling.innerHTML="";
            console.log(responseJSON);

            results.innerHTML += `<div> ${responseJSON.title} , ${responseJSON.id}`;
        })
        .catch( err => {
            errorHandling.innerHTML = err.message;
        })
}

function watchBookmarksGetTitleForm(){
    let BookmarksGetTitleForm = document.querySelector( '.get-bookmark-form' );
    BookmarksGetTitleForm.addEventListener( 'submit' , (event) => {
        event.preventDefault();
        console.log("clickeaste borrar bookmark!");

        let title = document.getElementById( 'bookmarkTitleGet' ).value;

        fetchGetBookmark( title );
    })
}

function watchBookmarksDeleteForm(){
    let BookmarksDeleteForm = document.querySelector( '.delete-bookmark-form' );
    BookmarksDeleteForm.addEventListener( 'submit' , (event) => {
        event.preventDefault();
        console.log("clickeaste borrar bookmark!");

        let id = document.getElementById( 'deleteBookmarkID' ).value;

        fetchDeleteBookmark( id );
    })
}

function watchBookmarksAddForm(){
    let BookmarksAddForm = document.querySelector( '.add-bookmark-form' );
    BookmarksAddForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        console.log("clickeaste agregar bookmark!");

        let title = document.getElementById( 'bookmarkTitle' ).value;
        let desc = document.getElementById( 'bookmarkDesc' ).value;
        let url = document.getElementById( 'bookmarkUrl' ).value;
        let rating = Number(document.getElementById( 'bookmarkRating' ).value);

        fetchAddBookmark( title, desc, url, rating );
    })
}

function watchBookmarksUpdateForm(){
    let BookmarksUpdateForm = document.querySelector( '.update-bookmark-form');
    BookmarksUpdateForm.addEventListener( 'submit' , ( event ) => {
        event.preventDefault();
        console.log("clickeaste update bookmark!");

        let bookmarkid = document.getElementById( 'updateBookmarkID' ).value;
        let title = document.getElementById( 'updateBookmarkTitle' ).value;
        let desc = document.getElementById( 'updateBookmarkDesc' ).value;
        let url = document.getElementById( 'updateBookmarkUrl' ).value;
        let rating = Number(document.getElementById('updateBookmarkRating').value);

        fetchUpdateBookmark( bookmarkid, title, desc, url, rating );
    })
}

function init(){
    fetchGetAllBookmarks();
    watchBookmarksGetTitleForm();
    watchBookmarksAddForm();
    watchBookmarksDeleteForm();
    watchBookmarksUpdateForm();
}

init();