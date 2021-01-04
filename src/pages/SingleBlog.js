import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSanity from '../utils/useSanity';
import { connect } from 'react-redux';
import { getOneBlog } from '../redux/actions/blogActions';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper/Paper';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

import './style.css'

const builder = imageUrlBuilder(useSanity);
const urlFor = source => builder.image(source);

const SingleBlog = ({ getOneBlog, dataLoading, currentBlog, dataError }) => {
    const { slug } = useParams();
    useEffect(() => {
        getOneBlog(slug);
        // eslint-disable-next-line
    }, [slug])

    const blogMarkup = dataLoading 
        ? (<>Loading...</>)
        : ( dataError 
            ? (<>Error</>)
            : (!currentBlog
                ? (<>No blog</>)
                : ( <Paper elevation={3}>
                        <Grid container>
                            <Grid 
                                item
                                container
                                xs={12}
                                direction="column"
                                justify="center"
                                alignItems="center"
                                style={{
                                    backgroundImage: `url(${currentBlog.mainImage ? urlFor(currentBlog.mainImage.asset).url() : ""})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    height: "400px",
                                    marginBottom: 20
                                }}
                            >
                                <Grid item container xs={8} md={6}>
                                    <Grid item xs={12}>
                                        <Paper elevation={3} className="p-20">
                                            <Grid 
                                                container 
                                                spacing={2}
                                                direction="column"
                                                justify="center"
                                                alignItems="center"
                                            >   
                                                <Grid item xs={12} className="mb-40 p-20">
                                                    <Typography variant="h3">
                                                        {currentBlog.title}
                                                    </Typography>
                                                </Grid>
                                                <Grid item container xs={12}>
                                                    <Grid item xs={12}
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center"
                                                        }}
                                                    >
                                                        <img
                                                            src={urlFor(currentBlog.authorImage).url()}
                                                            alt={currentBlog.name}
                                                            style={{
                                                                height: 50,
                                                                width: 50,
                                                                borderRadius: "50%",
                                                                marginRight: 20
                                                            }}
                                                        />
                                                        <Typography variant="h6">
                                                            {currentBlog.name}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}></Grid>
                                </Grid>
                            </Grid>
                            
                            <Grid item xs={12} style={{overflow: "hidden"}} className="p-20">
                                <BlockContent blocks={currentBlog.body} projectId="yv85zcap" dataset="production"/>
                            </Grid>
                        </Grid>
                    </Paper> 
                )
            )
        )
    return (
        <main className="page-container mg-auto pt-80">
            {blogMarkup}
        </main>
    )
}
const mapStateToProps = state => ({
    currentBlog: state.data.singleBlog,
    dataLoading: state.data.loading,
    dataError: state.data.error
})
export default connect(mapStateToProps, { getOneBlog })(SingleBlog);

