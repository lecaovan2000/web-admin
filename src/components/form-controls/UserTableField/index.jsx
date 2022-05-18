import { Button, Form, Space } from 'antd';
import IconEyeViewDetail from '@/assets/icons/IconEyeViewDetail';
import IconTrash from '@/assets/icons/IconTrash';
import Confirm from '@/components/Confirm';
import SuperTable from '@/components/SuperTable';
import DetailUserModal from '@/features/User/components/DetailUserModal';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';

UserTableField.propTypes = {

};

function UserTableField(props) {
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [viewedUser, setViewedUser] = useState({});
   const [dataSource, setDataSource] = useState([]);
   const { loading, handleSearch, handleReset, searchedColumn,
      form, name, label, labelCol, rules, className, disabled, ...restProps } = props
   const { control, getValues, setValue } = form;
   const userList = getValues('list_user')

   const columns = useMemo(() => {
      return [
         {
            title: 'Tên',
            dataIndex: 'full_name',
            key: 'full_name',
            ellipsis: true,
            width: 200,
            fixed: 'left',
            //...getColumnSearchProps('full_name')
         },
         {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ellipsis: true,
            width: 250,
            render: (value) => <span className="color--text-2">{value}</span>,
            //...getColumnSearchProps('email')
         },
         {
            title: 'Màn chơi',
            dataIndex: 'man_choi',
            key: 'man_choi',
            width: 100,
            render: (value) => <span className="color--text-2">{value || 'N/A'}</span>
         },
         {
            title: 'XP',
            dataIndex: 'xp',
            key: 'xp',
            width: 80,
            render: (value) => <span className="color--text-2">{value || 'N/A'}</span>
         },
         {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            width: 100,
            render: (value) => {
               if (value === 'male' || value === 'MALE') return <span className="color--primary">Male</span>
               else if (value === 'female' || value === 'FEMALE') return <span className="color--danger">Female</span>
               else return <span className="color--text-2">{value || 'N/A'}</span>
            }
         },
         {
            title: 'Trình độ',
            dataIndex: 'level',
            key: 'level',
            width: 150,
            align: 'center',
            render: (value) => <span className="color--text-2">{value || 'N/A'}</span>
         },
         {
            title: 'Ngày tham gia',
            dataIndex: 'joined_at',
            key: 'joined_at',
            width: 200,
            render: (value) => <span className="color--text-2">{value || 'N/A'}</span>
         },
         {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            width: 150,
            render: (value) => <span className="color--text-2">{value || 'N/A'}</span>
         },
         {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (_, record, index) => (
               <Space>
                  {!disabled
                     && <Confirm
                        className="confirm-modal"
                        onConfirm={(e) => {
                           const newDataSource = [...dataSource]
                           newDataSource.splice(index, 1)
                           setValue(name, newDataSource)
                           setDataSource(newDataSource)
                        }}
                        placement="bottomRight"
                        message={`Are you sure to delete ${record.full_name || ''} from this challenge?`}
                     >
                        <Button
                           className="color--danger btn--no-outline "
                           shape="circle"
                           size="large"
                           icon={<IconTrash />}
                        />
                     </Confirm>
                  }

                  <Button
                     className="btn--no-outline"
                     shape="circle"
                     size="large"
                     icon={<IconEyeViewDetail />}
                     onClick={() => {
                        setViewedUser(record)
                        setIsModalVisible(!isModalVisible)
                     }}
                  />
               </Space>
            )
         },
      ];
   }, [dataSource, disabled])

   useEffect(() => {
      if (userList) {
         setDataSource(userList);
      }
   }, [userList])

   return (
      <Controller
         name={name}
         control={control}

         render={({ field: { onChange, onBlur, value, name }, fieldState: { invalid, error } }) => {
            return (
               <>
                  <Form.Item
                     label={label}
                     labelCol={labelCol}
                     name={name}
                     rules={rules}
                     className={className || ''}
                     colon={false}
                  >
                     <div className="input-item">
                        <SuperTable
                           rowKey={(record) => record.uid + record.username}
                           columns={columns}
                           dataSource={dataSource}
                           scroll={{ x: 'max-content', y: 300 }}
                           submitting={loading}
                        />
                        <div className={`error-message ${!invalid ? 'hide' : ''}`}>{error?.message || ' '}</div>
                     </div>
                  </Form.Item>
                  <DetailUserModal
                     isOpen={isModalVisible}
                     toggle={() => setIsModalVisible(!isModalVisible)}
                     data={viewedUser}
                  />
               </>
            )
         }}
      />
   );
}

export default UserTableField;