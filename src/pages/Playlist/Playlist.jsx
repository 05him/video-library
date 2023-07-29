import { VideoCardsListing } from "../../components/VideoCardsListing/VideoCardsListing"
import { useVideos } from "../../context/VideosContext/VideosProvider"

export const Playlist = () => {

    const { playlists } = useVideos();

    return <section>
        <h2> Playlists </h2>
        <VideoCardsListing>
            {
                playlists?.map( ({ _id, playlistName, videos }) => <div key={_id} className="video-card" >
                    <img src={ videos.length===0 ? `https://dummyimage.com/400x400/faebd7/000.png&text=${playlistName}` : videos[0]?.thumbnail} alt='playlist thumbnail' className="video-thumbnail" />
                    <div> {playlistName} </div>
                </div> )
            }
            {
                playlists?.length===0 && <h3> playlists are empty </h3>
            }
            <button>
                <img src="https://api.iconify.design/material-symbols:add-circle-rounded.svg?color=%238c76db" alt='add new playlist' />
            </button>
        </VideoCardsListing>
    
    </section>
}