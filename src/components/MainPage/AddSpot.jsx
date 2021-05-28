import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns';
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { TextField, Grid } from '@material-ui/core'
import {GoogleMap} from '@react-google-maps/api'



const mapContainerStyle= {
    width: '100%',
    height: '100%',
}

const center= {
    lat: 44.177269,
    lng: 28.652880
}

const options= {
    disableDefaultUI: true,
    zoomControl: true
}

const styles = {
    resizeLabel: {
        fontSize: "12px",
        fontWeight: "600",
        
    },
    textField: {
        width:"100%",
        paddingBottom:"8px"
    },
    resize: {
        fontSize: "12px"
    },
    datePicker: {
        fontSize:"6px",
        width:"35%",
        paddingLeft:"5px",
        paddingRight:"5px"
    }
}

let month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let spotPosition = {};

const useStyles = makeStyles(styles);

const AddSpot = ({setAddSpot, places, setPlaces, setUnusedPlaces, unusedPlaces}) => {

    const classes=useStyles();

    const [NameInput, setNameInput] =useState("");
    const [CountryInput, setCountryInput] =useState("");

    const [selectedDate, handleDateChange] = useState(new Date());
    const [selectedDate2, handleDateChange2] = useState(new Date());

   

    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (NameInput === "" || CountryInput === "" ){
            return setNameInput("No place inserted!!");
        } else{
        
        setPlaces(places => [
            ...places,
            {   id: Math.round(Math.random()*1000).toString(),
                createdAt: selectedDate,
                name: NameInput,
                country: CountryInput,
                lat: spotPosition.lat,
                long: spotPosition.long,
                probability: Math.round(Math.random()*100),
                month: month[selectedDate.getMonth()]
            }
        ])
        setUnusedPlaces(places => [
            ...places,
            {   id: Math.round(Math.random()*1000).toString(),
                createdAt: selectedDate,
                name: NameInput,
                country: CountryInput,
                lat: spotPosition.lat,
                long: spotPosition.long,
                probability: Math.round(Math.random()*100),
                month: month[selectedDate.getMonth()]
            }
        ])
        console.log(places);
        console.log(unusedPlaces);
        spotPosition = [];
        setAddSpot(false)
    }
    }

    return (
        <div className="addSpot-section">
            <h3 className="addspot-title">Add Spot</h3>
                <form onSubmit={handleOnSubmit} >
                    <Grid container>
                        <label className={classes.resizeLabel} >Name</label>
                        <TextField value={NameInput} onChange={(e)=>{setNameInput(e.target.value)}} className={classes.textField} InputProps={{classes: {input: classes.resize}}} type="text" />
                        <label className={classes.resizeLabel} >Country</label>
                        <TextField value={CountryInput} onChange={(e)=>{setCountryInput(e.target.value)}} className={classes.textField} InputProps={{classes: {input: classes.resize}}} type="text" />
                        <label className={classes.resizeLabel} style={{paddingBottom:"10px", paddingRight:"100px"}} >High Season</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                        InputProps={{classes: {input: classes.resize}}}
                        className={classes.datePicker}
                        openTo="month"
                        views={["month"]}
                        value={selectedDate}
                        onChange={handleDateChange}
                        />-
                        <DatePicker
                        InputProps={{classes: {input: classes.resize}}}
                        className={classes.datePicker}
                        openTo="month"
                        views={["month"]}
                        value={selectedDate2}
                        onChange={handleDateChange2}
                        />
                        </MuiPickersUtilsProvider>
                            <div className = "locationArea"> 
                            <GoogleMap 
                                    mapContainerStyle={mapContainerStyle} 
                                    zoom={8} center={center} 
                                    options={options}
                                    onClick= {(event)=>{
                                        spotPosition = {
                                            lat: event.latLng.lat().toFixed(4),
                                            long: event.latLng.lng().toFixed(4)
                                        }
                                    }} 
                                    >
                            </GoogleMap></div>
                        <button onClick={()=>{setAddSpot(false)}} type="button" className= "cancelBtn btnChoose">CANCEL</button>
                        <button type="submit" className= "confirmBtn btnChoose">CONFIRM</button>
                    </Grid>
                </form>
        </div>
    )
}

export default AddSpot


