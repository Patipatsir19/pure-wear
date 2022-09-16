import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

import ProductCard from '../../component/product-card/product-card.component';
import Spinner from '../../component/spinner/spinner.component';

import { useSelector } from 'react-redux';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categories/category.selector';

import { CategoryContainner, Title } from './category.styles';


const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap)
    const isLoading = useSelector(selectCategoriesIsLoading)
    const [products, setProducts] = useState(categoriesMap[category])

    useEffect(()=> {
        setProducts(categoriesMap[category]);
    },[category, categoriesMap])

    return (
        <Fragment>
        <Title>{category.toUpperCase()}</Title>
        {
            isLoading ? <Spinner/> : <CategoryContainner>
            {products &&
            products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </CategoryContainner>
        }
        </Fragment>
    )
}

export default Category;