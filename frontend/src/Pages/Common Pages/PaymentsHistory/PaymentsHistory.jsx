import React, { useState } from 'react';
import s from './PaymentsHistoryStyle.module.css';
import ListHeader from "../../../Components/ListHeader/ListHeader";
import Filters from './Filters/Filters';
import Pagination from "../../../Components/Pagination/Pagination";
import Payment from '../../../Components/Payment/Payment';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from '../../../Components/Breadcrumbs/Breadcrumbs';

const PaymentsHistory = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [sorting, setSorting] = useState('Πιο πρόσφατη');
  const [filters, setFilters] = useState({});
  const [payments, setPayments] = useState([
    { status: 'redeemed' },
    { status: 'redeemed' },
    { status: 'redeemed' },
    { status: 'notRedeemed' },
    { status: 'notRedeemed' },
  ]);

  let location = useLocation();

  return (
    <div className={s.payments_history_container}>
      <div className={s.breadcrumbs_container}>
        <Breadcrumbs
          breadcrumbItems={[
            { label: 'Αρχική Σελίδα', route: ''},
            { label: 'Ιστορικό', route: 'history'},
            { label: 'Ιστορικό Πληρωμών', route: '.'},
          ]}
        />
      </div>
      <div className={s.payments_history_main_content}>
        <ListHeader
          title='Ιστορικό Πληρωμών'
          listSize={8}
          listElementName='Πληρωμές'
          pageSize={pageSize}
          sorting={sorting}
          sortingOptions={['Πιο πρόσφατη', 'Λιγότερο πρόσφατη']}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortingChange={(newSorting) => setSorting(newSorting)}
        />

        <div className={s.payments_history_table_with_filters}>

          <Filters
            filters={filters}
            onFilterChange={setFilters}
          />

          <div className={s.payments_history_table}>
            {
              payments.map((payment, index) => {
                return (
                  <Payment
                    key={`${payment.status} ${index}`}
                    payment={payment}
                    isParent={location.pathname.includes('parent')}
                  />
                )
              })
            }
            <Pagination
              pages={3}
              currentPage={page}
              onChange={(pageNum) => setPage(pageNum)}
              width='501px'
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentsHistory;