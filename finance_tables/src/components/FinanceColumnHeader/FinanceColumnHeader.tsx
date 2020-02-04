import React, { FC } from 'react';

interface FinanceColumnHeaderProps {
    title: string;
}

const FinanceColumnHeader: FC<FinanceColumnHeaderProps> = props => (
    <th>{props.title}</th>
)

export default FinanceColumnHeader;