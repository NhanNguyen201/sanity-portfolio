import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllBlogs } from '../redux/actions/blogActions';
import dayjs from 'dayjs';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './style.css'

const Blogs = ({ getAllBlogs, blogs, dataLoading }) => {

    useEffect(() => {
        getAllBlogs()
        // eslint-disable-next-line
    }, [])

    const blogsMarkup = dataLoading 
        ? (<>Loading...</>)
        : (<Grid container spacing={2}>
            {blogs.map(blog => (
                <Grid item xs={12} md={4} key={blog.slug.current}>
                    <Card >
                        <CardActionArea>
                        <CardMedia
                                image={blog.mainImage.asset.url}
                                title={blog.mainImage.alt}
                                style={{height: "250px"}}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5">{blog.title}</Typography>
                                <Typography gutterBottom variant="subtitle2">{dayjs(blog.publishedAt).format('HH:mm:ss DD/MM/YYYY')}</Typography>

                            </CardContent>
                        </CardActionArea>
                        <CardActions
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                alignItems: "center"
                            }}
                        >
                            <Button size="medium" color="primary" variant="outlined" component={Link} to={`/blog/${blog.slug.current}`} >
                                Read
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>)
    return (
        <main className='page-container mg-auto pt-80'>
            <Typography variant="h4">These are my blogs: </Typography>
            <br/>
            {blogsMarkup}
        </main>
    )
}

const mapStateToProps = state => ({
    dataLoading: state.data.loading,
    blogs: state.data.blogs
})
export default connect(mapStateToProps, { getAllBlogs })(Blogs);
