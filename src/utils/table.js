const { SearchOutlined } = require("@ant-design/icons");
const { Input, Space, Button } = require("antd");

const GetColumnSearchProps = (dataIndex, handleSearch, handleReset) => {
   let searchInput = null;
   return {
      filterDropdown: ({
         setSelectedKeys,
         selectedKeys,
         confirm,
         clearFilters,
      }) => (
         <div style={{ padding: 8 }}>
            <Input
               ref={(node) => {
                  searchInput = node;
               }}
               placeholder={`Search ${dataIndex}`}
               value={selectedKeys[0]}
               onChange={(e) =>
                  setSelectedKeys(e.target.value ? [e.target.value] : [])
               }
               onPressEnter={() =>
                  handleSearch(selectedKeys, confirm, dataIndex)
               }
               style={{ marginBottom: 8, display: 'block' }}
            />

            <Space>
               <Button
                  type="primary"
                  onClick={() =>
                     handleSearch(selectedKeys, confirm, dataIndex)
                  }
                  icon={<SearchOutlined />}
                  size="small"
                  style={{ width: 90 }}
               >
                  Search
               </Button>

               <Button
                  onClick={() => handleReset(clearFilters, dataIndex)}
                  size="small"
                  style={{ width: 90 }}
               >
                  Reset
               </Button>
            </Space>
         </div>
      ),

      filterIcon: (filtered) => (
         <SearchOutlined
            style={{ color: filtered ? '#1890ff' : undefined }}
         />
      ),

      onFilter: (value, record) =>
         record[dataIndex]
            ? record[dataIndex]
               .toString()
               .toLowerCase()
               .includes(value.toLowerCase())
            : '',

      onFilterDropdownVisibleChange: (visible) => {
         if (visible) {
            setTimeout(() => searchInput.select(), 100);
         }
      },

      render(text) {
         return text
      },
   }
};

export const tableUtil = {
   GetColumnSearchProps
}