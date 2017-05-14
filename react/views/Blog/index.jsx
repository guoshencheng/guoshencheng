import React from 'react';
import ReactMarkDown from 'react-markdown';
import { connect } from 'react-redux';
import pathToRegexp from 'path-to-regexp';
import { bindActionCreators } from 'redux';
import * as articleActions from '../../scripts/actions/article.js'
var hljs = window.hljs;

import './style.scss';

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    this.highlightCode();
  }
  componentDidMount() {
    let { location, actions } = this.props;
    let params = pathToRegexp('/blog/:id').exec(location.pathname);
    var id = params[1];
    actions.getArticle(id);
  }

  highlightCode() {
    const domNode = ReactDOM.findDOMNode(this);
    const nodes = domNode.querySelectorAll('pre code');

    let i;
    for (i = 0; i < nodes.length; i++) {
        hljs.highlightBlock(nodes[i]);
    }
  }

  render() {
    const { RM, article } = this.props;
    return (
      <div id="blog">
        <div className="blog_container">
          <ReactMarkDown ref="blog" source={ RM }></ReactMarkDown>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.article.article,
    RM: state.article.RM
  }
}

const mapActionToProps = (dispatch) => {
  return {
    actions: bindActionCreators(articleActions, dispatch)
  }
}

export default connect(mapStateToProps, mapActionToProps)(Blog);
