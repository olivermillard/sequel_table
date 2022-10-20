import React, { useState } from 'react';
import { Offer } from './Table';

/* ******************************************************************************
 * TableRow                                                                */ /**
 *
 * A single row in the table which has all the properties of an Offer object and
 * an update button.
 */
const TableRow = (props: {offer: Offer}) => {
    const [ isDisabled, setIsDisabled ] = useState(false);

    /* ******************************************************************************
     * handleClick                                                             */ /**
     *
     * handles the click of a button by disabling the button for 2 seconds
     */
    const handleClick = () => {
        setIsDisabled(true);
        const newEventTimer = setTimeout(() => {
            setIsDisabled(false);
        }, 2000);

        return () => {
            clearTimeout(newEventTimer);
        };

    };

    return (
        <tr>
            <td>{props.offer.id}</td>
            <td>{String(props.offer.date)}</td>
            <td>{props.offer.amount}</td>
            <td>{props.offer.bid}</td>
            <td>
                <button
                    disabled={isDisabled}
                    onClick={()=> {
                        handleClick();
                    }}
                >
                    {isDisabled ? 'loading' : 'update'}
                </button>
            </td>
        </tr>
    );
};

/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export {
    TableRow
};
