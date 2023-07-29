import { Routes, Route, NavLink } from 'react-router-dom';

import { Category } from '../Category/Category';
import { SingleCategory } from '../SingleCategory/SingleCategory';
import { Explore } from '../Explore/Explore';
import { WatchLater } from '../WatchLater/WatchLater';
import { VideoListing } from '../VideoListing/VideoListing';
import { Playlist } from '../Playlist/Playlist';

export const Home = () => {

    const navStyle={ color: 'white', backgroundColor: '#8c76db' };

    return <div className='main-container' >

        <aside  className='side-nav' >
            <ul>
                <NavLink to='/'  style={({ isActive }) => isActive ? navStyle : {} } > Home </NavLink>
                <NavLink to='/explore' style={({ isActive }) => isActive ? navStyle : {} }> Explore </NavLink>
                <NavLink to='/playlists' style={({ isActive }) => isActive ? navStyle : {} } > Playlists </NavLink>
                <NavLink to='/watchLater' style={({ isActive }) => isActive ? navStyle : {} } > Watch Later </NavLink>
            </ul>
        </aside>

        <main>
            <Routes>
                <Route path='/' element={ <Category /> } />
                <Route path='/category/:categoryName' element={ <SingleCategory /> } />
                <Route path='/explore' element={ <Explore /> } />
                <Route path='/watchlater' element={ <WatchLater /> } />
                <Route path='/video/:videoId' element={ <VideoListing /> } />
                <Route path='/playlists' element={ <Playlist /> } />
            </Routes>
        </main>

        </div>
}