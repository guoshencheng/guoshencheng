import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ArticleActions from '../../scripts/actions/article';
import ArticlePreviewItem from '../../components/ArticlePreviewItem/index.jsx';

require('./style.scss');

class Blogs extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { actions } = this.props;
    actions.getAllBlogs();
  }

  render() {
    let { articles } = this.props;
    return (
      <div id="articles_root_container">
        {articles.map(article => {
          return (<ArticlePreviewItem key={article.id} article={article} />)
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles
  }
}

const mapActionToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ArticleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapActionToProps)(Blogs);
