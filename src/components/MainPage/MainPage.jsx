import React, {useState, useEffect} from 'react'
import Header from './Header'
import Tabledata from './Tabledata'
import FilterButton from './FilterButton'
import AddSpot from './AddSpot'
import { GoogleMap, GoogleApiWrapper, Marker, InfoWindow, useLoadScript } from '@react-google-maps/api'

    const spotAPI = 'https://5ddbb358041ac10014de140b.mockapi.io/spot';

    const mapContainerStyle= {
        width: '100%',
        height: '48vh',
        zIndex: '0'
    }

    const center= {
        lat: 44.177269,
        lng: 28.652880
    }

    const options= {
        disableDefaultUI: true,
        zoomControl: true
    }

    const icon1 = {
        url: "assets/red-marker.png"
    }

    const icon2= {
        url: "assets/yellow-marker.png"
    }

const MainPage = ({Logout}) => {
        const [places, setPlaces] = useState([]);
        const [unusedPlaces, setUnusedPlaces] = useState([]);
        
        const [selectedPlace, setSelectedPlace] = useState("");

        const [isInfoWindowActive, setInfoWindowActive] = useState(false);
        const [activeAddSpot, setAddSpot] = useState(false);

        const [favorite, setFavorite] = useState([]);
        const [addingFavorites, setAddingFavorites] = useState([]);

        const fetchData = () => {
            fetch(spotAPI)
        .then(res => res.json())
        .then(data => {
            setPlaces(data);
            setUnusedPlaces(data);
        })
        .catch(error => console.log(error))
            console.log(places);
        }

        useEffect(() => {
            fetchData();
        },[]);

        
        const MarkerClickHandler = () => {
            setInfoWindowActive(!isInfoWindowActive);
        }

        const spotPlaces = places.map(marker => 
            <Marker key= {marker.id}
                    position= {{lat: Number(marker.lat), lng: Number(marker.long)}}
                    icon= {favorite.find((elem)=> elem === marker.id) ? icon2 : icon1}
                    onClick= {()=> {
                        setSelectedPlace(marker.id)
                        MarkerClickHandler();
                        }} >                               
                    {(isInfoWindowActive) ? (selectedPlace === marker.id &&  
                        <InfoWindow onCloseClick={()=>{setInfoWindowActive(false)}}>
                            <div>
                                <div className="content-details">
                                    <span style={{fontWeight:"900", fontSize:"11px"}}>{marker.name} <img className={(favorite.find((elem)=> elem === marker.id)) ? ("icon-activated") : ("icon-deactivated")} src="/assets/star-on.png" alt="favorite"></img></span>
                                    <p style={{fontSize:"10px"}}>{marker.country}</p>
                                    <br></br>
                                    <p className="spot-detail">WIND PROBABILITY</p>
                                    <span className="marker-details">{marker.probability+"%"}</span>
                                    <p className="spot-detail">LATITUDE</p>
                                    <span className="marker-details">{marker.lat}</span>
                                    <p className="spot-detail">LONGITUDE</p>
                                    <span className="marker-details">{marker.long}</span>
                                    <p className="spot-detail">WHEN TO GO</p>
                                    <span className="marker-details">{marker.month}</span>
                                </div>
                                    <button onClick={()=>{
                                        setFavorite(favorite=> [...favorite, marker.id])
                                        setAddingFavorites(favorites=> [...favorites, {
                                            name: marker.name,
                                            id: marker.id
                                        }])
                                        if(favorite.find((elem)=> elem === marker.id)) 
                                            (setFavorite(favorite.filter((elem)=> elem !== marker.id))) 
                                            
                                        if(addingFavorites.find((elem)=> elem.id === marker.id)){
                                            setAddingFavorites(addingFavorites.filter((elem)=> elem.id !== marker.id))
                                        }
                                        }} 
                                        className={favorite.find((elem)=> elem === marker.id) ? ("remove-from-favBtn") : ("add-to-favBtn")}>{(favorite.find((elem)=> elem === marker.id)) ? (`- REMOVE FROM FAVORITES`) : (`+ ADD TO FAVORITES`)}
                                    </button>
                            </div>
                    </InfoWindow>) : null}
            </Marker>);

        const { isLoaded, loadError } = useLoadScript({
            googleMapsApiKey: process.env.REACT_APP_GOOGLEMAPS_PUBLIC_KEY
        });

        if (loadError) return "error loading maps";
        if (!isLoaded) return "Loading maps";

        let mainPageContent;

        if (places) {
            mainPageContent = <div>
            <Header Logout= {Logout} activeAddSpot= {activeAddSpot} setAddSpot= {setAddSpot} addingFavorites={addingFavorites} />
            <FilterButton  places= {places} setPlaces= {setPlaces} unusedPlaces= {unusedPlaces} setUnusedPlaces={setUnusedPlaces} />
            <GoogleMap mapContainerStyle= {mapContainerStyle} zoom= {8} center= {center} options= {options}>{spotPlaces}</GoogleMap>
            {(activeAddSpot) && <AddSpot setAddSpot= {setAddSpot} setPlaces= {setPlaces} setUnusedPlaces= {setUnusedPlaces} places= {places} unusedPlaces= {unusedPlaces}  />}                           
            <Tabledata places={places} />
        </div>;
        }

        return (
            <div>
                {mainPageContent}
            </div>
        )
}

export default MainPage

