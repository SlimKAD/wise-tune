import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import { CallActionManager } from '../ActionManager';

const CallActionSheet = (props) => {
  return (
    <ActionSheet id={props.sheetId}>
      <CallActionManager />
    </ActionSheet>
  );
};

export default CallActionSheet;
