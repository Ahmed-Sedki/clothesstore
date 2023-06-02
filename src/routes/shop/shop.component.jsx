import {React,useContext} from 'react'
import {ProductsContext} from '../../contexts/products.context'
import ProductCard from '../../components/product-crad/product-card.component';
import './shop.styles.scss'

const Shop = () => {
    const {products} = useContext(ProductsContext);
    return (
        <div className='products-container'>
            {
                products.map((product)=>(
                    <ProductCard key={product.id} product={product}/>
                ))
            }
        </div>
    )
}

export default Shop




// export default function  Shop() {
//   return (
//     <div>
//     {
//         SHOP_DATA.map((id,name)=>(
//             <div key={id}>
//                 <h1>{name}</h1>
//             </div>
//         ))
//     }
//     </div>
//   )
// }
