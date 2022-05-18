import { Avatar, Badge, Popover, Tooltip } from 'antd'
import IconChat from '@/assets/icons/IconChat'
import IconEvent from '@/assets/icons/IconEvent'
import IconExpand from '@/assets/icons/IconExpand'
import IconFile from '@/assets/icons/IconFile'
import IconMenuExpand from '@/assets/icons/IconMenuExpand'
import IconNoti from '@/assets/icons/IconNoti'
import IconPencil from '@/assets/icons/IconPencil'
import IconUser from '@/assets/icons/IconUser'
import React, { useMemo, useState, useCallback } from 'react'
import { NavLink, useLocation, withRouter, useHistory } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import IconMenuCollapse from '@/assets/icons/IconMenuCollapse'
import IconEventActive from '@/assets/icons/IconEventActive'
import IconFileActive from '@/assets/icons/IconFileActive'
import IconNotiActive from '@/assets/icons/IconNotiActive'
import IconUserActive from '@/assets/icons/IconUserActive'
import IconChatActive from '@/assets/icons/IconChatActive'
import IconPencilActive from '@/assets/icons/IconPencilActive'
import IconExpandActive from '@/assets/icons/IconExpandActive'
import { path } from '@/constants/path'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/app/authSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import LoggedUserDetailModal from '../LoggedUserDetailModal'
import { AreaChartOutlined, BarChartOutlined } from '@ant-design/icons'

SideBar.propTypes = {}

function SideBar(props) {
   const unreadNoti = useSelector(state => state.notification.numberUnread)
   const { isCollapsed, onCollapseClick, currentUser } = props
   const [isCurrentUserModalOpen, setIsCurrentUserModalOpen] = useState(false)
   const [isPopoverVisible, setIsPopoverVisible] = useState(false)

   const location = useLocation()
   const dispatch = useDispatch()
   const history = useHistory()

   const comparePath = (pathname, routeLink) => {
      return pathname.split('/')[1] === routeLink.substring(1)
   }
   const sidebarItems = useMemo(() => {
      return [
         {
            routeLink: path.root,
            label: 'Overview',
            icon: <BarChartOutlined style={{ fontSize: 24, color: 'inherit' }} />,
            iconActive: <AreaChartOutlined style={{ fontSize: 24, color: '#1768b2' }} />
         },
         {
            routeLink: path.event,
            label: 'Events',
            icon: <IconEvent />,
            iconActive: <IconEventActive />
         },
         {
            routeLink: path.room,
            label: 'Rooms',
            icon: <IconEvent />,
            iconActive: <IconEventActive />
         },
         {
            routeLink: path.leaderboard,
            label: 'Leaderboard',
            icon: <IconEvent />,
            iconActive: <IconEventActive />
         },
         {
            routeLink: path.group,
            label: 'Groups',
            icon: <IconFile />,
            iconActive: <IconFileActive />
         },
         {
            routeLink: path.notification,
            label: 'Notifications',
            icon: <IconNoti />,
            iconActive: <IconNotiActive />,
            notiCount: unreadNoti
         },
         {
            routeLink: path.user,
            label: 'Users',
            icon: <IconUser />,
            iconActive: <IconUserActive />
         },
         {
            routeLink: path.article,
            label: 'Article',
            icon: <IconChat />,
            iconActive: <IconChatActive />
         },
         {
            routeLink: path.content,
            label: 'Contents',
            icon: <IconPencil />,
            iconActive: <IconPencilActive />
         },
         {
            routeLink: path.challenge,
            label: 'Challenges',
            icon: <IconExpand />,
            iconActive: <IconExpandActive />
         },
         {
            routeLink: path.hanakid,
            label: 'HanaKid',
            icon: <IconUser />,
            iconActive: <IconUserActive />
         }
      ]
   }, [unreadNoti])

   const renderSideBarItems = () => {
      return sidebarItems.map(sidebarItem =>
         isCollapsed ? (
            <Tooltip
               placement="right"
               title={sidebarItem.label}
               mouseEnterDelay={0}
               mouseLeaveDelay={0}
               key={sidebarItem.routeLink}
            >
               <div className={`sidebar__menu-item`}>
                  <NavLink exact to={sidebarItem.routeLink} className="menu-item__link">
                     <Badge
                        className="menu-item__icon"
                        size="small"
                        overflowCount={99}
                        count={sidebarItem.notiCount || 0}
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
                     count={sidebarItem.notiCount || 0}
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

   return (
      <div className={`sidebar__container ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
         <div className="sidebar__nav">
            <div className="sidebar__header">
               <div className="sidebar__header-icon" onClick={handleCollapseSideBar}>
                  {isCollapsed ? <IconMenuCollapse /> : <IconMenuExpand />}
               </div>
               <div>
                  <img
                     alt=""
                     src={logo}
                     className={`sidebar__header-logo ${isCollapsed ? 'd-none' : 'fade-in'}`}
                  />
               </div>
            </div>
            <div className="sidebar__menu">{renderSideBarItems()}</div>
         </div>

         <div className="sidebar__user">
            <Popover
               className="sidebar__user-popover"
               trigger="click"
               placement="topLeft"
               visible={isPopoverVisible}
               onVisibleChange={() => {
                  setIsPopoverVisible(!isPopoverVisible)
               }}
               content={
                  <div className="sidebar__user--hover">
                     <div
                        onClick={() => {
                           setIsPopoverVisible(!isPopoverVisible)
                           setIsCurrentUserModalOpen(!isCurrentUserModalOpen)
                        }}
                        className="btn__view-account color--primary"
                     >
                        Tài khoản
                     </div>
                     <div
                        onClick={async () => {
                           const resultAction = await dispatch(logout())
                           unwrapResult(resultAction)
                           history.push(path.login)
                        }}
                        className="btn__logout color--danger"
                     >
                        Đăng xuất
                     </div>
                  </div>
               }
            >
               <div className="sidebar__user-avatar">
                  <Avatar
                     size={40}
                     src={currentUser.small_avatar_url || 'https://joeschmoe.io/api/v1/random'}
                     style={{
                        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                        cursor: 'pointer'
                     }}
                  />
               </div>
            </Popover>
         </div>

         <LoggedUserDetailModal
            isOpen={isCurrentUserModalOpen}
            toggle={() => {
               setIsCurrentUserModalOpen(!isCurrentUserModalOpen)
            }}
            data={currentUser}
         />
      </div>
   )
}

export default withRouter(SideBar)
