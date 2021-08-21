import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, Box, Typography, Link } from '@material-ui/core/';

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
                            <Box borderBottom={2}>
                                <Typography>K8S</Typography>
                            </Box>
                            <Box>
                                <Link
                                    href="https://kubernetes.io/docs/tasks/tools/"
                                    color="inherit"
                                >
                                    <Typography>How to install K8S?</Typography>
                                </Link>
                            </Box>
                            <Box>
                                <Link
                                    href="https://www.weave.works/blog/6-business-benefits-of-kubernetes"
                                    color="inherit"
                                >
                                    <Typography>
                                        Benefits for business
                                    </Typography>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={2}>
                                <Typography>Docker</Typography>
                            </Box>
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
                                <Link
                                    href="https://www.bmc.com/blogs/kubernetes-vs-docker-swarm/#:~:text=Kubernetes%20focuses%20on%20open%2Dsource,deploy%20and%20easy%20to%20manage."
                                    color="inherit"
                                >
                                    <Typography>K8S or Swarm</Typography>
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Box borderBottom={2}>
                                <Typography>CI/CD</Typography>
                            </Box>
                            <Box>
                                <Link
                                    href="https://www.infoworld.com/article/3271126/what-is-cicd-continuous-integration-and-continuous-delivery-explained.html"
                                    color="inherit"
                                >
                                    <Typography>What is it?</Typography>
                                </Link>
                            </Box>
                            <Box>
                                <Link
                                    href="https://docs.github.com/en/actions/guides/setting-up-continuous-integration-using-workflow-templates"
                                    color="inherit"
                                >
                                    <Typography>Github Actions</Typography>
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
