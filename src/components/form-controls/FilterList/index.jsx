import React from 'react'
import './style.scss'
FilterList.propTypes = {}

function FilterList(props) {
   const { list, selected, handleClick } = props
   const onClickOrgan = e => {
      if (!e.target.classList.contains('active_ant')) {
         handleClick(e.target.dataset.value)
      }
   }
   return (
      <>
         <div className="groupbutton">
            {list.map(item =>
               item.value === selected ? (
                  <button
                     className="filter active_ant"
                     data-value={item.value}
                     onClick={onClickOrgan}
                  >
                     {item.label}
                  </button>
               ) : (
                  <button className="filter" data-value={item.value} onClick={onClickOrgan}>
                     {item.label}
                  </button>
               ),
            )}
         </div>
      </>
   )
}
export default FilterList
