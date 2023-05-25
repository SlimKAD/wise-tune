import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { DoNotDisturbActionManager } from '../ActionManager';

const DoNotDisturbActionSheet = (props) => {
  return (
    <ActionSheet id={props.sheetId}>
      <DoNotDisturbActionManager />
    </ActionSheet>
  );
};

export default DoNotDisturbActionSheet;
