import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import c from 'classnames';
import React, { FC, useState } from 'react';
import './Checkbox.css';

interface Props {
  label: string;
}

const Checkbox: FC<Props> = ({ label }) => {
  const [checked, setChecked] = useState(false);
  const iconPrefix: IconPrefix = 'far';
  const iconName: IconName = checked ? 'check-square' : 'square';

  const onToggle = () => {
    setChecked(!checked);
  };

  return (
    <div className="Checkbox-container has-background-light">
      <button className="button is-light" onClick={onToggle}>
        <span
          className={c('icon', checked ? 'has-text-success' : 'has-text-grey')}
        >
          <FontAwesomeIcon
            icon={[iconPrefix, iconName]}
            style={{ fontSize: 22 }}
          />
        </span>
      </button>
      <span className={c({ 'has-text-weight-semibold': checked })}>
        {label}
      </span>
    </div>
  );
};

export default Checkbox;
