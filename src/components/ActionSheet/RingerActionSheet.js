import React from 'react'
import ActionSheet from "react-native-actions-sheet";
import {RingerActionManager} from '../ActionManager';

const RingerActionSheet =(props) =>  {
    return (
      <ActionSheet id={props.sheetId}>
          <RingerActionManager/>
      </ActionSheet>
    );
  }
   
  export default RingerActionSheet;