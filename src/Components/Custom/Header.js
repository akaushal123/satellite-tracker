import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Select from './Select';
import SatelliteIcon from '../../images/logo1.svg';
import {withStyles} from "@material-ui/core";

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
        background: "linear-gradient(315deg, #485461 0%, #28313b 74%)",
    },
    menuButton: {
        margin: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    }
});

class Header extends React.Component{

    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="sticky" className={classes.root}>
                    <Toolbar>
                        <Icon
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                        >
                            <Icon>
                                <img src={SatelliteIcon}  alt={"logo"} />
                            </Icon>
                        </Icon>
                        <Typography className={classes.title} variant="h4" noWrap>
                            {this.props.header}
                        </Typography>
                        <div className={classes.search}>
                            <Select selectedSatellite={this.props.selectedSatellite}/>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(useStyles)(Header);
