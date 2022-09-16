import React, { useEffect, useState } from 'react';
import ProductTable from '../Table/ProductTable';
const Header = () => {
const [allProducts,setAllProducts]=useState([])
const [dressSelected,setDressSelected]=useState('');
const [products,setProducts]=useState([])
const [size,setSize]=useState('')
const [searchProduct,setSearchProduct]=useState('')
const [filterProduct,setFilterProduct]=useState([]);
useEffect(()=>{
    fetch("/products.json")
    .then(res=>res.json())
    .then(data=>setAllProducts(data))

   
},[])

useEffect(()=>{
    if(dressSelected===''){
        setProducts(allProducts)
        setFilterProduct(allProducts)
    }else{
        const  selectProduct= allProducts.filter((product)=>product.category.toLowerCase().includes(dressSelected.toLowerCase()) && product.size.toLowerCase().includes(size.toLowerCase())) ;
        setProducts(selectProduct);
        setFilterProduct(selectProduct);
    }
    if(searchProduct!==''){
        const  selectProduct= filterProduct.filter((product)=>product.name.toLowerCase().includes(searchProduct.toLowerCase()));
        setProducts(selectProduct);
    }


},[dressSelected,allProducts,size,searchProduct,filterProduct])


    return (
        <div className=''>
            <div className='container flex  justify-between mx-auto shadow-lg py-4 lg:px-0 px-4 rounded-sm lg:flex-row md:flex-row flex-col'>
                {/* header right select choice and size */}
                <div className='header-left flex items-center gap-x-4  pl-5'>
                    <div className='dress-choice'>
                        <select
                        onChange={(e)=>setDressSelected(e.target.value)} 
                        className="select select-bordered select-sm w-full max-w-xs rounded-sm uppercase">
                            <option disabled selected>Choice</option>
                            <option>apparel</option>
                            <option>footwear</option>
                            <option>sportswear</option>
                            <option>traditional</option>
                            <option>fabric</option>
                            <option>haute</option>

                        </select>
                    </div>
                    <div className='size-choice'>
                        <select
                          onChange={(e)=>setSize(e.target.value)} 
                         className="select select-bordered select-sm w-full max-w-xs rounded-sm uppercase">
                            <option disabled selected>Size</option>
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                        </select>
                    </div>
                    <div>
                        <button>Reset</button>
                    </div>
                </div>

                {/* header right search and add to cart part        */}
                <div className="flex flex-row mt-5 lg:mt-0 md:mt-0 gap-x-4 lg:gap-y-0 md:gap-y-0 gap-y-4 pr-5">
                    {/* search filter */}
                    <div className="flex items-center gap-x-2">
                        <span className="font-medium lg:block md:block hidden">Search:</span>
                        <input
                            onChange={(e)=>setSearchProduct(e.target.value)} 
                            type="text"
                            placeholder="Enter product name"
                            className="input input-bordered rounded-sm input-md max-w-xs"
                        />
                    </div>

                    {/* add to cart */}
                    <div>
                        <button className="btn text-white lg:px-8 md:px-8 px-3 bg-[#00a0c0] border-0 rounded-sm whitespace-nowrap">Add to cart</button>
                    </div>
                </div>
            </div>

            <div className='container mx-auto mt-3'>
                <ProductTable products={products}></ProductTable>
            </div>
        </div>
    );
};

export default Header;