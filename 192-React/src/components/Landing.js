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
1/22/20: Annysia Dupaya - Added some styling
1/30/20: Dylan Bayona - Reviewed code

---ABOUT---
File creation date: 1/20/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component is for the styling and placement of the landing page.
This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/
import React from 'react';
import '../stylesheets/Landing.css';
import Typography from '@material-ui/core/Typography'

/* ---METHOD---
Name: Landing
Routine creation date: 1/20/20
Purpose of the routine: Used to apply styles and placement to landing page
List of calling arguments: N/A
List of required files/database tables: N/A
Return value: rendered landing page
*/
export default function Landing() {
    return(
        <div className = 'Landing'>
            <div className='header'>
                <div className='text'>
                    <Typography component="h2" variant="h2">Find the best places to eat in UP Diliman.</Typography>
                    <Typography variant="subtitle1">Rate UP Eateries</Typography>
                </div>
                <div className='image'>
                    
                </div>
            </div>
        </div>
    )
}
