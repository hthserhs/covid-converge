import c from 'classnames';
import React, { FC } from 'react';
import { Symptom } from '../../types/types';

const COLOR_CODES = ['light', 'warning', 'danger'];

interface Props {
  symptoms: Symptom[];
}

const SymptomTags: FC<Props> = ({ symptoms }) => {
  return (
    <div className="field is-grouped">
      {symptoms.map(symptom => (
        <div key={symptom.name} className="control">
          <div className="tags has-addons">
            <span className={c('tag', `is-info`)}>{symptom.displayName}</span>
            <span
              className={c('tag', `is-${COLOR_CODES[symptom.severity - 1]}`)}
            >
              {symptom.value || 'NA'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SymptomTags;
