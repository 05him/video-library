import { useEffect, useReducer } from "react";
import { faker } from '@faker-js/faker';

import { categories } from '../../data/categories';
import { videos } from "../../data/videos";

const videosHandler = (data, action) => {
    switch(action.type){
        case 'add-to-watchlater' : return ({ ...data, watchLater: [ ...data.watchLater, action.newVideo ] });
        case 'remove-from-watchlater' : return({ ...data, watchLater: data.watchLater?.filter( ({_id}) => _id!==action.removeId ) });
        case 'create-new-playlist' : return({ ...data, playlists: [ ...data.playlists, { _id: action.newId, playlistName: action.newPlaylistName, description: action.playlistDescription, videos: [] } ] });
        case 'delete-playlist' : return({ ...data, playlists: data.playlists?.filter( ({_id}) => _id!==action.removeId ) });
        case 'add-to-playlist' : return({ ...data, playlists: data.playlists?.map( obj => obj._id===action.playlistId ? ({ ...obj, videos: [ ...obj.videos, action.newVideo ]  }) : obj ) });
        case 'remove-from-playlist' : return({ ...data, playlists: data.playlists?.map( obj => obj._id===action.playlistId ? ({ ...obj, videos: obj?.videos.filter( ({_id}) => _id!== action.videoId ) }) : obj ) });
        case 'add-note' : return({ ...data, videosList: data.videosList?.map( obj => obj._id === action.videoId ? ({ ...obj, notes: [ ...obj.notes , { content: action.newNote, _id: action.noteId } ] }) : obj ) })
        case 'delete-note' : return({ ...data, videosList: data.videosList?.map( obj => obj._id === action.videoId ? ({ ...obj, notes: obj?.notes?.filter( ({_id}) => _id!==action.noteId ) }) : obj ) })

        default : throw Error(`some error in handleing ${action.type}`);
    }
}

export const useVideosReducer = () => {

    const [ { categoryList, videosList, watchLater, playlists } , setVideosData ] = useReducer( videosHandler, { categoryList: [ ...categories ], videosList: [ ...videos ],  playlists: [], watchLater: [] } );

    const addToWatchLater = obj => setVideosData({ type: 'add-to-watchlater', newVideo: obj });
    const removeFromWatchLater = id => setVideosData({ type: 'remove-from-watchlater', removeId: id });
    const includedInWatchLater = id =>  watchLater?.find( ({_id}) => _id === id ) ? true : false;
    const addNewPlaylist = (name,description) => setVideosData({ type: 'create-new-playlist', newPlaylistName: name, newId: generateNewPlayListId(),  playlistDescription: description });
    const deletePlaylist = id => setVideosData({ type: 'delete-playlist', removeId: id });
    const addToPlaylist = (id, video) => setVideosData({ type: 'add-to-playlist', playlistId: id, newVideo: video });
    const removeFromPlaylist = (playlistId, videoId) => setVideosData({ type: 'remove-from-playlist', playlistId: playlistId, videoId: videoId });
    const addNote = (id, note) => setVideosData({ type: 'add-note', videoId: id, newNote: note, noteId: faker.string.alphanumeric(10) });
    const deleteNote = (videoId, noteId) => setVideosData({ type: 'delete-note', videoId: videoId, noteId: noteId });

    
    const generateNewPlayListId = () => {

        const checkPlayListId = id => playlists?.find( ({_id}) => _id === id ) ? true : false;

        let tempId = faker.string.alphanumeric(18);
        while(checkPlayListId(tempId))
        {
            tempId = faker.string.alphaNumeric(18);
        }
        return tempId;
    }

    const updateLocalStorage = () => {
        localStorage.setItem( videosList, { ...videosList } );
        localStorage.setItem( watchLater, { ...watchLater } );
        localStorage.setItem( playlists, { ...playlists } );
    }

    // useEffect( () => {
    //     if( localStorage.getItem(videosList) ) {
    //         setVideosData({ type: 'local-storage',  })
    //     }
    // } ,[] )

    return { categoryList, videosList, watchLater, playlists, addToWatchLater, removeFromWatchLater, includedInWatchLater, addNewPlaylist, deletePlaylist, addToPlaylist, removeFromPlaylist, addNote, deleteNote }
}