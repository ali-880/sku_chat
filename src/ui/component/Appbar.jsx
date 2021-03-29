import { AppBar, Button, Hidden, makeStyles, Toolbar, Typography } from '@material-ui/core'
import React from 'react'
import SearchBar from "material-ui-search-bar";
const useStyle = makeStyles((theme) => {
    return {
        root: {
            backgroundColor: '#2f3542',
            padding: 10
        },
        toolbar: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        btn:{
            color:'white',
            borderColor:'white'
        },
        header:{
            fontWeight:'bold'
        }
    }
})
const AppbarPage = () => {
    const classes = useStyle();
    return (
        <AppBar position='sticky' className={classes.root} >
            <Toolbar className={classes.toolbar}>
                <div className={classes.toolbar}>
                    <img src={process.env.PUBLIC_URL + '/img/WebBanner1.png'} style={{ width: 160, height: 40 }} />
                </div>
                <Hidden smDown>
                <Typography className={classes.header} variant='h6'>سایت چت دانشگاه شهرکرد</Typography>

                </Hidden>
                <Button variant='outlined' className={classes.btn}><Typography variant='subtitle1'>خروج از حساب کاربری</Typography></Button>
            </Toolbar>
        </AppBar>
    );
}

export default AppbarPage;