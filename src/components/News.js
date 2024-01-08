import React, { Component } from 'react'
import NewsItem from './NewsItem'

export default class News extends Component {
    render() {
        return (
            <>
                
                <div className='container my-3'>
                    <h1>Todays-Headline</h1>
                    <hr/>
                    <div className='row'>
                        <div className='col'>
                            <NewsItem />
                        </div>
                        <div className='col'>
                            <NewsItem />
                        </div>
                        <div className='col'>
                            <NewsItem />
                        </div>
                    </div>

                </div>

            </>
        )
    }
}
