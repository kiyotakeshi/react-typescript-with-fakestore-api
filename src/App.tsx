import { useQuery } from 'react-query';
import { useState } from 'react';

// components
import Item from './Item/Item';
import Cart from './Cart/Cart';

import { Badge, Drawer, LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

// styles
import { Wrapper, StyledButton } from './App.styles';

// types
export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
};

// {
//   "id":1
//   ,"title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
//   ,"price":109.95
//   ,"description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday"
//   ,"category":"men's clothing"
//   ,"image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
// }
const getProducts = async (): Promise<CartItemType[]> =>
    await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([] as CartItemType[]);
    const { data, isLoading, error } = useQuery<CartItemType[]>(
        'products',
        getProducts
    );
    // console.log(data);

    const getTotalItems = (items: CartItemType[]) =>
        items.reduce((ack: number, item) => ack + item.amount, 0);

    const handleAddToCart = (clickedItem: CartItemType) => {
        setCartItems((prev) => {
            console.log(clickedItem);
            console.log(prev);

            // already in the cart??
            const isItemInCart = prev.find(
                (item) => item.id === clickedItem.id
            );

            if (isItemInCart) {
                return prev.map((item) =>
                    item.id === clickedItem.id
                        ? { ...item, amount: item.amount + 1 }
                        : item
                );
            }

            // first time the item is added
            return [...prev, { ...clickedItem, amount: 1 }];
        });
    };
    const handleRemoveFromCart = (id: number) => {
        setCartItems((prev) =>
            prev.reduce((ack, item) => {
                if (item.id === id) {
                    // 1つだけなら array から削除(array を返す)
                    if (item.amount === 1) return ack;
                    return [...ack, { ...item, amount: item.amount - 1 }];
                } else {
                    return [...ack, item];
                }
            }, [] as CartItemType[])
        );
    };

    if (isLoading) return <LinearProgress />;
    if (error) return <div>Something went wrong ...</div>;

    // TODO: 続きから https://youtu.be/sfmL6bGbiN8?t=2233
    return (
        <Wrapper>
            <Drawer
                anchor="right"
                open={cartOpen}
                onClose={() => setCartOpen(false)}
            >
                <Cart
                    cartItems={cartItems}
                    addToCart={handleAddToCart}
                    removeFromCart={handleRemoveFromCart}
                />
            </Drawer>
            <StyledButton onClick={() => setCartOpen(true)}>
                <Badge badgeContent={getTotalItems(cartItems)} color="error">
                    <AddShoppingCartIcon />
                </Badge>
            </StyledButton>
            <Grid container spacing={3}>
                {data?.map((item) => (
                    <Grid item key={item.id} xs={12} sm={4}>
                        <Item item={item} handleAddToCart={handleAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Wrapper>
    );
};

export default App;
