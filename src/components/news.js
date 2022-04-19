import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
export default function News() {
    const [news, setNews] = useState([]);

    const getNews = async () => {
        const newsFeed = await axios.get('https://www.heise.de/extras/frontend/news', {    method: 'GET',
            headers: {
                "X-Heise-Token": 'zcJulkgE'
            },});
        setNews(newsFeed.data);
    }
    useEffect(()=> {
        getNews();
    }, [])


        return (
            <>
                <Container className="news--container p-0 m-0" fluid>
                    <Row className="m-0">
                        {news.map((article, index) => {
                            let tag = new Date(article.meta.pubDate)
                            let bildUrl = new URL(article.image.src);
                            bildUrl.searchParams.set('q', 10);
                            bildUrl.searchParams.set('width', 1024);
                            return (
                                <Col key={index} className="article p-2" xs={12} sm={6} md={4} lg={3}>
                                    <Link className="article--link" to={`/${article.id}`}>
                                        <div className="article--header">
                                            <img src={bildUrl} className="img-fluid" alt={article.image.alt}/>
                                            <h4 className="m-3 mt-4"><b>{article.title}</b></h4>
                                        </div>
                                        <h5>{tag.toLocaleDateString()}</h5>
                                    </Link>
                                </Col>
                            )
                        })}

                    </Row>
                </Container>
            </>

        )
}
