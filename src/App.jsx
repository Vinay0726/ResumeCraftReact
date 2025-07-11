import "./App.css";
import { Route, Routes } from "react-router-dom";
import CustomersRouters from "./routers/CustomersRouters";
import AdminRouters from "./routers/AdminRouters";

function App() {
  return (
    <div className="h-full w-full">

      <Routes>
        {/* Customer routes */}
        <Route path="/*" element={<CustomersRouters />} />

        {/* Admin routes - prefixed with /admin */}
        <Route path="/admin/*" element={<AdminRouters />} />
      </Routes>
    </div>
  );
}

export default App;
