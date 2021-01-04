import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography/Typography'
import { NavLink } from 'react-router-dom';

import './Navbar.css'
const Navbar = ()  => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <NavLink to="/" exact={true} className="linkButton" activeClassName="activeButton">
                    <Typography variant="body1">Home</Typography>
                </NavLink>
                <NavLink to="/about" className="linkButton" activeClassName="activeButton">
                    <Typography variant="body1">About</Typography>
                </NavLink>
                <NavLink to="/blogs" className="linkButton" activeClassName="activeButton">
                    <Typography variant="body1">Blogs</Typography>
                </NavLink>
            </Toolbar>
      </AppBar>
    )
}

export default Navbar;