import React from "react";
import { useLocation } from "react-router-dom";
// import { Typography, Divider } from "antd";

const ErrorPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let msg = params.get("msg");
  if (msg) {
    // Capitalize
    msg = msg.charAt(0).toUpperCase() + msg.slice(1);
  } else {
    // Somehow redirected to this page
    msg = "Not Found";
  }
  params.delete("msg");

  return (
    <div
      className="site-layout-background"
      style={{ marginTop: 16, padding: 24 }}
    >
      <div style={{ textAlign: "center" }}>
        {msg}
        <br />
        There's an error with the page you've requested
        <br />
        <br />
        If you've got any troubles with the page - please report to Quizcraft Team.
        <br />
      </div>
    </div>
  );
};

export default ErrorPage;
