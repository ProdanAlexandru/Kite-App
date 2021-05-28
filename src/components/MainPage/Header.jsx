import React, {useState} from 'react'
import FavoritePlaces from './FavoritePlaces'

const Header = ({Logout, setAddSpot, addingFavorites}) => {
    const [activeLogout, setActiveLogout] = useState(false);
    const [activeFavorites, setActiveFavorites] =useState(false);
    
    const handleAccountClick = () => {
        setActiveLogout(!activeLogout);
    }
    const handleAddSpot = () => {
        setAddSpot(true);
    }

    const handleFavorites = () => {
        setActiveFavorites(!activeFavorites);
    }
    return (
        <div>
            <div className="header-class">
                <div>
                        <h1 className="title-app">Kite</h1>
                        <button onClick={() => {handleAddSpot()}} className="addspot-Btn">ADD SPOT</button>
                        <button onClick={()=> {handleFavorites()}} className="favorites-sectionBtn">FAVORITES</button>
                        <button className="account-button" onClick={handleAccountClick}><span className="material-icons md-36">
                        account_circle
                        </span></button> 
                </div>
            </div>
                {(activeFavorites) && <FavoritePlaces addingFavorites={addingFavorites} />}
                {(activeLogout) && <button className="logout-button" onClick={Logout}><span className="material-icons leave-button">logout</span><span className="text-button">Logout</span></button> } 

        </div>
    )
}

export default Header
