import { VideoCardsListing } from "../../components/VideoCardsListing/VideoCardsListing";
import { useVideos } from '../../';
import { VideoCard } from "../../components/VideoCard/VideoCard";

export const Category = () => {

    const { categoryList } = useVideos();

    return <section>
        <h2> Category </h2>
        <VideoCardsListing>
            {
                categoryList?.map( (videoObj, index) => <VideoCard key={index} forCategory={true} videoObj={videoObj} /> )
            }
        </VideoCardsListing>
    </section>
}