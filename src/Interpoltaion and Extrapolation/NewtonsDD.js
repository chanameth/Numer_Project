import React,{Component} from 'react';
import {Form,Button,Col,Row} from 'react-bootstrap'
import { Card,Table} from 'antd'
import {index,subset} from 'mathjs'
import createPlotlyComponent from 'react-plotlyjs'
import Plotly from 'plotly.js/dist/plotly-cartesian'
import api from '../api'
const PlotlyComponent = createPlotlyComponent(Plotly)
var dataInTable = []
var statusExample = 0
var data = []
var fxr = [] , fxl = []

class NewtonsDD extends Component
{ 
  constructor()
  {
    super();
    this.state={function : " ",n : 0 , x : [] , fx : [],stringx : '' , stringy : '' , requestx : 0 , showGrap : false , showTable : false}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangestringx = this.onChangestringx.bind(this)
    this.onChangestringy = this.onChangestringy.bind(this)
    this.onChangeN = this.onChangeN.bind(this)
    this.onChangerequestX = this.onChangerequestX.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
    this.onReset = this.onReset.bind(this)
  }
/* ส่วนดึงข้อมูลจาก MongoDB */
componentDidMount = async() => { 
    await api.getFunctionByName("NewtonsDivided-Differences").then(db => {
    this.setState({
        x:db.data.data.arrayx,
        fx:db.data.data.arrayy,
        n:db.data.data.n,
        requestx:db.data.data.requestx
    })
    })
   
}
  onChangefunction (func)
  {
    this.setState({function:func.target.value})
    console.log(this.state.function);
  }
  onChangeN  = (event) =>
  {
      this.setState({n : event.target.value})
  }
  onChangestringx  = (event) =>
  {
      this.setState({stringx : event.target.value})
  }
  onChangestringy = (event) =>
  {
    this.setState({stringy : event.target.value})
  }
  onChangerequestX = (event) =>
  {
      this.setState({requestx : event.target.value})
  }
  onExample()
  {
     statusExample = 1;
     this.onSubmit()
  }
    onSubmit()
  {
    var sum = 1
    var C = []
    var y = this.state.fx
    var answer = 0

    if(statusExample === 0)
    {
      var convert = this.state.stringx.split(' ')
      console.log(convert)
      for(var i = 0 ; i < convert.length ; i ++)
      {
          this.state.x.push(parseFloat(convert[i]))
      }
      convert = this.state.stringy.split(' ')

      for(i = 0 ; i < convert.length ; i ++)
      {
          this.state.fx.push(parseFloat(convert[i]))
      }
    }
     C.push(subset(this.state.fx , index(0)))
     for(var i = 1 ; i < this.state.n ; i++)
     {
         for(var j = 0 ; j < this.state.n - i  ; j ++)
         {
            //console.log("round t :" + j + " : " + subset(this.state.fx , index(j+1)) + ' - ' + subset(this.state.fx , index(j)) + " / " + " " + subset(this.state.x , index(j+i)) + " - " + subset(this.state.x , index(j)))
            this.state.fx = subset(this.state.fx , index(j) , ((subset(this.state.fx , index(j+1)) - subset(this.state.fx , index(j)))/(subset(this.state.x , index(j+i)) - subset(this.state.x , index(j)))))
            if(j === 0)
            {
                C.push(subset(this.state.fx , index(j)))
            }
            console.log(subset(this.state.fx , index(j)))
         }
     }
     for(i = 0 ; i < this.state.n ; i++)
     {
        for(j = i ; j >= 0 ; j --)
        {
            if(j > 0)
            {
                console.log("round i :"+(i)+ " "+"round j :" +(j-1)+" "+ (this.state.requestx - subset(this.state.x , index(j-1))))
                sum = sum * (this.state.requestx - subset(this.state.x , index(j-1)))
            }
        }
        answer =(answer + (C[i] + sum) )
     }
     this.setState({showTable:true,showGrap:true})
     this.createTable(this.state.x,y,C)
  }
  onReset ()
  {
      this.setState({matrixA:[],matrixB:[],Row:0,Colum:0,showTable:false})
  }
  /* function เอาค่าที่หาได้ยัดลง Array dataIntable*/
  createTable(x,y,c) 
  {
    for (var i = 0; i < x.length; i++) {
      console.log(i)
        dataInTable.push({
            i : i+1,
            x : x[i],
            y : y[i],
            C : c[i]
        });
    }
    this.Graph(x,y)
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
            <h1 style={Textstyle} className="text-white"> Newton's Divided-Differences </h1>
      <Form>
          <br/>
          <Form.Row>
                    <Form.Group as={Col} controlId="Row">
                    <Form.Label column sm="5">
                            <h2 className="text-white">Number of n</h2>
                            </Form.Label>
                            <Col sm="5">
                                <Form.Control type="text"  placeholder={"Number of n " + "|" + " " + this.state.n}   onChange={this.onChangeN}/>
                            </Col>
                            <Form.Label column sm="2"></Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Row">
                        <Form.Label column sm="1"><h2 className="text-white">X</h2></Form.Label> 
                        <Col sm="5">
                        <Form.Control type="text"  placeholder={"x " + "|" + " " + this.state.x}  onChange={this.onChangestringx}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Colum">
                        <Form.Label column sm="1"><h2 className="text-white">Y</h2></Form.Label>
                        <Col sm="5">
                            <Form.Control type="text"  placeholder={"y " + "|" + " " + this.state.fx}  onChange={this.onChangestringy}/>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Col} controlId="Colum">
                        <Form.Label column sm="1"><h2 className="text-white">RequestX</h2></Form.Label>
                        <Col sm="5">
                            <Form.Control type="text"  placeholder={"requestx " + "|" + " " + this.state.requestx}  onChange={this.onChangerequestX}/>
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
export default NewtonsDD;
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
      title: "x[i]",
      dataIndex: "x",
      key: "kx[i]"
  },
  {
    title: "y[i]",
    dataIndex: "y",
    key: "ky[i]"
},
{
  title: "C[i]",
  dataIndex: "C",
  key: "kc"
},
];