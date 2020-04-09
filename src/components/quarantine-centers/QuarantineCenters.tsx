import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getHealthWorkerQuarantineCenters,
  updateHealthWorkerQuarantineCenters
} from '../../api/health-workers';
import { getQuarantineCenters } from '../../api/locations';
import { AuthContext } from '../../auth-state';
import { QuarantineCenter } from '../../types/types';
import Checkbox from '../common/Checkbox';
import Pagination from '../common/Pagination';

interface Selection {
  [id: string]: boolean;
}

const QuarantineCenters = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [originalSelection, setOriginalSelection] = useState<Selection>({});
  const [selection, setSelection] = useState<Selection>({});
  const [query, setQuery] = useState<string>('');
  const [allCenters, setAllCenters] = useState<QuarantineCenter[]>([]);
  const [currentCenters, setCurrentCenters] = useState<QuarantineCenter[]>([]);

  const { user } = useContext(AuthContext);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    total: 0,
    pageSize: 10
  });

  const { currentPage, total, pageSize } = pagination;

  useEffect(() => {
    if (user?.id) {
      Promise.all([
        getHealthWorkerQuarantineCenters(user.id),
        getQuarantineCenters()
      ])
        .then(([hwQC, allQC]) => {
          const sel = hwQC.reduce<Selection>(
            (acc, cur) => ({
              ...acc,
              [cur.id]: true
            }),
            {}
          );
          setOriginalSelection(sel);
          setSelection(sel);
          setAllCenters(allQC);
          setCurrentCenters(allQC);
          setPagination((p) => ({
            ...p,
            total: allQC.length
          }));
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          setError('An error occurred. Try again later.');
        });
    }
  }, [user]);

  const onNextPage = () => {
    setPagination({
      ...pagination,
      currentPage: currentPage + 1
    });
  };

  const onPreviousPage = () => {
    setPagination({
      ...pagination,
      currentPage: currentPage - 1
    });
  };

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    const centers =
      q.trim().length > 0
        ? allCenters.filter(({ address }) =>
            address.toLowerCase().includes(q.toLowerCase())
          )
        : allCenters;
    setQuery(q);
    setCurrentCenters(centers);
    setPagination({
      ...pagination,
      currentPage: 0,
      total: centers.length
    });
  };

  const onSave = () => {
    const centers = Object.entries(selection)
      .filter(([_, v]) => v)
      .map(([k]) => +k);
    if (user?.id) {
      updateHealthWorkerQuarantineCenters(user.id, centers).then(() =>
        toast.success('Updated!', {
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        })
      );
    }
  };

  const from = currentPage * pageSize + (total > 0 ? 1 : 0);
  const to = Math.min(from + pageSize - 1, total);
  const centers = currentCenters.slice(from - 1, to);

  const isSelectionUpdated = Object.entries(selection).some(
    ([id, isSelected]) => isSelected !== originalSelection[id]
  );

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <div className="notification is-danger is-light">{error}</div>;
  }

  return (
    <>
      <h1 className="title">
        <FontAwesomeIcon icon="hospital" /> Quarantine Centers
      </h1>
      <div className="level">
        <div className="level-left">
          <div className="field">
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                placeholder="Search"
                value={query}
                onChange={onChangeQuery}
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon icon="search" />
              </span>
            </p>
          </div>
        </div>
        <div className="level-right">
          <div className="buttons">
            <button
              className="button is-primary"
              disabled={!isSelectionUpdated}
              onClick={onSave}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
      <div className="buttons">
        {centers.map(({ id, address }) => {
          const onToggle = () => {
            setSelection({
              ...selection,
              [id]: !selection[id]
            });
          };
          return (
            <Checkbox
              key={id}
              label={address}
              checked={selection[id]}
              onToggle={onToggle}
            />
          );
        })}
      </div>
      <Pagination
        fromItem={from}
        toItem={to}
        total={total}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </>
  );
};

export default QuarantineCenters;
