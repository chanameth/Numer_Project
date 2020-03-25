import React ,{ useState } from 'react';
import { Layout, Menu, Icon , } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'react-bootstrap';
import "antd/dist/antd.css";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Navbar_ant(props) {
  const [state,setState] = useState(true);
  /*state = {
    collapsed:true,
  };*/
  const onCollapse = (collapsed) => {setState(collapsed);console.log(collapsed);}
 /* onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };*/

    return (
      <React.Fragment>
       <Layout>
        <Sider width={280}collapsible={true} collapsed={state} onCollapse={onCollapse} callBack={state}>
          <div className="logo" />
          <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline" >
            <Menu.Item key="1">
            <a href="/"><Icon type="home" theme="twoTone" twoToneColor="rgb(187,144,101)"/>
            <span> HOME</span></a>
            </Menu.Item>
            <Dropdown.Divider />
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="smile" theme="twoTone" twoToneColor="#52c41a"/>
                  <span>Root of Equation</span>
                </span>
              }
            >
            <Menu.Item key="3" onClick={() => props.parentCallback('Bisection')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Bisection</span></Menu.Item>
            <Menu.Item key="4" onClick={() => props.parentCallback('False-Position')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>False-Position</span></Menu.Item>
            <Menu.Item key="5" onClick={() => props.parentCallback('OnePoint')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>One-Point Iteration Method</span></Menu.Item>
            <Menu.Item key="6" onClick={() => props.parentCallback('Newtonraphson')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Newton-Raphson Method</span></Menu.Item>
            <Menu.Item key="7" onClick={() => props.parentCallback('Secant')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Secant Method</span></Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="heart" theme="twoTone" twoToneColor="rgb(255,25,63)"/>
                  <span>Linear Algebaric</span>
                </span>
              }
            >
              <Menu.Item key="8" onClick={() => props.parentCallback('CramersRule')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Cramer's Rule</span></Menu.Item>
              <Menu.Item key="9" onClick={() => props.parentCallback('GaussEliminate')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Gauss Elimination Method</span></Menu.Item>
              <Menu.Item key="10" onClick={() => props.parentCallback('GaussJordan')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Gauss-Jordan Method</span></Menu.Item>
              <Menu.Item key="12" onClick={() => props.parentCallback('LU')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>LU Decomposition Method</span></Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub3"
              title={
                <span>
                  <Icon type="like" theme="twoTone" twoToneColor="rgb(33,67,239)"/>
                  <span>Interpoltaion and Extrapolation</span>
                </span>
              }
            >
           <Menu.Item key="16" onClick={() => props.parentCallback('NewtonsDividedDifferences')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Newton's Divided-Differences</span></Menu.Item>
              <Menu.Item key="17" onClick={() => props.parentCallback('Lagrange Polynomials')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Lagrange Polynomials</span></Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub5"
              title={
                <span>
                  <Icon type="database" />
                  <span>Intergration Techniques</span>
                </span>
              }
            >
              <Menu.Item key="21" onClick={() => props.parentCallback('Trapezoidal')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor} />Trapezoldal's Rule</span></Menu.Item>
              <Menu.Item key="22" onClick={() => props.parentCallback('CompositeTrapezoidal')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>CompositeTrapezoldal's Rule</span></Menu.Item>
              <Menu.Item key="23" onClick={() => props.parentCallback('Simpson')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Simpson's Rule</span></Menu.Item>
              <Menu.Item key="24" onClick={() => props.parentCallback('CompositeSimpson')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>CompositeSimpson's Rule</span></Menu.Item>
            </SubMenu>

            <SubMenu
              key="sub6"
              title={
                <span>
                  <Icon type="ellipsis" />
                  <span>Numerical Differential</span>
                </span>
              }
            >
              <Menu.Item key="25" onClick={() => props.parentCallback('ForwardDiviedDifferentialh')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Forward Divied Differential(h)</span></Menu.Item>
              <Menu.Item key="26" onClick={() => props.parentCallback('ForwardDiviedDifferentialh2')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Forward Divied Differential(h^2)</span></Menu.Item>
              <Dropdown.Divider />
              <Menu.Item key="27" onClick={() => props.parentCallback('BackwardDiviedDifferentialh')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Backward Divied Differential(h)</span></Menu.Item>
              <Menu.Item key="28" onClick={() => props.parentCallback('BackwardDiviedDifferentialh2')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Backward Divied Differential(h^2)</span></Menu.Item>
              <Dropdown.Divider/>
              <Menu.Item key="29" onClick={() => props.parentCallback('CentralDiviedDifferentialh2')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Central Divied Differential(h^2)</span></Menu.Item>
              <Menu.Item key="30" onClick={() => props.parentCallback('CentalDiviedDifferentialh4')}><span><Icon type={design.type} theme={design.theme}  twoToneColor={design.twoToneColor}/>Central Divied Differential(h^4)</span></Menu.Item>
            </SubMenu>


              
          </Menu>
          </Sider>
          <Layout>
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /><br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
            <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /><br />
          </Layout>
          </Layout>
       
      
      </React.Fragment>
    );
  }
export default Navbar_ant;
var design =
{
  type:"fire",
  theme:"twoTone",
  twoToneColor:"rgb(240,101,16)",

}
/*var sectionStyle = {
  backgroundImage: `url(${LogoImage})`,
  padding: 65,
  minHeight: 1000,
}
 <Layout>
          <Header style={{ background: 'dark',marginTop:0,marginLeft:17,marginRight:0}} ><a href="/"><h1 className="text-light"> 
             NUMERICAL</h1></a></Header>
          <Content style={{ marginTop:0,marginLeft:17,marginRight:0 }}>
          </Content>
        </Layout>*/
/*,marginTop: 12,marginLeft:0,marginRight:0*/