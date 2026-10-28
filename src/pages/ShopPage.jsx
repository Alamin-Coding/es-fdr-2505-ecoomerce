import React, { useState } from 'react';
import { 
  FiSearch, FiUser, FiHeart, FiShoppingBag, 
  FiCheckCircle, FiShield, FiTruck, FiHeadphones 
} from 'react-icons/fi';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const products = [
  {
    id: 1,
    title: 'Rounded Red Hat',
    price: 8.00,
    oldPrice: null,
    image: '/1.png',
    colors: ['#e63946', '#000000'],
  },
  {
    id: 2,
    title: 'Linen Blend Shirt',
    price: 17.00,
    oldPrice: null,
    image: '/2.png',
    colors: ['#f4a261', '#e76f51'],
  },
  {
    id: 3,
    title: 'Long-sleeve Coat',
    price: 106.00,
    oldPrice: null,
    image: '/3.png',
    colors: ['#000000', '#2a9d8f'],
  },
  {
    id: 4,
    title: 'Boxy Denim Hat',
    price: 25.00,
    oldPrice: null,
    image: '/4.png',
    colors: ['#a8ded6', '#1d3557'],
  },
  {
    id: 5,
    title: 'Linen Plain Top',
    price: 25.00,
    oldPrice: null,
    image: '/5.png',
    colors: ['#d8e2dc', '#84a59d'],
  },
  {
    id: 6,
    title: 'Oversized T-shirt',
    price: 11.00,
    oldPrice: 14.00,
    image: '/6.png',
    colors: ['#ffb703', '#fb8500'],
  },
  {
    id: 7,
    title: 'Polarized Sunglasses',
    price: 18.00,
    oldPrice: 21.00,
    image: '/7.png',
    colors: ['#e63946', '#457b9d'],
  },
  {
    id: 8,
    title: 'Rockstar Jacket',
    price: 22.00,
    oldPrice: null,
    image: '/8.png',
    colors: ['#2b2d42', '#8d99ae'],
  },
  {
    id: 9,
    title: 'Dotted Black Dress',
    price: 20.00,
    oldPrice: null,
    image: '/9.png',
    colors: ['#111111', '#555555'],
  },
];

const ShopPage = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    toast.success(`${product.title} karte jukta kora hoyeche!`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const handleFilterClick = (type, value) => {
    Swal.fire({
      title: 'Filter select kora hoyeche',
      text: `${type}: ${value}`,
      icon: 'info',
      confirmButtonText: 'Thik ache',
      confirmButtonColor: '#000000',
    });
  };

  return (
    <div>ShopPage</div>
  )
}

export default ShopPage