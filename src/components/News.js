import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';

export default class News extends Component {
  articles = [];
  
  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
      totalResults: 0, 
    };
  }

  async componentDidMount() {
    this.fetchNews();
  }
  fetchNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=4405a6996dd84a05b17871799271ffb1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    try {
      let data = await fetch(url);
      let parsedData = await data.json();
      if (parsedData.articles) {
        this.setState({
          articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading: false,
        });
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false });
    }
  };

  handleNextClick = async () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.setState({ page: this.state.page + 1, loading: true }, this.fetchNews);
    }
  };

  handlePrevClick = async () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1, loading: true }, this.fetchNews);
    }
  };

  render() {
    return (
      <>
        <div className='container my-3' style={{ color: 'wheat' }}>
          <h1 className='text-center'>Today's Headlines</h1>
          <hr style={{ border: '1px solid wheat', opacity: '100%' }} />
          {this.state.loading ? (
            <Loading />
          ) : (
            <div className='row'>
              {this.state.articles && this.state.articles.length > 0 ? (
                this.state.articles.map((element) => (
                  <div className='col-md-4 d-flex justify-content-center' key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKq5qhLJDxPYGGpvRQhaDe13d11B2vXicq7g&usqp=CAU'
                      }
                      newsUrl={element.url}
                    />
                  </div>
                ))
              ) : (
                <p>No articles found</p>
              )}
            </div>
          )}
          <hr style={{ border: '1px solid wheat', opacity: '100%' }} />
          <div className='container d-flex justify-content-between'>
            <button
              disabled={this.state.page <= 1}
              className='btn btn-primary m-3'
              onClick={this.handlePrevClick}
            >
              &larr; Previous Page
            </button>
            <button
              disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
              className='btn btn-primary m-3'
              onClick={this.handleNextClick}
            >
              Next Page &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}
