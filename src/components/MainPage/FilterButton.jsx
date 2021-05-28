import React, {useState} from 'react'
import {makeStyles} from "@material-ui/core"
import {Button, TextField, Grid} from '@material-ui/core'

const styles = {
    root: {
        margin: "22px auto 0",
        fontSize: "10px",
        fontWeight: "700",
        borderRadius: "0",
        boxShadow:"0 1px 1px 1px grey"
    },
    resize: {
        fontSize: "12px"
    },
    textField: {
        margin:"auto"
    }
}

let newData = [];

const useStyles = makeStyles(styles);

const FilterButton = ({places, setPlaces, unusedPlaces, setUnusedPlaces}) => {
    const classes=useStyles();

    const [searchCountry, setCountry] = useState('');
    const [searchWindPb, setWindPb] = useState('');

    const [isFilterBtnActive, setFilterBtnActive] = useState(false);

    const handleFilterBtn = () =>{
        setFilterBtnActive(!isFilterBtnActive);
    }
    const filterData = (datafilter) => { 
         newData = (searchCountry ==="" && searchWindPb ==="") 
        ? unusedPlaces 
        : datafilter.filter((data) =>(
        data.country.toUpperCase().indexOf(searchCountry.toUpperCase()) > -1     &&
        data.probability.toString().toLowerCase().indexOf(searchWindPb.toString()) > -1
    ));
    setPlaces(newData);
//  setUnusedPlaces(newData);

    return newData;
}
    const handleSubmit = (e) => {
        // if (searchWindPb ==="" && searchCountry === ""){
        //     fetchData();
        // }
            e.preventDefault()
        console.log(newData)
        console.log(unusedPlaces)
        filterData(places);
        setFilterBtnActive(false)
        setCountry("")
        setWindPb("")    
    }
    return (
        <div>
        <button onClick={()=>(handleFilterBtn())} className={(isFilterBtnActive) ? ("filterBtnDisable") : ("filterBtn")}><img className="filtersImg" src="/assets/filter.png" alt="filter"></img>FILTERS</button>
        {(isFilterBtnActive) ? 
             <div className="filterDiv">
                <form onSubmit ={handleSubmit}>
                    <Grid container >
                        <label style={{padding:"10px 0 0 7px", fontWeight:"600"}}>Country</label>
                        <TextField value={searchCountry} onChange={(e) => {setCountry(e.target.value)}} className={classes.textField} InputProps={{classes: {input: classes.resize}}} type="text" />
                        <label style={{padding:"10px 0 0 7px", fontWeight:"600"}}>Wind Probability</label>
                        <TextField value={searchWindPb} onChange={(e) => {setWindPb(e.target.value)}} className={classes.textField} InputProps={{classes: {input: classes.resize}}} type="number" />
                        <Button type="submit" className={classes.root} variant= "outlined" size="small">APPLY FILTER</Button>
                    </Grid>
                </form>
            </div>
            
        : ""}
        </div>
    )
}

export default FilterButton
