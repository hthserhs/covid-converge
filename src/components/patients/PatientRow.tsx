import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useContext, useEffect, useState } from 'react';
import { getPatientHealthRecords } from '../../api/patients';
import { AuthContext } from '../../auth-state';
import { Patient, PatientHealthRecord, Symptom } from '../../types/types';
import SymptomTags from './SymptomTags';

const MILLIS_DAY = 24 * 60 * 60 * 1000;

type Props = {
  patient: Patient;
};

const PatientRow: FC<Props> = ({ patient }) => {
  const {
    id,
    isHighRisk,
    firstName,
    lastName,
    quarantineStartDate,
    address,
    mobileNumber
  } = patient;

  const [records, setRecords] = useState<PatientHealthRecord[]>([]);

  const latestRecord = records.sort((a, b) => b.date - a.date)[0];

  const notableSymptoms: Symptom[] = latestRecord ? latestRecord.symptoms : [];

  const daysInQuarantine = Math.floor(
    (Date.now() - quarantineStartDate) / MILLIS_DAY
  );

  const { token, user } = useContext(AuthContext);

  useEffect(() => {
    if (token && user?.id) {
      getPatientHealthRecords(token, id, user.id).then(setRecords);
    }
  }, [token, user, id]);

  return (
    <tr>
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
};

export default PatientRow;
