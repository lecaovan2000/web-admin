import {React, useState} from 'react'
import SideBar from '../../components/SideBar';
import { Route, Switch, withRouter} from 'react-router-dom'
import { path} from '../../constants/path.js';
import User from '../User';
// import TestRouting from '../TestRouting';
import pageNews from '../pageNews'
import Dashboard from '../Dashboard';

function LayoutRouter(props){
   const [collapseSidebar, SetCollapseSidebar] = useState(false)

   const handleOnCollapseClick = () => {
      SetCollapseSidebar(!collapseSidebar)
   }

   return(
      <div className={`main-page ${collapseSidebar ? 'close-menu' : ''}`}>
         <SideBar
            isCollapsed={collapseSidebar}
            onCollapseClick={handleOnCollapseClick}
         />
         <div className="content-container showed-page">
            <Switch>
               <Route exact  path={path.root} component={Dashboard} />
               <Route path={path.user} component={User} />
               <Route path={path.project} component={pageNews} />
               
            </Switch>
         </div>
      </div>
   )
}
export default withRouter(LayoutRouter);