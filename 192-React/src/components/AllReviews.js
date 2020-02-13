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
2/6/20: Annysia Dupaya - added flagreview
2/11/20: Dylan Bayona - Reviewed codePointAt

---ABOUT---
File creation date: 1/20/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component displays all of the reviews of an eatery
This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/

import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import FlagReview from './FlagReview';
import Container from '@material-ui/core/Container';
import '../stylesheets/AllReviews.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* ---METHOD---
Name: AllReviews
Routine creation date: 1/20/20
Purpose of the routine: Formats the look of the review
List of calling arguments: props
List of required files/database tables: N/A
Return value: Rendered page
*/
const AllReviews = (props) =>{
	 /* ---METHOD---
     Name: notify2
     Routine creation date: 2/6/20
     Purpose of the routine: Provides notification for flagged review
     List of calling arguments: N/A
     List of required files/database tables: N/A
     Return value: N/A, shows notification
     */
     const notify2 = () => {
          toast.success("Your report has been submitted you can no longer see this review.",{
               position: "top-center"
          });
     }
	 
	 /* ---METHOD---
     Name: reviews
     Routine creation date: 2/6/20
     Purpose of the routine: displays reviews, except for flagged reviews
     List of calling arguments: review
     List of required files/database tables: Review
     Return value: null or review
     */
     var reviews = props.reviews.map((review)=>{
          const handleReviewFlag=(why_flag)=>{
               console.log("is it running")
                    let body = {why_flag:why_flag};
                    fetch('http://localhost:3000/eatery/'
                    +review.eatery_id
                    +'/review/'
                    +review.id
                    +'/flag',{
                         method: 'PUT',
                         headers: {
                         'Content-type': 'application/json'
                    },
                    body:JSON.stringify(body)
               }).then((response)=>{return response.json()});
            
          }
		  
		  /* ---VARIABLE---
          stars; contains the number of stars for the review
          */  
          var stars = [];
          for (var i = 0; i < review.rating; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
               stars.push(<StarIcon key={i} />);
          }
          if(review.flag){
               return null;
          }
          return(<Container className="review" key={review.id} maxWidth="sm">{stars}{review.review_text}
          <FlagReview handleReviewFlag={handleReviewFlag}/></Container>);
     })
     return(
          <div className="AllReviews">
               <h2>Reviews</h2>
               {reviews}
          </div>
     )
}
export default AllReviews;
