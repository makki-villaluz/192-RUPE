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
1/30/20: Dylan Bayona - Reviewed code
2/6/20: Annysia Dupaya - Added Flag Eatery
2/12/20: Dylan Bayona - Reviewed code

---ABOUT---
File creation date: 1/20/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component is for providing creating and instantiating an Eatery entity.
This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import PlaceIcon from '@material-ui/icons/Place';
import AllReviews from './AllReviews';
import AddReview from './AddReview';
import FlagEatery from './FlagEatery';
import Box from '@material-ui/core/Box';
import '../stylesheets/Eatery.css';
import StarIcon from '@material-ui/icons/Star';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Eatery extends Component {
    /* ---METHOD---
    Name: constructor
    Routine creation date: 1/20/20
    Purpose of the routine: Sets default values for properties of this object
    List of calling arguments: props
    List of required files/database tables: N/A
    Return value: N/A
    */        
    constructor(props){
        super(props);
        this.state={
            eatery:[],
            reviews:[]
        };
        this.handleReviewSubmit = this.handleReviewSubmit.bind(this);
        this.addNewReview = this.addNewReview.bind(this);
        this.handleEateryFlag = this.handleEateryFlag.bind(this);
    }
    
    /* ---METHOD---
    Name: handleReviewSubmit
    Routine creation date: 1/20/20
    Purpose of the routine: Provides functionality to get review information from backend
    List of calling arguments: review_text, rating
    List of required files/database tables: Eatery, Review
    Return value: JSON response
    */
    handleReviewSubmit(review_text, rating){
        /* ---VARIABLE---
        body; contains the review text and rating of the eatery
        */        
        let body = {review_text:review_text, rating:rating};
        console.log(review_text);
        fetch('http://localhost:5000/eatery/'+this.props.match.params.id+'/review/add',{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body)
        }).then((response)=>{return response.json()})
        .then((review)=>{
            this.addNewReview(review)
        })
        this.props.flagCheck();
    }
    
    /* ---METHOD---
    Name: addNewReview
    Routine creation date: 1/20/20
    Purpose of the routine: Provides functionality to add new review to databse
    List of calling arguments: Review
    List of required files/database tables: N/A
    Return value: N/A
    */        
    addNewReview(review){
        this.setState({
            reviews: this.state.reviews.concat(review)
        })
    }
    /* ---METHOD---
    Name: handleEateryFlag
    Routine creation date: 2/6/20
    Purpose of the routine: Provides functionality to submit flagged eatery info to the backend
    List of calling arguments: why_flag
    List of required files/database tables: Eatery
    Return value: JSON response
    */
    handleEateryFlag(why_flag){
		/* ---METHOD---
		Name: notify
		Routine creation date: 2/6/20
		Purpose of the routine: Provides notification for flagged review
		List of calling arguments: N/A
		List of required files/database tables: N/A
		Return value: N/A, shows notification
		*/
        const notify = () => {
			toast.success("Your report has been submitted you can no longer see this eatery.");
		}
		
		/* ---VARIABLE---
        body: contains the reason to flag the eatery
        */  
        let body = {why_flag:why_flag};
        fetch('http://localhost:5000/eatery/'+this.props.match.params.id+'/flag',{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body:JSON.stringify(body)
        }).then((response)=>{return response.json()});
        
        this.props.history.push("/eatery"); 
         
        notify();
        this.props.flagCheck2();
        
    }

    /* ---METHOD---
    Name: componentDidMount
    Routine creation date: 1/20/20
    Purpose of the routine: Fetches review data from API
    List of calling arguments: N/A
    List of required files/database tables: N/A
    Return value: JSON response
    */    
    componentDidMount(){
        fetch('http://localhost:5000/eatery/'+this.props.match.params.id)
        .then((response) => {return response.json()})
        .then((data) => {this.setState({ eatery: data }) });
        fetch('http://localhost:5000/eatery/'+this.props.match.params.id+'/review')
        .then((response)=> {return response.json()})
        .then((data) => {this.setState({reviews: data})});
    }
    
    /* ---METHOD---
    Name: render
    Routine creation date: 1/20/20
    Purpose of the routine: Provides functionality to render page
    List of calling arguments: N/A
    List of required files/database tables: N/A
    Return value: rendered page
    */        
    render() {
        /* ---VARIABLE---
        eatery; contains the eatery in the current state
        */        
        let eatery = this.state.eatery;
        return(
            <div>
                <div className='container'>
                    <Box className='subBox'>
                        <Typography
                            variant="h2" 
                            color="inherit">
                            {eatery.name} <StarIcon fontSize='large'/> {eatery.rating}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            <PhoneAndroidIcon/>{eatery.contact}
                        </Typography>
                        <p><PlaceIcon/>{eatery.address}</p>
                        <FlagEatery handleEateryFlag={this.handleEateryFlag}/>
                    </Box>
                    <Box className='subBox right'>
                        <Typography
                            variant="h4" 
                            color="inherit">
                        Add a Review
                        </Typography>
                        <AddReview handleReviewSubmit={this.handleReviewSubmit}/>
                    </Box>
                </div>
                <AllReviews reviews={this.state.reviews}/>
            </div>
        )
    }
  }
