import styled from "styled-components";
import {IoExitOutline} from "react-icons/io5";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Transaction from "./Transaction.js";


export default function PrincipalPage(){
    
    const [transactions, setTransactions] = useState([]);
    const [text, setText] = useState("Carregando...");

    useEffect(()=>{
        getTransactions();
    }, []);

    function getTransactions(){

        const token = JSON.parse(sessionStorage.getItem("token"));

        const config = { headers: { "Authorization": `Bearer ${token}` } }

        const promise = axios.get('http://localhost:4000/transactions', config);
        

        promise.then((response) => {
            setTransactions(response.data);
            setText("Não há registros de entrada ou saída")
        });
        promise.catch((error) => {
            console.log(error)
        });

    }
    
    const history = useHistory();

    function goToLogInPage(){
        sessionStorage.setItem("token", "");
        history.push("/");
    }

    function goToNewIn(){
        history.push("/entrada");
    }

    function goToNewOut(){
        history.push("/saida");
    }

    let saldo = 0;
    for(let i = 0 ; i < transactions.length; i++){
        if(transactions[i].signal === '+'){
            saldo = saldo + Number(transactions[i].value);
        }else{
            saldo = saldo - Number(transactions[i].value);
        }
    }
    let color = {};

    if(saldo < 0){
        color = {color: '#C70000'};
    }else{
        color = {color: '#03AC00'};
    }   

    
    return(
        <ContainerPrincipalPage>
            <HeaderPrincipalPage>
                <h1>Olá, Fulano</h1>
                <div>
                    <IoExitOutline color="#fff" size="24px" onClick={goToLogInPage}></IoExitOutline>
                </div>
            </HeaderPrincipalPage>
            <Content> 
                {
                    transactions.length === 0 ?
                    (
                        <h1>{text}</h1>
                    )
                    :
                    (
                        transactions.map((transaction, index) => <Transaction key={index} transaction={transaction}/>)
                    )
                }
                
                <Saldo>
                    <p>Saldo</p>
                    <h2 style={color} >{saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2>
                </Saldo>
            </Content>
            <BottomPrincipalPage>
                <NewRegister onClick={goToNewIn}>
                    <FiPlusCircle color="#fff" size="22px" ></FiPlusCircle>
                    <p>Nova entrada</p>
                </NewRegister>
                <NewRegister onClick={goToNewOut}>
                    <FiMinusCircle color="#fff" size="22px" ></FiMinusCircle>
                    <p>Nova saída</p>
                </NewRegister>
            </BottomPrincipalPage>
        </ContainerPrincipalPage>
    );
}

const ContainerPrincipalPage = styled.div `
    margin: 25px 6.5vw 0 6.5vw;
    display: flex;
    flex-direction: column;
`;

const HeaderPrincipalPage = styled.div `
    width: 87vw;
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    
    justify-content: space-between;

    h1 {
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #fff;
    }

    div{
        display: flex;
    }

    div:hover{
        cursor: pointer;
    }
    
`
const Content = styled.div `
    width: 87vw;
    height: 66.86vh;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    padding-bottom: 6.5vh;
    position: relative;

    h1 {
        width: 50vw;
        height: 46px;
        font-size: 20px;
        font-weight: 400;
        line-height: 23px;
        text-align: center;
        color: #868686;
        position: absolute;
        left: 20vw;
        top: 20vh;
    }

   

`;

const Saldo = styled.div `
    position: fixed;
    height: 6vh;
    background-color: #fff;
    z-index: 10;
    bottom: 21.5vh;
    width: 87vw;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 3vw;

    p{
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
        
    }

    h2{
        font-weight: normal;
        font-size: 17px;
        line-height: 20px;
    }

`;

const BottomPrincipalPage = styled.div `
    margin-top: 13px;
    display: flex;
    justify-content: space-between;

    div:hover{
        cursor: pointer;
    }
`;

const NewRegister = styled.div `
    width: 41vw;
    height: 17.1vh;
    background: #A328D6;
    border-radius: 5px;
    padding: 9px 0 9px 3vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    p {
        width: 20vw;
        font-weight: bold;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
    }
`;