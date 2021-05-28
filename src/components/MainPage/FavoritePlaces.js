import React, {useEffect} from 'react'

const FavoritePlaces = ({addingFavorites}) => {
    addingFavorites.map((place)=>{
        console.log(place.name);
    })

    return (
        <div className="favoriteSection">
            <div className="titlediv">
            <h3 className="title-fav">FAVORITES</h3>
            </div>
            <div>
                {addingFavorites.map((place)=>
                     <li className="favItem">{place.name}</li>
                )}
            </div>
        </div>
    )
}

export default FavoritePlaces
