/* ---LICENSE---
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
1/28/20: Dylan Bayona - Reviewed code
1/30/20: Annysia Dupaya - improved phone input
---ABOUT---
File creation date: 1/20/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component is for adding an eatery. This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/
import React, {useState} from 'react';
import MuiPhoneNumber from 'material-ui-phone-number';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

/* ---METHOD---
Name: useStyles
Routine creation date: 1/20/20
Purpose of the routine: Used to apply styles to this component
List of calling arguments: theme
List of required files/database tables: N/A
Return value: N/A
*/
const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2),
        width: 200,
      },
    },
}));

/* ---METHOD---
Name: AddEatery
Routine creation date: 1/20/20
Purpose of the routine: Provides functionality to add eatery
List of calling arguments: props
List of required files/database tables: N/A
Return value: form with pertinent fields
*/
const AddEatery = (props) =>{
     /* ---VARIABLE---
     phone; contains state of phone input
     setPhone; used to change state of phone input
     */
    const [phone, setPhone] = useState();
     /* ---VARIABLE---
     classes; holds useStyles variable
     */
     const classes=useStyles();
     /* ---VARIABLE---
     formFields; contains the fields of the addEatery form
     */
     let formFields = {}
     return (
        <form className ={classes.root} noValidate autoComplete="off" 
        onSubmit={(e)=> {props.handleEaterySubmit(formFields.name.value,
            formFields.address.value, 
            phone);
            e.target.reset();}}>
            <div className="field">
                <TextField id="outlined-basic" inputRef={input => formFields.name = input} label="Name" variant="outlined" />
                
                {/* <input ref={input => formFields.name = input} type="text" id="name" placeholder="Name" /> */}
            </div>
            <div className="field">
                <InputLabel>Address</InputLabel>
                <Select native className="form-control"id="select1" inputRef={input => formFields.address = input}>
                    <option>College of Architecture</option>
                    <optgroup label="Archaeological Studies Program">
                        <option>Albert Hall</option>
                    </optgroup>
                    <option>College of Arts and Letters</option>
                    <optgroup label="College of Home Economics">
                        <option>Alonso Hall</option>
                        <option>Gusali 2</option>
                    </optgroup>
                    <option>College of Human Kinetics</option>
                    <option>College of Mass Communication</option>
                    <option>College of Music</option>
                    <optgroup label="College of Science">
                        <option>Institute of Biology</option>
                        <option>Zoology Building/CASAA</option>
                        <option>Institute of Chemistry</option>
                        <option>National Institute of Geological Sciences</option>
                        <option>CS Library</option>
                        <option>Institute of Mathematics</option>
                        <option>National Institute of Molecular Biology and Biotechnology</option>
                        <option>National Institute of Physics</option>
                    </optgroup>
                    <optgroup label="College of Social Sciences and Philosophy">
                        <option>Palma Hall</option>
                        <option>Lagmay Hall</option>
                    </optgroup>
                    <option>School of Economics</option>
                    <optgroup label="College of Education">
                        <option>Benitez Hall</option>
                        <option>Vidal Tan Hall</option>
                        <option>UP Integrated School</option>
                    </optgroup>
                    <optgroup label="College of Engineering">
                        <option>Melchor Hall</option>
                        <option>UP Alumni Engineers Centennial Hall</option>
                        <option>Institute of Civil Engineering</option>
                        <option>Industrial Engineering – Mechanical Engineering Building</option>
                        <option>Electrical and Electronics Engineering Institute</option>
                    </optgroup>
                    <option>College of Law</option>
                    <option>School of Statistics</option>
                    <option>School of Urban and Regional Planning</option>
                    <option>Cesar E.A. Virata School of Business</option>
                    <option>University Library</option>
                    <option>Vargas Museum</option>
                    <optgroup label="Others">
                        <option>Bahay ng Alumni</option>
                        <option>Area 2</option>
                        <option>OTHERS</option>
                    </optgroup>
                </Select>
            </div>
            <div className="field">
            <MuiPhoneNumber 
                //inputRef={input => formFields.contact = input} 
                value = {phone}
                defaultCountry={'ph'} 
                onlyCountries={['ph']} 
                onChange={(e)=>{setPhone(e);}}/>
            </div>
            <button className="ui primary button"type="submit">Submit</button>

        </form>
    );
}

export default AddEatery;
