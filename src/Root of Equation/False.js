import React,{Component} from 'react';
import {Form,Button,Col} from 'react-bootstrap'
import { Card,Row,Table} from 'antd'
import {range, compile,evaluate,simplify,parse,abs} from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
import api from '../api'
const PlotlyComponent = createPlotlyComponent(Plotly)
var dataInTable = []
var data = []
var fxr = [] , fxl = [] , fxm = []

class False extends Component
{ 
  constructor()
  {
    super();
    this.state={function:" ",Xr:0.0,Xl:0.0,showGrap:false,showTable:false}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangeVariableXr = this.onChangeVariableXr.bind(this)
    this.onChangeVariableXl = this.onChangeVariableXl.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
    this.onReset = this.onReset.bind(this)
  }
/* ส่วนดึงข้อมูลจาก MongoDB */
  componentDidMount = async() => { 
    await api.getFunctionByName("False-Position").then(db => {
    this.setState({
        function:db.data.data.fx,
        Xr:db.data.data.xr,
        Xl:db.data.data.xl,
    })
    })
}
  
  onChangefunction (func)
  {
    this.setState({function:func.target.value})
    console.log(this.state.function);
  }
  onChangeVariableXr  = (event) =>
  {
      this.setState({Xr:event.target.value})
  }
  onChangeVariableXl = (event) =>
  {
    this.setState({Xl : event.target.value})
  }
  onReset ()
  {
      this.setState({Xr:0,Xl:0,showGrap:false,showTable:false})
  }
  onExample()
  {
      this.onSubmit()
  }
  onSubmit()
  {
    if(this.state.Xl < this.state.Xr)
    {
        dataInTable=[]
        var sum = 0.0
        var increaseFunction = false
        var n = 0
        var xm,xl = parseFloat(this.state.Xl) , xr = parseFloat(this.state.Xr)
        var inputy = []
        inputy['xl'] = []
        inputy['xm'] = []
        inputy['xr'] = []
        inputy['error'] = []

        /* ทำทิ้งเปล่า 1 ครั้ง */
        inputy['xl'][n] = xl.toFixed(6)
        inputy['xr'][n] = xr.toFixed(6)
      
        fxr[n] = this.funcChange(xr)
        fxl[n] = this.funcChange(xl)
        xm = (((xl*fxr[n])-(xr*fxl[n]))/(fxr[n]-fxl[n])).toFixed(6)
        inputy['xm'][n] = xm
        fxm[n] = this.funcChange(xm).toFixed(6)
        inputy['error'][n] = 1
        increaseFunction = (((fxr[n])* fxm[n]) <= 0 ?  true : false)
        if(increaseFunction)  
        {
          xl = xm
        }
        else
        {
          xr = xm
        }

      /* console.log("Iteration"+n+" "+"xl:"+data['xl'][n]+" "+"xr:"+data['xr'][n]+" "+"xm:"+data['xm'][n]+" "+"error:"+data['error'][n])*/

        /* loop ทำ Iteration*/
        do
        {
          inputy['xl'][n+1] = (parseFloat(xl)).toFixed(6)
          inputy['xr'][n+1] = (parseFloat(xr)).toFixed(6)
          fxr[n+1] = (this.funcChange(inputy['xr'][n+1])).toFixed(6)
          fxl[n+1] = (this.funcChange(inputy['xl'][n+1])).toFixed(6)
          xm = (((xl*fxr[n+1])-(xr*fxl[n+1]))/(fxr[n+1]-fxl[n+1])).toFixed(6)
          fxm[n + 1] = (this.funcChange(xm)).toFixed(6)
          increaseFunction=(((fxr[n+1]) * fxm[n + 1]) <= 0 ?  true : false)
          if(increaseFunction)
          {
            xl = xm
          }
          else
          {
            xr = xm
          }
          sum = (this.funcError(xm,inputy['xm'][n])).toFixed(6)
          inputy['xm'][n+1] = xm
          inputy['error'][n+1] = sum
          n++;
        /* console.log("Iteration"+n+" "+"xl:"+data['xl'][n]+" "+"xr:"+data['xr'][n]+" "+"xm:"+data['xm'][n]+" "+"error:"+sum)*/
        }while (sum > 0.000001)
        this.setState({showGrap:true,showTable:true})
        this.Graph(inputy['xl'], inputy['xr'])
        this.createTable(inputy['xl'], inputy['xr'], inputy['xm'], inputy['error']);
        }
      /* กรณี inputไม่ถูก*/
    else
    {
      console.log("Please Input Xl > Xr")
    }
  }

  /* function เช็คว่า fx * fxm < 0 หรือ ไม่*/
  funcChange = (X) => {let scope = {x : parseFloat(X)};var expr = compile(this.state.function);return expr.evaluate(scope)}
  /* function หาค่า Error*/
  funcError = (Xnew,Xold) => {return abs((Xnew - Xold)/Xnew)}
  /* function เอาค่าที่หาได้ยัดลง Array dataIntable*/
  createTable(xl, xr, xm, error) {
    for (var i = 0; i < xl.length; i++) {
        dataInTable.push({
            iteration: i,
            xl: xl[i],
            xr: xr[i],
            xm: xm[i],
            fxl: fxl[i],
            fxr: fxr[i],
            fxm: fxm[i],
            error: error[i]
        });
    }
}
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
            <h1 style={Textstyle} className="text-white">False-Position</h1>
      <Form>
          <Form.Group as={Row} controlId="functionBisection">
              <Form.Label  column sm="2">
                  <h2 className="text-white">Fucntion</h2>
              </Form.Label>
                  <Col  sm="2">
                  < Form.Control type="text" placeholder={"Equation " + "|" + " " + this.state.function}  onChange={this.onChangefunction} />
                  </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="VariableXrBisection">
                  <Form.Label column sm="2">
                  <h2 className="text-white">Xl</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text"  placeholder={"xl " + "|" + " " + this.state.Xl} onChange={this.onChangeVariableXl}/>
                  </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="VariableXlBisection">
                  <Form.Label column sm="2">
                  <h2 className="text-white">Xr</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text"   placeholder={"xr " + "|" + " " + this.state.Xr}  onChange={this.onChangeVariableXr}/>
                  </Col>
          </Form.Group>

          <div>
                    <Button variant="success" onClick={this.onSubmit}>Submit</Button>
                    <Button variant="secondary" onClick={this.onReset}>Reset</Button>
                    <Button variant="danger" onClick={this.onExample}>Example</Button>
          </div>
          
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
export default False;
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
      title: "Iteration",
      dataIndex: "iteration",
      key: "kiteration"
  },
  {
      title: "XL",
      dataIndex: "xl",
      key: "kxl"
  },
  {
      title: "XR",
      dataIndex: "xr",
      key: "kxr"
  },
  {
      title: "Xm",
      dataIndex: "xm",
      key: "kxm"
  },
  {
    title: "fxl",
    dataIndex: "fxl",
    key: "kfxl"
  },
  {
    title: "fxr",
    dataIndex: "fxr",
    key: "kfxr"
  },
  {
    title: "fxm",
    dataIndex: "fxm",
    key: "kfxm"
  },
  {
      title: "Error",
      key: "kerror",
      dataIndex: "error"
  }
];