import { useParams } from 'react-router-dom';

import { VideoCardsListing } from '../../components/VideoCardsListing/VideoCardsListing';
import { useVideos } from '../../context/VideosContext/VideosProvider';
import { VideoCard } from '../../components/VideoCard/VideoCard';

export const SingleCategory = () => {
    const { categoryName } = useParams();
    const { videosList } = useVideos();

    const videoOfSelectedCategory = videosList?.filter( ({ category }) => category === categoryName );

    return <section>
        <h2> {categoryName} </h2>
        <VideoCardsListing>
            {
                videoOfSelectedCategory?.map( (videoObj, index) => <VideoCard key={index} videoObj={videoObj} /> )
            }
        </VideoCardsListing>
    </section>
}