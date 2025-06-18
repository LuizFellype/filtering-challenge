import { useState } from "react";

import { useIntl } from "react-intl";
import {
    Spin,
    Table
} from "antd";

import ContentLayout from "components/layout/content/contentLayout";
import { useQuery } from "@tanstack/react-query";
import Column from "antd/es/table/Column";
import { on } from "events";
import { SortOrder } from "antd/lib/table/interface";

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
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
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
