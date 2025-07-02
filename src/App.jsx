import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import CriterionPage from "./pages/CriterionPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobsPage from "./pages/AppLayout";
import HomePage from "./pages/HomePage";
import Login from "./pages/loginPage";


import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import { JobsProvider } from "./contexts/JobsContexts";
import MustHaveCriteria from "./components/mustHaveCriteria";
import NiceToHaveCriteria from "./components/NiceToHaveCriteria";
import JobList from "./components/JobList";
import AddJobForm from "./components/AddJobForm";
import { AddJobProvider } from "./contexts/addJobContexts";
import EditJobForm from "./components/EditJobForm";
import AuthenticationPage from "./pages/AuthenticationPage";
import Signup from "./pages/SignUpPage.jsx";


function App() {
    
    return (
        <div className="app">
            <JobsProvider>
                <AddJobProvider>
                <BrowserRouter>
                    <Routes>
                            <Route path="/" element={< HomePage />} />

                            <Route path="/auth" element={<AuthenticationPage />}>
                           <Route index element={<Navigate replace to="login" />} />
                            <Route path="login" element={<Login />} />
                            <Route path="signup" element={<Signup />} />
                            </Route>

                            <Route path="criterion" element={<CriterionPage />}>
                            <Route index element={<Navigate replace to="must-have" />} />
                            <Route path="must-have" element={<MustHaveCriteria />} />
                            <Route path="nice-to-have" element={<NiceToHaveCriteria />} />
                        </Route>

                        <Route path="app" element={<ProtectedRoute><JobsPage /></ProtectedRoute>}>
                            <Route index element={<Navigate replace to="jobList" />} />
                            <Route path="jobList" element={<JobList />} />
                            <Route path="jobForm" element={<AddJobForm />} />
                            <Route path="jobForm/:id" element={<EditJobForm />} />
                            </Route>

                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
            </AddJobProvider>
            </JobsProvider>
        </div>
    );
}

  

export default App;
