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

    const [currentPage, setCurrentPage] = useState(1);
    const [price,setPrice] = useState([1,1000]);

    const { loading, products, error, productsCount, resPerPage } = useSelector((state) => state.product);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const keyword = params.keyword;

    useEffect(() => {
        dispatch(getProducts(keyword,currentPage,price))
        
    }, [dispatch, error, currentPage,keyword,price]);
    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title="Buy Best Product Online" />
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {!keyword && products && products.map((product) =>
                                <Product key={product._id} product={product} />
                            )}
                        </div>
                    </section>

                    {resPerPage < productsCount && (
                        <div className="d-flex justify-content-center mt-5">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resPerPage}
                                totalItemsCount={productsCount}
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
