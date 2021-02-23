import './App.css';
import { Navbar,NavDropdown,Nav,Jumbotron,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Link, Switch} from 'react-router-dom';
import getShoesData from './data.js';
import { useState } from 'react';
import Detail from './Detail';

function App() {
  let [shoesData,ChgShoesData] =  useState(getShoesData);
  let [pageView,SetpageView] =  useState(3);
  let [currentPage,SetCurrentPage] =  useState(1);
  return (
    <Switch>
      <div className="App">
        <NavBar shoesData = {shoesData} ChgShoesData = {ChgShoesData} />
        <JumboTron/>
        <Route exact path="/">
          <Home shoesData = {shoesData}  thisPage = {currentPage} pageView = {pageView}/>
        </Route>
        <Route path="/detail/:id">
          <Detail shoesData = {shoesData}/>
        </Route>
        <PageBar shoesData={shoesData} pageView={pageView} SetCurrentPage={SetCurrentPage}/>
      </div>
    </Switch>
  );
}

function Home(props){
  let thisPage = props.thisPage;
  let pageView = props.pageView;
  let shoesData = [...props.shoesData].splice((thisPage-1)*pageView,pageView);
  return (
    <div className ="container">
      <div className="row">
      {
        shoesData.map((shoes,idx)=>{
          return <Card shoes = {shoes} key = {idx}/>
        })
      }
      </div>
    </div>
  )
}

function NavBar(props){
  return(
    <Navbar bg="light" expand="lg"> 
      <Navbar.Brand href="#home">Shose Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link><Link to="/">Home</Link></Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={()=>{
              let newShoesData = [...props.shoesData];
              newShoesData.sort(function(a,b){
                return a.title < b.title ? -1 : 1;
              })
              props.ChgShoesData(newShoesData);
            }}>Title</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>{
              let newShoesData = [...props.shoesData];
              newShoesData.sort(function(a,b){
                return a.price - b.price;
              })
              props.ChgShoesData(newShoesData);
            }}>Price</NavDropdown.Item>
            <NavDropdown.Item onClick={()=>{
              props.ChgShoesData(getShoesData);
            }}>Stand</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

function JumboTron(){
  return (
    <Jumbotron  className = 'navBackground'>
      <h1>20% Price Sale! </h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for calling
        extra attention to featured content or information.
      </p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </Jumbotron>
  )
}


function Card(props){
  return (    
      <div className="col-md-4">
        <Link to={"detail/"+props.shoes.id}>
          <img src={"https://codingapple1.github.io/shop/shoes"+(props.shoes.id+1)+".jpg"} width="100%" />
          <h4>{ props.shoes.title }</h4>
          <p>{ props.shoes.content }</p>
          <p>{ props.shoes.price }</p>
        </Link>
      </div>    
  )
}

function PageBar(props){
  let pageNum = [];
  for(let idx = 1; idx <= Math.ceil(props.shoesData.length / props.pageView); idx++){
    pageNum.push(idx)
  }
  return (
      <nav aria-label="Page navigation" className="pageBar">
        <ul className="pagination">
        {/* <li className="page-item"><a className="page-link">Previous</a></li> */}
        {
          pageNum.map((page,idx)=>{
            return(
              <li className="page-item" >
                <a className="page-link" onClick={()=>{
                  return props.SetCurrentPage(page);
              }}>{page}</a></li>)
          })
        }
        {/* <li className="page-item"><a className="page-link" href="#">Next</a></li>       */}
        </ul>
      </nav>  
  )
}


export default App;
