import React from 'react';
import ReactMarkDown from 'react-markdown';
import { connect } from 'react-redux';
import pathToRegexp from 'path-to-regexp';
import { bindActionCreators } from 'redux';
import moment from 'moment';
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
    nodes.forEach(node => {
      hljs.highlightBlock(node);
    })
  }

  render() {
    const { RM, article } = this.props;
    const getTimeString = (data) => {
      var date = new Date(parseInt(data));
      return moment(date).format("YYYY-MM-DD")
    }
    const time = article && article.time ? (getTimeString(article.time)) : "很久很久以前";
    return (
      <div id="blog">
        <div className="desc">{ time } </div>
        <div className="title">{ article && article.title ? article.title : "" }</div>
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
