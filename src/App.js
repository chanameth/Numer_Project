import React ,{ useState }from "react";
import { Layout, Menu } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row} from 'react-bootstrap';
import LogoImage from './image_background/Background.jpg';
import HeaderImage from './logo/Cuppy.jpg';
import "antd/dist/antd.css";
import Navbar_ant from './Navbar_ant';
import BisectionMethod from './Root of Equation/BisectionMethod';
import FalsePosition from './Root of Equation/False';
import OPIterationMethod from './Root of Equation/OPIterationMethod';
import Newtonraphson from './Root of Equation/Newtonraphson';
import Secant from './Root of Equation/Secant';
import CramersRule from './Linear Algebaric/CramersRule';
import GaussEliminate from './Linear Algebaric/GaussEliminate';
import GaussJordan from './Linear Algebaric/GaussJordan';
import LU from './Linear Algebaric/LU';
import NewtonsDividedDifferences from './Interpoltaion and Extrapolation/NewtonsDD';
import LagrangePolynomials from './Interpoltaion and Extrapolation/LagrangePolynomials';
import Trapezoidal from './Intergration Techniques/Trapezoidal';
import Simpson from './Intergration Techniques/Simpson';
import CompositeTrapezoidal from './Intergration Techniques/CompositeTrapezoidal';
import CompositeSimpson from './Intergration Techniques/CompositeSimpson';
import ForwardDiviedDifferentialh from './Numerical Differential/ForwardDiviedDifferentialh';
import ForwardDiviedDifferentialh2 from './Numerical Differential/ForwardDiviedDifferentialh2';
import BackwardDiviedDifferentialh from './Numerical Differential/BackwardDiviedDifferentialh';
import BackwardDiviedDifferentialh2 from './Numerical Differential/BackwardDiviedDifferentialh2';
import CentralDiviedDifferentialh2 from './Numerical Differential/CentralDiviedDifferentialh2';
import CentralDiviedDifferentialh4 from './Numerical Differential/CentralDiviedDifferentialh4';
const { Header} = Layout;

class App extends React.Component {
  constructor(props)
  {
    super(props)
    {
      this.state ={pagestatus:"Numerical check Error from console.log()"}
    }
  }
  callBack = (s) =>{
    
    this.setState({pagestatus:s});
    console.log(s);
  }
  render()
  {
    console.log(this.state.pagestatus);
    return(
      <React.Fragment>
        <div style={divcomponent}>
        <Layout>
            <Header style={{ background: 'dark'}} ><a href="/"><h1 className="text-light"> 
            <a href="/"><img
            src={require('./logo/Cuppy.jpg')} 
            width="70"
            height="60"
            className="d-inline-block align-top"
        /></a>
              NUMERICAL</h1></a></Header>
        </Layout>
          <Row>
            <div style={paper}>
              <Navbar_ant parentCallback={this.callBack}/> 
            </div>
            <div style={paper2}>
                <div style={sectionStyle}>
                  {
                    this.state.pagestatus === "Bisection" ? <BisectionMethod/> : ''
                  }
                   {
                    this.state.pagestatus === "False-Position" ? <FalsePosition/> : ''
                  }
                  {
                    this.state.pagestatus === "OnePoint" ? <OPIterationMethod/> : ''
                  }
                  {
                    this.state.pagestatus === "Newtonraphson" ? <Newtonraphson/> : ''
                  }
                  {
                    this.state.pagestatus === "Secant" ? <Secant/> : ''
                  }
                  {
                    this.state.pagestatus === "CramersRule" ? <CramersRule/> : ''
                  }
                  {
                    this.state.pagestatus === "GaussEliminate" ? <GaussEliminate/> : ''
                  }
                  {
                    this.state.pagestatus === "GaussJordan" ? <GaussJordan/> : ''
                  }
                  {
                    this.state.pagestatus === "LU" ? <LU/> : ''
                  }
                  {
                    this.state.pagestatus === "NewtonsDividedDifferences" ? <NewtonsDividedDifferences/> : ''
                  }
                  {
                    this.state.pagestatus === "Lagrange Polynomials" ? <LagrangePolynomials/> : ''
                  }
                  {
                    this.state.pagestatus === "Trapezoidal" ? <Trapezoidal/> : ''
                  }
                  {
                    this.state.pagestatus === "Simpson" ? <Simpson/> : ''
                  }
                  {
                    this.state.pagestatus === "CompositeTrapezoidal" ? <CompositeTrapezoidal/> : ''
                  }
                  {
                    this.state.pagestatus === "CompositeSimpson" ? <CompositeSimpson/> : ''
                  }
                   {
                    this.state.pagestatus === "ForwardDiviedDifferentialh" ? <ForwardDiviedDifferentialh/> : ''
                  }
                   {
                    this.state.pagestatus === "ForwardDiviedDifferentialh2" ? <ForwardDiviedDifferentialh2/> : ''
                  }
                  {
                    this.state.pagestatus === "BackwardDiviedDifferentialh" ? <BackwardDiviedDifferentialh/> : ''
                  }
                   {
                    this.state.pagestatus === "BackwardDiviedDifferentialh2" ? <BackwardDiviedDifferentialh2/> : ''
                  }
                  {
                    this.state.pagestatus === "CentralDiviedDifferentialh2" ? <CentralDiviedDifferentialh2/> : ''
                  }
                   {
                    this.state.pagestatus === "CentralDiviedDifferentialh4" ? <CentralDiviedDifferentialh4/> : ''
                  }
                      
               </div>
             </div>
            </Row>
          </div>
        </React.Fragment>
    );
  }
  
}
export default App;

var sectionStyle = {
  backgroundImage: `url(${LogoImage})`,
  overflow: 'auto',
  height: '1000px',
  paddingLeft:'220px',
  marginLeft:'30px',
}
var divcomponent =
{
  width:'100%',
	height: '1000px',

}
var paper =
{
	width: '2%',
	height: '1000px',
	marginleft: '10px',
	marginright: '10px',
}
var paper2 =
{
	width: '98%',
	height: '700px',
	marginleft: '10px',
  marginright: '10px',
}
