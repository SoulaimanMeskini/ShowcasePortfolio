import React from 'react';
import { Link } from 'react-router-dom';

export const translations = {
  en: {
    nav: {
      about: 'About Me',
      projects: 'Projects',
      lookbook: 'Lookbook',
    },
    hero: {
      subtitle: 'Portfolio Website',
      scrollDown: 'Scroll down to see and read more',
      swipeMore: 'Swipe to see and read more',
    },
    about: {
      titles: {
        one: 'Nice to meet you',
        two: 'Check out my work',
        three: 'Snapshots of Life',
      },
      texts: {
        one: () => (
          <p>
            Welcome to my website. My name is <span><mark>Soulaiman Meskini</mark></span>, and I call the
            beautiful city of Eindhoven in the Netherlands my home. Take a look around just like the googly
            eyes at my array of projects. I&apos;m passionate about being creative, stretching from sketching
            and video editing to the intricate details of <mark>UX/UI design</mark>. My toolbox includes a wide
            variety of Adobe programs like Photoshop, InDesign, Illustrator, and After Effects, not to mention
            other programs like Canva, Figma, and Procreate.
          </p>
        ),
        two: () => (
          <p>
            My designs are greatly <mark>inspired by Japanese culture</mark> and the otaku style, each project
            subtly infused with these elements. I am wholly dedicated to my craft, always aiming to deliver
            nothing less than excellence and push <mark>beyond 100%</mark> in every project. Check out my
            resume to see my skills, educational background, and contact info. You can also explore my{' '}
            <Link
              to="/projects"
              className="font-semibold text-[#6f02c6] hover:text-opacity-75 transition-opacity duration-300"
            >
              Project Page
            </Link>{' '}
            to see my work in detail.
          </p>
        ),
        three: () => (
          <p>
            Beyond design, I love capturing moments and <mark>exploring new places.</mark> My{' '}
            <Link
              to="/lookbook"
              className="font-semibold text-[#6f02c6] hover:text-opacity-75 transition-opacity duration-300"
            >
              Lookbook
            </Link>{' '}
            page is filled with images of my creations, vacations/holidays, friends, nature, myself, and more.
            It&apos;s a glimpse <mark>into my world</mark> outside of work, where I find inspiration and joy in
            everyday moments. Take a peek and get to know me better! For a more personal touch or to see similar
            images, take a look at my socials.
          </p>
        ),
      },
      imgText: {
        one: 'Fontys Tilburg - Netherlands',
        two: 'Grand Café Van Gogh - Romania',
        three: 'Obelisk - Vatican City',
      },
    },
    projects: {
      titles: {
        customMedia: 'Custom Media',
        ventilatieland: 'Ventilatieland',
        kindertelefoon: 'De Kindertelefoon',
        rubyMus: 'Ruby Mus',
        souraiko: 'Souraiko',
        zelda: 'The Legend of Zelda',
        displini: 'Displini',
        lookbook: 'Lookbook',
      },
      linkText: {
        viewProject: 'View Project',
        viewLookbook: 'View Lookbook',
        visitDisplini: 'Visit Displini',
        visitArticles: 'Visit Articles',
      },
      texts: {
        customMedia: () => (
          <p>
            I had the opportunity to do an internship at the agency Custom Media in Japan, where I contributed to
            <mark> reshaping</mark> the GoConnect brand through UX and UI improvements. GoConnect is a platform
            designed for expats and travelers in Japan, helping them navigate life, investing, and discovering
            English-friendly businesses and services. During my internship, I redesigned the website in Figma,
            created a custom Linktree, wrote articles, and designed a new newsletter. This three-month experience
            taught me a lot about designing within a <mark>different culture</mark> and understanding how
            businesses approach communication in Japan.
          </p>
        ),
        ventilatieland: () => (
          <p>
            During my graduation internship at Econox, I had the opportunity to design and develop a
            <mark> help menu</mark> for the company&apos;s webshop Ventilatieland. My work included creating ETIM
            product pages and improving the user experience within the PIM system Skwirrel. Many visitors on
            Ventilatieland know what type of product they need but are unsure which brand or model best fits their
            situation. Instead of leaving the site to search externally, the new help menu guides users to three
            suitable <mark>product matches</mark>.
          </p>
        ),
        kindertelefoon: () => (
          <p>
            During a school project, I worked on a campaign for Partout aimed at supporting &quot;De
            Kindertelefoon,&quot; a Dutch service center helping children with personal and family issues. My role
            involved conducting <mark>extensive research</mark> to understand why children hesitate to reach out
            to &quot;De Kindertelefoon.&quot; Our findings revealed that while 90% of children knew about the
            service, many were too scared to speak with them. To address this, our group developed a web game
            where children can create characters, style their homes, and visit virtual rooms of employees. This
            game helps children feel <mark>more comfortable</mark> and reduces the barrier to seeking help. Below
            are some pixel art assets I created for this project.
          </p>
        ),
        rubyMus: () => (
          <p>
            This project spotlights <mark>Ruby Mus</mark>, an emerging music artist and student from Rock City
            Eindhoven. As part of a school assignment, our team developed her branding (brandbook), orchestrated a
            photo shoot, produced a dance video, and her website. I took charge of shooting the photos, editing the
            photos, and creating a <mark>neon effect</mark> for the dance video using After Effects.
          </p>
        ),
        souraiko: () => (
          <p>
            Souraiko is a <mark>passion project</mark> between my friend and me, where every piece of clothing,
            sticker, accessory, and figure is selfmade with care and creativity. Our designs are unique, reflecting
            our love for streetwear and the planet. We strive to produce our clothing in the most{' '}
            <mark>environmentally friendly</mark> manner possible. Our latest venture involves creating 3D
            characters with AR codes and spreading them across cities. By scanning the QR code, you can claim the
            artwork on our site, earning discounts or becoming part of our community. It&apos;s like a geo hunt,
            blending fashion with interactive tech!
          </p>
        ),
        zelda: () => (
          <p>
            In this project, I&apos;ve worked on recreating the iconic intro scene of the original{' '}
            <mark>Legend of Zelda (NES)</mark>, but with a custom twist where you can enter your own name, and it
            will display &quot;The Legend of [Your Name].&quot; I meticulously recreated all the assets and coded
            the entire experience using <mark>HTML, CSS, and JavaScript</mark>. Click on{' '}
            <a
              href="https://legend-of-zelda-poc.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'underline',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#6f02c6')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'inherit')}
            >
              Legend of Zelda (NES)
            </a>{' '}
            to view the project and experience the custom intro for yourself.
          </p>
        ),
        displini: () => (
          <>
            <p>
              Displini is my ongoing <mark>creative project and productivity app</mark> in one. It showcases
              modern, playful design while helping you actually improve your habits and daily discipline. With
              built-in <mark>AI powered by OpenAI</mark>, Displini helps you plan, schedule, reschedule, and turn
              your day into a clear to-do list.
            </p>
            <p className="mt-2">Website, logo and UX is made by me.</p>
          </>
        ),
        lookbook: () => (
          <p>
            My <mark>Lookbook</mark> page is filled with images of my creations, vacations/holidays, friends,
            nature, myself, and more. It&apos;s a glimpse <mark>into my world</mark> outside of work, where I find
            inspiration and joy in everyday moments.
          </p>
        ),
      },
    },
  },
  nl: {
    nav: {
      about: 'Over mij',
      projects: 'Projecten',
      lookbook: 'Lookbook',
    },
    hero: {
      subtitle: 'Portfolio website',
      scrollDown: 'Scroll naar beneden om meer te lezen en te zien',
      swipeMore: 'Swipe om meer te lezen en te zien',
    },
    about: {
      titles: {
        one: 'Leuk je te ontmoeten',
        two: 'Bekijk mijn werk',
        three: 'Momentopnames uit het leven',
      },
      texts: {
        one: () => (
          <p>
            Welkom op mijn website. Mijn naam is <span><mark>Soulaiman Meskini</mark></span> en ik woon in het
            mooie Eindhoven. Kijk gerust rond, net als de wiebelogen, bij mijn projecten. Ik ben dol op creatief
            bezig zijn: van schetsen en video-editing tot de details van <mark>UX/UI design</mark>. Mijn toolbox
            bestaat uit Adobe-programma&apos;s zoals Photoshop, InDesign, Illustrator en After Effects, maar ook
            Canva, Figma en Procreate.
          </p>
        ),
        two: () => (
  <p>
            Mijn designs zijn sterk <mark>geïnspireerd door de Japanse cultuur</mark> en de otaku-stijl, subtiel
            verweven in elk project. Ik ben toegewijd aan mijn vak en wil altijd <mark>meer dan 100%</mark> geven.
            Bekijk mijn cv voor vaardigheden, opleiding en contact. Je kunt ook mijn{' '}
            <Link
              to="/projects"
              className="font-semibold text-[#6f02c6] hover:text-opacity-75 transition-opacity duration-300"
            >
              projectpagina
            </Link>{' '}
            bekijken om mijn werk in detail te zien.
          </p>
        ),
        three: () => (
          <p>
            Naast design leg ik graag momenten vast en <mark>ontdek ik nieuwe plekken.</mark> Mijn{' '}
            <Link
              to="/lookbook"
              className="font-semibold text-[#6f02c6] hover:text-opacity-75 transition-opacity duration-300"
            >
              Lookbook
            </Link>{' '}
            staat vol beelden van mijn creaties, vakanties, vrienden, natuur, mijzelf en meer. Het is een kijkje{' '}
            <mark>in mijn wereld</mark> buiten werk, waar ik inspiratie en plezier vind. Neem een kijkje en leer
            me beter kennen! Voor een persoonlijkere touch of vergelijkbare beelden kun je mijn socials bekijken.
          </p>
        ),
      },
      imgText: {
        one: 'Fontys Tilburg - Nederland',
        two: 'Grand Café Van Gogh - Roemenië',
        three: 'Obelisk - Vaticaanstad',
      },
    },
    projects: {
      titles: {
        customMedia: 'Custom Media',
        ventilatieland: 'Ventilatieland',
        kindertelefoon: 'De Kindertelefoon',
        rubyMus: 'Ruby Mus',
        souraiko: 'Souraiko',
        zelda: 'The Legend of Zelda',
        displini: 'Displini',
        lookbook: 'Lookbook',
      },
      linkText: {
        viewProject: 'Bekijk project',
        viewLookbook: 'Bekijk lookbook',
        visitDisplini: 'Bezoek Displini',
        visitArticles: 'Bekijk artikelen',
      },
      texts: {
        customMedia: () => (
          <p>
            Ik liep stage bij Custom Media in Japan, waar ik hielp met het <mark>herontwerpen</mark> van het
            GoConnect-merk via UX- en UI-verbeteringen. GoConnect is een platform voor expats en reizigers in
            Japan, met info over wonen, investeren en Engelstalige diensten. Tijdens mijn stage redesignede ik de
            website in Figma, maakte een eigen Linktree, schreef artikelen en ontwierp een nieuwe nieuwsbrief. Die
            drie maanden leerden me veel over ontwerpen binnen een <mark>andere cultuur</mark> en hoe bedrijven in
            Japan communiceren.
          </p>
        ),
        ventilatieland: () => (
          <p>
            Tijdens mijn afstudeerstage bij Econox ontwierp en ontwikkelde ik een <mark>hulpmenu</mark> voor de
            webshop Ventilatieland. Ik maakte ETIM-productpagina&apos;s en verbeterde de UX in het PIM-systeem
            Skwirrel. Veel bezoekers weten welk producttype ze nodig hebben maar niet welk merk of model past. In
            plaats van de site te verlaten, leidt het nieuwe hulpmenu gebruikers naar drie passende{' '}
            <mark>productmatches</mark>.
          </p>
        ),
        kindertelefoon: () => (
          <p>
            Voor een schoolproject werkte ik aan een campagne voor Partout ter ondersteuning van &quot;De
            Kindertelefoon&quot;. Ik deed <mark>uitgebreid onderzoek</mark> naar waarom kinderen aarzelen om contact
            op te nemen. Hoewel 90% de dienst kende, vonden velen het spannend om te bellen. Daarom bouwde ons team
            een webgame waarin kinderen personages kunnen maken, huizen stylen en virtuele kamers van medewerkers
            bezoeken. Zo voelen ze zich <mark>op hun gemak</mark> en wordt de drempel lager. Hieronder zie je een
            paar pixelart-assets die ik voor dit project maakte.
          </p>
        ),
        rubyMus: () => (
          <p>
            Dit project draait om <mark>Ruby Mus</mark>, een opkomende muziekartiest en student van Rock City
            Eindhoven. Voor een schoolopdracht ontwikkelden we haar branding (brandbook), regelden een fotoshoot,
            maakten een dansvideo en haar website. Ik schoot en edite de foto&apos;s en gaf de dansvideo een
            <mark> neon-effect</mark> in After Effects.
          </p>
        ),
        souraiko: () => (
          <p>
            Souraiko is een <mark>passieproject</mark> van mijn vriend en mij. Elk kledingstuk, elke sticker,
            accessoire en figuur maken we zelf met zorg en creativiteit. Onze designs zijn uniek en laten onze
            liefde voor streetwear en de planeet zien. We produceren zo <mark>duurzaam</mark> mogelijk. Onze
            nieuwste stap: 3D-characters met AR-codes verspreiden. Door de QR te scannen claim je het artwork,
            verdien je korting of word je onderdeel van de community. Een soort geohunt die fashion en interactieve
            tech mixt!
          </p>
        ),
        zelda: () => (
          <p>
            In dit project recreëerde ik de iconische intro van de originele{' '}
            <mark>Legend of Zelda (NES)</mark>, maar dan met een twist: je eigen naam verschijnt in &quot;The
            Legend of [Your Name].&quot; Ik maakte alle assets na en codeerde alles met <mark>HTML, CSS en
            JavaScript</mark>. Klik op{' '}
            <a
              href="https://legend-of-zelda-poc.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'underline',
                transition: 'color 0.3s ease',
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = '#6f02c6')}
              onMouseOut={(e) => (e.currentTarget.style.color = 'inherit')}
            >
              Legend of Zelda (NES)
            </a>{' '}
            om het project te bekijken en de custom intro te ervaren.
          </p>
        ),
        displini: () => (
          <>
            <p>
              Displini is mijn lopende <mark>creatieve project en productiviteitsapp</mark> in één. Het combineert
              een speels, modern design met echte hulp om je gewoontes te verbeteren. Met ingebouwde{' '}
              <mark>AI (OpenAI)</mark> helpt Displini je plannen, plannen herzien en je dag in een duidelijke
              to-do-lijst zetten.
            </p>
            <p className="mt-2">Website, logo en UX zijn door mij gemaakt.</p>
          </>
        ),
        lookbook: () => (
          <p>
            Mijn <mark>Lookbook</mark> staat vol beelden van mijn creaties, vakanties, vrienden, natuur, mijzelf en
            meer. Het is een kijkje <mark>in mijn wereld</mark> buiten werk, waar ik inspiratie en plezier vind.
  </p>
        ),
      },
    },
  },
};
