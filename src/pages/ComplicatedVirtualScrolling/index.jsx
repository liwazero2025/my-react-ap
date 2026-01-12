/**
 * @format
 */
import React, {useState} from 'react';
import {List} from 'react-virtualized';

const ComplicatedVirtualScrolling = () => {
    const [data] = useState(() => Array.from({length: 10000}, (_, i) => ({id: i, name: `列表项 ${i + 1}`})));

    const rowRenderer = ({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style // Style object to be applied to row (to position it)
    }) => {
        return (
            <div
                key={key}
                style={{
                    width: '100vw',
                    height: '100px',
                    borderBottom: '1px solid #999999'
                }}
            >
                {data[index].name}
            </div>
        );
    };

    return (
        <div
            className="complicatedVirtualScrolling"
            style={{height: '100vh'}}
        >
            <List
                width={430}
                height={1400}
                rowCount={data.length}
                rowHeight={100}
                rowRenderer={rowRenderer}
            />
        </div>
    );
};

export default ComplicatedVirtualScrolling;
