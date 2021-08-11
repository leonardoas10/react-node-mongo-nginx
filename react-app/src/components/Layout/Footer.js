import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    FixedFooter: {
        textAlign: 'center',
        padding: '20px',
        position: 'fixed',
        left: '0',
        bottom: '0',
        height: '140px',
        width: '100%',
    },
});

const Footer = () => {
    const classes = useStyles();
    return (
        <>
            <Box
                px={{ xs: 3, sm: 10 }}
                py={{ xs: 5, sm: 5 }}
                bgcolor="#3f51b5"
                color="white"
                className={classes.FixedFooter}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={2}>K8S</Box>
                            <Box>
                                <Link
                                    href="https://kubernetes.io/docs/tasks/tools/"
                                    color="inherit"
                                >
                                    <Typography>How to install K8S?</Typography>
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    <Typography>Roll</Typography>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={2}>Docker</Box>
                            <Box>
                                <Link
                                    href="https://docs.docker.com/desktop/"
                                    color="inherit"
                                >
                                    <Typography>
                                        How to install Docker?
                                    </Typography>
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    <Typography>Roll</Typography>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={2}>Academind</Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    <Typography>Roll</Typography>
                                </Link>
                            </Box>
                            <Box>
                                <Link href="/" color="inherit">
                                    <Typography>Roll</Typography>
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign="center">
                        <h3>
                            Leonardo Aranguren S &reg;{' '}
                            {new Date().getFullYear()}
                        </h3>
                        <h3>Technical Lead - Full Stack Developer</h3>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Footer;
