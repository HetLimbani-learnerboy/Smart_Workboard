import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Adminnavigateprotected = () => {
    const adminlocation = navigator('/adminhomepage')
    return adminlocation === "true" ? <Outlet /> : <Navigate to="/adminverification" />;
}
export default Adminnavigateprotected;