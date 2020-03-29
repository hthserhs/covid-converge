import React, { useEffect, useState } from 'react';
import { getQuarantineCenters } from '../../api/infrastructure';
import { QuarantineCenter } from '../../types/types';
import Checkbox from '../common/Checkbox';

const Affiliations = () => {
  const [quarantineCenters, setQuarantineCenters] = useState<
    QuarantineCenter[]
  >([]);

  useEffect(() => {
    getQuarantineCenters().then(setQuarantineCenters);
  }, []);

  return (
    <>
      <h1 className="title">Quarantine Centers</h1>
      <h2 className="subtitle">Select centers you want to monitor</h2>
      {quarantineCenters.map(({ id, address }) => {
        return <Checkbox key={id} label={address} />;
      })}
    </>
  );
};

export default Affiliations;
