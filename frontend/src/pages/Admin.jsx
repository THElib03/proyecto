import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  const adminSections = [
    {
      title: 'Buses',
      description: 'Manage bus fleet and details',
      path: '/admin/buses',
      icon: '🚌',
    },
    {
      title: 'Routes',
      description: 'Manage travel routes and schedules',
      path: '/admin/routes',
      icon: '🗺️',
    },
    {
      title: 'Stations',
      description: 'Manage stations and locations',
      path: '/admin/stations',
      icon: '🏢',
    },
  ]

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage buses, routes, and stations</p>
      </div>

      <div className="grid grid-3">
        {adminSections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{section.icon}</div>
              <div className="card-header">
                <h3>{section.title}</h3>
              </div>
              <div className="card-body">
                <p>{section.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Admin