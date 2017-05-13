import { Component } from 'react';
import { Link } from 'react-router-dom';

require('./style.scss');

class ArticlePreviewItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { article } = this.props;
    let path = `/blog/${article.id}`;
    return (
      <div className="article_preview_item" >
        <Link to={path} className="article_item_title">{ article.title }</Link>
        <p className="article_item_preview">{ article.desc }</p>
        <div className="article_item_info">
          <span className="article_item_time">发表于：很久以前</span>
          <span className="article_item_tag"> - 老文章</span>
        </div>
      </div>
    )
  }
}

export default ArticlePreviewItem;

