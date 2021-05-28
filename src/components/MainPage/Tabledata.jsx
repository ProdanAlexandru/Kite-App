import React, {useState,useCallback} from 'react'
import SearchIcon from '@material-ui/icons/Search'

const Tabledata = ({places}) => {
        const [q, setQ] = useState("");

        const debounce = (func) =>{
            let timer;
            return function (...args){
                const context = this;
                if (timer) clearTimeout(timer)
                timer = setTimeout(()=>{
                    timer=null;
                    func.apply(context,args);
                }, 500)
            }
        }

        let tableColumns, cId;
        const columns = places[0] && Object.keys(places[0]);

        if (columns) {
            let cDate;
            [cId, cDate] = [columns[0], columns[1]];
            [cId, cDate, ...tableColumns] = columns;
        }
         console.log(tableColumns);

            const searchHandler = (e) =>{
                e.preventDefault();
                setQ(e.target.value);
                console.log('searching');
            }

            const optimisedVersion = useCallback(debounce(searchHandler),[]);

            const Search = (rows) => { 
                return rows.filter((row) =>(tableColumns.some(column => row[column].toString().toLowerCase().indexOf(q.toLowerCase())>-1)));
            }

            let tabelContent = Search(places).map(row => <tr key={cId}>
                {tableColumns.map(column => <td key={Math.random()} className="table-details">{
                    (column === "probability") ? ( row[column] + "%") : (row[column]) }</td>)}
                           </tr>)
        
    return (
        <div className="tabledata-div">
            <div className="search-div">
                
                <h1 style={{paddingBottom:'5px', paddingTop:'10px'}}>Locations</h1>
                <div className="search-Title">
                <SearchIcon className="searchIcon"/>
                <input type="search" placeholder ="Search..." className="search-field"  onChange={optimisedVersion}/> 
                </div>
                </div> 
                <div className="div-table">
                    <table cellPadding={0} cellSpacing={0} className="table-content" >
                        <thead className="title-row">
                            <tr className="title-section">
                                <th className="column-title">Name</th>
                                <th className="column-title">Country</th>
                                <th className="column-title">Latitude</th>
                                <th className="column-title">Longitude</th>
                                <th className="column-title">Wind Prob.</th>
                                <th className="column-title last-column">When to go</th>
                            </tr>
                        </thead>
                            <tbody>
                            {tabelContent}
                            </tbody>
                    </table>
                </div>
        </div>
    )
}

export default Tabledata
