import { home, about, blogs, SingleBlog } from './pages';
import { connect } from 'react-redux';

import useAlan from './utils/useAlan';
import { Route, Switch, useHistory } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import themeFile from './utils/theme';

const theme = createMuiTheme(themeFile);

function App({blogArray}) {
  let history = useHistory()
  console.log("history in app comp:", history)
  console.log("blogs in app comp:", blogArray)
  useAlan(history, blogArray);  
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar/>
      <Switch>
        <Route path="/about" component={about}/>
        <Route path="/blogs" component={blogs}/>
        <Route path="/blog/:slug" component={SingleBlog}/>
        <Route exact path="/" component={home}/>
      </Switch>
    </MuiThemeProvider>
  );
}
const mapStateToProps = state => ({
  blogArray: state.data.blogs
})
export default connect(mapStateToProps)(App);
