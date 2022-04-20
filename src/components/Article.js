import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {scrolltop} from "./scrollTop";

import axios from "axios";
export default function Article() {
    const { id } = useParams();
    const [article, setArticle] = useState([]);
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(true)
    const [datum, setDatum] = useState();
    const [image, setImage] = useState();
    const navigate = useNavigate();

    const getArticle = async () => {
        const newsFeed = await axios.get(`https://www.heise.de/extras/frontend/news/${id}`, {    method: 'GET',
            headers: {
                "X-Heise-Token": 'zcJulkgE'
            },})
            .catch(function () {
                setError(true)
        });
        setFetching(false);
        setArticle(newsFeed.data);
        let bildUrl = new URL(newsFeed.data.image.src);
        let tag = new Date(newsFeed.data.meta.pubDate)

        bildUrl.searchParams.set('q', 90);
        bildUrl.searchParams.set('width', 800);
        setImage(bildUrl);
        setDatum(tag.toLocaleDateString());
    }
    useEffect(()=> {
        getArticle();
    }, [setArticle])
    useEffect(()=> {
        scrolltop();
        if(article.length === 0 && fetching === false) {
            navigate("/404");
        }
        else {
            document.title= article.title;
        }
    }, [fetching, error])
    return (

         <div className="article m-0">
             {
                 article.id > 0 &&
                 <div className="m-0">
                 <div className="article--container container my-5">
                     <div
                         className="article--container--header row flex-column justify-content-center align-items-center">
                         <Col xs={12} md={8} lg={6}>
                             <p onClick={() => navigate(`/`)} className="link m-0 align-self-center">zurück</p>
                             <h2>{article.title}</h2>
                             <p>veröffentlicht von {article.meta && article.meta.author} am {datum}</p>
                         </Col>
                         <Col xs={12} md={8} lg={8}>
                             <img src={image} className="img-fluid" alt={article.image.alt}/>
                         </Col>
                     </div>
                     <div className="article--container--body">
                         <Row className="justify-content-center">
                             <Col xs={10} md={8}>
                                 <p className="text-left">{article && article.content}</p>
                             </Col>
                         </Row>
                     </div>
                 </div>
                 </div>
             }
        </div>
    )
}
