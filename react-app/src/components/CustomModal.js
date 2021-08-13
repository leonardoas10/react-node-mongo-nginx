import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Fade, Backdrop, TextField } from '@material-ui/core/';

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
}));

const CustomModal = ({ content, open, handleModal, title }) => {
    const classes = useStyles();
    console.log('content => ', content);
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
                    <Typography variant="h4">{title}</Typography>
                    {Object.keys(content).map((keyName, i) => (
                        <TextField
                            id="outlined-basic"
                            label={keyName}
                            variant="outlined"
                            value={content[keyName]}
                        />
                    ))}
                </div>
            </Fade>
        </Modal>
    );
};

export default CustomModal;
