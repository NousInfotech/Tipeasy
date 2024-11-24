import { StaticImageData } from "next/image";
import birthday from "./birthday-circle.png";
import handwaveoff from "./wave-off-hand.png"
import eggIcon from './egg-icon.png';
import nonVegIcon from './non-veg-icon.png';
import vegIcon from './veg-icon.png'
import waiter from './waiter.png'
import ratingStart from './ratingStar.png'
// Import other images as needed

const assets: { [key: string]: StaticImageData } = {
    birthday,
    handwaveoff,
    eggIcon,
    nonVegIcon,
    vegIcon,
    waiter
};

export default assets;
