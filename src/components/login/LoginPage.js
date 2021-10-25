import styled from "styled-components";
import { useState } from "react";
import { useHistory } from "react-router";
import axios from 'axios';

export default function LoginPage(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const history = useHistory();

    function goToSignUpPage(){
        history.push('/cadastro');
    }

    
    function validateLogin(e){
        e.preventDefault();

        const body = {email, password};

        const promise = axios.post('http://localhost:4000/sign-in', body);
        

        promise.then((response) => {
            history.push("/principal");
            const token = JSON.stringify(response.data);
            sessionStorage.setItem("token", token);
        });
        promise.catch((error) => {
            console.log(error)
        });
    }
    
    
    
    return (
        <ConteinerLogin>
            <Title>MyWallet</Title>
            <form onSubmit={validateLogin}>
                <Input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} ></Input>
                <Input placeholder="Senha" type="password" value={password} onChange={e => setPassword(e.target.value)}></Input>
                <Button type="submit">Entrar</Button>
            </form>
            <TextSignUp onClick={goToSignUpPage}>Primeira vez? Cadastre-se!</TextSignUp>
        </ConteinerLogin>
    );
}

const ConteinerLogin = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    
    button:hover{
        cursor: pointer;
    }

    div:hover{
        cursor: pointer;
        text-decoration: underline;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

const Title = styled.div `
    font-family: 'Saira Stencil One', cursive;
    color: #fff;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 50px;
    margin: 24vh 0 24px 0;
`;

const Input = styled.input `
    width: 86vw;
    height: 58px;
    border-radius: 5px;
    margin-bottom: 13px;
    padding-left: 15px;
    font-size: 20px;
    line-height: 23px;
    color: #000; 



    ::placeholder {
        
        color: #000; 
    }


`;

const Button = styled.button `
    width: 86vw;
    height: 46px;
    background-color: #a328d6;
    border-radius: 5px;
    color: #fff;
    font-size: 20px;
    line-height: 23px;
    font-weight: 700;
`
const TextSignUp = styled.div `
    margin-top: 36px;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #fff

    
`;
