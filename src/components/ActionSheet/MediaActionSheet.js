import React from 'react'
import ActionSheet from "react-native-actions-sheet";
import {MediaActionManager} from '../ActionManager';

const MediaActionSheet =(props) =>  {
    return (
      <ActionSheet id={props.sheetId}>
          <MediaActionManager/>
      </ActionSheet>
    );
  }
   
  export default MediaActionSheet;