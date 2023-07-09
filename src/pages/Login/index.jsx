import { Container, Title, InputContainer } from "./styles";
import React from 'react';
import { Input, InputLabel, InputAdornment, Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';

export default function Login({
  name,
  setName,
  balance,
  setBalance
}) {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>
        Insira seu nome
      </Title>
      <InputContainer>
        <InputLabel>
          Nome
        </InputLabel>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          type="text"
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Saldo
        </InputLabel>
        <Input
          value={balance}
          onChange={(event) => setBalance(event.target.value)}
          type="number"
          startAdornment={
            <InputAdornment position="start">
              R$
            </InputAdornment>
          }
        />
      </InputContainer>
      <Button
        onClick={() => {
          navigate('/feira');
        }}
        variant="contained"
        color="primary"
      >
        Avançar
      </Button>
    </Container>    
  )
}
