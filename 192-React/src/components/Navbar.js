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
1/21/20: Annysia Dupaya - Added styling
1/25/20: Annysia Dupaya - Fixed routes

---ABOUT---
File creation date: 1/20/20
Development Group: Group 1 - RUPE
Client Group: Ma. Rowena C. Solamo
This React.js component is for the styling and placement of the navigation bar.
This software's overall purpose is to provide a clean frontend for our system, RUPE.
*/
import React from 'react';
import {
  Link
} from "react-router-dom";
import { fade, makeStyles } from '@material-ui/core/styles';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import grey from '@material-ui/core/colors/grey';

/* ---METHOD---
Name: useStyles
Routine creation date: 1/20/20
Purpose of the routine: Used to apply styles to this component
List of calling arguments: theme
List of required files/database tables: N/A
Return value: N/A
*/
const useStyles = makeStyles(theme => ({
    grow: {
      flexGrow: 1
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
      },
      sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
      },
      sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      },
}));

/* ---METHOD---
Name: Navbar
Routine creation date: 1/20/20
Purpose of the routine: Used to apply styles and placement to navbar
List of calling arguments: N/A
List of required files/database tables: N/A
Return value: rendered navbar
*/
export default function Navbar() {
    /* ---VARIABLE---
    classes; holds useStyles variable
    */    
    const classes = useStyles();
  
    /* ---VARIABLE---
    anchorEl; contains anchor
    setAnchorEl; used to change anchor
    */    
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    /* ---VARIABLE---
    mobileMoreAnchorEl; contains mobile anchor
    setmobileMoreAnchorEl; used to change mobile anchor
    */      
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    /*const isMenuOpen = Boolean(anchorEl); */
  
    /* ---VARIABLE---
    isMobileMenuOpen; holds boolean value 
    */  
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    
    /* ---VARIABLE---
    mobileMenuId; holds mobile menu ID
    */      
    const mobileMenuId = 'primary-search-account-menu-mobile';
  
    /* ---METHOD---
    Name: handleMobileMenuOpen
    Routine creation date: 1/20/20
    Purpose of the routine: Handles event where menu is opened on mobile
    List of calling arguments: N/A
    List of required files/database tables: N/A
    Return value: rendered menu
    */    
    const handleMobileMenuOpen = event => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    /* ---METHOD---
    Name: handleMobileMenuClose
    Routine creation date: 1/20/20
    Purpose of the routine: Handles event where menu is closed on mobile
    List of calling arguments: N/A
    List of required files/database tables: N/A
    Return value: rendered menu
    */      
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    /* ---METHOD---
    Name: renderMobileMenu
    Routine creation date: 1/20/20
    Purpose of the routine: Renders menu on mobile
    List of calling arguments: N/A
    List of required files/database tables: N/A
    Return value: rendered menu
    */      
    const renderMobileMenu = (
      <Menu anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
            <Typography component={Link} to='/eatery' style={{textDecoration:'none'}} color="inherit">
              Show Eateries
            </Typography>
        </MenuItem>  
        <MenuItem>
            <Button component={Link} to='/add-eatery' style={{backgroundColor:orange[500], color:grey[50]}}>Add Eatery</Button>
        </MenuItem>  
      </Menu>
    )

    return(
        <div className = {classes.grow}>
            <Appbar position='static' style={{ backgroundColor: red[500] }}>
                <Toolbar>
                    <Typography style={{textDecoration:'none'}} component ={Link} to='/' className='title'
                        variant="h6" color="inherit" noWrap>
                        <strong>RUPE</strong>
                    </Typography>  
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>   
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.sectionDesktop}>
                      <MenuItem>
                          <Typography component={Link} to='/eatery' style={{textDecoration:'none'}} color="inherit">
                              Show Eateries
                          </Typography>
                      </MenuItem>  
                      <MenuItem>
                          <Button component={Link} to='/add-eatery' style={{backgroundColor:orange[500], color:grey[50]}}>Add Eatery</Button>
                      </MenuItem>
                    </div>
                     
                    <div className={classes.sectionMobile}>
                      <IconButton
                        aria-label="show more"
                        aria-controls={mobileMenuId}
                        aria-haspopup="true"
                        onClick={handleMobileMenuOpen}
                        color="inherit"
                      >
                        <MoreIcon />
                      </IconButton>
                    </div>
                </Toolbar>        
            </Appbar>
            {renderMobileMenu}
        </div>

    )
}
