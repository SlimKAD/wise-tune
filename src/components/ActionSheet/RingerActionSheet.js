import { Block, Text } from 'galio-framework';
import React from 'react'
import ActionSheet from "react-native-actions-sheet";
import VolumeManager from '../VolumeManager';

const RingerActionSheet =(props) =>  {
    return (
      <ActionSheet id={props.sheetId}>
        <Block>
          <VolumeManager/>
        </Block>
      </ActionSheet>
    );
  }
   
  export default RingerActionSheet;