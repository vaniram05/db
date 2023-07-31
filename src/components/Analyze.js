import React, { useEffect, useState } from 'react'
import { useGraph } from '../contexts/GraphContext';
import { useLocation } from 'react-router-dom';
import { Container, Divider, Header } from 'semantic-ui-react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ScatterChart, Scatter, Label } from 'recharts';

function Analyze() {
  const { state } = useLocation();
  const { stackName } = state;

  const { getStack } = useGraph();
  const [myData, setData] = useState('');

  const getMyStack = async () => {
    const editedName = stackName.toLowerCase().replace(/\s+/g, '')
    const { data, error } = await getStack(editedName);
    if (data) {
      setData(data);
      console.log(JSON.parse(JSON.stringify(data)))
    }
  }

  useEffect(() => {
    getMyStack();
  }, []);

  return (
    <Container>
      <Header as='h1'>{stackName} Graphs</Header>
      <Divider></Divider>
      {myData ? <>
      {/* pol curve */}
        <div>
          <h2>&nbsp;&nbsp;Pol Curve: </h2>
          <ScatterChart
            width={400}
            height={400}
            margin={{
              right: 20, bottom: 30, left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" domain={[0.0, 2.0]} ticks={[0, 0.20, 0.40, 0.60, 0.80, 1, 1.20, 1.40, 1.60, 1.80, 2.0]} dataKey="Current Density(A/cm2)">
              <Label value="Current Density(A/cm2)" offset={-20} position="insideBottom" style={{ fontSize: 20 }} />
            </XAxis>
            <YAxis type="number" dataKey="Voltage per Cell(V)" range={[1.0, 2.0]} tickFormatter={(value) => value.toFixed(2)}>
              <Label value="Voltage per Cell(V)" angle={-90} style={{ fontSize: 20 }} dx={-20} />
            </YAxis>
            <Scatter data={myData} fill="#8884d8" />

            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          </ScatterChart>
        </div>
        {/* dropdown */}
        <div>
          <ScatterChart
            width={400}
            height={400}
            margin={{
              right: 20, bottom: 30, left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="number" dataKey="Time">
              <Label value="Time" offset={-20} position="insideBottom" style={{ fontSize: 20 }} />
            </XAxis>
            <YAxis type="number" dataKey="Cell HFR(ohm.cm2)" range={[1.0, 2.0]} tickFormatter={(value) => value.toFixed(2)}>
              <Label value="Voltage per Cell(V)" angle={-90} style={{ fontSize: 20 }} dx={-20} />
            </YAxis>
            <Scatter data={myData} fill="#8884d8" />

            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          </ScatterChart>
        </div>
      </> : <></>}
    </Container>
  )
}

export default Analyze