import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export type muiIconType = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string;
};
