const mongoose = require( 'mongoose' );
mongoose.set('useFindAndModify', false);


const bookmarkSchema = mongoose.Schema({
    id : {
        type : String,
        required : true,
        unique : true
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    url : {
        type : String,
        required : true
    },
    rating : {
        type : Number,
        required : true
    }

});

const bookmarksCollection = mongoose.model( 'bookmarks', bookmarkSchema );

const Bookmarks = {
    createBookmark : function( newBookmark ){
        return bookmarksCollection
                .create( newBookmark )
                .then( createdBookmark => {
                    return createdBookmark;
                })
                .catch( err => {
                    return err;
                });
    },
    getAllBookmarks : function(){
        return bookmarksCollection
                .find()
                .then( allBookmarks => {
                    return allBookmarks;
                })
                .catch( err => {
                    return err;
                });
    },
    getBookmarkByTitle : function( bookmarkTitle ){
        return bookmarksCollection
                .find( { title : bookmarkTitle } )
                .then( allBookmarks => {
                    return allBookmarks;
                })
                .catch( err => {
                    return err;
                })
    },
    removeBookmarkById : function( bookmarkId ){
        return bookmarksCollection
                .deleteOne( { id : bookmarkId } )
                .then( allBookmarks => {
                    return allBookmarks;
                })
                .catch( err => {
                    return err;
                })
    },
    updateTitle : function( bookmarkid, bookmarkTitle ){
        return bookmarksCollection
                .findOneAndUpdate( 
                    { id : bookmarkid },
                    { $set : { title : bookmarkTitle }},
                    { new : true }
                )
                .then( allBookmarks => {
                    return allBookmarks;
                })
                .catch( err => {
                    return err;
                })
    },
    updateDescription : function( bookmarkid, bookmarkDescription ){
        return bookmarksCollection
                .findOneAndUpdate(
                    { id : bookmarkid },
                    { $set : {description : bookmarkDescription } },
                    { new : true }
                )
                .then( allBookmarks => {
                    return allBookmarks;
                })
                .catch( err => {
                    return err;
                })
    },
    updateUrl : function( bookmarkid, bookmarkUrl ){
        return bookmarksCollection
                .findOneAndUpdate(
                    { id : bookmarkid },
                    { $set : {url : bookmarkUrl } },
                    { new : true }
                )
                .then( allBookmarks => {
                    return allBookmarks;
                })
                .catch( err => {
                    return err;
                })
    },
    updateRating : function( bookmarkid, bookmarkRating ){
        return bookmarksCollection
                .findOneAndUpdate(
                    { id : bookmarkid },
                    { $set : {rating : bookmarkRating } },
                    { new : true }
                )
                .then( allBookmarks => {
                    return allBookmarks;
                })
                .catch( err => {
                    return err;
                })
    }
}

module.exports = { Bookmarks };