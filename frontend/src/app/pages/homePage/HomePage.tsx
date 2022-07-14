import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {useDispatch} from 'react-redux';
import {fetchProducts} from '../../features/products/productsSlice';
import axios from 'axios';

interface HomePageProps {

}

interface Product{
    name: string;
    price: number;
    qtyInStock: number;
    onSale: boolean,
    discount: number,
    imgUrl: string;
}

export const HomePage: React.FC<HomePageProps> = ({}) => {

    const {products} = useAppSelector((state) => state.products)
    const dispatch = useAppDispatch()
    // const dispatch = useDispatch();
    // const [products, setProducts] = useState<Product[]>([]);

    // const fetchProducts = async()=>{
    //     const response = await axios({
    //         method: 'GET',
    //         url:`${process.env.REACT_APP_BASE_URL}/products/get`
    //     });
    //     setProducts(response.data);
    // }

    useEffect(() =>{

        dispatch(fetchProducts())
    },[]);

    useEffect(() =>{
            console.log(products)
    },[products]);

        return (
            <div></div>
        );
}