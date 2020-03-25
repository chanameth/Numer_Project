import React,{Component} from 'react';
import {Form,Button,Col,Row} from 'react-bootstrap'
import { Card,Table} from 'antd'
import {derivative,evaluate,compile,pow,abs} from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
import api from '../api'
const PlotlyComponent = createPlotlyComponent(Plotly)
var dataInTable = []
var statusExample = 0
var data = []
var fxr = [] , fxl = []
class CentralDiviedDifferentialh4 extends Component
{ 
  constructor()
  {
    super();
    this.state={function : " ",h : 0 , x : 0 , Differential : 0, xreal : 0 , showGrap : false , showTable : false}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangex = this.onChangex.bind(this)
    this.onChangeh = this.onChangeh.bind(this)
    this.onChangeDifferential = this.onChangeDifferential.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
    this.onReset = this.onReset.bind(this)
  }
/* ส่วนดึงข้อมูลจาก MongoDB */
    componentDidMount = async() => { 
        await api.getFunctionByName("CentralDiviedDifferentialh4").then(db => {
        this.setState({
            fx:db.data.data.fx,
            x:db.data.data.x,
            h:db.data.data.h,
            Differential:db.data.data.n
        })
        })
    }
  onChangefunction (func)
  {
    this.setState({function:func.target.value})
    console.log(this.state.function);
  }
  onChangex  = (event) =>
  {
      this.setState({x : event.target.value})
  }
  onChangeh = (event) =>
  {
    this.setState({h : event.target.value})
  }
  onChangeDifferential = (event) =>
  {
      this.setState({Differential : event.target.value})
  }
  onExample()
  {
      statusExample = 1;
      this.onSubmit()
  }
    onSubmit()
  {
    var round = parseInt(this.state.Differential)
    var h = parseFloat(this.state.h)
    var xreal = this.state.xreal
    var xcal = []
    var answercal = 0
    var error  = 0
    var x = parseFloat(this.state.x)
    var exprreal = []
    exprreal.push(this.state.function)
    var expr = compile(this.state.function)
    var scope = {
        x : x
    }
    var scopecal =
    {
       x
    }
    for(var i = 1 ; i < round+1 ; i++)
    {
        console.log(derivative(exprreal[i-1],"x").toString())
        exprreal.push(derivative(exprreal[i-1],"x").toString())
    }
    xreal = evaluate(exprreal[round] , scope)
    //console.log(this.state.function)
    if(round === 1)
    { 
       scopecal.x = scope.x + (h*2)
       xcal.push(expr.evaluate(scopecal))

       scopecal.x = scope.x + h
       xcal.push(expr.evaluate(scopecal))

       scopecal.x = scope.x - h
       xcal.push(expr.evaluate(scopecal))

       scopecal.x = scope.x - (h*2)
       xcal.push(expr.evaluate(scopecal))

       answercal = ((-(xcal[0]) + (8*xcal[1]) - (8*xcal[2]) + xcal[3]) / (12*h))
    }
    else if(round === 2)
    {
        scopecal.x = scope.x + (h*2)
        xcal.push(expr.evaluate(scopecal))
 
        scopecal.x = scope.x + h
        xcal.push(expr.evaluate(scopecal))

        scopecal.x = scope.x
        xcal.push(expr.evaluate(scopecal))
 
        scopecal.x = scope.x - h
        xcal.push(expr.evaluate(scopecal))
 
        scopecal.x = scope.x - (h*2)
        xcal.push(expr.evaluate(scopecal))

       answercal = (((-(xcal[0]) + (16*xcal[1])) -(30*xcal[2]) + (16*xcal[3]) -(xcal[4])) / (12*pow(h,2)))
    }
    else if(round === 3)
    {
        scopecal.x = scope.x + (h*3)
        xcal.push(expr.evaluate(scopecal))
 
        scopecal.x = scope.x + (h*2)
        xcal.push(expr.evaluate(scopecal))

        scopecal.x = scope.x + h
        xcal.push(expr.evaluate(scopecal))
 
        scopecal.x = scope.x - h
        xcal.push(expr.evaluate(scopecal))
 
        scopecal.x = scope.x - (h*2)
        xcal.push(expr.evaluate(scopecal))

        scopecal.x = scope.x - (h*3)
        xcal.push(expr.evaluate(scopecal))

       answercal = (((-(xcal[0]) + (8*xcal[1])) - (13*xcal[2]) + (13*xcal[3]) - (8*xcal[4]) -(xcal[5])) / (8*pow(h,3)))
    }
    else if(round === 4)
    {
        scopecal.x = scope.x + (h*3)
        xcal.push(expr.evaluate(scopecal))
 
        scopecal.x = scope.x + (h*2)
        xcal.push(expr.evaluate(scopecal))

        scopecal.x = scope.x + h
        xcal.push(expr.evaluate(scopecal))

        scopecal.x = scope.x
        xcal.push(expr.evaluate(scopecal))
 
        scopecal.x = scope.x - h
        xcal.push(expr.evaluate(scopecal))
 
        scopecal.x = scope.x - (h*2)
        xcal.push(expr.evaluate(scopecal))

        scopecal.x = scope.x - (h*3)
        xcal.push(expr.evaluate(scopecal))

       answercal = (((-(xcal[0]) + (12*xcal[1])) - (39*xcal[2]) + (56*xcal[3]) - (39*xcal[4]) + (12*xcal[5]) - (xcal[6])) / (pow(h,5)))
     
    }
    error = abs(((xreal - answercal)/xreal)).toFixed(6)

    
     this.setState({showTable:true})
     this.createTable(xcal,xreal,exprreal)
  }
  onReset ()
  {
      this.setState({matrixA:[],matrixB:[],Row:0,Colum:0,showTable:false})
  }
  /* function เอาค่าที่หาได้ยัดลง Array dataIntable*/
  createTable(xcal,xreal,exprreal) 
  {
    for (var i = 0; i < xcal.length; i++) {
        dataInTable.push({
            i : i+1,
            function_real : exprreal[i],
            xreal : xreal,
            function_cal : this.state.function,
            xcal : xcal[i]
        });
    }
    //this.Graph(x,y)
  }
      Graph(x, y)
      {
            data = [
            {
              type: 'scatter',  
              x: x,   
              y: y,     
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
        title: 'NewtonsDivided-Differences',  
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
            <h1 style={Textstyle} className="text-white"> Central Divied Differential(h^4)</h1>
      <Form>
          <br/>
             <Form.Row>
                    <Form.Group as={Col} controlId="Row">
                    <Form.Label column sm="5">
                            <h2 className="text-white">Function</h2>
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control type="text"   placeholder={"Equation " + "|" + " " + this.state.function} onChange={this.onChangefunction}/>
                            </Col>
                            <Form.Label column sm="2"></Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Row">
                        <Form.Label column sm="1"><h2 className="text-white">X</h2></Form.Label> 
                        <Col sm="5">
                        <Form.Control type="text"   placeholder={"x" + "|" + " " + this.state.x} onChange={this.onChangex}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Colum">
                        <Form.Label column sm="1"><h2 className="text-white">h</h2></Form.Label>
                        <Col sm="5">
                            <Form.Control type="text"    placeholder={"h " + "|" + " " + this.state.h} onChange={this.onChangeh}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Colum">
                        <Form.Label column sm="1"><h2 className="text-white">Differential</h2></Form.Label>
                        <Col sm="5">
                            <Form.Control type="text"    placeholder={"Differential " + "|" + " " + this.state.Differential} onChange={this.onChangeDifferential}/>
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
export default CentralDiviedDifferentialh4;
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
  title: "Function_Real",
  dataIndex: "function_real",
  key: "kfunction_real"
  },
  {
      title: "xreal",
      dataIndex: "xreal",
      key: "kxreal"
  },
  {
    title: "Function_Cal",
    dataIndex: "function_cal",
    key: "kfunction_cal"
    },
  {
    title: "xcal[i]",
    dataIndex: "xcal",
    key: "kxcal[i]"
  },
];