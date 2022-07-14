import React from 'react';
import {HomeCarousel} from '../../components/carousel/Carousel';

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

        return (
            <div>
                <HomeCarousel/>
            </div>
        );
}