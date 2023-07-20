import NotFound from "./components/NotFound";
import StackForm from "./components/StackForm";
import { AuthProvider } from "./contexts/AuthContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoutes from "./routing/PrivateRoutes";
import SignInForm from "./components/auth/SignInForm";
import SignUpForm from "./components/auth/SignUpForm";
import DataDash from "./components/DataDash";
import RequestTable from "./components/admin/RequestTable";
import { QueryProvider } from "./contexts/QueryContext";
import AdminRoutes from "./routing/AdminRoutes";
import PendingRequests from "./components/admin/PendingRequests";
import EnterNew from "./components/EnterNew";

function App() {
  return (
    <div className="App">
      <Router>
        <QueryProvider>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<SignInForm />} />
              <Route path="/signup" element={<SignUpForm />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/testForm" element={<StackForm />} />
                <Route path="/dataDash" element={<DataDash />} />
                <Route path='/enterNew' element={<EnterNew />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/reqTable" element={<RequestTable />} />


                <Route element={<AdminRoutes />}>
                  <Route path="/pendingTable" element={<PendingRequests />} />
                </Route>

              </Route>
            </Routes>
          </AuthProvider>
        </QueryProvider>
      </Router>
    </div>
  );
}

export default App;
