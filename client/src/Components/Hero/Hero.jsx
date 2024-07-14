import propTypes from 'prop-types';
import Image from '../../assets/Hero.jpg'

export default function Hero({ title, subTitle }) {
    return (
        <div className="z-10 relative">
            <div className="absolute w-full h-full  bg-opacity-30">
                
                    <h1 className="text-white">{title}</h1>
                    <h2 className="text-white">{subTitle}</h2>
                
            </div>
            <img src={Image} alt="Hero Image" className=""></img>
        </div>
    )
}

Hero.propTypes = {
    title: propTypes.string,
    subTitle: propTypes.string
}