import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useContext, useEffect, useState } from 'react';
import { getPatientHealthRecords } from '../../api/patients';
import { APISymptom } from '../../api/types';
import { AuthContext } from '../../auth-state';
import {
  Patient,
  PatientHealthRecord,
  QuarantineCenter,
  Symptom
} from '../../types/types';
import SymptomTags from './SymptomTags';

const MILLIS_DAY = 24 * 60 * 60 * 1000;

type Props = {
  patient: Patient;
  symptomList: APISymptom[];
  quarantineCenter?: QuarantineCenter;
};

const PatientRow: FC<Props> = ({ patient, symptomList, quarantineCenter }) => {
  const {
    id,
    isHighRisk,
    firstName,
    lastName,
    quarantineStartDate,
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
        <SymptomTags symptoms={notableSymptoms} symptomList={symptomList} />
      </td>
      <td>{quarantineCenter?.address}</td>
      <td>{daysInQuarantine}</td>
      <td>{mobileNumber}</td>
    </tr>
  );
};

export default PatientRow;
