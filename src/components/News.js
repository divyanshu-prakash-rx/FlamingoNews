import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    articles = [

    ]
    constructor() {
        super()
        this.state = {
            articles: this.articles,
            loading: true,
            page: 1,
            totalResults: 20
        }
    }

    async componentDidMount() {
        // let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=c647dad12d3f4a21a2f4d9836fbf7df5&page=1&pageSize=20";
        let url = "https://mocki.io/v1/95b7f0e8-b3a1-484d-a1e2-2940da654054";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })
    }

    handleNextClick = async () => {
        console.log("Next")
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        }
        else {

            // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=c647dad12d3f4a21a2f4d9836fbf7df5&page=${this.state.page+1}&pageSize=20`;
            let url = "https://mocki.io/v1/95b7f0e8-b3a1-484d-a1e2-2940da654054";
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })

        }
    }
    handlePrevClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=c647dad12d3f4a21a2f4d9836fbf7df5&page=${this.state.page-1}&pageSize=20`;
        let url = "https://mocki.io/v1/95b7f0e8-b3a1-484d-a1e2-2940da654054";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })

    }
    render() {
        return (
            <>
                <div className='container my-3' style={{ color: "wheat" }}
                >
                    <h1 className='text-center' >Todays-Headline</h1>
                    <hr style={{ border: "1px solid wheat", opacity: "100%" }} />

                    <div className='row '>
                        {this.state.articles.map((element) => {

                            return <div className='col-md-4 d-flex justify-content-center' key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage ? element.urlToImage : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKq5qhLJDxPYGGpvRQhaDe13d11B2vXicq7g&usqp=CAU"} newsUrl={element.url} />
                            </div>
                        })}

                    </div>
                    <hr style={{ border: "1px solid wheat", opacity: "100%" }} />
                    <div className='container d-flex justify-content-between'>
                        <a href='#Title'>   <button disabled={this.state.page <= 1} className="btn btn-primary m-3" onClick={this.handlePrevClick}>&larr; Previous Page</button></a>
                        <a href='#Title'>   <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} className="btn btn-primary m-3" onClick={this.handleNextClick} >Next Page &rarr;</button></a>
                    </div>
                </div>

            </>
        )
    }
}
