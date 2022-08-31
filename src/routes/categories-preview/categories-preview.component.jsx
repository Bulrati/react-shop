import {Fragment, useContext} from "react";
import {CategoriesContext} from "../../contexts/categories/categories.context";

import './categories-preview.styles.scss';
import CategoryPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    const {categoriesMap} = useContext(CategoriesContext);
    console.log(categoriesMap);

    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return (<CategoryPreview key={title} title={title} products={products} />)
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;
