import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

// import NavbarMenu from './components/navbarmenu.component';
import UserStatus from './components/user-status.component';
import UserData from './components/user-data.component';
import UserDataEdit from './components/edit-user-data.component';
import UserPasswordEdit from './components/edit-user-password.component';
import UserDeleteAccount from './components/delete-user.component';
import GetFoodDiary from './components/display-food-diary.component';
import AddFood from './components/add-food.component';
import AddExercise from './components/add-exercises.component';
import GetExercisesDiary from './components/display-exercises.component';
import CreateUser from './components/create-user.component';
import EditExercise from './components/edit-exercise.component';
import Login from './components/login.component';
import Register from './components/register.component';
// import AuthenticatedComponent from './components/auth.component';


function App() {
  return (
    <Router>
       <div className="container">
     
      
      <Route path="/user/data/" exact component ={UserData} />
      <Route path="/user/data/edit/:id" exact component ={UserDataEdit} />
      <Route path="/user/password/edit/:id" exact component ={UserPasswordEdit} />
      <Route path="/user/delete/:id" exact component ={UserDeleteAccount} />
      <Route path="/food/diary/:id" exact component ={GetFoodDiary} />
      <Route path="/food/diary/add/:id" exact component ={AddFood} />
      <Route path="/exercise/diary/add/:id" exact component ={AddExercise} />
      <Route path="/exercise/diary/:id" exact component ={GetExercisesDiary} />
      <Route path="/user/add" exact component ={CreateUser} />
      <Route path="/exercise/edit/:id" exact component = {EditExercise} />
      <Route path="/register" exact component ={Register} />
      <Route path="/" exact component = {Login} />
      <Route path="/user/status" component= {UserStatus} />
      </div>
    </Router>
     
  );
}

export default App;