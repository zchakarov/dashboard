import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function News() {
    const [news, setNews] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 8;
    const pagesVisited = pageNumber * usersPerPage;
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
    const pageCount = Math.ceil(news.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

        return (
            <>
                <Container className="news--container p-0 m-0" fluid>
                    <Row className="m-0">
                        <Col className="py-3" xs={12}>
                            <h2 className="m-0 news--headline">Aktuelle Nachrichten</h2>
                        </Col>
                        {news.slice(pagesVisited, pagesVisited + usersPerPage).map((article, index) => {
                            let tag = new Date(article.meta.pubDate)
                            let bildUrl = new URL(article.image.src);
                            bildUrl.searchParams.set('q', 10);
                            bildUrl.searchParams.set('width', 1024);
                            return (
                                <Col key={index} className="single--article p-2" xs={12} sm={6} md={6} lg={3}>
                                    <Link className="single--article--link" to={`/${article.id}`}>
                                        <div className="single--article--container">
                                            <div className="single--article--header">
                                                <img src={bildUrl} className="img-fluid" alt={article.image.alt}/>
                                                <div className="single--article--header--meta">
                                                    <p className="m-3 mt-4">{tag.toLocaleDateString()}</p>
                                                    <h5><b>{article.title}</b></h5>

                                                </div>
                                            </div>

                                        </div>

                                    </Link>
                                </Col>
                            )
                        })}
                        <Col>
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                pageCount={pageCount}
                                onPageChange={changePage}
                                containerClassName={"paginationBttns"}
                                previousLinkClassName={"previousBttn"}
                                nextLinkClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </Col>
                    </Row>

                </Container>
            </>

        )
}
