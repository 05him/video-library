import { useContext, createContext } from "react";
import { useNavigate } from 'react-router-dom';

import { useVideosReducer } from "./VideosReducer";

const VideoContext = createContext();

export const VideosProvider = ({ children }) => {

    const navigate = useNavigate();

    const dataFromReducer = useVideosReducer();


    return <VideoContext.Provider value={{ ...dataFromReducer, navigate }} >
        {children}
    </VideoContext.Provider>
}

export const useVideos = () => useContext(VideoContext);