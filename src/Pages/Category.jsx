import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import {Product} from "../components/index"

function Category() {
    const data = useLoaderData();
    const [products, setProducts] = useState(data);

    const filter = (category) => {
        if (category === null) {
            setProducts(data); // Reset to all products when category is null
        } else {
            const filtered = data.filter((item) => item.category === category);
            setProducts(filtered); // Set state with filtered products
        }
    };

    const Pro = () => {
        return products.map((product) => (
            <Product product={product} key={product.id} />
        ));
    };

    return (
        <div >
                <section className="py-14">
                    <div className="fixed py-2 bg-white shadow-lg flex fex-row items-center mx-auto w-full z-20 justify-center">
                        <button className="btn btn-outline-dark p-2 bg-black text-white rounded  m-1 btn-sm" onClick={()=>filter(null)}>All</button>
                        <button className="btn btn-outline-dark p-2 bg-black text-white rounded m-1 btn-sm" onClick={()=>filter("women's clothing")}>Women</button>
                        <button className="btn btn-outline-dark p-2 bg-black text-white rounded m-1 btn-sm" onClick={()=>filter("men's clothing")}>Men</button>
                        <button className="btn btn-outline-dark p-2 bg-black text-white rounded m-1 btn-sm" onClick={()=>filter("jewelery")}>Jewelery</button>
                        <button className="btn btn-outline-dark p-2 bg-black text-white rounded m-1 btn-sm" onClick={()=>filter("electronics")}>Electronics</button>
                    </div>
                    <div className="container mx-auto py-20">
                        <h1 className="text-3xl font-semibold mb-10 text-center">Explore Our Products</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
                            {Pro()}
                        </div>
                    </div>
                </section>
        </div>
    )
}

export default Category