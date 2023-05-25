import { registerSheet } from 'react-native-actions-sheet';
import AlarmActionSheet  from './AlarmActionSheet';
import CallActionSheet from './CallActionSheet';
import DoNotDisturbActionSheet  from './DoNotDisturbActionSheet';
import MediaActionSheet  from './MediaActionSheet';
import RingerActionSheet from './RingerActionSheet';

registerSheet('ringer-sheet', RingerActionSheet);
registerSheet('do-not-disturb-sheet', DoNotDisturbActionSheet);
registerSheet('alarm-sheet', AlarmActionSheet);
registerSheet('call-sheet', CallActionSheet);
registerSheet('medias-sheet', MediaActionSheet);

export {};
