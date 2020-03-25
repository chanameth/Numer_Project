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

class GaussJordan extends Component
{ 
  constructor()
  {
    super();
    this.state={function:" ",Xr:0,Xl:0,X:0,stringmatrixA:"",stringmatrixB:"",matrixA:[],matrixB:[],ans:[],Row:0,Colum:0,showGrap:false,showTable:false,showMatrix:false}
    this.onChangefunction = this.onChangefunction.bind(this)
    this.onChangeVariableXr = this.onChangeVariableXr.bind(this)
    this.onChangeVariableXl = this.onChangeVariableXl.bind(this)
    this.onChangeColum= this.onChangeColum.bind(this)
    this.onChangeRow = this.onChangeRow.bind(this)
    this.onChangeMatrixA = this.onChangeMatrixA.bind(this)
    this.onChangeMatrixB = this.onChangeMatrixB.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onExample = this.onExample.bind(this)
    this.onReset = this.onReset.bind(this)
  }
/* ส่วนดึงข้อมูลจาก MongoDB */
  componentDidMount = async() => { 
    await api.getFunctionByName("GaussJordan").then(db => {
    this.setState({
        matrixA:db.data.data.matrixA,
        matrixB:db.data.data.matrixB,
    })
    })
    this.state.Row = 3
    this.state.Colum = 3
}
    onChangeColum = (event) =>
    {
        this.setState({Colum:event.target.value})
        parseInt(this.state.Colum)
    }
    onChangeRow = (event) =>
    {
        this.setState({Row:event.target.value})
        parseInt(this.state.Row)
    }
  onChangeMatrixA = (event) =>
  {
      this.setState({stringmatrixA:event.target.value})
  }
  onChangeMatrixB = (event) =>
  {
      this.setState({stringmatrixB:event.target.value})
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
  onExample()
  {
     statusExample = 1;
     this.onSubmit()
  }
    onSubmit()
  {
    if(statusExample === 0)
    {
      this.state.matrixA = []
      this.state.matrixB = []
    var convert = this.state.stringmatrixA.split(' ')
     for(var i = 0,k = -1 ; i < convert.length ; i++)
     {
        if(i % this.state.Row === 0)
        {
            k++
            this.state.matrixA[k] = []
        }
        this.state.matrixA[k].push(parseFloat(convert[i]))
     }

     convert = this.state.stringmatrixB.split(' ')
     for(var i = 0,k = -1 ; i < convert.length ; i++)
     {
        if(i % 1 === 0)
        {
            k++
            this.state.matrixB[k] = []
        }
        this.state.matrixB[k].push(parseFloat(convert[i]))
     }
    }
     
     var calculateGaussJordan = this.state.matrixA
     var calculateGaussJordanB = this.state.matrixB
     for( i = 0 ; i < this.state.Row ; i ++)
     {
        for (var j = i ; j < this.state.Colum ; j ++)
        {
          calculateGaussJordan = subset(calculateGaussJordan , index(i,j) , (subset(calculateGaussJordan,index(i,j))/subset(this.state.matrixA , index(i,i))))
          //console.log("for j round i A",i+1 ," ",calculateCamersRule)
        }
          
          calculateGaussJordanB = subset(calculateGaussJordanB , index(i,0) , (subset(calculateGaussJordanB,index(i,0))/subset(this.state.matrixA , (index(i,i)))))
          //console.log("for j round i B",i+1 ," ",calculateCamersRuleB)
          for (var k = i + 1 ; k <= this.state.Row - 1 ; k++)
        {
          //console.log("k :",k)
          for(var l = 0 ; l < this.state.Colum ; l++)
          { 
            //console.log("l :",l + 1)
            calculateGaussJordan = subset(calculateGaussJordan , index(k  , l),(subset(this.state.matrixA , index(k , l)) - (subset(calculateGaussJordan,index(i  ,l)) * subset(this.state.matrixA , index(k  , i)))))
            //console.log("A",calculateCamersRule)
          }
            calculateGaussJordanB = subset(calculateGaussJordanB , index(k  , 0),(subset(this.state.matrixB , index(k,0)) - (subset(calculateGaussJordanB,index(i ,0)) * subset(this.state.matrixA , index(k , i))) ))
           //console.log("B",calculateCamersRuleB)
        }
        this.state.matrixA = calculateGaussJordan
        this.state.matrixB = calculateGaussJordanB
     }
     var x = [] , sum , cal;
     for( i = 0 ; i < this.state.Row  ; i ++)
     {
        x[i] = 0;
        
     }
     for ( i = this.state.Row - 1 ; i > 0 ; i --)
     { 
            
       for ( j = i - 1 ; j >= 0; j --)
       {
           
        this.state.matrixA = subset(this.state.matrixA , index(j , i) , (subset(this.state.matrixA , index(j , i)) - (subset(this.state.matrixA , index(i,i)) * subset(this.state.matrixA , index(j , i)))))
        this.state.matrixB = subset(this.state.matrixB , index(j  , 0),( subset(this.state.matrixB , index(j , 0)) - (subset(this.state.matrixB, index(i ,0)) * subset(calculateGaussJordan, index(j , i)))))
        console.log(this.state.matrixB)
       }
       x[i] = subset(this.state.matrixB , index(i  , 0)).toFixed(6)
     }
       x[i] = subset(this.state.matrixB , index(i  , 0)).toFixed(6)
     statusExample = 0;
     this.setState({showTable:true,showMatrix:true})
     this.createTable(x)
  }
  onReset ()
  {
      this.setState({matrixA:[],matrixB:[],Row:0,Colum:0,showTable:false})
  }
  /* function เอาค่าที่หาได้ยัดลง Array dataIntable*/
  createTable(x) {
    for (var i = 0; i < x.length; i++) {
        dataInTable.push({
            i : i+1,
            x : x[i]
        });
    }
}
     /* Graph(xl, xr)
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
*/
    render()
    {
      /*var fx = this.state.function
      let layout = {                     
        title: 'Bisection',  
        xaxis: {                  
          title: 'X'         
        }
      };
      let config = {
        showLink: false,
        displayModeBar: true
      };*/
    return(
        <React.Fragment>
        <div width={10000}>
            <h1 style={Textstyle} className="text-white">Gauss Jordan</h1>
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
                    <Form.Group as={Col} controlId="Row">
                        <Form.Label column sm="1"><h2 className="text-white">Row</h2></Form.Label> 
                        <Col sm="5">
                        <Form.Control type="text"   placeholder={"Row " + "|" + " " + this.state.Row} onChange={this.onChangeRow}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Colum">
                        <Form.Label column sm="1"><h2 className="text-white">Colum</h2></Form.Label>
                        <Col sm="5">
                            <Form.Control type="text"  placeholder={"Colum" + "|" + " " + this.state.Colum}  onChange={this.onChangeColum}/>
                        </Col>
                    </Form.Group>
            </Form.Row>
                  <Form.Label column sm="2">
                  <h2 className="text-white">matrixA</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text"   placeholder={"MatrixA " + "|" + " " + "-2,3,1,3,4,-5,1,-2,1"}  onChange={this.onChangeMatrixA}/>
                  </Col>
                  <Form.Label column sm="2">
                  <h2 className="text-white">matrixB</h2>
                  </Form.Label>
                  <Col sm="2">
                    <Form.Control type="text"   placeholder={"MatrixB " + "|" + " " + "9,0,-4"} onChange={this.onChangeMatrixB}/>
                  </Col>
                  <Form.Group as={Col} controlId="matrix">
                  <div>
                    <Button variant="success" onClick={this.onSubmit}>Submit</Button>
                    <Button variant="secondary" onClick={this.onReset}>Reset</Button>
                    <Button variant="danger" onClick={this.onExample}>Example</Button>
          </div>
          </Form.Group>
          
</Form>
{this.state.showMatrix === true ? this.state.matrixA.map(matrix => <div><h1 className="text-white">{"A[" + nA++ + "]:" + matrix + " " + " "}</h1></div>)  : ''}
{this.state.showMatrix === true ? this.state.matrixB.map(matrix => <div><h1 className="text-white">{"B[" + nB++ + "]:" + matrix + " " + " "}</h1></div>)  : ''}
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
{/*this.state.showGrap === true ? 
  <PlotlyComponent  data={data} Layout={layout} config={config} /> : ''
    */}
        </div>
        </React.Fragment>
    );
    }
}

export default GaussJordan;
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
