export interface Product {
    id: string;
    title: string;
    image: string;
    price: number;
    compareAtPrice?: number;
    badgeText?: string;
    href: string;
    stock: number;
}

import type { Filter, NavItem, LinkGroup } from '../lib/types';

export interface Variant {
    id: string;
    title: string;
    price: number;
    stock: number;
}

export interface ProductDetails {
    id: string;
    title: string;
    description: string;
    currency: string;
    variants: Variant[];
}

export interface CartItem {
    id: string;
    productId: string;
    title: string;
    image: string;
    formattedPrice: string;
    quantity: number;
}

export const products: Product[] = [
    {
        id: '1',
        title: 'Product 1',
        image: 'https://via.placeholder.com/300',
        price: 99.99,
        href: '#',
        stock: 5
    },
    {
        id: '2',
        title: 'Product 2',
        image: 'https://via.placeholder.com/300',
        price: 149.99,
        compareAtPrice: 199.99,
        badgeText: 'Sale',
        href: '#',
        stock: 0
    },
    {
        id: '3',
        title: 'Product 3',
        image: 'https://via.placeholder.com/300',
        price: 49.99,
        href: '#',
        stock: 10
    },
    {
        id: '4',
        title: 'Product 4',
        image: 'https://via.placeholder.com/300',
        price: 299.99,
        href: '#',
        stock: 2
    }
];

export const filters: Filter[] = [
    { id: 'search', label: 'Search', type: 'text' },
    { id: 'price', label: 'Price Range', type: 'range', min: 0, max: 1000 },
    {
        id: 'category',
        label: 'Category',
        type: 'checkbox',
        options: [
            { label: 'Electronics', value: 'electronics' },
            { label: 'Clothing', value: 'clothing' }
        ]
    }
];

export const navItems: NavItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' }
];

export const footerLinks: LinkGroup[] = [
    {
        title: 'Company',
        items: [
            { label: 'About Us', href: '#' },
            { label: 'Careers', href: '#' }
        ]
    },
    {
        title: 'Support',
        items: [
            { label: 'FAQ', href: '#' },
            { label: 'Contact', href: '#' }
        ]
    }
];

export const productDetails: ProductDetails = {
    id: 'p1',
    title: 'Super Widget',
    description: 'The best widget ever made.',
    currency: 'USD',
    variants: [
        { id: 'v1', title: 'Small', price: 199.99, stock: 10 },
        { id: 'v2', title: 'Medium', price: 219.99, stock: 5 },
        { id: 'v3', title: 'Large', price: 239.99, stock: 0 }
    ]
};

export const cartItems: CartItem[] = [
    {
        id: 'c1',
        productId: '1',
        title: 'Product 1',
        image: 'https://via.placeholder.com/80',
        formattedPrice: '$99.99',
        quantity: 2
    }
];

export const galleryImages = [
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><rect width="500" height="500" fill="%23ccc"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Image 1</text></svg>',
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><rect width="500" height="500" fill="%23000"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23fff">Image 2</text></svg>',
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500"><rect width="500" height="500" fill="%23f00"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23fff">Image 3</text></svg>'
];

export const copyright = '© 2023 MyStore. All rights reserved.';
