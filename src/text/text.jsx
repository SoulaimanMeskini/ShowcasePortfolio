import { Link } from 'react-router-dom';

export const AboutTitle1 = "Nice to meet you";
export const AboutTitle2 = "Check out my work";
export const AboutTitle3 = "Snapshots of Life";

export const AboutText1 = () => (
  <p>
    Welcome to my website. My name is <span><mark >Soulaiman Meskini</mark></span> , and I call the beautiful city of Eindhoven in the Netherlands my home. Take a look around jut like the googly eyes at my array of projects. I'm passionate about being creative, stretching from sketching and video editing to the intricate details of <mark>UX/UI design</mark>. My toolbox includes a wide variety of Adobe programs like Photoshop, InDesign, Illustrator, and After Effects, not to mention other programs like Canva, Figma, and Procreate.
  </p>
);

export const AboutText2 = () => (
  <p>
    My designs are greatly <mark>inspired by Japanese culture</mark> and the otaku style, each project subtly infused with these elements. I am wholly dedicated to my craft, always aiming to deliver nothing less than excellence and push <mark>beyond 100% </mark> in every project. Check out my resume and see my skills, educational background and contact info. You can also explore my <Link to="/projects" className="font-semibold text-[#6f02c6] hover:text-opacity-75 transition-opacity duration-300">Project Page</Link> to see my work in detail.
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


export const ProjectTitle1 = "De Kindertelefoon";
export const ProjectTitle2 = "Ruby Mus";
export const ProjectTitle3 = "Souraiko";

export const ProjectImgText1 = "Fontys project";
export const ProjectImgText2 = "Fontys project";
export const ProjectImgText3 = "Own project";

export const ProjectText1 = () => (
  <p>
    During a school project, I worked on a campaign for Partout aimed at supporting "De Kindertelefoon," a Dutch service center helping children with personal and family issues. My role involved conducting <mark>extensive research</mark> to understand why children hesitate to reach out to "De Kindertelefoon." Our findings revealed that while 90% of children knew about the service, many were too scared to speak with them. To address this, our group developed a web game where children can create characters, style their homes, and visit virtual rooms of employees. This game helps children feel <mark>more comfortable</mark>  and reduces the barrier to seeking help. Below are some pixel art assets I created for this project.
  </p>
);

export const ProjectText2 = () => (
  <p>
    This project spotlights <mark>Ruby Mus</mark> , an emerging music artist and student from Rock City Eindhoven. As part of a school assignment, our team developed her branding (brandbook), orchestrated a photo shoot, produced a dance video and her website. I took charge of shooting the photos and editing the photos and creating a <mark>neon effect</mark> to the dance video using After Effects. 
  </p>
);

export const ProjectText3 = () => (
  <p>
    Souraiko is a <mark>passion project</mark> between my friend and me, where every piece of clothing, sticker, accessory, and figure is selfmade with care and creativity. Our designs are unique, reflecting our love for streetwear and the planet. We strive to produce our clothing in the most <mark>environmentally friendly</mark> manner possible. Our latest venture involves creating 3D characters with AR codes and spreading them across cities. By scanning the QR code, you can claim the artwork on our site, earning discounts or becoming part of our community. It's like a geo hunt, blending fashion with interactive tech!
  </p>
);