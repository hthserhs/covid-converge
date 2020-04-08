import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { getPatients } from '../../api/patients';
import { Patient, Symptom } from '../../types/types';
import Pagination from '../common/Pagination';
import './Patients.css';
import SymptomTags from './SymptomTags';

// const NOTABLE_SYMPTOMS = ['fever', 'shortness-of-breath'];
const MILLIS_DAY = 24 * 60 * 60 * 1000;

const Patients = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [currentPatients, setCurrentPatients] = useState<Patient[]>([]);
  const [query, setQuery] = useState<string>('');

  const [pagination, setPagination] = useState({
    currentPage: 0,
    total: 0,
    pageSize: 10
  });

  const { currentPage, total, pageSize } = pagination;

  useEffect(() => {
    getPatients(1)
      // .then((resultSet) => resultSet.sort((a, b) => b.riskScore - a.riskScore))
      .then((resultSet) => {
        setLoading(false);
        setAllPatients(resultSet);
        setCurrentPatients(resultSet);
        setPagination((p) => ({
          ...p,
          total: resultSet.length
        }));
      })
      .catch(() => {
        setLoading(false);
        setError('An error occurred. Try again later.');
      });
  }, []);

  const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    const patients =
      q.trim().length > 0
        ? allPatients.filter((p) =>
            JSON.stringify(p).toLowerCase().includes(q.toLowerCase())
          )
        : allPatients;
    setQuery(q);
    setCurrentPatients(patients);
    setPagination({
      ...pagination,
      currentPage: 0,
      total: patients.length
    });
  };

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

  const from = currentPage * pageSize + (total > 0 ? 1 : 0);
  const to = Math.min(from + pageSize - 1, total);
  const patients = currentPatients.slice(from - 1, to);

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <div className="notification is-danger is-light">{error}</div>;
  }

  return (
    <>
      <h1 className="title">Patients</h1>
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
        <div className="level-right"></div>
      </div>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Notable Symptoms</th>
              <th>Quarantine Center</th>
              <th># Days</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => {
              const {
                id,
                address,
                firstName,
                lastName,
                isHighRisk,
                mobileNumber,
                quarantineStartDate
              } = patient;

              const notableSymptoms: Symptom[] = [];
              const daysInQuarantine = Math.floor(
                (Date.now() - quarantineStartDate) / MILLIS_DAY
              );

              // symptoms.filter(
              //   (s) => NOTABLE_SYMPTOMS.includes(s.name) && s.severity > 0
              // );

              return (
                <tr key={id}>
                  <td>
                    <span className="level">
                      <span>{id}</span>
                      {isHighRisk && (
                        <span className="icon has-text-danger">
                          <FontAwesomeIcon icon="virus" />
                        </span>
                      )}
                    </span>
                  </td>
                  <td>
                    {firstName} {lastName}
                  </td>
                  <td style={{ overflowX: 'auto' }}>
                    <SymptomTags symptoms={notableSymptoms} />
                  </td>
                  <td>{address}</td>
                  <td>{daysInQuarantine}</td>
                  <td>{mobileNumber}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
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

export default Patients;
