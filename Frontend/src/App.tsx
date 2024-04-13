import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layouts/layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddBeverage from "./pages/AddBeverage";
import { useAppContext } from "./contexts/AppContext";
import MyBeverages from "./pages/MyBeverages";
import EditBeverage from "./pages/EditBeverage";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import CalorieCalculator from "./pages/CalorieCalculator";

const App = () => {
  const {isLoggedIn} = useAppContext();
  return(
    <Router>
      <Routes>

        <Route path="/" 
        element={
        <Layout>
          <Home/>
        </Layout>
        }></Route>

        <Route path="/calorieCalculator" 
        element={
          <Layout>
          <CalorieCalculator/>
        </Layout>
        }></Route>
        
        <Route path="/search" 
        element={
          <Layout>
          <Search/>
        </Layout>
        }></Route>

        <Route path="/detail/:beverageId" 
        element={
          <Layout>
          <Detail/>
        </Layout>
        }></Route>

        <Route 
          path="/register" 
          element={
            <Layout>
              <Register>
              </Register>
            </Layout>
          }></Route>

          <Route path="/sign-in" element = {
            <Layout>
              <SignIn></SignIn>
            </Layout>
          }>
            
          </Route>

        {isLoggedIn && (
        <>
          <Route path="/add-beverage" element ={
            <Layout>
              <AddBeverage/>
            </Layout>
          }/>

          <Route path="/my-beverages" element ={
            <Layout>
              <MyBeverages/>
            </Layout>
          }/>

          <Route path="/edit-beverage/:beverageId" element ={
            <Layout>
              <EditBeverage/>
            </Layout>
          }/>
        </>
        )}
        <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
      </Routes>
    </Router>
  )
};

export default App;