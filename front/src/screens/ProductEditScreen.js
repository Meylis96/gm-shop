import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;

    const productUpdate = useSelector(state => state.productUpdate);
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET});
            history.push('/admin/productlist');
        } else {
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
        }
        // eslint-disable-next-line
    }, [dispatch, history, productId, product, successUpdate]);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data);
            setUploading(false);
        } catch (e) {
            console.error(e);
            setUploading(false);
        }
    }

    const submitHandler = e => {
        e.preventDefault();
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            brand,
            category,
            description,
            countInStock,
            image
        }))
    }

    return (
        <>
            <Link to="/admin/productlist" className="btn btn-light my-3">Назад</Link>

            <FormContainer>
                <h1>Редактирование товара</h1>
                {loadingUpdate && <Loader/>}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                                <Form.File id="image-file" label="Выберите файл" custom onChange={uploadFileHandler}></Form.File>
                                {uploading && <Loader/>}
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
