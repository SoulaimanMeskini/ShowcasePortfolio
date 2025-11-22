import { Link } from 'react-router-dom';


///// About Page

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

//// Project Page 

export const ProjectTitle1 = "Custom Media";
export const ProjectTitle2 = "Ventilatieland";
export const ProjectTitle3 = "De Kindertelefoon";
export const ProjectTitle4 = "Ruby Mus";
export const ProjectTitle5 = "Souraiko";
export const ProjectTitle6 = "The Legend of Zelda";

export const ProjectImgText1 = "Fontys project";
export const ProjectImgText2 = "Fontys project";
export const ProjectImgText3 = "Own project";
export const ProjectImgText4 = "Own project";

export const ProjectText1 = () => (
  <p>
    I had the opportunity to do an internship at the agency Custom Media in Japan, where I contributed to <mark>reshaping</mark> the GoConnect brand through UX and UI improvements. GoConnect is a platform designed for expats and travelers in Japan, helping them navigate life, investing, and discovering English-friendly businesses and services. During my internship, I redesigned the website in Figma, created a custom Linktree, wrote articles, and designed a new newsletter. This three-month experience taught me a lot about designing within a <mark>different culture</mark> and understanding how businesses approach communication in Japan.
  </p>
);

export const ProjectText2 = () => (
  <p>
    During my graduation internship at Econox, I had the opportunity to design and develop a <mark>help menu</mark> for the company's webshop Ventilatieland. My work included creating ETIM product pages and improving the user experience within the PIM system Skwirrel. Many visitors on Ventilatieland know what type of product they need but are unsure which brand or model best fits their situation. Instead of leaving the site to search externally, the new help menu guides users to three suitable <mark>product matches</mark>.
  </p>
);

export const ProjectText3 = () => (
  <p>
    During a school project, I worked on a campaign for Partout aimed at supporting "De Kindertelefoon," a Dutch service center helping children with personal and family issues. My role involved conducting <mark>extensive research</mark> to understand why children hesitate to reach out to "De Kindertelefoon." Our findings revealed that while 90% of children knew about the service, many were too scared to speak with them. To address this, our group developed a web game where children can create characters, style their homes, and visit virtual rooms of employees. This game helps children feel <mark>more comfortable</mark>  and reduces the barrier to seeking help. Below are some pixel art assets I created for this project.
  </p>
);

export const ProjectText4 = () => (
  <p>
    This project spotlights <mark>Ruby Mus</mark> , an emerging music artist and student from Rock City Eindhoven. As part of a school assignment, our team developed her branding (brandbook), orchestrated a photo shoot, produced a dance video and her website. I took charge of shooting the photos and editing the photos and creating a <mark>neon effect</mark> to the dance video using After Effects. 
  </p>
);

export const ProjectText5 = () => (
  <p>
    Souraiko is a <mark>passion project</mark> between my friend and me, where every piece of clothing, sticker, accessory, and figure is selfmade with care and creativity. Our designs are unique, reflecting our love for streetwear and the planet. We strive to produce our clothing in the most <mark>environmentally friendly</mark> manner possible. Our latest venture involves creating 3D characters with AR codes and spreading them across cities. By scanning the QR code, you can claim the artwork on our site, earning discounts or becoming part of our community. It's like a geo hunt, blending fashion with interactive tech!
  </p>
);

export const ProjectText6 = () => (
  <p>
    In this project, I've worked on recreating the iconic intro scene of the original <mark>Legend of Zelda (NES)</mark>, but with a custom twist where you can enter your own name, and it will display "The Legend of [Your Name]." I meticulously recreated all the assets and coded the entire experience using <mark>HTML, CSS, and JavaScript</mark>. Click on <a 
      href="https://legend-of-zelda-poc.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      style={{ 
        color: 'inherit', 
        textDecoration: 'underline', 
        transition: 'color 0.3s ease' 
      }}
      onMouseOver={(e) => e.currentTarget.style.color = '#6f02c6'}
      onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}
    >
      Legend of Zelda (NES)
    </a> to view the project and experience the custom intro for yourself.
  </p>
);

export const ProjectTitle7 = "Displini";
export const ProjectText7 = () => (
  <>
    <p>
      Displini is my ongoing <mark>creative project and productivity app</mark> in one. It showcases modern, playful design while helping you actually improve your habits and daily discipline. With built-in <mark>AI powered by OpenAI</mark>, Displini helps you plan, schedule, reschedule, and turn your day into a clear to-do list.
    </p>
    <p className="mt-2">
      Website, logo and UX is made by me.
    </p>
  </>
);

export const ProjectTitle8 = "Lookbook";
export const ProjectText8 = () => (
  <p>
    My <mark>Lookbook</mark> page is filled with images of my creations, vacations/holidays, friends, nature, myself, and more. It's a glimpse <mark>into my world</mark> outside of work, where I find inspiration and joy in everyday moments.
  </p>
);

