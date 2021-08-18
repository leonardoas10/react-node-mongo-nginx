import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fab, Fade, Backdrop, TextField } from '@material-ui/core/';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #3f51b5',
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    title: {
        margin: '0.5rem 0 1.5rem 0',
    },
    TextField: {
        textTransform: 'capitalize',
    },
    SaveIcon: {
        margin: '0px 8px',
    },
}));

const CustomModalEdit = ({ content, open, handleModal, title, handleEdit }) => {
    const classes = useStyles();
    const [payload, setPayload] = useState({});

    useEffect(async () => {
        try {
            if (open) {
                await Object.keys(content).map(async (keyName, i) => {
                    setPayload((prevState) => ({
                        ...prevState,
                        [keyName]: content[keyName],
                    }));
                });
            }
        } catch (error) {
            console.error('Error CustomModalEdit useEffect() => ', error);
        }
    }, [open]);

    const handleInput = (e) => {
        try {
            setPayload((prevState) => ({
                ...prevState,
                [e.target.name]: e.target.value,
            }));
        } catch (error) {
            console.error('handleInput() => ', error);
        }
    };

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <Typography
                        className={classes.title}
                        variant="h5"
                        align="center"
                    >
                        {title}
                    </Typography>
                    {Object.keys(payload).map((keyName, i) => {
                        if (keyName !== '_id') {
                            return (
                                <TextField
                                    key={i}
                                    label={keyName}
                                    variant="outlined"
                                    onChange={handleInput}
                                    name={keyName}
                                    value={payload[keyName]}
                                    className={classes.TextField}
                                />
                            );
                        }
                    })}
                    <Fab
                        className={classes.SaveIcon}
                        color="secondary"
                        aria-label="edit"
                        onClick={() => handleEdit(payload)}
                    >
                        <SaveIcon />
                    </Fab>
                </div>
            </Fade>
        </Modal>
    );
};

export default CustomModalEdit;
