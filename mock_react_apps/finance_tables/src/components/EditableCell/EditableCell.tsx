import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { Data } from '../../utils/interfaces';

interface EditableCellProps {
    cell: {
        value: string;
    };
    row: { index: number }
    column: { id: number };
    updateMyData: (index: number, id: number, value: string) => Data;
}

const EditableCell: FC<EditableCellProps> = ({
    cell: { value: initialValue },
    row: { index },
    column: { id },
    updateMyData,
}) => {
    
    const [value, setValue] = useState(initialValue);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }

    const onBlur = () => {
        updateMyData(index, id, value);
    }

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    return <input type="text" value={value} onChange={onChange} onBlur={onBlur} />
    
}

export default EditableCell;