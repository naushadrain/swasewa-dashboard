import React from "react";
import Layout from "../components/Layout";

const DashboardPage = () => {
  const stats = [
    { title: "Total Users", icon: "fa-users", color: "primary" },
    { title: "New Messages", icon: "fa-envelope", color: "success" },
    { title: "Active Sessions", icon: "fa-signal", color: "info" },
    { title: "Errors", icon: "fa-exclamation-triangle", color: "danger" },
    { title: "New Signups", icon: "fa-user-plus", color: "warning" },
    { title: "Revenue", icon: "fa-dollar", color: "secondary" },
  ];

  return (
    <Layout>
      <h4 className="mb-4 fw-bold">Dashboard Overview</h4>
      <div className="row">
        {stats.map((item, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <div className={`card border-${item.color} shadow-sm`}>
              <div className="card-body d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="text-muted">{item.title}</h6>
                  <h4 className="fw-bold">{Math.floor(Math.random() * 1000)}</h4>
                </div>
                <i className={`fa ${item.icon} fa-2x text-${item.color}`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;
