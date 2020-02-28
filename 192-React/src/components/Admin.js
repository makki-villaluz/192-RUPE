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
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

const Admin=(props)=>{

    let count=0;
    let reviewCount=0;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    var eateries = props.eateries.map((eatery)=>{
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
        count+=1;
        return(<Box key={eatery.id} className="eateryBox"  border={1}>
            <div className="eateryInfo subBox">
                <Typography component="h5" variant="h5"><strong>{eatery.name}</strong></Typography>
                {eatery.why_flag}
            </div>
            <div className="eateryActions subBox">
                <Button variant="contained" onClick={handleEateryUnflag}color="primary">Unflag Eatery</Button> <Button variant="contained" color="secondary">Delete Eatery</Button>
            </div>
            </Box>
        )
    })

    var flaggedReviews = props.flaggedReviews.map((fReview) =>{
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
        return(<Box key={fReview.id} className="eateryBox"  border={1}>
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