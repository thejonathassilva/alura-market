import { Container, Title, InputContainer } from "./styles";
import React from 'react';
import { Input, InputLabel, InputAdornment, Button } from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "common/context/User";
import { useContext } from "react";

export default function Login() {
  const navigate = useNavigate();
  let { name, setName, balance, setBalance } = useContext(UserContext);

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
        disabled={name.length < 4}
        variant="contained"
        color="primary"
      >
        Avançar
      </Button>
    </Container>    
  )
}
