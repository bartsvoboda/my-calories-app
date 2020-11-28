import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";


import UserStatus from './components/user-status.component';
import UserData from './components/user-data.component';
import UserEdit from './components/user-edit.component';
import UserDeleteAccount from './components/delete-user.component';
import AddFood from './components/add-food.component';
import AddExercise from './components/add-exercises.component';
import CreateUser from './components/create-user.component';
import EditExercise from './components/edit-exercise.component';
import EditFood from './components/edit-food.component';
import Login from './components/login.component';
import Register from './components/register.component';
import CaloriesDiary from './components/diary.component';


function App() {
  return (
    <Router>
       <div className="container">
        <Route path="/user/status" exact component= {UserStatus} />
        <Route path="/user/data" exact component ={UserData} />
        <Route path="/user/edit" exact component ={UserEdit} />
        <Route path="/user/delete" exact component ={UserDeleteAccount} />
        <Route path="/food/add" exact component ={AddFood} />
        <Route path="/exercise/add" exact component ={AddExercise} />
        <Route path="/user/add" exact component ={CreateUser} />
        <Route path="/exercise/edit/:id" exact component = {EditExercise} />
        <Route path="/food/edit/:id" exact component = {EditFood} /> 
        <Route path="/register" exact component ={Register} />
        <Route path="/" exact component = {Login} />
        <Route path="/diary" exact component = {CaloriesDiary} />
      </div>
    </Router>
     
  );
}

export default App;