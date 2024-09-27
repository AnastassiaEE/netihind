import telia from '@/public/images/Telia_logo.png';
import tele2 from '@/public/images/Tele2_logo.png';
import stv from '@/public/images/Stv_logo.png';
import elisa from '@/public/images/Elisa_logo.png';

const providers: { [key: string]: { [key: string]: any } } = {
  'Telia Eesti AS': { phone: '+37256979125', image: telia, alt: 'Telia logo', tariffsPath: '#' },
  'Elisa Eesti AS': { phone: '+37256979125', image: elisa, alt: 'Elisa logo', tariffsPath: '#' },
  'Tele2 Eesti AS': { phone: '+37256979125', image: tele2, alt: 'Tele2 logo', tariffsPath: '#' },
  'STV AS': { phone: '+37256979125', image: stv, alt: 'Stv logo', tariffsPath: '#' },
};

export default providers;
