import telia from '../../public/images/Telia_logo.png'
import tele2 from '../../public/images/Tele2_logo.png'
import stv from '../../public/images/Stv_logo.png'
import telset from '../../public/images/Telset_logo.jpg'
import majanet from '../../public/images/Majanet_logo.png'

const providers: {[key:string]: {[key:string]: any}} = {
    'Telia Eesti AS': {phone: '+37256979125', image: telia, alt: 'Telia logo', tariffsPath: '#'},
    'Tele2 Eesti AS': {phone: '+37256979125', image: tele2, alt: 'Tele2 logo', tariffsPath: '#'},
    'STV AS': {phone: '+37256979125', image: stv, alt: 'Stv logo', tariffsPath: '#'},
    'Telset AS': {phone: '+37256979125', image: telset, alt: 'Telset logo', tariffsPath: '#'},
    'Majanet OÜ': {phone: '+37256979125', image: majanet, alt: 'Majanet logo', tariffsPath: '#'},
}

export default providers