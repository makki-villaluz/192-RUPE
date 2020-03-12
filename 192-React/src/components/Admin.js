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
2/13/20: Annysia Dupaya - Created component
2/25/20: Annysia Dupaya - added flag review
3/12/20: Dylan Bayona - reviewed code

---ABOUT---
File creation date: 2/13/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component is for adding a review to an eatery. 
This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
//import '../stylesheets/Admin.css';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import MuiPhoneNumber from 'material-ui-phone-number';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';


/* ---METHOD---
Name: useStyles
Routine creation date: 3/3/20
Purpose of the routine: Used to apply styles to this component
List of calling arguments: theme
List of required files/database tables: N/A
Return value: N/A
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
Name: TabPanel
Routine creation date: 2/26/20
Purpose of the routine: Provides styling and generates tab panel components
List of calling arguments: props
List of required files/database tables: N/A
Return value: tab panel components
*/
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  /* ---METHOD---
    Name: a11yProps
    Routine creation date: 2/26/20
    Purpose of the routine: Provides functionality to Admin,styles tabs
    List of calling arguments: index
    List of required files/database tables: N/A
    Return value: styling for tabs
    */
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
/* ---METHOD---
Name: Admin
Routine creation date: 2/26/20
Purpose of the routine: Provides functionality to whole application
List of calling arguments: props
List of required files/database tables: N/A
Return value: Returns Admin component
*/
const Admin=(props)=>{

    

    let count=0;
    let reviewCount=0;
    const [value, setValue] = React.useState(0);
    const [phone, setPhone] = useState();
    let formFields = {}

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const classes = useStyles();
    /* ---METHOD---
    Name: eateries
    Routine creation date: 2/26/20
    Purpose of the routine: Creates list of flagged eateries
    List of calling arguments: props
    List of required files/database tables: N/A
    Return value: rendered eateries
    */

   const [open, setOpen] = React.useState(false);
   const handleOpen = () => {
       setOpen(true);
   };

   /* ---METHOD---
   Name: handleClose
   Routine creation date: 3/3/20
   Purpose of the routine: Changes variable setOpen to false
   List of calling arguments: N/A
   List of required files/database tables: N/A
   Return value: N/A
   */  
   const handleClose = () => {
   setOpen(false);
   };
    var eateries = props.eateries.map((eatery)=>{
        
        
        /* ---METHOD---
        Name: handleEateryUnflag
        Routine creation date: 2/26/20
        Purpose of the routine: Provides functionality to Admin, unflags a flagged eatery
        List of calling arguments: props
        List of required files/database tables: N/A
        Return value: null
        */
        function handleEateryUnflag(){
            fetch('http://localhost:5000/eatery/'+eatery.id+'/unflag',{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }
            })
            window.location.reload(true);
        }
        if(!eatery.flag){
            return null;
        }
         /* ---METHOD---
        Name: handleEditEaterySubmit
        Routine creation date: 3/11/20
        Purpose of the routine: Provides functionality to Admin, unflags a flagged eatery
        List of calling arguments: props
        List of required files/database tables: N/A
        Return value: null
        */
       function handleEditEaterySubmit(name,address,contact){
            let body = {name:name, address:address, contact:contact};
           fetch('http://localhost:5000/eatery/'+eatery.id+'/update',{
               method:'PUT',
               headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
           }).then((response)=>{return response.json()})
           .then(()=>{handleEateryUnflag()})
       }
        count+=1;
        return(
        
        <Box key={eatery.id} className="eateryBox"  border={1}>
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
                onSubmit={(e)=> {handleEditEaterySubmit(formFields.name.value,
                formFields.address.value, 
                phone+"");
			    e.target.reset();}}>
               <div className="field">
                     <TextField id="outlined-basic" defaultValue={eatery.name} inputRef={input => formFields.name = input} label="Eatery Name" variant="outlined" />
                
                     {/* <input ref={input => formFields.name = input} type="text" id="name" placeholder="Name" /> */}
               </div>
               <div className="field">
                    <InputLabel>Address</InputLabel>
                    <Select native className="form-control"id="select1" defaultValue={eatery.address} inputRef={input => formFields.address = input}>
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
                     value = {eatery.contact}
                     defaultCountry={'ph'} 
                     onlyCountries={['ph']} 
                     onChange={(e)=>{setPhone(e);}}/>
                 </div>
                 <button className="ui primary button"type="submit">Edit Eatery</button>
               </form>
           </div>
           </Fade>
            </Modal>
            <div className="eateryInfo subBox">
                <Typography component="h5" variant="h5"><strong>{eatery.name}</strong></Typography>
                
                {eatery.why_flag}
            </div>
            <div className="eateryActions subBox">
                <Button variant="contained" onClick={handleEateryUnflag}color="primary">Unflag Eatery</Button> 
                <Button variant="contained" color="secondary">Delete Eatery</Button>
                <Button variant="contained" onClick={handleOpen}>Edit Eatery</Button>
            
            </div>
            </Box>
        )
    })
    /* ---METHOD---
    Name: AddEatery
    Routine creation date: 1/20/20
    Purpose of the routine: Provides functionality to Admin, renders flagged Reviews
    List of calling arguments: props
    List of required files/database tables: N/A
    Return value: list of flagged reviews
    */

    var flaggedReviews = props.flaggedReviews.map((fReview) =>{

        /* ---METHOD---
        Name: handleReviewUnflag
        Routine creation date: 2/26/20
        Purpose of the routine: Provides functionality to Admin, unflags flagged reviews
        List of calling arguments: props
        List of required files/database tables: N/A
        Return value: null
        */
        function handleReviewUnflag(){
            // /eatery/<int:e_id>/review/<int:r_id>/unflag'
            fetch('http://localhost:5000/eatery/'
            +fReview.eatery_id
            +'/review/'
            +fReview.id
            +'/unflag',{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }
            })
            window.location.reload(true);
        }
        if(!fReview.flag){
            return null;
        }
        reviewCount+=1;
        return(
        
        <Box key={fReview.id} className="eateryBox"  border={1}>
            
        <div className="eateryInfo subBox">
            <Typography component="h5" variant="h5"><strong>{fReview.review_text}</strong></Typography>
            {fReview.why_flag}
        </div>
        <div className="eateryActions subBox">
            <Button variant="contained" onClick={handleReviewUnflag} color="primary">
                Unflag Review
            </Button> 
            <Button variant="contained" color="secondary">Delete Review</Button>
        </div>
        </Box>
           
        )
    })

    let eatery_length = count
    return (
        <div className="Admin">
            
            <div className = "adminHeader">
                Welcome to the RUPE admin page!
            </div>
            <div>
                <Tabs value={value} onChange={handleChange} aria-label="styled tabs example">
                    <Tab label="Flagged Eateries" {...a11yProps(0)}/>
                    <Tab label="Flagged Reviews" {...a11yProps(1)}/>
                </Tabs>
                <Typography />
                <TabPanel value={value} index={0} >
                <div className="eaterySection">
                    <Typography component="h4" variant="h4">
                        You have {eatery_length} flagged eateries 
                    </Typography>
                    <div className="eateriesContainer">
                        {eateries}
                    </div>

                </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="flaggedReviewsContainer">
                    <Typography component="h4" variant="h4">
                        You have {reviewCount} flagged reviews 
                    </Typography>
                        {flaggedReviews}
                    </div>
                </TabPanel>
            </div>

            
        </div>
    )
}
export default Admin; 
