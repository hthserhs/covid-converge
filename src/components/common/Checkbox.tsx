import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import c from 'classnames';
import React, { FC } from 'react';
import './Checkbox.css';

interface Props {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

const Checkbox: FC<Props> = ({ label, checked, onToggle }) => {
  const iconPrefix: IconPrefix = 'far';
  const iconName: IconName = checked ? 'check-square' : 'square';

  return (
    <button
      className={c('button is-white is-fullwidth Checkbox-button')}
      onClick={onToggle}
    >
      <span
        className={c('icon', checked ? 'has-text-success' : 'has-text-grey')}
      >
        <FontAwesomeIcon
          icon={[iconPrefix, iconName]}
          style={{ fontSize: 24 }}
        />
      </span>
      <span
        className={c('Checkbox-label', { 'has-text-weight-semibold': checked })}
      >
        {label}
      </span>
    </button>
  );
};

export default Checkbox;
