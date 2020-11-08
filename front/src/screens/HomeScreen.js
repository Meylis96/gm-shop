import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import Meta from '../components/Meta';


const HomeScreen = ({match, history}) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, pages, page } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
        // eslint-disable-next-line
    }, [dispatch, keyword, pageNumber]);


    return (
        <>
            <Meta/>
            {loading 
                ? ( <Loader/> )
                : error
                ? ( <Message varient="danger">{error}</Message> ) 
                : 
            (
                <>
                {history.location.pathname === `/search/${keyword}` && <Link to="/" className="btn btn-light">На главную</Link>}
                <Row>
                    <h2>{history.location.pathname === `/search/${keyword}` ? `Запрос поиска: ${keyword}` : "Новые товары"}</h2>
                </Row> 
            
            <Row>
                {products.map((product) => 
                    (
                        <Col sm={4} md={2} lg={3} key={product._id}>
                            <Product product={product}/>
                        </Col>
                    )
                )}
                {products.length === 0 && <h6>По вашему запросу "{keyword}" ничего не найдено</h6>}
            </Row> 
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
            </>
            )
        }
        </>
    )
}

export default HomeScreen;


