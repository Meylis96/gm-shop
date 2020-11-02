import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails } from '../actions/productActions';

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    useEffect(() => {
        if(!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
        } else {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
        }
        // eslint-disable-next-line
    }, [dispatch, history, productId, product]);

    const submitHandler = e => {
        e.preventDefault();
        // UPDATE PRODUCT
    }

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3">Назад</Link>

            <FormContainer>
                <h1>Редактирование товара</h1>
                {loading ? <Loader></Loader> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandler}>

                        <Form.Group controlId="name">
                            <Form.Label>Название товара</Form.Label>
                            <Form.Control 
                                type="name"
                                placeholder="Введите название товара"
                                value={name}
                                onChange={(e) => setName(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
    
                        <Form.Group controlId="price">
                            <Form.Label>Стоимость товара</Form.Label>
                            <Form.Control 
                                type="number"
                                placeholder="Введите стоимость товара"
                                value={price}
                                min="0"
                                onChange={(e) => setPrice(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
    
                        <Form.Group controlId="image">
                            <Form.Label>Изображение товара</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Введите ссылку на изображение"
                                    value={image}
                                    onChange={(e) => setImage(e.target.value)}>
                                </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="brand">
                            <Form.Label>Название бренда</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Введите название бренда"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}>
                                </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Категория товара</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Введите название категории"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}>
                                </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Описание товара</Form.Label>
                                <Form.Control 
                                    type="text"
                                    placeholder="Введите описание товара"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}>
                                </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="countinstock">
                            <Form.Label>Количество товара</Form.Label>
                                <Form.Control 
                                    type="number"
                                    placeholder="Введите количество товара"
                                    value={countInStock}
                                    min="0"
                                    onChange={(e) => setCountInStock(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
    
                        <Button type="submit" varient="primary">Обновить</Button>
                    </Form>
                )}
        </FormContainer>
        </>
    )
}

export default ProductEditScreen;
