import React from "react";
import ListUser from "./page/listUser";
import { Switch,Route, useRouteMatch } from "react-router";
import DetailUser from "./page/detailUser";
function User(){
   const match = useRouteMatch()
   return(
      <Switch>
         <Route exact path={match.url}  component={ListUser} />
         <Route path={`${match.url}/:userUid`} component={DetailUser} />
      </Switch>
   )
}
export default User;