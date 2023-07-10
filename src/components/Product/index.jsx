import React, { memo } from 'react';
import { Container } from './styles';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useCartContext } from 'common/context/Cart';

function Product({
  name,
  picture,
  id,
  value,
  unit
}) {
  const { cart, addProduct } = useCartContext();
  const productInCart = cart.find(cartItem => cartItem.id === id);

  return (
    <Container>
      <div>
        <img 
          src={`/assets/${picture}.png`} 
          alt={`foto de ${name}`}
        />
        <p>
          {name} - R$ {value?.toFixed(2)} <span>Kg</span>
        </p>
      </div>
      <div>
          <IconButton
            color="secondary"
          >
            <RemoveIcon />
          </IconButton>
          {productInCart?.amount || 0}
          <IconButton onClick={() => addProduct({ name, picture, id, value}) }>
            <AddIcon />
          </IconButton>
        </div>
    </Container>
  )
}

export default memo(Product);