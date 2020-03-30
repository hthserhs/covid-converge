import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPatients } from '../../api/patients';
import { Patient } from '../../types/types';
import Pagination from '../common/Pagination';
import './Patients.css';
import SymptomTags from './SymptomTags';

const NOTABLE_SYMPTOMS = ['fever', 'shortness-of-breath'];

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
              <th>Notable Symptoms</th>
              <th>Quarantine Center</th>
              <th># Days</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => {
              const {
                id,
                name,
                address,
                positive,
                daysInQuarantine,
                contact,
                symptoms
              } = patient;

              const notableSymptoms = symptoms.filter(
                s => NOTABLE_SYMPTOMS.includes(s.name) && s.severity > 0
              );

              return (
                <tr key={id}>
                  <td>
                    <span className="level">
                      {id}
                      {positive && (
                        <span className="icon has-text-danger">
                          <FontAwesomeIcon icon="virus" />
                        </span>
                      )}
                    </span>
                  </td>
                  <td>{name}</td>
                  <td>
                    <SymptomTags symptoms={notableSymptoms} />
                  </td>
                  <td>{address}</td>
                  <td>{daysInQuarantine}</td>
                  <td>{contact}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        fromItem={1}
        toItem={10}
        total={50}
        onNextPage={console.log}
        onPreviousPage={console.log}
      />
    </>
  );
};

export default Patients;
