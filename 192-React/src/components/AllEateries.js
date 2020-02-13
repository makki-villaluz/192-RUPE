/* 
---LICENSE---
Author: Annysia Dupaya
This is a course requirement for CS 192
Software Engineering II under the
supervision of Asst. Prof. Ma. Rowena C.
Solamo of the Department of Computer
Science, College of Engineering, University
of the Philippines, Diliman for the AY 2019-
2020 

---HISTORY---
1/20/20: Annysia Dupaya - Created component
1/25/20: Annysia Dupaya - Integrated with API
2/6/20: Annysia Dupaya - DOes not show eatery if flagged
2/11/20: Dylan Bayona - Reviewed code

---ABOUT---
File creation date: 1/20/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component fetches and displays all of the eateries
This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/
import React from 'react';  
import Typography from '@material-ui/core/Typography';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PlaceIcon from '@material-ui/icons/Place';
import Box from '@material-ui/core/Box';
import {
     Link,
     Switch,
     Route
} from "react-router-dom";
import Eatery from './Eatery';
import StarIcon from '@material-ui/icons/Star';
import '../stylesheets/AllEateries.css';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';

/* ---METHOD---
Name: AllEateries
Routine creation date: 1/20/20
Purpose of the routine: Communicates with the backend API for all of the eateries
List of calling Arguments: props
List of required files/database tables: N/A
Return value: Rendered page
*/
const AllEateries = (props) =>{
     /* ---METHOD---
     Name: flagCheck2
     Routine creation date: 2/6/20
     Purpose of the routine: checks flag
     List of calling Arguments: N/A
     List of required files/database tables: N/A
     Return value: N/A
     */
     const flagCheck2 = ()=>{
          props.flagCheck();
     }
	
     /* ---METHOD---
     Name: eateries
     Routine creation date: 2/6/20
     Purpose of the routine: returns eateries, if eatery is flagged, it is not returned
     List of calling Arguments: eatery
     List of required files/database tables: Eatery
     Return value: null/eatery
     */	
     var eateries = props.eateries.map((eatery)=>{
          if(eatery.flag){
               return null;
          }
          return(
               <Box key={eatery.id} className = 'eateryBox' border={1} borderColor={grey[300]}>
                    <div className='subBox'>
                         <Typography component={Link} 
                             to={"eatery/"+eatery.id} 
                             variant="h5" 
                             style={{textDecoration:'none'}} 
                             color="inherit">
                             <strong>{eatery.name}</strong>
                         </Typography>
                         <p><PlaceIcon/>{eatery.address}</p>
                     </div>
                     <div className='subBox'>
                         <Typography variant="h5"><StarIcon style={{color:orange[500]}} fontSize='large'/>{eatery.rating}</Typography>
                         <Typography variant="subtitle1" color="textSecondary">
                              <PhoneAndroidIcon/>{eatery.contact}
                         </Typography>
                     </div>
                
               </Box>
         )
     })
     return(
          <div className = "ui cards">
               <Switch>
                    <Route exact path="/eatery" render={()=>(<div className = 'eateriesContainer'>{eateries}</div>)}/>
                    <Route path="/eatery/:id" render ={(props)=><Eatery {...props} flagCheck2={flagCheck2}/>}/>
               </Switch>
          </div>
     )
}

export default AllEateries;
