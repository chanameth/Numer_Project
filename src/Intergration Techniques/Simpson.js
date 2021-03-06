import React,{Component} from 'react';
import {Form,Button,Col,Row} from 'react-bootstrap'
import { Card,Table} from 'antd'
import {derivative,evaluate,compile,pow,abs} from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
import api from '../api'
const PlotlyComponent = createPlotlyComponent(Plotly)
var dataInTable = []
var data = []
const { create, all, parse } = require("mathjs");
const mathjs = create(all)
const integral = require("mathjs-simple-integral")
mathjs.import(integral);

class Simpson extends Component
{ 
  constructor()
  {
    super();
    this.state={function : " ",a : 0 , b : 0 ,  showGrap : false , showTable : false}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangea = this.onChangea.bind(this)
    this.onChangeb = this.onChangeb.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
    this.onReset = this.onReset.bind(this)
  }
/* ส่วนดึงข้อมูลจาก MongoDB */
componentDidMount = async() => { 
  await api.getFunctionByName("Simpson").then(db => {
  this.setState({
      function:db.data.data.fx,
      a:db.data.data.a,
      b:db.data.data.b
  })
  })
}
  onChangefunction (func)
  {
    this.setState({function:func.target.value})
    console.log(this.state.function);
  }
  onChangea  = (event) =>
  {
      this.setState({a : event.target.value})
  }
  onChangeb = (event) =>
  {
    this.setState({b : event.target.value})
  }
  onExample()
  {
      this.onSubmit()
  }
    onSubmit()
  {
    var round = parseInt(this.state.Differential)
    var b = parseFloat(this.state.b)
    var n = parseInt(this.state.n)
    var fxintegral
    var xreal = 0
    var xcal = []
    var xical = 0
    var cal = []
    var answercal = 0
    var h = 0
    var error  = 0
    var a = parseFloat(this.state.a)
    var a_h = []
    var scope = {
        x : b
    }

    var scopecal =
    {
       x : a
    }
    
    h = (((b-a)/2)).toFixed(6)
    h = parseFloat(h)
  
    xcal.push(evaluate(this.state.function, scopecal))
        a_h.push({
            x:((a+h))
        });

    fxintegral=(mathjs.integral(this.state.function,'x')).toString()
    xreal = evaluate(fxintegral , scope)
    scope.x = a
    xreal -= evaluate(fxintegral , scope).toFixed(6)
     
                cal.push(evaluate(this.state.function,a_h[0]).toFixed(6))
                xical +=parseFloat(cal[0])
        
    xcal.push(xical)
    scopecal.x = b
    xcal.push(evaluate(this.state.function, scopecal))
    console.log(xcal[0] , xcal[1] ,xcal[2] )
    answercal = (((b-a)/6)*(xcal[0] + (4*xcal[1]) + xcal[2] )).toFixed(6)
    console.log(answercal)
    error = abs(((xreal - answercal)/xreal)).toFixed(6)

     this.setState({showTable:true})
     this.createTable(xcal,xreal,fxintegral,cal,error)
  }
  onReset ()
  {
      this.setState({function:"",a:0,b:0,n:0,showTable:false})
  }
  /* function เอาค่าที่หาได้ยัดลง Array dataIntable*/
  createTable(xcal,xreal,fxintegral,cal,error) 
  {
      dataInTable = []
    for (var i = 0; i < 3 ; i++) {
        dataInTable.push({
            i : i+1,
            function_real : fxintegral,
            xreal : xreal,
            function_cal : this.state.function,
            functionx : cal[i],
            xcal : xcal[i],
            error : error
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
        title: 'Simpson',  
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
            <h1 style={Textstyle} className="text-white"> Simpson </h1>
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
                        <Form.Label column sm="1"><h2 className="text-white">a</h2></Form.Label> 
                        <Col sm="5">
                            <Form.Control type="text"   placeholder={"a" + "|" + " " + this.state.a} onChange={this.onChangea}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Colum">
                        <Form.Label column sm="1"><h2 className="text-white">b</h2></Form.Label>
                        <Col sm="5">
                            <Form.Control type="text"    placeholder={"b " + "|" + " " + this.state.b} onChange={this.onChangeb}/>
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
export default Simpson;
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
        title: "Function_Cal(x[i])",
        dataIndex: "functionx",
        key: "kfunction_cal(x[i])"
        },
  {
    title: "fxcal[i]",
    dataIndex: "xcal",
    key: "kfxcal[i]"
  },
  {
    title: "error",
    dataIndex: "error",
    key: "kerror"
  }
];