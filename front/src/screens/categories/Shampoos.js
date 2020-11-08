import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../components/Product';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../../actions/productActions';
import { Link } from 'react-router-dom';

const Shampoos = ({match}) => {

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
            {loading 
                ? ( <Loader/> )
                : error
                ? ( <Message varient="danger">{error}</Message> ) 
                : 
            (
                <>
                <Link className="btn btn-secondary" to="/category">
                    К категориям
                </Link>
                <Row>
                    <h2>Шампуни</h2>
                </Row> 
            
            <Row>
                {products.map((product) => 
                    (
                        <Col style={{display: product.category === 'Шампуни' ? 'block' : 'none'}} sm={4} md={2} lg={3} key={product._id}>
                            {product.category === 'Шампуни' && <Product product={product}/>}
                        </Col>
                    )
                )}
            </Row> 
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
            </>
            )
        }
        </>
    )
};

export default Shampoos;