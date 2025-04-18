// import PropTypes from 'prop-types'
import React, { Component } from 'react'

export default class NewsItem extends Component {
  //   static propTypes = {second: third}

  render() {
    let { title, description, imageUrl, newsUrl } = this.props;

    return (
      <>
        <div className="card my-3 " style={{ width: "21rem" }}>
          <img src={imageUrl} className="card-img-top" alt="..." style={{height:"191px"}} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a href={newsUrl} className="btn btn-sm btn-dark" target='blank'>Read more</a>
          </div>
        </div>
      </>
    )
  }
}
