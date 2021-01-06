import React, { useState,useCallback } from "react";
import {makeStyles} from "@material-ui/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import logo from "../../assets/img/icons/logo2.png"
import { useSelector,useDispatch } from "react-redux";
import { getIsSignedIn } from "../../reducks/users/userSlice"
import { useHistory } from "react-router-dom";
import {HeaderMenus,ClosableDrawer} from "./index"

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  menuBar: {
    backgroundColor: "#fff",
    color: "#444"
  },
  toolbar: {
    margin: "0 auto",
    maxWidth: 1024,
    width: "100%"
  },
  iconButtons: {
    margin: "0 0 0 auto"
  }
})
const Header: React.FC = () => {
    const classes = useStyles()

  const isSignedIn = useSelector(getIsSignedIn)
const history = useHistory()

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback((event :any) => {
    if (event.type === "keydown" || (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setOpen(!open)
  },[setOpen,open])

  return (
   <div className={classes.root}>
      <AppBar position="fixed" className={classes.menuBar}>
        <Toolbar className={classes.toolbar}>
          <img src={logo} alt="ec" width="128px" onClick={() => history.push("/")} />
          {isSignedIn && (
            <div className ={classes.iconButtons}>
              <HeaderMenus handleDrawerToggle={handleDrawerToggle}/>
            </div>

          )}
        </Toolbar>

      </AppBar>
      <ClosableDrawer open={open} onClose={handleDrawerToggle} />
    </div>
  )
}

export default Header
