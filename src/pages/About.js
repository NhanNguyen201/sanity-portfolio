import { useEffect } from 'react';
import useSanity from '../utils/useSanity';

import { connect } from 'react-redux';
import { getMyInformation } from '../redux/actions/userActions';
import MyScene from '../components/heart/MyScene';
import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper/Paper';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Typography from '@material-ui/core/Typography/Typography';

import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

import './style.css'
const builder = imageUrlBuilder(useSanity);
const urlFor = source => builder.image(source);

const About = ({ userData, userLoading, userError, getMyInformation })  => {
    useEffect(() => {
        getMyInformation()
        // eslint-disable-next-line
    }, [])
    const aboutMarkup = userError 
        ? (<>There is some error</>)
        : (userLoading ? (<div style={{padding: 20}}>Loading...</div>) 
            : (
                <Grid item xs={12}>
                    <Paper style={{padding: 20}}>
                        <Grid container>
                            <Grid item xs={12}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}
                            >
                                <Avatar alt={userData.name} src={urlFor(userData.authorImage).url()} style={{marginRight: 20}}/>
                                <Typography variant="body1">{userData.name}</Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <BlockContent blocks={userData.bio} projectId="yv85zcap" dataset="production"/>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            )
        );
    return (
        <div className='page-container mg-auto pt-80'>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{height: 500}}>
                    <MyScene/>
                </Grid>
                {aboutMarkup}
            </Grid>
        </div>
    )
}
const mapStateToProps = state => ({
    userData: state.user.user,
    userLoading: state.user.loading,
    userError: state.user.error
})
export default connect(mapStateToProps, { getMyInformation })(About);

