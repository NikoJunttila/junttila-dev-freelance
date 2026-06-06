export type Lang = 'fi' | 'en';

export type ServiceExample = { label: string; url: string };

export type Service = {
  tag: string;
  title: string;
  sub: string;
  price: string;
  from: string;
  body: string;
  bullets: string[];
  examples?: ServiceExample[];
};

export type HourlyItem = { icon: string; t: string; d: string };

export type Hourly = {
  tag: string;
  title: string;
  sub: string;
  price: string;
  lead: string;
  items: HourlyItem[];
};

export type HostingOption = { title: string; price: string; body: string };

export type Process = { n: string; t: string; d: string };

export type Testimonial = {
  q: string;
  who: string;
  sub: string;
  portfolioId?: PortfolioItem['id'];
};

export type BlogPost = { slug: string; tag: string; t: string; d: string; date: string };

export type SectionKey =
  | 'services'
  | 'work'
  | 'about'
  | 'process'
  | 'testimonials'
  | 'reading'
  | 'contact';

export type AiCopy = {
  kicker: string;
  title: string;
  sub: string;
  disclaimer: string;
  intro: string;
  placeholder: string;
  send: string;
  sending: string;
  thinking: string;
  ctaContact: string;
  errorRateLimit: string;
  errorGeneric: string;
  clearChat: string;
  examples: string[];
};

export type Copy = {
  nav: Record<'services' | 'work' | 'about' | 'process' | 'blog' | 'contact' | 'ai', string>;
  sectionKickers: Record<SectionKey, string>;
  hero: {
    kicker: string;
    title1: string;
    title2: string;
    title3: string;
    body: string;
    cta1: string;
    cta2: string;
    meta: string[];
  };
  servicesH: string;
  servicesSub: string;
  servicesExampleLabel: string;
  services: Service[];
  hourly: Hourly;
  hostingTitle: string;
  hostingBody: string;
  hostingA: HostingOption;
  hostingB: HostingOption;
  workH: string;
  workSub: string;
  aboutH: string;
  aboutBody1: string;
  aboutBody2: string;
  aboutBody3: string;
  aboutStats: [string, string][];
  processH: string;
  processSub: string;
  process: Process[];
  testimonialsH: string;
  testimonials: Testimonial[];
  blogH: string;
  blogSub: string;
  blog: BlogPost[];
  contactH: string;
  contactBody: string;
  contactCta: string;
  contactPhoneLabel: string;
  contactForm: {
    name: string;
    email: string;
    message: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    required: string;
    invalidEmail: string;
  };
  footer: string;
  blogBack: string;
  blogPlaceholder: string;
  ai: AiCopy;
  seo: { title: string; description: string };
};

export const COPY: Record<Lang, Copy> = {
  fi: {
    nav: {
      services: 'Palvelut',
      work: 'Työt',
      about: 'Minä',
      process: 'Prosessi',
      blog: 'Blogi',
      contact: 'Ota yhteyttä',
      ai: 'AI-arvio'
    },
    sectionKickers: {
      services: 'palvelut',
      work: 'työt',
      about: 'minä',
      process: 'prosessi',
      testimonials: 'palautteet',
      reading: 'luettavaa',
      contact: 'yhteystiedot'
    },
    hero: {
      kicker: 'Freelance-kehittäjä · Kokkola / etänä',
      title1: 'Nettisivut',
      title2: 'jotka palvelevat sinua.',
      title3: '',
      body: 'Olen Niko, 6v+ kokemusta web-kehityksestä. Rakennan sivut, verkkokaupat ja työkalut yrittäjille, harrastajille ja arjen ammattilaisille. Selkeällä hinnalla ja selkokielellä.',
      cta1: 'Pyydä tarjous',
      cta2: 'Katso työt',
      meta: ['6+ v. kokemusta', 'Suomeksi & englanniksi', 'Hosting alk. 10€/kk']
    },
    servicesH: 'Mitä voin tehdä sinulle',
    servicesSub:
      'Selkeät aloitushinnat. Ei piilolaskuja, ei kuukausimaksuja minulle. Kerron heti, mitä saat ja mistä maksat.',
    servicesExampleLabel: 'Esimerkki',
    services: [
      {
        tag: '01',
        title: 'Esittelysivu',
        sub: 'Yhden sivun mainossivu',
        price: '200€',
        from: 'alkaen',
        body: 'Kaunis, nopea ja mobiili-optimoitu sivu, joka kertoo mitä teet ja saa asiakkaan ottamaan yhteyttä. Sopii pienyrittäjälle, taiteilijalle tai harrastajalle.',
        bullets: ['Mobiili & nopea', 'Oma domain & SSL', 'Yhteydenottolomake'],
        examples: [{ label: 'esanverhoilu.fi', url: 'https://www.esanverhoilu.fi/' }]
      },
      {
        tag: '02',
        title: 'WordPress-sivut',
        sub: 'Päivität itse, ilman pelkoa',
        price: '400€',
        from: 'alkaen',
        body: 'Klassinen valinta jos haluat lisätä uutisia, kuvia tai tuotteita itse. Annan kirjalliset ohjeet ja pidetään yhdessä lyhyt opastus.',
        bullets: ['Käytön opastus', 'Helppo päivittää', 'Kirjalliset ohjeet'],
        examples: [
          { label: 'Mikä on WordPress? (kinsta.com)', url: 'https://kinsta.com/blog/what-is-wordpress/' }
        ]
      },
      {
        tag: '03',
        title: 'Verkkokauppa',
        sub: 'Myynti auki 24/7',
        price: '500€',
        from: 'alkaen',
        body: 'Kaksi vaihtoehtoa: WooCommerce, jota voit itse muokata helpommin, tai räätälöity kauppa Vendure-pohjalla, joka on nopeampi ja taipuu tarpeisiisi paremmin.',
        bullets: ['Maksunvälitys', 'Toimituslogiikka', 'Varaston hallinta'],
        examples: [
          { label: 'woo.junttila.dev (WooCommerce)', url: 'https://woo.junttila.dev/' },
          { label: 'store.junttila.dev (räätälöity / Vendure)', url: 'https://store.junttila.dev/' }
        ]
      },
      {
        tag: '04',
        title: 'Vaativampi sivusto',
        sub: 'Räätälöity ratkaisu',
        price: 'Sovitaan',
        from: '',
        body: 'Kun haluat enemmän kuin valmiit raamit. Esimerkiksi verkkokauppa monimutkaisella logiikalla, varausjärjestelmä, oma sovellus tai integraatiot. Jutellaan ensin tarpeesi läpi.',
        bullets: ['Räätälöinti', 'Integraatiot', 'Pidempi projekti']
      }
    ],
    hourly: {
      tag: '05',
      title: 'Tuntityö',
      sub: 'Yhdellä hinnalla kaikkeen muuhun',
      price: '50€/h',
      lead: 'Yksi selkeä hinta kaikkeen joustavaan tekemiseen. Laskutan vain todelliset tunnit, en minuuttia enempää. Sopii erityisesti:',
      items: [
        { icon: '🐛', t: 'Bugit & pienet korjaukset', d: 'Joku rikki? Korjataan.' },
        { icon: '🤖', t: 'AI-opastus & agentit', d: 'Claude, Cursor ja muut työkalut käytäntöön.' },
        { icon: '💬', t: 'Botit & integraatiot', d: 'Discord-botit, automaatiot, API-liimaukset.' },
        { icon: '📊', t: 'Data & analytiikka', d: 'Raportit, dashboardit, mittarit selkeästi.' },
        { icon: '📣', t: 'Verkkomainonta', d: 'Google-, Facebook- ja TikTok-kampanjat.' },
        { icon: '⚡', t: 'CLI & skriptit', d: 'Toistuvat työt automaattisiksi.' },
        { icon: '📱', t: 'Mobiilisovellukset', d: 'Pienet iOS/Android-projektit.' },
        { icon: '🧭', t: 'Konsultointi & sparrausta', d: 'Toinen mielipide tai tekninen sanasto käännös.' }
      ]
    },
    hostingTitle: 'Entä hosting?',
    hostingBody: 'Sivu pitää majoittaa jonnekin. Sinulla on kaksi reittiä, kumpikin OK:',
    hostingA: {
      title: 'Kuukausimaksu',
      price: '~10€/kk',
      body: 'Hoidan palvelimen, päivitykset ja varmuuskopiot. Helppoa.'
    },
    hostingB: {
      title: 'Tee-se-itse',
      price: '+100€ kerralla',
      body: 'Pystytän sinulle omaan pilveen ja näytän käytön. Sen jälkeen et maksa minulle senttiäkään.'
    },
    workH: 'Tehtyjä projecteja',
    aboutH: 'Tervehdys, olen Niko',
    aboutBody1:
      'Olen tehnyt web-kehitystä yli kuusi vuotta monenlaisissa projekteissa. Yksi asia on toistunut: projektit kasvavat monimutkaisemmiksi kuin niiden tarvitsisi, ja yksinkertaiset asiat selitetään vaikealla tavalla, joskus hinnan oikeuttamiseksi, joskus saadakseen homman kuulostamaan vaikeammalta kuin se on.',
    aboutBody2:
      'Halusin tehdä sen toisin. Siksi teen tätä freelancena suoraan ihmisille ja pienille yrityksille: selkeä hinta, selkokielinen puhe, koodi joka toimii.',
    aboutBody3:
      'Töiden ulkopuolella tykkään treenata salilla, käydä vaeltamassa ja uida.',
    aboutStats: [
      ['6+', 'vuotta kokemusta'],
      ['15+', 'tuotannossa olevaa sivua'],
      ['100%', 'selkokielellä']
    ],
    processH: 'Miten työskennellään',
    processSub: 'Yksinkertaista. Ei tuntien kokouksia, ei jargonia.',
    process: [
      {
        n: '01',
        t: 'suunnittelu',
        d: 'Soitto, tekstari tai sähköposti. 15 min, ilmaista. Selvitetään mitä oikeasti tarvitset.'
      },
      {
        n: '02',
        t: 'Tarjous',
        d: 'Kirjallinen tarjous, kiinteä hinta tai tunteja. Tiedät mistä maksat ennen aloitusta.'
      },
      {
        n: '03',
        t: 'Rakentaminen',
        d: 'Näet sivuston toimivan version jo varhain. Sinä kommentoit, minä viilaan matkan varrella. Ei yllätyksiä lopussa.'
      },
      {
        n: '04',
        t: 'Julkaisu',
        d: 'Sivu menee nettiin. Käymme yhdessä läpi miten päivität sitä. Saat dokumentit.'
      }
    ],
    testimonialsH: 'Mitä asiakkaat sanovat',
    testimonials: [
      {
        q: 'Niko teki meille sivut, jotka oikeasti näkyvät ja toimivat. Yhteistyö oli mutkatonta.',
        who: 'Susanna H.',
        sub: 'Hyvinvointikeskus Luxus',
        portfolioId: 'luxus'
      },
      {
        q: 'Ymmärsi mitä haluan, vaikka en itse osannut sanoa sitä koodikielellä. Selkeä hinta, ei yllätyksiä.',
        who: 'Esa J.',
        sub: 'Esan Verhoilu',
        portfolioId: 'esan'
      },
      {
        q: 'Sain portfoliosivun jonka päivittäminen on yhtä helppoa kuin tekstiviestin lähettäminen.',
        who: 'SAJ',
        sub: 'SAJ Art Commissions',
        portfolioId: 'saj'
      }
    ],
    blogH: 'Ajatuksia ja oppaita',
    blogSub: 'Lyhyitä juttuja siitä, miten tehdä parempaa nettiä, pienelläkin budjetilla.',
    blog: [
      {
        slug: 'online-store-under-500',
        tag: 'Ohje',
        t: 'Verkkokauppa alle 500 eurolla, mahdollistako?',
        d: '5 min luku',
        date: 'Huhti 2026'
      },
      {
        slug: 'ai-tools-for-small-business',
        tag: 'Oppi',
        t: 'AI-työkalut pienelle yrittäjälle, mistä aloittaa',
        d: '8 min luku',
        date: 'Maalis 2026'
      },
      {
        slug: 'wordpress-still-a-pick',
        tag: 'Mielipide',
        t: 'Miksi WordPress voi yhä olla paras valintasi',
        d: '6 min luku',
        date: 'Helmi 2026'
      }
    ],
    contactH: 'Otetaan yhteyttä',
    contactBody: 'Yksinkertaisin tapa: laita viestiä. Vastaan yleensä samana päivänä.',
    contactCta: 'Lähetä sähköposti',
    contactPhoneLabel: 'Tai soita',
    contactForm: {
      name: 'Nimi',
      email: 'Sähköposti',
      message: 'Viesti',
      submit: 'Lähetä viesti',
      submitting: 'Lähetetään…',
      success: 'Kiitos viestistäsi! Vastaan pian.',
      error: 'Hups, viestin lähetys epäonnistui. Yritä uudestaan tai laita sähköpostia suoraan.',
      required: 'Pakollinen kenttä',
      invalidEmail: 'Tarkista sähköpostiosoite'
    },
    footer: '© 2026 Niko Junttila · Kokkola, Suomi',
    blogBack: '← Takaisin etusivulle',
    blogPlaceholder:
      'Tulossa pian. Tämä juttu on vielä työn alla. Palaa myöhemmin uudestaan.',
    ai: {
      kicker: 'AI-demo',
      title: 'Pyydä tekoälyltä karkea arvio',
      sub: 'Kerro lyhyesti projektistasi ja saat arvion sopivasta palvelutasosta. Vastaukset suoratoistuvat reaaliajassa. Sama AI-integraatiotekniikka, jollaisia Niko rakentaa myös asiakkailleen.',
      disclaimer:
        'Huom: nämä ovat AI:n karkeita arvioita. Vahvista lopullinen hinta ja aikataulu aina Nikolta.',
      intro:
        'Hei! Olen Nikon AI-assistentti. Kuvaile projektisi muutamalla lauseella. Mitä tarvitset, kenelle se on, ja onko mielessä jotain erityistä. Arvioin minkä palvelutason se vastaa.',
      placeholder: 'Esim. "Haluan yhden sivun esittelysivun pienelle leipomolle, jossa on yhteydenottolomake…"',
      send: 'Lähetä',
      sending: 'Lähetetään…',
      thinking: 'Miettii…',
      ctaContact: 'Hyvältä kuulostaa? Ota yhteyttä Nikoon →',
      errorRateLimit: 'Hidasta hieman! Yritä uudestaan minuutin kuluttua.',
      errorGeneric: 'Jokin meni pieleen. Yritä uudestaan tai ota suoraan yhteyttä.',
      clearChat: 'Tyhjennä keskustelu',
      examples: [
        'Tarvitsen verkkokaupan käsintehdyille koruille',
        'Haluan blogi-sivun, jota pystyn päivittämään itse',
        'Etsin freelancerin tunneilla tekemään pieniä korjauksia'
      ]
    },
    seo: {
      title: 'junttila.dev, freelance-kehittäjä Kokkolasta',
      description:
        'Niko Junttila, 6+ vuotta web-kehitystä. Nettisivut, verkkokaupat ja pienet työkalut yrittäjille selkeällä hinnalla, selkokielellä.'
    }
  },
  en: {
    nav: {
      services: 'Services',
      work: 'Work',
      about: 'About',
      process: 'Process',
      blog: 'Blog',
      contact: 'Contact',
      ai: 'AI estimate'
    },
    sectionKickers: {
      services: 'services',
      work: 'work',
      about: 'about',
      process: 'process',
      testimonials: 'testimonials',
      reading: 'reading',
      contact: 'contact'
    },
    hero: {
      kicker: 'Freelance developer · Kokkola / remote',
      title1: 'Websites',
      title2: 'built for you.',
      title3: '',
      body: "I'm Niko. Six-plus years of web development. I build sites, stores and tools for small businesses, hobbyists and everyday pros. Honest prices, easy to understand.",
      cta1: 'Get a quote',
      cta2: 'See my work',
      meta: ['6+ years building', 'Finnish & English', 'Hosting from 10€/mo']
    },
    servicesH: 'What I can build for you',
    servicesSub:
      'Clear starting prices. No hidden fees, no monthly bills to me. I tell you up-front what you get and what you pay.',
    servicesExampleLabel: 'Example',
    services: [
      {
        tag: '01',
        title: 'Landing page',
        sub: 'One-page advert site',
        price: '200€',
        from: 'from',
        body: 'A clean, fast, mobile-friendly page that says what you do and gets people to contact you. Perfect for a one-person business, an artist, or a side project.',
        bullets: ['Mobile & fast', 'Own domain & SSL', 'Contact form'],
        examples: [{ label: 'esanverhoilu.fi', url: 'https://www.esanverhoilu.fi/' }]
      },
      {
        tag: '02',
        title: 'WordPress site',
        sub: 'You update it yourself',
        price: '400€',
        from: 'from',
        body: 'The classic pick if you want to post news, photos or products yourself. I write up plain instructions and walk you through it.',
        bullets: ['Live training', 'Easy to update', 'Written guide'],
        examples: [
          { label: 'What is WordPress? (kinsta.com)', url: 'https://kinsta.com/blog/what-is-wordpress/' }
        ]
      },
      {
        tag: '03',
        title: 'Online store',
        sub: 'Selling 24/7',
        price: '500€',
        from: 'from',
        body: 'Two options: WooCommerce, which you can more easily customize yourself, or a custom store backed by Vendure, which is faster and more tailored to your needs.',
        bullets: ['Payments', 'Shipping logic', 'Inventory'],
        examples: [
          { label: 'woo.junttila.dev (WooCommerce)', url: 'https://woo.junttila.dev/' },
          { label: 'store.junttila.dev (custom / Vendure)', url: 'https://store.junttila.dev/' }
        ]
      },
      {
        tag: '04',
        title: 'Custom site',
        sub: 'Tailored build',
        price: "Let's talk",
        from: '',
        body: 'When you need more than the templates. A webstore with complex logic, a booking system, a custom app, or deeper integrations. We map your needs together first.',
        bullets: ['Custom build', 'Integrations', 'Larger project']
      }
    ],
    hourly: {
      tag: '05',
      title: 'Hourly work',
      sub: 'One rate for everything else',
      price: '50€/h',
      lead: 'A single, honest hourly rate for all the flexible stuff. I bill actual hours only, nothing inflated. Especially good for:',
      items: [
        { icon: '🐛', t: 'Bug fixes & small additions', d: "Something broken? Let's fix it." },
        { icon: '🤖', t: 'AI coaching & agents', d: 'Claude, Cursor and the rest, put to work.' },
        { icon: '💬', t: 'Bots & integrations', d: 'Discord bots, automations, API glue.' },
        {
          icon: '📊',
          t: 'Data & analytics',
          d: 'Reports, dashboards, metrics you understand.'
        },
        {
          icon: '📣',
          t: 'Online advertising',
          d: 'Google, Facebook and TikTok campaigns.'
        },
        {
          icon: '⚡',
          t: 'CLI scripts & automation',
          d: 'Turn repetitive tasks into one command.'
        },
        { icon: '📱', t: 'Mobile apps', d: 'Small iOS / Android projects.' },
        {
          icon: '🧭',
          t: 'Consulting & sparring',
          d: 'A second opinion or a tech-speak translator.'
        }
      ]
    },
    hostingTitle: 'About hosting',
    hostingBody: 'Your site has to live somewhere. Two routes, both fine:',
    hostingA: {
      title: 'Monthly',
      price: '~10€/mo',
      body: 'I handle the server, updates and backups. Easy mode.'
    },
    hostingB: {
      title: 'DIY setup',
      price: '+100€ once',
      body: 'I set you up on your own cloud and show you the ropes. After that you pay me zero euros forever.'
    },
    workH: 'Recent works',
    aboutH: "Hi, I'm Niko",
    aboutBody1:
      "I've been doing web development for over six years across all kinds of projects. One thing keeps repeating: projects grow more complicated than they need to be, and simple things get explained in hard ways, sometimes to justify the price, sometimes just to make the work sound harder than it is.",
    aboutBody2:
      'I wanted to do it differently. So I freelance directly for people and small businesses: clear pricing, plain language, code that actually works.',
    aboutBody3: 'Outside of work I like lifting, hiking and swimming.',
    aboutStats: [
      ['6+', 'years of experience'],
      ['10+', 'sites in production'],
      ['100%', 'easy to understand']
    ],
    processH: 'How we work together',
    processSub: 'Simple. No long meetings, no jargon.',
    process: [
      {
        n: '01',
        t: 'Chat',
        d: 'Call, text or email. 15 minutes, free. We figure out what you actually need.'
      },
      {
        n: '02',
        t: 'Quote',
        d: 'Written quote, fixed price or hours. You know the cost before we start.'
      },
      {
        n: '03',
        t: 'Building',
        d: 'You see a working version of the site early on. You comment, I refine along the way. No end-of-project surprises.'
      },
      {
        n: '04',
        t: 'Launch',
        d: 'Site goes live. We walk through how you update it. You get the docs.'
      }
    ],
    testimonialsH: 'What clients say',
    testimonials: [
      {
        q: 'Niko built us a site that actually shows up and actually works. The whole thing was painless.',
        who: 'Susanna H.',
        sub: 'Hyvinvointikeskus Luxus',
        portfolioId: 'luxus'
      },
      {
        q: "He understood what I wanted even when I couldn't say it in code-speak. Clear price, no surprises.",
        who: 'Esa J.',
        sub: 'Esan Verhoilu',
        portfolioId: 'esan'
      },
      {
        q: "I got a portfolio site that's as easy to update as sending a text.",
        who: 'SAJ',
        sub: 'SAJ Art Commissions',
        portfolioId: 'saj'
      }
    ],
    blogH: 'Notes & guides',
    blogSub: 'Short reads on building a better internet, even on a small budget.',
    blog: [
      {
        slug: 'online-store-under-500',
        tag: 'How-to',
        t: 'An online store under 500€, is it possible?',
        d: '5 min read',
        date: 'Apr 2026'
      },
      {
        slug: 'ai-tools-for-small-business',
        tag: 'Notes',
        t: 'AI tools for small business owners, where to start',
        d: '8 min read',
        date: 'Mar 2026'
      },
      {
        slug: 'wordpress-still-a-pick',
        tag: 'Opinion',
        t: 'Why WordPress can still be your best pick',
        d: '6 min read',
        date: 'Feb 2026'
      }
    ],
    contactH: "Let's talk",
    contactBody: 'Simplest way: drop me a message. I usually reply the same day.',
    contactCta: 'Send email',
    contactPhoneLabel: 'Or call',
    contactForm: {
      name: 'Name',
      email: 'Email',
      message: 'Message',
      submit: 'Send message',
      submitting: 'Sending…',
      success: "Thanks for the message! I'll get back to you soon.",
      error: "Hmm, that didn't go through. Try again or email me directly.",
      required: 'Required',
      invalidEmail: 'Check the email address'
    },
    footer: '© 2026 Niko Junttila · Kokkola, Finland',
    blogBack: '← Back to home',
    blogPlaceholder: "Coming soon. This post is still being written. Check back later.",
    ai: {
      kicker: 'AI demo',
      title: 'Ask the AI for a rough estimate',
      sub: 'Describe your project briefly and the AI suggests which service tier fits. Replies stream in real time. The same kind of AI integration Niko builds for clients.',
      disclaimer:
        "Heads up: these are AI estimates. Always confirm the final price and timeline with Niko.",
      intro:
        "Hi! I'm Niko's AI assistant. Describe your project in a few sentences. What you need, who it's for, and any specifics. Then I'll suggest which service tier fits.",
      placeholder: 'e.g. "I want a one-page landing site for a small bakery with a contact form…"',
      send: 'Send',
      sending: 'Sending…',
      thinking: 'Thinking…',
      ctaContact: 'Sounds good? Get in touch with Niko →',
      errorRateLimit: 'Slow down a bit! Try again in a minute.',
      errorGeneric: 'Something went wrong. Try again or contact Niko directly.',
      clearChat: 'Clear chat',
      examples: [
        'I need an online store for handmade jewelry',
        'I want a blog I can update myself',
        'Looking for someone hourly to fix small bugs'
      ]
    },
    seo: {
      title: 'junttila.dev, freelance web developer in Kokkola',
      description:
        "Niko Junttila, 6+ years of web development. Websites, online stores and small tools for small businesses. Honest prices, easy to understand."
    }
  }
};

export type PortfolioItem = {
  id: 'saj' | 'esan' | 'luxus' | 'analytics' | 'json' | 'discord' | 'store' | 'oldcv';
  name: string;
  url: string;
  href: string;
  image: string | [string, string];
  tag: Record<Lang, string>;
  year: string;
  desc: Record<Lang, string>;
  palette: [string, string, string, string];
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: 'saj',
    name: 'SAJ Art Commissions',
    url: 'sajportfolio.com',
    href: 'https://www.sajportfolio.com/',
    image: '/saj.png',
    tag: { fi: 'Portfolio & galleria', en: 'Portfolio & gallery' },
    year: '2026',
    desc: {
      fi: 'Taiteilijan tilaussivu. Portfolio, galleria ja tilauslomake.',
      en: 'Artist commission site. Portfolio, gallery and order form.'
    },
    palette: ['#F4B98A', '#D97D4B', '#3A2418', '#FCEDD8']
  },
  {
    id: 'esan',
    name: 'Esan Verhoilu',
    url: 'esanverhoilu.fi',
    href: 'https://www.esanverhoilu.fi/',
    image: '/esanverhoilu.png',
    tag: { fi: 'Yrityssivu', en: 'Business site' },
    year: '2025',
    desc: {
      fi: 'Verhoiluyrityksen sivu. Galleria, palvelut, yhteystiedot.',
      en: 'Upholstery business site. Gallery, services, contact info.'
    },
    palette: ['#7A4B2A', '#C99A6E', '#2A1810', '#EFE2D0']
  },
  {
    id: 'luxus',
    name: 'Hyvinvointikeskus Luxus',
    url: 'hyvinvointikeskusluxus.com',
    href: 'https://www.hyvinvointikeskusluxus.com/',
    image: '/hkl.png',
    tag: { fi: 'Verkkokauppa', en: 'E-commerce' },
    year: '2024',
    desc: {
      fi: 'Hyvinvointialan verkkokauppa, kurssit ja varaukset.',
      en: 'Wellness store with courses and bookings.'
    },
    palette: ['#A57FB8', '#6B4C82', '#1F1729', '#F2EAF5']
  },
  {
    id: 'analytics',
    name: 'analytics.junttila.dev',
    url: 'analytics.junttila.dev',
    href: 'https://analytics.junttila.dev',
    image: '/analytics.png',
    tag: { fi: 'Oma työkalu', en: 'My own tool' },
    year: '2024',
    desc: {
      fi: 'Yksityisyyttä kunnioittava kävijäanalytiikka pienille sivustoille.',
      en: 'Privacy-respecting site analytics for small websites.'
    },
    palette: ['#C4B5FD', '#E8C77A', '#3A332A', '#F5EFE2']
  },
  {
    id: 'json',
    name: 'json.junttila.dev',
    url: 'json.junttila.dev',
    href: 'https://json.junttila.dev/',
    image: '/json.png',
    tag: { fi: 'Oma työkalu', en: 'My own tool' },
    year: '2026',
    desc: {
      fi: 'Työkalu JSON-käännöstiedostojen hallintaan. Visuaalinen editori ja puuttuvien käännösten seuranta.',
      en: 'A tool for managing JSON translation files. Visual editor with missing-translation tracking.'
    },
    palette: ['#C4B5FD', '#7C3AED', '#1E1B2E', '#F0EBFA']
  },
  {
    id: 'discord',
    name: 'TPX Discord Bot',
    url: 'github.com/NikoJunttila/TPX-discordBot',
    href: 'https://github.com/NikoJunttila/TPX-discordBot',
    image: '/discord.png',
    tag: { fi: 'Avoin lähdekoodi', en: 'Open source' },
    year: '2023',
    desc: {
      fi: 'Discord-botti kavereiden League of Legends -pelien seurantaan ja Twitch-chatin integroimiseen Discord-kanavalle.',
      en: "Discord bot that tracks your friends' League of Legends games and pipes Twitch chat into a Discord channel."
    },
    palette: ['#7289DA', '#5865F2', '#1E2235', '#E8EAF8']
  },
  {
    id: 'store',
    name: 'Vendure Storefront',
    url: 'store.junttila.dev',
    href: 'https://store.junttila.dev/',
    image: '/store.png',
    tag: { fi: 'Verkkokaupan pohja', en: 'E-commerce starter' },
    year: '2025',
    desc: {
      fi: 'Esimerkkikauppa, jota käytetään pohjana uusien verkkokauppojen nopeaan rakentamiseen. Backendinä Vendure (vendure.io).',
      en: 'Example storefront used as a base to quickly spin up new e-commerce sites. Powered by the Vendure (vendure.io) headless commerce backend.'
    },
    palette: ['#F08A5D', '#1B2540', '#0B1226', '#F4ECDE']
  },
  {
    id: 'oldcv',
    name: 'junttila.dev (legacy)',
    url: 'junttila.dev',
    href: 'https://gym.junttila.dev/',
    image: ['/old_cv_cooking.png', '/old_cv_gym_tracking.png'],
    tag: { fi: 'Henkilökohtainen sivu', en: 'Personal site' },
    year: '2022',
    desc: {
      fi: 'Aiempi henkilökohtainen sivu. CV, kuntosaliharjoittelun seuranta ja reseptikokoelma.',
      en: 'Older personal site. CV, gym training tracker and recipe collection.'
    },
    palette: ['#E74C3C', '#7A4CC0', '#1A1530', '#F4E9DA']
  }
];

export const CONTACT = {
  email: 'niko@junttila.dev',
  phone: '+358 045 2065808',
  phoneClean: '+3580452065808',
  github: 'github.com/nikojunttila'
};

export const theme = {
  bg: '#F6F1E4',
  bgAlt: '#E8E2CB',
  paper: '#FFFCF3',
  ink: '#1A1A1A',
  inkSoft: '#4A4540',
  mint: '#A8D5B8',
  mintDeep: '#5C9A7B',
  sun: '#F4C95D',
  coral: '#B0421E',
  pink: '#F0B7B7',
  display: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  body: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace'
};

export function findBlogPost(slug: string): { fi: BlogPost; en: BlogPost } | null {
  const i = COPY.fi.blog.findIndex((b) => b.slug === slug);
  if (i < 0) return null;
  return { fi: COPY.fi.blog[i], en: COPY.en.blog[i] };
}
