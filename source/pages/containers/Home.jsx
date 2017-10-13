import React, { Component } from 'react';


import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';
import api from '../../api.js';
import styles from './Page.css';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      posts: [],
      loading: true,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }
  async componentDidMount() {
    const posts = await api.posts.getList(this.state.page);

    this.setState({
      posts,
      page: this.state.page + 1,
      loading: false,
    })
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnMount(){
    window.removeEventListener('scroll', this.handleScroll);
    const scrolled = window.scrollY;
  }


  handleScroll(event){
    if(this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if(!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null
    }

    this.setState({loading: true}, async () => {
      try {
        const posts = await api.posts.getList(this.state.page);

        this.setState({
          posts: this.state.posts.concat(posts),
          page: this.state.page + 1,
          loading: false,
        })
      } catch (error){
        this.setState({loading: false});
      }
    })
  }

  render(){
    return(
      <section name="Home" className={styles.section}>

        <section className={styles.list}>
          {this.state.loading && (
            <Loading />
          )}
          {this.state.posts
            .map(post => <Post key={post.id} {...post} />)}
        </section>

      </section>
    )
  }
}

export default Home;
