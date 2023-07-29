import { useState } from "react";

import { VideoCardsListing } from "../../components/VideoCardsListing/VideoCardsListing"
import { VideoCard } from "../../components/VideoCard/VideoCard"
import { useVideos } from "../../context/VideosContext/VideosProvider"

export const Explore = () => {

    const { videosList } = useVideos();

    const [ searchText, setSearchText ] = useState('');

    const filteredVideo = videosList?.filter( ({title}) => title.toLowerCase().includes(searchText.toLowerCase()) );

    return <div>
        <h2> Explore </h2>
        <input className="explore-search" placeholder="search here" type='text' value={searchText} onChange={ e => setSearchText(e.target.value) } />
        <VideoCardsListing>
            {
                filteredVideo?.map( (videoObj, index) => <VideoCard key={index} videoObj={videoObj} /> )
            }
            {
                filteredVideo?.length===0 && <h3> oopsss.. nothing mathced your search result </h3>
            }
        </VideoCardsListing>
    </div>
}