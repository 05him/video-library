import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { useVideos } from '../../context/VideosContext/VideosProvider';

export const VideoListing = () => {

    const { videosList, includedInWatchLater, removeFromWatchLater, addToWatchLater, playlists, addNewPlaylist, deletePlaylist, addNote, deleteNote, addToPlaylist } = useVideos();
    const { videoId } = useParams();

    const [ playlistModalDisplay, setPlaylistModalDisplay ] = useState('none');
    const [ noteModalDisplay, setNoteModalDisplay ] = useState('none');

    const currentVideo = videosList?.find( ({_id}) => _id === Number(videoId) );

    const { _id, title, src, notes } = currentVideo;

    const watchLaterHanlder = () => includedInWatchLater(_id) ? removeFromWatchLater(_id) : addToWatchLater(currentVideo);

    const PlaylistModal = () => {

        const [ playlistName, setPlaylistName ] = useState('');
        const [ playlistDesc, setPlaylistDesc ] = useState('');

        const handleAddToPlaylist = () => {
            addToPlaylist(_id, currentVideo);
            setPlaylistModalDisplay('none');
        }
    
        return <div style={{ display: playlistModalDisplay }} className='playlist-modal' >
            <input type='text' value={playlistName} onChange={ e =>  setPlaylistName(e.target.value) }  placeholder='new playlist name'  />
            <input type='text' value={playlistDesc} onChange={ e => setPlaylistDesc(e.target.value) }  placeholder='new playlist description'  />
            <button className='create-new-btn' onClick={ () => addNewPlaylist( playlistName, playlistDesc ) } > create new playlist </button>
            <ul>
                {
                    playlists?.map( ({ playlistName, _id },index) => <li key={index} > <span onClick={ handleAddToPlaylist } > {playlistName} </span> <button onClick={ () => deletePlaylist(_id) } > X </button> </li> )
                }
            </ul>
        </div>
    }

    const NoteModal = () => {
        const [ noteText, setNoteText ] = useState('');

        const handleAddNote = () => {
            addNote(_id, noteText);
            setNoteModalDisplay('none');
        }

        return <div className='note-modal' style={{ display: noteModalDisplay }}  >
            <input type='text' value={noteText} onChange={ e => setNoteText(e.target.value) } />
            <button className='create-new-btn' onClick={ handleAddNote } > Add New Note </button>
        </div>
    }

    return <div className='single-video-container' >
        <iframe src={src} title={title} className='iframe'
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen />
        <div className=' single-video-text ' >
        <div className='single-video-title video-title' > {title} </div>
        <div className='icons' >
        <PlaylistModal />
        <NoteModal />
        <img onClick={ watchLaterHanlder } src={ includedInWatchLater(_id) ? 'https://api.iconify.design/ic:round-watch-later.svg?color=%238c76db' : 'https://api.iconify.design/ic:outline-watch-later.svg?color=%238c76db' } alt='watch later' />
        <img onClick={ () => setPlaylistModalDisplay( display => display==='block' ? 'none' : 'block' ) } src='https://api.iconify.design/material-symbols:playlist-add.svg?color=%238c76db' alt='playlist' />
        <img onClick={ () => setNoteModalDisplay( display => display==='block' ? 'none' : 'block' ) } src='https://api.iconify.design/mdi:playlist-edit.svg?color=%238c76db' alt='notes' />
        </div>
        </div>
        <div>
            <h3> My Notes </h3>
            <ul>
                {
                    notes?.map( ({ content, _id: noteId }) => <li key={noteId}> {content}  <img onClick={ () => deleteNote(_id, noteId) } src='https://api.iconify.design/material-symbols:delete.svg?color=%238c76db' alt='delete note' /> </li> )
                }
            </ul>
        </div>
    </div>
}