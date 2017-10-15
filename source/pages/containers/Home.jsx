import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';
import api from '../../api.js';
import styles from './Page.css';
import actions from '../../actions.js'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      posts: props.posts || [],
      page: props.page || 1,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  async componentDidMount() {
    this.initialFetch();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnMount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFetch() {

      const posts = await api.posts.getList(this.props.page);
      this.props.dispatch(
        actions.setPost(posts),
      );
      this.setState({
        loading: false
      });
    }
  handleScroll(){
    if(this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if(!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null
    }
    return this.setState({ loading: true }, async () => {
      try {
        const posts = await api.posts.getList(this.props.page);
        this.props.dispatch(
          actions.setPost(posts),
        );
        this.setState({
          loading: false
        });
      } catch (error) {
        this.setState({
          loading: false
        });
      }
    })

  }

  render(){
    console.log(this.props);
    return(
      <section name="Home" className={styles.section}>

        <section className={styles.list}>
        {this.state.loading && (
          <Loading />
        )}
        {this.props.posts
          .map(post => <Post
             key={post.id}
             {...post} />)
        }


        </section>

      </section>
    )
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
  posts: PropTypes.array.isRequired,
  page: PropTypes.number,
};
function mapStateToProps(state) {
  return {
    posts: state.posts.entities,
    page: state.posts.page,
  };
}

export default connect(mapStateToProps)(Home);
