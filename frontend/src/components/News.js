import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Loading from './Loading';

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      pageSize: 10,
    };
  }

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    // const url = `http://localhost:5000/api/news/latest`;
       const url = `https://flamingonews-backed.onrender.com/api/news/latest`;

    this.setState({ loading: true });
    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      let newsData = await response.json();

      this.setState({
        articles: newsData,
        totalResults: newsData.length,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false });
    }
  };

  handleNextClick = () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.state.pageSize)) {
      this.setState({ page: this.state.page + 1 }, () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 }, () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  getPagedArticles = () => {
    const { page, pageSize, articles } = this.state;
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return articles.slice(startIndex, endIndex);
  };

  render() {
    const { loading, page, totalResults, pageSize } = this.state;
    const articlesForCurrentPage = this.getPagedArticles();

    return (
      <div className="container my-3" style={{ color: 'wheat' }}>
        <h1 className="text-center">Today's Headlines</h1>
        <hr style={{ border: '1px solid wheat', opacity: '100%' }} />
        {loading ? (
          <Loading />
        ) : (
          <div className="row">
            {articlesForCurrentPage && articlesForCurrentPage.length > 0 ? (
              articlesForCurrentPage.map((element) => (
                <div className="col-md-4 d-flex justify-content-center" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={
                      element.image!=="None"
                        ? element.image
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
        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            className="btn btn-primary m-3"
            onClick={this.handlePrevClick}
          >
            &larr; Previous Page
          </button>
          <button
            disabled={page * pageSize >= totalResults}
            className="btn btn-primary m-3"
            onClick={this.handleNextClick}
          >
            Next Page &rarr;
          </button>
        </div>
      </div>
    );
  }
}
