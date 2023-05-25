import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { AlarmActionManager } from '../ActionManager';

const AlarmActionSheet = (props) => {
  return (
    <ActionSheet id={props.sheetId}>
      <AlarmActionManager />
    </ActionSheet>
  );
};

export default AlarmActionSheet;
