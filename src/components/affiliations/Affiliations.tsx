import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { getQuarantineCenters } from '../../api/infrastructure';
import { QuarantineCenter } from '../../types/types';
import Checkbox from '../common/Checkbox';
import Pagination from '../common/Pagination';

interface Selection {
  [id: string]: boolean;
}

const Affiliations = () => {
  const [originalSelection, setOriginalSelection] = useState<Selection>({});
  const [selection, setSelection] = useState<Selection>({});
  const [query, setQuery] = useState<string>('');
  const [allCenters, setAllCenters] = useState<QuarantineCenter[]>([]);
  const [currentCenters, setCurrentCenters] = useState<QuarantineCenter[]>([]);

  const [pagination, setPagination] = useState({
    currentPage: 0,
    total: 0,
    pageSize: 10
  });

  const { currentPage, total, pageSize } = pagination;

  useEffect(() => {
    getQuarantineCenters().then(resultSet => {
      setAllCenters(resultSet);
      setCurrentCenters(resultSet);
      const sel = resultSet.reduce<Selection>(
        (acc, cur) => ({
          ...acc,
          [cur.id]: Math.random() > 0.5
        }),
        {}
      );
      setOriginalSelection(sel);
      setSelection(sel);
      setPagination(p => ({
        ...p,
        total: resultSet.length
      }));
    });
  }, []);

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

  const from = currentPage * pageSize + (total > 0 ? 1 : 0);
  const to = Math.min(from + pageSize - 1, total);
  const centers = currentCenters.slice(from - 1, to);

  const isSelectionUpdated = Object.entries(originalSelection).some(
    ([id, isSelected]) => isSelected !== selection[id]
  );

  return (
    <>
      <h1 className="title">Quarantine Centers</h1>
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

export default Affiliations;
