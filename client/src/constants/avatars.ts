// Assets
import AvatarFemale from '../assets/images/avatar-f.webp';
import AvatarMale from '../assets/images/avatar-m.webp';
import AvatarRobot from '../assets/images/avatar-r.jpg';
import AvatarNone from '../assets/images/none.png';
// Types
import { SWgender } from '../interfaces/swPeople';

export const AVATAR: { [key in SWgender]: string } = {
  female: AvatarFemale,
  male: AvatarMale,
  'n/a': AvatarRobot,
  none: AvatarNone,
  hermaphrodite: AvatarNone
};
