import { useRef, useState } from "react";

import { useIntl } from "react-intl";
import {
    Button,
    Input,
    InputRef,
    Space,
    Spin,
    Table,
    TableColumnType
} from "antd";

import ContentLayout from "components/layout/content/contentLayout";
import { useQuery } from "@tanstack/react-query";

import { SearchOutlined } from "@ant-design/icons";
import { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from 'react-highlight-words';


interface DataType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    image: string;
}

type DataIndex = keyof DataType;


const pageSize = 13;
export function Users() {
    const { formatMessage } = useIntl();
    const [pagination, setPagination] = useState<number>(1);

    const { data, isSuccess, isLoading, isFetching, isFetched } = useQuery({
        queryFn: async () => {
            const r = await fetch(`https://dummyjson.com/users?limit=${pageSize}&skip=${(pagination - 1) * pageSize}`);
            const data = await r.json();
            return data;
        },
        queryKey: ['users', pagination],
    })
    const { total, users } = data || {};

    console.log('----->>', { isFetching, isFetched, isLoading, isSuccess, data });

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: FilterDropdownProps['confirm'],
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (open) => {
            if (open){
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
        render: (text) => 
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            ...getColumnSearchProps('firstName')
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            ...getColumnSearchProps('lastName')
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'avatar',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a: any, b: any,) => {
                if (a.email < b.email) {
                    return -1;
                }
                if (a.email > b.email) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    return (
        <ContentLayout>
            {isLoading && <Spin />}
            {/* {(!isLoading || (isLoading && !isFetched)) && isSuccess && !!users && ( */}
            {!isLoading && isSuccess && !!users && (
                <Table
                    pagination={{
                        current: pagination, pageSize, total: total, onChange: (page) => {
                            setPagination(page)
                        }
                    }}

                    dataSource={users}
                    columns={columns}
                />
            )}
        </ContentLayout>
    );
}
