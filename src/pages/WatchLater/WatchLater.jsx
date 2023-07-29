import { VideoCard } from "../../components/VideoCard/VideoCard";
import { VideoCardsListing } from "../../components/VideoCardsListing/VideoCardsListing"
import { useVideos } from "../../context/VideosContext/VideosProvider"

export const WatchLater = () => {

    const { watchLater } = useVideos();

    return <section>
        <h2> WatchLater </h2>
        <VideoCardsListing>
            {
                watchLater?.map( (videoObj, index) => <VideoCard videoObj={videoObj} key={index} /> )
            }
            {
                watchLater.length===0 && <h3> watch later is empty..... </h3>
            }
        </VideoCardsListing>
    </section>
}