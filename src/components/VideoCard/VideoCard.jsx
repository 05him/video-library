import { useVideos } from "../../context/VideosContext/VideosProvider";

export const VideoCard = ({ forCategory=false, videoObj }) => {

    const { _id, category, thumbnail, title, views, creator } = videoObj;

    const { includedInWatchLater, addToWatchLater, removeFromWatchLater, navigate } = useVideos();

    const watchLaterHanlder = (e) => {
        e.target.stopPropagation();
        includedInWatchLater(_id) ? removeFromWatchLater(_id) : addToWatchLater(videoObj);
    } 

    const handleNavigation = () => forCategory ? navigate(`/category/${category}`) : navigate(`/video/${_id}`)

    const ForCategory = () => {
        return <div className="card-text-container video-category " > {category} </div>
    }

    const ForNormalVideo = () => {
        return <div className="card-footer" >
            <button onClick={ e=> watchLaterHanlder(e) } className="watchlater-btn" > <img src={ includedInWatchLater(_id) ? 'https://api.iconify.design/ic:round-watch-later.svg?color=%238c76db' : 'https://api.iconify.design/ic:outline-watch-later.svg?color=%238c76db' } alt='watch later' /> </button>
            <div className="channel-img" >
                <img src=' https://picsum.photos/40/40' alt='channel thumbnail' />
            </div>
            <div className="card-text-container" >
                <div className="video-title" > {title} </div>
                <div className="video-category" > {category} </div>
                <div className="video-views" > {views} views | {creator} </div>
            </div>
        </div>
    }

    return <div className="video-card" onClick={ handleNavigation } >
        <img className="video-thumbnail" src={ thumbnail } alt={ forCategory ? category : title } />
        { forCategory ? <ForCategory /> : <ForNormalVideo/>}
    </div>
}