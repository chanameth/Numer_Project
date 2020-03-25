import React,{Component} from 'react';
import {Form,Button,Col,Row} from 'react-bootstrap'
import { Card,Table} from 'antd'
import {range, compile,evaluate,simplify,parse,abs,det,matrix,index,subset,zeros} from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
import api from '../api'
const PlotlyComponent = createPlotlyComponent(Plotly)
var dataInTable = []
var statusExample = 0
var data = []
var fxr = [] , fxl = []

class SplineIterpolation extends Component
{ 
  constructor()
  {
    super();
    this.state={function : " ",n : 0 , x : [] , fx : [],stringx : '' , stringy : '' , showGrap : false , showTable : false}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangestringx = this.onChangestringx.bind(this)
    this.onChangestringy = this.onChangestringy .bind(this)
    this.onChangeN = this.onChangeN.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
    this.onReset = this.onReset.bind(this)
  }
/* ส่วนดึงข้อมูลจาก MongoDB */
  /*componentDidMount = async() => { 
    await api.getFunctionByName("CramerS'Rule").then(db => {
    this.setState({
        matrixA:db.data.data.matrixA,
        matrixB:db.data.data.matrixB,
    })
    })
    this.state.Row = 3
    this.state.Colum = 3
}*/
  onChangefunction (func)
  {
    this.setState({function:func.target.value})
    console.log(this.state.function);
  }
  onChangestringx  = (event) =>
  {
      this.setState({stringx : event.target.value})
  }
  onChangeonChangestringy = (event) =>
  {
    this.setState({stringy : event.target.value})
  }
  onExample()
  {
     this.onSubmit()
  }
    onSubmit()
  {
     /*this.setState({showTable:true})
     this.createTable(x)*/
  }
  onReset ()
  {
      this.setState({matrixA:[],matrixB:[],Row:0,Colum:0,showTable:false})
  }
  /* function เอาค่าที่หาได้ยัดลง Array dataIntable*/
  /*createTable(x) 
  {
    for (var i = 0; i < x.length; i++) {
        dataInTable.push({
            i : i+1,
            x : x[i]
        });
    }
  }*/
      Graph(xl, xr)
      {
            data = [
            {
              type: 'scatter',  
              x: xl,   
              y: fxl,     
              marker: {         
                color: 'rgb(150, 32, 77)'
              },
              name:'XL'
            },
            {
            type: 'scatter',  
            x: xr,   
            y: fxr,     
            marker: {         
              color: '#ffab00'
            },
            name:'XR'
          }];
          
        }

    render()
    {
      var fx = this.state.function
      let layout = {                     
        title: 'Bisection',  
        xaxis: {                  
          title: 'X'         
        }
      };
      let config = {
        showLink: false,
        displayModeBar: true
      };
    return(
        <React.Fragment>
        <div width={10000}>
            <h1 style={Textstyle} className="text-white">Spline-Iterpolation</h1>
      <Form>
          <br/>
         {/*<Form.Group as={Row} controlId="functionBisection">
              <Form.Label  column sm="0">
                  <h2 className="text-white">Fucntion</h2>
              </Form.Label>
                  <Col  sm="2">
                  < Form.Control type="text" placeholder="Equation | x^2+2x+5"  onChange={this.onChangefunction} />
                  </Col>
            </Form.Group>*/}
            <Form.Row>
                  <Form.Label column sm="2">
                  <h2 className="text-white">Number of n</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text"    onChange={this.onChangeN}/>
                  </Col>
                  <Form.Label column sm="2"></Form.Label>
            </Form.Row>
             <Form.Row>
                    <Form.Group as={Col} controlId="Row">
                        <Form.Label column sm="1"><h2 className="text-white">X</h2></Form.Label> 
                        <Col sm="5">
                        <Form.Control type="text"    onChange={this.onChangeX}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Colum">
                        <Form.Label column sm="1"><h2 className="text-white">Y</h2></Form.Label>
                        <Col sm="5">
                            <Form.Control type="text"    onChange={this.onChangeY}/>
                        </Col>
                    </Form.Group>
            </Form.Row>
                 
            <Form.Group as={Col} controlId="matrix">
                  <div>
                    <Button variant="success" onClick={this.onSubmit}>Submit</Button>
                    <Button variant="secondary" onClick={this.onReset}>Reset</Button>
                    <Button variant="danger" onClick={this.onExample}>Example</Button>
          </div>
          </Form.Group>
          
</Form>

{/* แสดง ตารางค่าที่หามาได้*/}
{this.state.showTable === true ? <Card
                        title={"Output"}
                        bordered={true}
                        style={tablestyle}
                        id="outputCard"
                    >
                        <Table columns={columns} dataSource={dataInTable} bodyStyle={body}
                        ></Table>
                    </Card>
                :'' }

{/* Plot Graph*/}
{this.state.showGrap === true ? 
  <PlotlyComponent  data={data} Layout={layout} config={config} /> : ''
    }
        </div>
        </React.Fragment>
    );
    }
}
export default SplineIterpolation;
var Textstyle = {
  textAlign:'center',
  textDecorationLine:'underline'
}
var tablestyle = 
{
  width: "80%", background: "#2196f3", color: "#2196f3", float: "inline-start", marginBlockStart: "2%"
}
var body = {
  fontWeight: "bold", fontSize: "18px", color: "white"
}
const columns = [
  {
      title: "i",
      dataIndex: "i",
      key: "ki"
  },
  {
      title: "X[i]",
      dataIndex: "x",
      key: "kX[i]"
  }
];