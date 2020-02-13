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
1/20/20: Annysia Dupaya - Created component, linked with other components
1/25/20: Annysia Dupaya - Integrated API
1/29/20: Dylan Bayona - Reviewed code
2/6/20: Annysia Dupaya - Added ToastContainer
2/12/20: Dylan Bayona - Reviewed code

---ABOUT---
File creation date: 1/20/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component acts as the main starting point for the other components. 
This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/
import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
import Landing from './Landing'
import Navbar from './Navbar';
import AddEatery from './AddEatery';
import AllEateries from './AllEateries';
import Footer from './Footer';

class Main extends Component{
    /* ---METHOD---
    Name: constructor
    Routine creation date: 1/20/20
    Purpose of the routine: Sets default values for properties of this object
    List of calling arguments: props
    List of required files/database tables: N/A
    Return value: N/A
    */    
    constructor (props){
        super(props);
        this.state={
            eateries:[]
        };  
        this.handleEaterySubmit = this.handleEaterySubmit.bind(this)
        this.addNewEatery = this.addNewEatery.bind(this)
        this.flagCheck = this.flagCheck.bind(this)

    }
    flagCheck(){
        console.log("iscalled");
        window.location.reload(true);
    }
    /* ---METHOD---
    Name: handleEaterySubmit
    Routine creation date: 1/20/20
    Purpose of the routine: Provides functionality to get eatery information from backend
    List of calling arguments: name, address, contact
    List of required files/database tables: Eatery
    Return value: JSON response
    */
    handleEaterySubmit(name, address, contact){
        /* ---VARIABLE---
        body; contains the name, address, and contact info of the eatery 
        */
        let body = {name:name, address:address, contact:contact};
        fetch('http://localhost:5000/eatery/add',{
            method: 'POST',
            body: JSON.stringify(body)

        }).then((response)=>{return response.json()})
        .then((eatery)=>{
            this.addNewEatery(eatery)
        })
        
    }

    
    /* ---METHOD---
    Name: addNewEatery
    Routine creation date: 1/20/20
    Purpose of the routine: Provides functionality to add new eatery to databse
    List of calling arguments: eatery
    List of required files/database tables: N/A
    Return value: N/A
    */    
    addNewEatery(eatery){
        this.setState({
            eateries: this.state.eateries.concat(eatery)
        })
    }
    
    /* ---METHOD---
    Name: componentDidMount
    Routine creation date: 1/20/20
    Purpose of the routine: Provides functionality to add new eatery to databse
    List of calling arguments: N/A
    List of required files/database tables: N/A
    Return value: JSON response
    */
    async componentDidMount(){
       await fetch('http://localhost:5000/eatery')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ eateries: data }) });
    }
    
    /* ---METHOD---
    Name: render
    Routine creation date: 1/20/20
    Purpose of the routine: Provides functionality to render page
    List of calling arguments: N/A
    List of required files/database tables: N/A
    Return value: rendered page
    */    
    render(){
        return (
            <div className="Main">
                <Router>
                    <Navbar/>
                    <Switch>
                        <Route exact path="/" component={Landing}/>
                        <Route path="/eatery">
                            <AllEateries flagCheck = {this.flagCheck} eateries={this.state.eateries}/>
                        </Route>
                        <Route path="/add-eatery">
                            <AddEatery handleEaterySubmit={this.handleEaterySubmit}/>
                        </Route>
                    </Switch>
                    <Footer/>
                </Router>
            </div>
        )
    }
}
export default Main
