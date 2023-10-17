import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    Total: 4000,
    Functioanl: 2400,
    Disfunctional: 2400,
  },
  {
    name: 'Page B',
    Total: 3000,
    Functioanl: 1398,
    Disfunctional: 2210,
  },
  {
    name: 'Page C',
    Total: 2000,
    Functioanl: 9800,
    Disfunctional: 2290,
  },
  {
    name: 'Page D',
    Total: 2780,
    Functioanl: 3908,
    Disfunctional: 2000,
  },
  {
    name: 'Page E',
    Total: 1890,
    Functioanl: 4800,
    Disfunctional: 2181,
  },
  {
    name: 'Page F',
    Total: 2390,
    Functioanl: 3800,
    Disfunctional: 2500,
  },
  {
    name: 'Page G',
    Total: 3490,
    Functioanl: 4300,
    Disfunctional: 2100,
  },
  {
    name: 'Page A',
    Total: 4000,
    Functioanl: 2400,
    Disfunctional: 2400,
  },
  {
    name: 'Page B',
    Total: 3000,
    Functioanl: 1398,
    Disfunctional: 2210,
  },
  {
    name: 'Page C',
    Total: 2000,
    Functioanl: 9800,
    Disfunctional: 2290,
  },

  {
    name: 'Page E',
    Total: 1890,
    Functioanl: 4800,
    Disfunctional: 2181,
  },
  {
    name: 'Page F',
    Total: 2390,
    Functioanl: 3800,
    Disfunctional: 2500,
  },
  {
    name: 'Page G',
    Total: 3490,
    Functioanl: 4300,
    Disfunctional: 2100,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/mixed-bar-chart-q4hgc';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={260}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid /> */}
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Functioanl" stackId="a" fill="#65A30D" />
          <Bar dataKey="Disfunctional" stackId="b" fill="#F97316" />
          <Bar dataKey="Total" stackId="c" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
