import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import axios from "axios";

export default function NewOut(){
    
    const [value, setValue] = useState("");
    const [description, setDescription] = useState("");

    const token = JSON.parse(sessionStorage.getItem("token"));

    const history = useHistory();

    function saveTransaction(e){
        e.preventDefault();

        const signal = "-";

        const config = { headers: { "Authorization": `Bearer ${token}` } }

        const body = {token, value, description, signal};

        const promise = axios.post('http://localhost:4000/transactions', body, config);
        

        promise.then(() => {
            history.push("/principal");
        });
        promise.catch((error) => {
            console.log(error)
        });

    }
    
    return(
        <ContainerRegister>
            <HeaderRegister> 
                <h1>Nova saída</h1>
            </HeaderRegister>
            <form onSubmit={saveTransaction}>
                <Input placeholder="Valor" type="number" value={value} onChange={e => setValue(e.target.value)} ></Input>
                <Input placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}></Input>
                <Button type="submit"> Salvar saída</Button>
            </form>
        </ContainerRegister>
    );
}

const ContainerRegister = styled.div `
    margin: 25px 6.5vw 0 6.5vw;
    display: flex;
    flex-direction: column;
`;

const HeaderRegister = styled.div `
    width: 87vw;
    margin-bottom: 40px;
    display: flex;
    align-items: center;


    h1 {
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #fff;
    }
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