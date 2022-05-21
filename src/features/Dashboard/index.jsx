import React from "react";
import Header from '../../components/Header'
import HeaderRight from '../../components/Header/HeaderRightAction'
import IconBack from "../../assets/icons/IconBack";
import IconAdd from '../../assets/icons/IconAdd'
function Dashboard(){
   return(
      <div>
         <Header title="Dashboard" 
         rightComponent={
            
            <HeaderRight icon={<IconAdd/>} />
         }/>
         <h1>Dashboard</h1>
      </div>
   )
}
export default Dashboard;