'use client';

import React from 'react';
import TaskManager from './TaskManager';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="main-content">
        <header className="dashboard-header">
          <h1>Your Task Mananger Hub</h1>
          <div className="user-info">
          </div>
        </header>
        <section className="content">
          <TaskManager />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
