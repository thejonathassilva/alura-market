import React, { useContext } from 'react';
import {
  Container,
  Header,
  List,
} from './styles';
import market from './market.json';
import Product from 'components/Product';
import NavBar from './NavBar';
import { UserContext } from 'common/context/User';

export default function Market() {
  const { name, balance } = useContext(UserContext);
  return (
    <Container>
      <NavBar />
      <Header>
        <div>
          <h2> Olá {name}!</h2>
          <h3> Saldo: R$ {balance}</h3>
        </div>
        <p>Encontre os melhores produtos orgânicos!</p>
      </Header>
      <List>
        <h2>
          Produtos:
        </h2>
        {market.map(product => (
          <Product
            {...product}
            key={product.id}
          />
        ))}
      </List>
    </Container>
  )
}
