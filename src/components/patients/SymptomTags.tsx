import c from 'classnames';
import React, { FC } from 'react';
import { APISymptom } from '../../api/types';
import { Symptom } from '../../types/types';

interface Props {
  symptoms: Symptom[];
  symptomList: APISymptom[];
}

const SymptomTags: FC<Props> = ({ symptoms, symptomList }) => {
  return (
    <div className="field is-grouped is-grouped-multiline">
      {symptoms
        .filter((s) => s.severity !== 'unspecified')
        .map((s) => {
          const symptom = symptomList.find((sym) => sym.name === s.name);
          return (
            <div key={symptom?.name} className="control">
              <div className="tags has-addons">
                <span className={c('tag', `is-warning`)}>
                  {symptom?.displayName || 'NA'}
                </span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SymptomTags;
