import React,{Component} from 'react';
import {Form,Button,Col} from 'react-bootstrap'
import { Card,Row,Table } from 'antd'
import {range, compile,evaluate,simplify,parse,abs,derivative} from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
import api from '../api'
const PlotlyComponent = createPlotlyComponent(Plotly)
var dataInTable = []
var data = []
var fx = []
var diff = []


class Secant extends Component
{ 
  constructor()
  {
    super();
    this.state={function:" ",X:0,makeX:0,showGrap:false,showTable:false}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangeVariableX = this.onChangeVariableX.bind(this)
    this.onChangeVariablemakeX =  this.onChangeVariablemakeX.bind(this)
    this.onExample = this.onExample.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onReset = this.onReset.bind(this)
  }
/* ส่วนดึงข้อมูลจาก MongoDB */
  componentDidMount = async() => { 
    await api.getFunctionByName("Secant").then(db => {
    this.setState({
        function:db.data.data.fx,
        X:db.data.data.x,
        makeX:db.data.data.makex,
    })
    })
    console.log(this.state.function + " " + this.state.X + " " + this.state.makeX)
}

  onChangefunction (func)
  {
    this.setState({function:func.target.value})
    console.log(this.state.function);
  }
  onChangeVariableX  = (event) =>
  {
      this.setState({X:event.target.value})
  }
  onChangeVariablemakeX = (event) =>
  {
      this.setState({makeX:event.target.value})
  }
  onReset ()
  {
      this.setState({matrixA:[],matrixB:[],Row:0,Colum:0,showTable:false})
  }
  onExample()
  {
    this.onSubmit()
  }
  onSubmit()
  {
        dataInTable=[]
        var sum = parseFloat(0.000000)
        var n = 0
        var x = parseFloat(this.state.X)
        var x_make = parseFloat(this.state.makeX)
        var inputy = []
        inputy['x'] = []
        inputy['error'] = []
        /* ทำทิ้งเปล่า 1 ครั้ง */
        inputy['x'][n] = x
        inputy['error'][n] = 1
        diff[n] = ((this.funcChange(x_make)-this.funcChange(x))/(x_make-x))
        console.log(diff[n])
        fx[n] = this.funcChange(x)
        x = (x - (fx[n]/diff[n]))
        inputy['x'][n+1] = x
      /* console.log("Iteration"+n+" "+"xl:"+data['xl'][n]+" "+"xr:"+data['xr'][n]+" "+"xm:"+data['xm'][n]+" "+"error:"+data['error'][n])*/

        /* loop ทำ Iteration*/
        do
        {
          diff[n+1] = ((this.funcChange(inputy['x'][n])-this.funcChange(x))/(inputy['x'][n]-x))
          console.log("diff n+1 =" + n+1 + " " + diff[n+1]  )
          fx[n+1] = this.funcChange(x)
          x = (x - (fx[n+1]/diff[n+1]))
          sum = this.funcError(x,inputy['x'][n+1])
          inputy['error'][n+1] = sum
          n++
          inputy['x'][n+1] = x 
        /* console.log("Iteration"+n+" "+"xl:"+data['xl'][n]+" "+"xr:"+data['xr'][n]+" "+"xm:"+data['xm'][n]+" "+"error:"+sum)*/
        }while (sum > 0.000001)
        this.setState({showGrap:true,showTable:true})
        this.Graph(inputy['x'])
        this.createTable(inputy['x'],inputy['error']);
      /* กรณี inputไม่ถูก */
  }

  /* function เช็คว่า fx * fxm < 0 หรือ ไม่*/
  funcChange = (X) => {let scope = {x : X};var expr = compile(this.state.function);return expr.evaluate(scope)}
  /* function หาค่า Error*/
  funcError = (Xnew,Xold) => {return abs((Xnew - Xold)/Xnew)}
  /* function เอาค่าที่หาได้ยัดลง Array dataIntable*/
  createTable(x,error) {
    for (var i = 0; i < x.length; i++) {
        dataInTable.push({
            iteration: i,
            x: x[i],
            fx:fx[i],
            error: error[i],
        });
    }
}
      Graph(x)
      {
            data = [
            {
              type: 'scatter',  
              x: x,   
              y: fx,     
              marker: {         
                color: 'rgb(150, 32, 77)'
              },
              name:'X'
            },
           ];
          
        }

    render()
    {
      var fx = this.state.function
      let layout = {                     
        title: 'Onpoint Iteration',  
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
            <h1 style={Textstyle} className="text-white">Secant</h1>
      <Form>
          <Form.Group as={Row} controlId="functionBisection">
              <Form.Label  column sm="2">
                  <h2 className="text-white">Fucntion</h2>
              </Form.Label>
                  <Col  sm="2">
                  < Form.Control type="text" placeholder={"Equation " + "|" + " " + this.state.function}  onChange={this.onChangefunction} />
                  </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="VariablemakeXSecant">
                  <Form.Label column sm="2">
                  <h2 className="text-white">X(n-1)</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text"  placeholder={"x[n-1] " + "|" + " " + this.state.makeX} onChange={this.onChangeVariablemakeX}/>
                  </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="VariableXSecant">
                  <Form.Label column sm="2">
                  <h2 className="text-white">X(n)</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text"  placeholder={"x[n] " + "|" + " " + this.state.X} onChange={this.onChangeVariableX}/>
                  </Col>
          </Form.Group>
          <Form.Group>
                    <Button variant="success" onClick={this.onSubmit}>Submit</Button>
                    <Button variant="secondary" onClick={this.onReset}>Reset</Button>
                    <Button variant="danger" onClick={this.onExample}>Example</Button>
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
export default Secant;
var Textstyle = {
  textAlign:'center',
  textDecorationLine:'underline'
}
var tablestyle = 
{
  width: "80%", background: "#2196f3", color: "#FFFFFFFF", float: "inline-start", marginBlockStart: "2%"
}
var body = {
  fontWeight: "bold", fontSize: "18px", color: "black"
}
const columns = [
  {
      title: "Iteration",
      dataIndex: "iteration",
      key: "kiteration"
  },
  {
      title: "X",
      dataIndex: "x",
      key: "kxl"
  },
  {
      title: "fx",
      dataIndex: "fx",
      key: "kxr"
  },
  {
      title: "Error",
      key: "kerror",
      dataIndex: "error"
  }
];