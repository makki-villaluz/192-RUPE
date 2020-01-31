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
1/25/20: Annysia Dupaya - Created component
1/26/20: Annysia Dupaya - Integrated with API
1/29/20: Dylan Bayona - Reviewed code

---ABOUT---
File creation date: 1/20/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component is for adding a review to an eatery. 
This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
        margin: '2em 1em'
        }
    },
  }));

/* ---METHOD---
Name: AddReview
Routine creation date: 1/20/20
Purpose of the routine: Provides functionality to add review to an eatery
List of calling arguments: props
List of required files/database tables: N/A
Return value: form with pertinent fields
*/
const AddReview = (props) =>{
    /* ---VARIABLE---
    value; contains state
    setValue; used to change state
    */
    const [value, setValue] = React.useState(2);
    
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
            onSubmit={(e)=> {props.handleReviewSubmit(formFields.review_text.value,
                value);
                e.target.reset();}}>
                <div className="field">
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography>Rating</Typography>
                        <Rating name="pristine" value={value} 
                        onChange={(event, newValue) => {
                            setValue(newValue); 
                          }}
                        />
                    </Box>
                </div>
                <div className="field">
                    <TextField id="outlined-basic" 
                    multiline={true}
                    label="Leave a review" variant="outlined" 
                    inputRef={input => formFields.review_text = input}/>
                </div>     
                <button className="ui primary button"type="submit">Submit</button>           
            </form>
    )
}

export default AddReview;
