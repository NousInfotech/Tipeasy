import { StaticImageData } from "next/image";
import birthday from "./birthday-circle.png";
import handwaveoff from "./wave-off-hand.png"
import eggIcon from './egg-icon.png';
import nonVegIcon from './non-veg-icon.png';
import vegIcon from './veg-icon.png'
import waiter from './waiter.png'
import logo from './logo.png'
import qrCodeScanning from './qr-code-scanning.png'
import baristaCustomer from './barista-customer.png'
import chefTasting from './chef-tasting.png'
import primaryQrCode from './primary-qr-code.png'
// Import other images as needed

const assets: { [key: string]: StaticImageData } = {
    birthday,
    logo,
    handwaveoff,
    eggIcon,
    nonVegIcon,
    vegIcon,
    waiter,
    qrCodeScanning,
    baristaCustomer,
    chefTasting,
    primaryQrCode
};

export default assets;
