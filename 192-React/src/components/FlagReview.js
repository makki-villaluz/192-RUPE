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
2/6/20: Annysia Dupaya - Created component
2/12/20: Dylan Bayona - Reviewed code

---ABOUT---
File creation date: 2/6/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component is for flagging a review.
This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import FlagIcon from '@material-ui/icons/Flag';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Link} from 'react-router-dom';

/* ---VARIABLE---
  useStyles: contains the styling of this component
*/  
const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

/* ---METHOD---
  Name: FlagReview
  Routine creation date: 2/6/20
  Purpose of the routine: Provides functionality to flag a review
  List of calling arguments: props
  List of required files/database tables: Review
  Return value: Rendered page with flagged review dialogs
*/
export default function FlagReview(props) {
  /* ---VARIABLE---
    classes: contains styles
  */  
  const classes = useStyles();
  
  /* ---VARIABLE---
    formFields: contains the values for the form
  */  
  let formFields = {};
  
  /* ---VARIABLE---
    value: contains the state of the form
	setValue: contains next state
  */  
  const [value, setValue] = React.useState('rude');

  /* ---METHOD---
    Name: handleChange
    Routine creation date: 2/4/20
    Purpose of the routine: Handles changes
    List of calling arguments: event
	List of required files/database tables: N/A
	Return value: N/A
  */
  const handleChange = event => {
    setValue(event.target.value);
  };
  
  /* ---VARIABLE---
    [open, setOpen]: changes the state of the modal if visible or not
  */  
  const [open, setOpen] = React.useState(false);

  /* ---METHOD---
    Name: handleOpen
    Routine creation date: 2/6/20
    Purpose of the routine: Changes variable setOpen to true
    List of calling arguments: N/A
    List of required files/database tables: N/A
    Return value: N/A
  */
  const handleOpen = () => {
    setOpen(true);
  };

  /* ---METHOD---
    Name: handleClose
    Routine creation date: 2/6/20
    Purpose of the routine: Changes variable setOpen to false
    List of calling arguments: N/A
    List of required files/database tables: N/A
    Return value: N/A
  */
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <Typography component={Link} onClick={handleOpen} color="inherit">
            <FlagIcon/>Flag this review
        </Typography>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          
          <div className={classes.paper}>
            <form noValidate autoComplete="off"
                onSubmit={(e)=> {props.handleReviewFlag(value + ": " + formFields.why_flag_text.value);
                e.target.reset(); handleClose();}}>
              <Typography component="h4"variant="h4">
                What's wrong with this review?
              </Typography>
              <div className="field">
                <RadioGroup aria-label="flag issues" name="flageatery" value={value} onChange={handleChange}>
                  <FormControlLabel value="rude" control={<Radio />} label="It is rude, offensive, or spam" />
                  <FormControlLabel value="off-topic" control={<Radio />} label="It is not constructive / off-topic" />
                  <FormControlLabel value="subjective" control={<Radio />} label="Primarily subjective" />
                  <FormControlLabel value="other" control={<Radio />} label="Other" />
                </RadioGroup>
              </div>       
              <div className="field">
              <TextField id="outlined-basic" 
                    multiline={true}
                    label="Additional comments" variant="outlined" 
                    inputRef={input => formFields.why_flag_text = input}
                    style={{width:"100%"}}/>
              </div> 
              <button className="ui primary button"type="submit">Submit Report</button>  
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
