import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layouts/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions/productActions';
import Product from './product/Product';
import Loader from './layouts/Loader';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export default function Home() {

    const dispatch = useDispatch();
    const params = useParams();

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

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState('');

    const { loading, products, error, productsCount, resPerPage, filterProductCount } = useSelector((state) => state.product);

    const keyword = params.keyword;

    useEffect(() => {

        dispatch(getProducts(keyword, currentPage, price, category, rating))

    }, [dispatch, error, currentPage, keyword, price, category, rating]);

    let count = productsCount;

    if (keyword) {
        count = filterProductCount;
    }

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title="Buy Best Product Online" />
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        <div className="px-5">
                                            <Range
                                                marks={{
                                                    1: '$1',
                                                    1000: '$1000',
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={value => `$${value}`}
                                                tipProps={{
                                                    placement: 'top',
                                                    visible: true
                                                }}
                                                value={price}
                                                onChange={price => setPrice(price)}
                                            />

                                            <hr className="my-5" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Categories
                                                </h4>
                                            </div>

                                            <ul className="pl-0">
                                                {categories.map((category) =>
                                                (
                                                    <li
                                                        style={{ cursor: 'pointer', listStyleType: 'none' }}
                                                        key={category}
                                                        onClick={() => setCategory(category)}
                                                    >{category}</li>
                                                )
                                                )}
                                            </ul>

                                            <hr className="my-1" />

                                            <div className="mt-3">
                                                <h4 className="mb-3">
                                                    Ratings
                                                </h4>
                                            </div>

                                            <ul className="pl-0">
                                                {[5,4,3,2,1].map((star) =>
                                                (
                                                    <li
                                                        style={{ cursor: 'pointer', listStyleType: 'none' }}
                                                        key={star}
                                                        onClick={() =>{setRating(star); console.log(star)} }
                                                    >
                                                        <div className="rating-outer">
                                                            <div 
                                                                className="rating-inner"
                                                                style={{ 
                                                                    width: `${star * 20}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </li>
                                                )
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products.map((product) =>
                                                <Product key={product._id} product={product} col={4} />
                                            )}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                products.map((product) =>
                                    <Product key={product._id} product={product} col={3} />
                                )
                            )}
                        </div>
                    </section>

                    {resPerPage < count && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={count}
                                onChange={setCurrentPageNo}
                                nextPageText={'next'}
                                prevPageText={'prev'}
                                firstPageText={'first'}
                                lastPageText={'last'}
                                itemClass='page-item'
                                linkClass='page-link'
                            />
                        </div>
                    )}

                </Fragment>
            )}
        </Fragment>
    )
}
