import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import c from 'classnames';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPatients } from '../../api/patients';
import { Patient } from '../../types/types';
import './Patients.css';

const riskLevels = ['Low', 'Medium', 'High'];
const colorCodes = ['success', 'warning', 'danger'];

const Patients = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    getPatients()
      .then(resultSet => resultSet.sort((a, b) => b.riskScore - a.riskScore))
      .then(setPatients);
  }, []);

  return (
    <>
      <h1 className="title">Patients</h1>
      <div className="notification is-info is-light">
        Listed here are all patients in the quarantine centers you're currently
        monitoring. Click <Link to="/affiliations">here</Link> to see or update
        the list.
      </div>
      <div className="table-container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quarantine Center</th>
              <th>Risk Level</th>
              <th>COVID-19 status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(({ id, name, address, riskScore, positive }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{address}</td>
                <td>
                  <span
                    className={c(
                      'tag',
                      `is-${colorCodes[riskScore]}`,
                      'Patients-risk_level'
                    )}
                  >
                    {riskLevels[riskScore]}
                  </span>
                </td>
                <td>
                  {positive && (
                    <span className="icon has-text-danger">
                      <FontAwesomeIcon icon="virus" />
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Patients;
