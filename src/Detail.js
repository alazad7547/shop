
import React from 'react';
import { useParams } from 'react-router-dom';

function Detail(props){
    let {id} = useParams();
    let thisShoes = props.shoesData.find(function(shoes){
        return shoes.id == id;
    }) 
    console.log(thisShoes);
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes"+(thisShoes.id+1)+".jpg"} width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{thisShoes.title}</h4>
                    <p>{thisShoes.content}</p>
                    <p>{thisShoes.price}</p>
                    <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div>  
    )
  };
  
  export default Detail 