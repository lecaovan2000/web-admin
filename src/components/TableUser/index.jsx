import { Button, Space, Switch } from 'antd';
import IconEyeViewDetail from '@/assets/icons/IconEyeViewDetail';
import Confirm from '@/components/Confirm';
import SuperTable from '@/components/SuperTable';
import UserStatus from '@/constants/enums/UserStatus';
import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';
import { tableUtil } from '@/utils/table';

const UsersTable = memo((props) => {
   const { dataSource, loading, pagination, onPaginate, onStatusChange, onViewUser,
      handleSearch, handleReset,
      onTableChange
   } = props

   const columns = useMemo(() => {
      return [
         {
            title: 'Tên',
            dataIndex: 'full_name',
            key: 'full_name',
            ellipsis: true,
            width: 200,
            ...tableUtil.GetColumnSearchProps('full_name', handleSearch, handleReset),
            sorter: {
               multiple: 1
            },
         },
         {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
            width: 250,
            render: (value) => <span className="color--text-2">{value}</span>,
            ...tableUtil.GetColumnSearchProps('email', handleSearch, handleReset),
            sorter: {
               multiple: 1
            },

         },
         {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            ellipsis: true,
            width: 100,
            render: (_, record) => {
               if (!record.active) {
                  return <span className="color--text-2">Chờ active</span>
               }
               return record.locked
                  ? <span className="color--danger">Khóa</span>
                  : <span className="color--primary">Hoạt động</span>
            },
            filters: [
               {
                  text: 'Available',
                  value: UserStatus.AVAILABLE,
               },
               {
                  text: 'Lock',
                  value: UserStatus.LOCKED,
               },
            ]
         },
         {
            title: 'Màn chơi',
            dataIndex: 'man_choi',
            key: 'man_choi',
            width: 100,
            render: (value) => <span className="color--text-2">{value !== null && value !== undefined ? value : 'N/A'}</span>
         },
         {
            title: 'XP',
            dataIndex: 'xp',
            key: 'xp',
            width: 80,
            render: (value) => <span className="color--text-2">{value !== null && value !== undefined ? value : 'N/A'}</span>
         },
         {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
            render: (value) => {
               if (value === 'male' || value === 'MALE') return <span className="color--primary">Nam</span>
               else if (value === 'female' || value === 'FEMALE') return <span className="color--danger">Nữ</span>
               else return <span className="color--text-2">{value || 0}</span>
            },
            filters: [
               {
                  text: 'Nam',
                  value: 'MALE',
               },
               {
                  text: 'Nữ',
                  value: 'FEMALE',
               },
               {
                  text: 'Khác',
                  value: 'OTHER',
               },
               {
                  text: 'NOT USED',
                  value: 'NOT USED',
               },
            ],
         },
         {
            title: 'Trình độ',
            dataIndex: 'level',
            key: 'level',
            width: 150,
            align: 'center',
            render: (value) => <span className="color--text-2">{value !== null && value !== undefined ? value : 'N/A'}</span>
         },
         {
            title: 'Ngày tham gia',
            dataIndex: 'joined_at',
            key: 'joined_at',
            width: 150,
            render: (value) => <span className="color--text-2">{value !== null && value !== undefined ? value : 'N/A'}</span>,
            sorter: {
               multiple: 1
            },
         },
         {
            title: 'Ngày sinh',
            dataIndex: 'date_of_birth',
            key: 'date_of_birth',
            width: 150,
            sorter: {
               multiple: 1
            },
         },
         {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (_, record) => (
               <Space>
                  <Confirm
                     className="confirm-modal"
                     onConfirm={() => handleChangeStatusUser(record)}
                     placement="bottomRight"
                     message={`Are you sure to ${!record.locked ? 'de' : ''}active ${record.full_name || ''}?`}
                  >
                     <Switch
                        checked={!record.locked}
                     />
                  </Confirm>

                  <Button
                     className="btn--no-outline"
                     shape="circle"
                     size="large"
                     icon={<IconEyeViewDetail />}
                     onClick={() => { onViewUser(record) }}
                  />
               </Space>
            )
         },
      ];
   }, [dataSource])

   const handleChangeStatusUser = (record) => {
      if (onStatusChange) {
         onStatusChange(record);
      }
   }

   return (
      <SuperTable
         rowKey={(record) => record.uid + record.username}
         columns={columns}
         dataSource={dataSource}
         scroll={{ x: 'max-content', y: true }}
         submitting={loading}

         hasPagination={pagination && onPaginate}
         pagination={pagination}
         onPaginate={onPaginate}

         onChange={onTableChange}
      />
   );
})

UsersTable.propTypes = {
   dataSource: PropTypes.array.isRequired,
   loading: PropTypes.bool,
   pagination: PropTypes.object.isRequired,
   onPaginate: PropTypes.func.isRequired,
   onStatusChange: PropTypes.func.isRequired,
   onViewUser: PropTypes.func.isRequired,
};

export default UsersTable;