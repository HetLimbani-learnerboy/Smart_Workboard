import React, { useEffect, useState } from "react";
import "./Analytics.css";
import axios from "axios";
import {
  PieChart, Pie, Cell, Tooltip, LineChart, Line,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area, Legend
} from "recharts";
import { Link } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsPage = () => {
  const [turnover, setTurnover] = useState([]);
  const [growth, setGrowth] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [attrition, setAttrition] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5021/getanalytics").then((res) => {
      setTurnover(res.data.turnover || []);
      setGrowth(res.data.growth || []);
      setRevenue(res.data.revenue || []);
      setAttrition(res.data.attrition || []);
    });
  }, []);

  return (
    <div className="analytics-container">
      <h1 className="analytics-title">📈 Company Analytics Dashboard</h1>

      {/* Turnover Pie Chart */}
      <div className="chart-card">
        <div className="chart-heading">Company Turnover by Department (%)</div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={turnover}
              dataKey="value"
              nameKey="department"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
              isAnimationActive={true}
              animationDuration={1800}
            >
              {turnover.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Bar Chart */}
      <div className="chart-card">
        <div className="chart-heading">Quarterly Revenue (₹)</div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="revenue"
              fill="#8884d8"
              barSize={60}
              radius={[10, 10, 0, 0]}
              isAnimationActive={true}
              animationDuration={2000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Growth Line Chart */}
      <div className="chart-card">
        <div className="chart-heading">Monthly Employee Growth</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="employees"
              stroke="#00C49F"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
              isAnimationActive={true}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Attrition Area Chart */}
      <div className="chart-card">
        <div className="chart-heading">Attrition Rate (Simulated %)</div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={attrition}>
            <defs>
              <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff7300" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ff7300" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#ff7300"
              fillOpacity={1}
              fill="url(#colorRate)"
              isAnimationActive={true}
              animationDuration={1600}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <Link to="/adminpage" className="itisbackbutton">Back</Link>
    </div>
  );
};

export default AnalyticsPage;

