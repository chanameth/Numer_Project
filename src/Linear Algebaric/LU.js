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

class LU extends Component
{ 
  constructor()
  {
    super();
    this.state={function:" ",Xr:0,Xl:0,X:0,stringmatrixA:"",stringmatrixB:"",matrixA:[],matrixB:[],ans:[],Row:0,Colum:0,showGrap:false,showTable:false}
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
    await api.getFunctionByName("LU").then(db => {
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
        if(i % this.state.Colum === 0)
        {
            k++
            this.state.matrixA[k] = []
        }
        this.state.matrixA[k].push(parseFloat(convert[i]))
     }
     //console.log(this.state.matrixA)
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
    var Y = [0,0,0] , X = [0,0,0] , L = [] , U = [] , B = this.state.matrixB
    for( var i = 0,k = -1 ; i < (this.state.Row*this.state.Colum) ; i++)
     {
        if(i % this.state.Colum === 0)
        {
            console.log(i)
            k++
            L[k] = []
            U[k] = []
        }
        L[k].push(0)
        U[k].push(0)
     }
     console.log(L)
     console.log(U)
     for( i = 0 ; i < this.state.Row ; i ++)
     {
      for (var j = 0 ; j < this.state.Row ; j ++)
      {
        if(i === j)
        {
          U = subset(U , index(i,j) , 1)
        }
        else if(i < j)
        {
          U = subset(U , index(i,j) , (subset(this.state.matrixA,index(i,j))))
        }
        if(j <= i)
        {
          L = subset(L , index(i,j) , (subset(this.state.matrixA,index(i,j))))
        }
      }
     }
     for(k=0;k<this.state.Row;k++){
      for(i=0;i<this.state.Row;i++){
          for(j=0;j<this.state.Row;j++){
              if(i>k){
                  if(j!==k){
                    U = subset(U , index(k,i) , ((subset(U,index(k,i)) - (subset(L,index(k,j)) * subset(U,index(j,i))))))
                  }
              }
              else{
                  if(j!==i){
                    if(i == 2 && k == 2)
                    {
                      console.log(L[k][j] + "*" + U[j][i])
                    }
                     L = subset(L , index(k,i) , ((subset(L,index(k,i)) - (subset(L,index(k,j)) * subset(U,index(j,i))))))
                  
                      
                  }
              }
          }
          if(k < i)
          {
            U = subset(U , index(k,i) , ((subset(U,index(k,i)) / subset(L,index(k,k)))))
              
          }
      }
  }
  console.log(L)
  console.log(U)
  for(i=0;i<this.state.Row;i++){
      Y[i] = (B[i] / L[i][i]).toFixed(6)
      for(j=i+1;j<this.state.Row;j++){
        console.log(L[j][i] + "*" + Y[i])
        B[j] -= L[j][i] * Y[i];
      }
  }
  console.log(Y)
  for(i=this.state.Row-1;i>=0;i--) {
      X[i] = (Y[i] / U[i][i]).toFixed(6)
      for (j =i-1;j>=0;j--){
          Y[j] -= U[j][i] * X[i];
      }
  }
  console.log(X)
     statusExample = 0;
     this.setState({showTable:true})
     this.createTable(X)
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
    console.log(this.state.matrixB)
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
            <h1 style={Textstyle} className="text-white">LU</h1>
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
                    <Form.Control type="text"   placeholder={"MatrixA " + "|" + " " + this.state.matrixA}  onChange={this.onChangeMatrixA}/>
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
export default LU;
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
