import React from 'react';
import DecryptedText from '../effects/DecryptedText'; 
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getProfileData } from '../../data/content';
import './Hero.css';

const Hero = () => {
    const { language } = useLanguage();
    const content = getProfileData(language);

    const scrollToContact = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollDown = () => {
        // Scroll to the next section (Profile usually)
        const profileSection = document.getElementById('profile');
        if (profileSection) {
            profileSection.scrollIntoView({ behavior: 'smooth' });
        } else {
             window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        }
    };

    return (
        <section className="hero-section" id="hero">

            <div className="hero-background"></div>

            <div className="hero-content">
                <span className="hero-section-label">{content.hero.sectionLabel}</span>
                <h1 className="os-boot-title" dangerouslySetInnerHTML={{ __html: content.hero.title }}></h1>

                <div className="os-boot-subtitle-wrapper">
                    <DecryptedText
                        parentClassName="hero-subtitle"
                        text={content.hero.role}
                        animateOn="view" 
                        sequential={true} 
                        speed={40}         
                        useOriginalCharsOnly={true}
                    />
                </div>

                <div>
                    <button onClick={scrollToContact} className="hero-contact-link">
                        {content.hero.cta}
                    </button>
                </div>
            </div>
            
            <div className="hero-f11-hint">
                {content.hero.f11}
            </div>

            <div className="hero-scroll-indicator" onClick={scrollDown}>
                <span className="hero-scroll-text">{content.hero.scroll}</span>
                <ArrowDown size={24} />
            </div>

        </section>
    );
};

export default Hero;