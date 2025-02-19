import React, { useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const Chart = () => {
  const [userTypeData, setUserTypeData] = useState([]);
  const [userCount, setUserCount] = useState(0);

  const fetchUserData = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userCount = storedUsers.length;

    setUserTypeData([
      { name: "Users", value: userCount, color: "#3f51b5" },
      { name: "Admins", value: 1, color: "#f50057" },
    ]);

    setUserCount(userCount);
  };

  useEffect(() => {
    fetchUserData();
    const interval = setInterval(() => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (storedUsers.length !== userCount) {
        fetchUserData();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [userCount]);

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 'none', height: '100%' }}>
      <Typography variant="h5" gutterBottom>
        User Type Distribution
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={userTypeData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="70%"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {userTypeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default Chart;
