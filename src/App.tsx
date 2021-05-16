import { useQuery } from 'react-query';

// components
import Item from './Item/Item';
import { Drawer, LinearProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

// styles
import { Wrapper } from './App.styles';

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
    const { data, isLoading, error } = useQuery<CartItemType[]>(
        'products',
        getProducts
    );
    console.log(data);

    const getTotalItems = () => null;
    const handleAddToCart = (clickedItem: CartItemType) => null;
    const handleRemoveFromCart = () => null;

    if (isLoading) return <LinearProgress />;
    if (error) return <div>Something went wrong ...</div>;

    return (
        <Wrapper>
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
