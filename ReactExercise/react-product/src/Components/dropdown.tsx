import React from 'react';

const Dropdown = ({ categoryData , onSelect }:{categoryData:string [], onSelect :(e: string) => void}) => {
    const handleChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        onSelect(event.target.value);
    };
    return (
        <>
            <select onChange={handleChange} required>

                <option value="" hidden>Select a category</option>
                {categoryData && categoryData.map((data , index) => (
                    <option key={index} value={data}>
                        {data}
                    </option>
                ))}
            </select>
        </>
    );
};

export default Dropdown;
