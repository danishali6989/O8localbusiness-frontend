import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export const Updatemodelbox = ({classes,updatebox}) => {
    console.log("classes",classes)
    return (
        <div>
            <Dialog open={updatebox} aria-labelledby="form-dialog-title" style={{ padding: 20 }}>
                <DialogTitle id="form-dialog-title">Add </DialogTitle>


                <DialogContent>
                    <form noValidate autoComplete="off" style={{ marginRight: 20 }}>
                        <TextField className={classes.formControl}
                            id="outlined-basic" label="Screen Name"
                            variant="outlined"
                        />

                        <TextField className={classes.formControl}
                            id="outlined-basic" label="Screen Code"
                            variant="outlined"
                        />


                        <div className={classes.root} style={{ display: "flex", marginLeft: 300 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            // onClick={onSubmit}
                            >
                                Add
                            </Button>

                            <Button
                                style={{ background: "#f21505", color: "#f5fafa" }}
                                variant="contained"
                            // color="#f5fafa"
                            // onClick={handleClose}
                            >
                                Close
                            </Button>

                        </div>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    )
}
