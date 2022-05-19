// import { Avatar, Badge, Popover, Tooltip } from 'antd'
import { Avatar, Tooltip,Badge, Popover } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation, withRouter } from 'react-router-dom'
import IconMenuCollapse from '../../assets/icons/IconMenuCollapse'
import IconMenuExpand from '../../assets/icons/IconMenuExpand'
import { path } from '../../constants/path'
import IconUser from '../../assets/icons/iconUser'
import IconUserActive from '../../assets/icons/iconUserActive' ;
// import {logout} from'../../view/auth/userSlice'
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
// import { utilsToken } from '../../utils/token'
// import userApi from '../../api/userApi'


SideBar.propTypes = {}

function SideBar(props) {
   const { isCollapsed, onCollapseClick,currentUser } = props
   const location = useLocation()
   // const history = useHistory()
   // const dispatch = useDispatch()
   // const inforUser = utilsToken.getAccessUser()
   // const newInfoUser = JSON.parse(inforUser)
   // const [infoUser, setInfoUser]=useState({})
   // const tokenUser = utilsToken.getAccessToken()
   // console.log(tokenUser)

   // const getInfoUser = async()=>{
   //    try {
   //       const response = await userApi.getProfileUserName(newInfoUser.uid)
   //       console.log("sibar user", response)
   //       setInfoUser(response.data)
   //    } catch (error) {
   //       console.log(error)
   //    }
   // }
   // useEffect(()=>{
   //    getInfoUser()
   // },[])

   const comparePath = (pathname, routeLink) => {
      return pathname.split('/')[1] === routeLink.substring(1)
   }
   const sidebarItems = useMemo(() => {
      return [
         {
            routeLink: path.root,
            label: 'Thông tin',
            icon: <IconUser />,
            iconActive: <IconUserActive/>
         },
         {
            routeLink: path.user,
            label: 'Dự án',
            icon: <IconUser />,
            iconActive: <IconUserActive />
         },

      ]
   }, [])

   const renderSideBarItems = () => {
      return sidebarItems.map(sidebarItem =>
         isCollapsed ? (
            <Tooltip
               placement='left'
               trigger='hover'
               title={sidebarItem.label}
               mouseEnterDelay={0.1}
               mouseLeaveDelay={0.1}
               key={sidebarItem.routeLink}
            >
                    <div className={`sidebar__menu-item`} key={sidebarItem.routeLink}>
                   <NavLink exact to={sidebarItem.routeLink} className="menu-item__link">
                      <Badge
                         className="menu-item__icon"
                         size="small"
                         overflowCount={99}
                      >
                         {comparePath(location.pathname, sidebarItem.routeLink)
                            ? sidebarItem.iconActive
                            : sidebarItem.icon}
                      </Badge>
                      {sidebarItem.label}
                   </NavLink>
                </div>
            </Tooltip>
         ) : (
            <div className={`sidebar__menu-item`} key={sidebarItem.routeLink}>
               <NavLink exact to={sidebarItem.routeLink} className="menu-item__link">
                  <Badge
                     className="menu-item__icon"
                     size="small"
                     overflowCount={99}
                  >
                     {comparePath(location.pathname, sidebarItem.routeLink)
                        ? sidebarItem.iconActive
                        : sidebarItem.icon}
                  </Badge>
                  {sidebarItem.label}
               </NavLink>
            </div>
         )
      )
   }

   const handleCollapseSideBar = () => {
      if (onCollapseClick) {
         onCollapseClick()
      }
   }
   const callBack=()=>{
      // history.push(paths.root)
   }

   return (
      <div className={`sidebar__container ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
         <div className="sidebar__nav">
            <div className="sidebar__header">
               <div className="sidebar__header-icon" onClick={handleCollapseSideBar}>
                  {isCollapsed ? <IconMenuCollapse /> : <IconMenuExpand />}
               </div>
            </div>
            <div className="sidebar__menu">{renderSideBarItems()}</div>
         </div>
         <div className="sidebar__user">
            <Popover
               className="sidebar__user-popover"
               trigger="click"
               placement="topLeft"
               content={
                  <div >
                     
                  </div>
               }
            >
               <div className="sidebar__user-avatar">
                  <Avatar
                     size={50}
                     src={ 'https://joeschmoe.io/api/v1/random'||''}
                     style={{
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        cursor: 'pointer'
                     }}
                  />
               </div>
            </Popover>
         </div>
      </div>
   )
}

export default withRouter(SideBar)
