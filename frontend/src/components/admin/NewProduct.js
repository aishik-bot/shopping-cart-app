import React, {useState, useEffect} from 'react';
import MetaData from '../layout/MetaData';
import {useDispatch, useSelector} from 'react-redux';
import { newProduct, clearErrors } from '../../actions/productActions';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { useNavigate } from 'react-router-dom';

function NewProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState('');
    const [image, setImage] = useState('');
    const [images, setImages] = useState([]);

    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success } = useSelector(state => state.newProduct);

    useEffect(() => {

        if (error) {
            console.log(error);
            dispatch(clearErrors())
        }

        if (success) {
            navigate('/');
            alert('Product created successfully');
            dispatch({ type: NEW_PRODUCT_RESET })
        }

    }, [dispatch, alert, error, success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        setImages(images.push(image));

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);
        formData.set('images', images);

        dispatch(newProduct(formData))
    }
  return (
    <>
      <MetaData title={'New Product'}/>
      <div className="col-12 col-md-10">
        <div className="wrapper my-5">
            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                <h1 className="mb-4">Add New Product</h1>
                    <div className="form-group">
                        <label htmlFor="name_field">Name</label>
                        <input
                            type="text"
                            id="name_field"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price_field">Price</label>
                        <input
                            type="text"
                            id="price_field"
                            className="form-control"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description_field">Description</label>
                        <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="category_field">Category</label>
                        <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map(category => (
                                <option key={category} value={category} >{category}</option>
                            ))}

                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock_field">Stock</label>
                        <input
                            type="number"
                            id="stock_field"
                            className="form-control"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="seller_field">Seller Name</label>
                        <input
                            type="text"
                            id="seller_field"
                            className="form-control"
                            value={seller}
                            onChange={(e) => setSeller(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image_field">Image Url</label>
                        <input
                            type="text"
                            id="image_field"
                            className="form-control"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>

                    <button
                        id="login_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading ? true : false}
                    >
                        ADD
                    </button>
            </form>
        </div>
      </div>
    </>
  )
}

export default NewProduct
