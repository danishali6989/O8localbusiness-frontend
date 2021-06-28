import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import { CardHeader } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit'
// import Gird from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { fetchRoleList } from 'generic'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        display: 'inline-block',
        marginTop: 20,
        padding: 5,
        spacing: 1,
        marginBottom: 10
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    newcss: {
        marginTop: -30
    },
});

export const NewCard = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const dispatch = useDispatch();
    const [addrole, setAddrole] = useState([]);

    useEffect(() => {
        DataAdd();
    }, [])

    const DataAdd = async () => {
        const result = await dispatch(fetchRoleList());
        console.log('result', result.payload)
        if (result) {
            setAddrole(result.payload)
        }
    }


    // const Newdata = [
    //     { Rollname: "David", RollId: "1" },
    //     { Rollname: "Farces", RollId: "2", },
    //     { Rollname: "Androuse", RollId: "3" },
    //     { Rollname: "Icfons", RollId: "4" }
    // ]



    return (
        <>

            {addrole.map((item, index) => {
                return (

                    <Grid key={index} className={classes.root} >
                        <Card variant="outlined">
                            <CardHeader
                                action={
                                    <IconButton
                                        edge="start"
                                        aria-label="open drawer"
                                        variant="contained" color="primary"
                                    >
                                        <Edit />
                                    </IconButton>
                                }
                            />
                            <CardContent className={classes.newcss}  >
                                <Typography variant="h5" component="h2">
                                    Role ID:{item.keyInt}
                                </Typography>
                                <Typography className={classes.pos} color="textSecondary">
                                    Role Name:{item.value}
                                </Typography>

                            </CardContent>

                        </Card>
                    </ Grid >



                )
            })}

        </>
    )
}


