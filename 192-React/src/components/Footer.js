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
1/27/20: Annysia Dupaya - Created component
2/5/20: Annysia Dupaya - Added styling
2/12/20: Dylan Bayona - Reviewed code

---ABOUT---
File creation date: 1/20/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component creates the footer of the webpage. 
This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/

import React from 'react';
import '../stylesheets/Footer.css';

/* ---METHOD---
Name: Footer
Routine creation date: 1/20/20
Purpose of the routine: creates the footer
List of calling arguments: N/A
List of required files/database tables: N/A
Return value: Rendered page
*/
export default function Footer(){
    return(
        <div className="Footer">
            Copyright Bayona, Dupaya, Villaluz 2020 
        </div>
    )
}
