import React from 'react';
import { Link } from 'react-router-dom';

export const AboutTitle1 = "Nice to meet you";
export const AboutTitle2 = "Check out my work";
export const AboutTitle3 = "Snapshots of Life";

export const AboutText1 = () => (
  <p>
    Welcome to my website. <mark>My name is Soulaiman</mark>, and I call the beautiful city of Eindhoven in the Netherlands my home. Take a look around with the googly eyes at my array of projects. I'm passionate about everything creative, stretching from sketching and video editing to the intricate details of <mark>UX/UI design</mark>. My toolbox includes a wide variety of Adobe programs like Photoshop, InDesign, Illustrator, and After Effects, not to mention other programs like Canva, Figma, and Procreate.
  </p>
);

export const AboutText2 = () => (
  <p>
    My designs are greatly <mark>inspired by Japanese culture</mark> and the otaku style, each project subtly infused with these elements. I am wholly dedicated to my craft, always aiming to deliver nothing less than excellence and push beyond <mark>100% in every project.</mark> Check out my resume and see my skills, educational background, and contact info, or contact me through my socials. You can also explore my <Link to="/projects" className="font-semibold text-[#6f02c6] hover:text-opacity-75 transition-opacity duration-300">Project Page</Link> to see my work in detail.
  </p>
);

export const AboutText3 = () => (
  <p>
    Beyond design, I love capturing moments and <mark>exploring new places.</mark> My <Link to="/lookbook" className="font-semibold text-[#6f02c6] hover:text-opacity-75 transition-opacity duration-300">Lookbook</Link> page is filled with images of my creations, vacations/ holidays, friends, nature, myself, and more. It's a glimpse <mark> into my world</mark> outside of work, where I find inspiration and joy in everyday moments. Take a peek and get to know me better! For a more personal touch or to see similar images, take a look at my socials.
  </p>
);

export const AboutImgText1 = "Fontys Tilburg - Netherlands";
export const AboutImgText2 = "Grand Café Van Gogh - Romania";
export const AboutImgText3 = "Obelisk - Vatican City";
