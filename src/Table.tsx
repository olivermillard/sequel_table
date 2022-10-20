import React, { useEffect, useState } from 'react';
import { TableRow } from './TableRow';

/* A single offer item */
interface Offer {
    id: string;
    date: Date;
    amount: number;
    bid: number;
}

/* ******************************************************************************
 * Table                                                                    */ /**
 *
 * The table containing the dynamically created offers. The table is initially
 * populated with a set number of entries. Adds a new item every 5 seconds.
 */
const Table = () =>{
    const [ offers, setOffers ] = useState<Offer[]>([]);
    const dd = new Date();
    // an index which keeps track of how many elements are in the offers state object
    // NOTE: offers.length currently prints to 0 and causes issues
    let idIndex = 0;

    useEffect(() => {
        initTable(10);
    }, []);

    /* ******************************************************************************
     * createOffer                                                             */ /**
     *
     * creates a new offer item
     *
     * @param index - the current index (idIndex)
     *
     * @returns the newly created offerr
     */
    const createOffer = (index: number): Offer => {
        const offer = {
            'id': String(index),
            'date': new Date(dd.setMinutes(dd.getMinutes() + index * 10)),
            'amount': Math.random() * 10,
            'bid': 9.5 + Math.random()
        };

        // increase the idIndex to accurately convey the index of the next item
        idIndex += 1;

        return(offer);
    };

    /* ******************************************************************************
     * initTable                                                               */ /**
     *
     * initializes the table with a set number of elements
     *
     * @param numEntries - the number of entries the table should initialize with
     */
    const initTable = (numEntries: number) => {
        const initOffers: Offer[] = [];
        for (let i = 0; i < numEntries; i++) {
            initOffers[idIndex] = createOffer(i);
        }

        setOffers(initOffers);
        updateTableData();
    };

    /* ******************************************************************************
     * updateTableData                                                         */ /**
     *
     * updates the table data with a new offer every 5 seconds
     */
    const updateTableData = () => {
        const newOffer = createOffer(idIndex);

        const newEventTimer = setTimeout(() => {
            setOffers(offers => offers.concat(newOffer));
            updateTableData();
        }, 5000);

        return () => {
            clearTimeout(newEventTimer);
        };
    };

    return (
        <div className='tableContainer'>
            <table>
                <tr>
                    <th>{'ID'}</th>
                    <th>{'Date'}</th>
                    <th>{'Amount'}</th>
                    <th>{'Bid'}</th>
                    <th>{'Update'}</th>
                </tr>
                <tbody>
                    {offers.map((item: Offer, idx: number) => {
                        return (
                            <TableRow
                                offer={item}
                                key={idx}
                            />
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

/* **************************************************************************** *
 * Module exports                                                               *
 * **************************************************************************** */
export {
    Table,
    Offer,
};
