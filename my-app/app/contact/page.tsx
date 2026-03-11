"use client";

import { JSX } from "react";
import Galaxy from '../ui/galaxy';
import BtnHome from "../ui/btn-home";

const ContactPage = (): JSX.Element => {

    return (
        <div className="w-full h-full relative">

            <div className="flex justify-between text-3xl font-bold p-10 relative z-10">
                <h1>Contact Page</h1>
                <BtnHome />
            </div>

            <div style={{ width: '100%', height: '80vh', position: 'relative' }}>
                <Galaxy 
                    mouseRepulsion
                    mouseInteraction
                    density={1}
                    glowIntensity={0.3}
                    saturation={0}
                    hueShift={140}
                    twinkleIntensity={0.3}
                    rotationSpeed={0.1}
                    repulsionStrength={2}
                    autoCenterRepulsion={0}
                    starSpeed={0.5}
                    speed={1}
                />
            </div>
        </div>
    );
};
export default ContactPage;