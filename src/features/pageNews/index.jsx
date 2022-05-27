import React from "react";
import Header from '../../components/Header'
import HeaderRight from '../../components/Header/HeaderRightAction'
import IconBack from "../../assets/icons/IconBack";
import IconAdd from '../../assets/icons/IconAdd'
import NewsList from "./page/newsList";
function TestRouting(){
   return(
      <div>
         <Header title="Project" 
         rightComponent={
            
            <HeaderRight icon={<IconAdd/>} />
         }/>
         <NewsList/>
      </div>
   )
}
export default TestRouting;