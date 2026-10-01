/**
 * The Daily Journal - Mock Editorial News Dataset
 * Modeled after traditional broadsheet & digital news standards (The Express Tribune)
 */

export const siteConfig = {
  name: "THE DAILY JOURNAL",
  tagline: "The Voice of Independent Journalism — Established 1947",
  edition: "Pakistan & International Edition",
  dateFormatted: new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date()),
  weather: {
    city: "Islamabad",
    temp: "24°C",
    condition: "Sunny",
  },
  markets: [
    { symbol: "KSE-100", value: "88,245.60", change: "+1.42%", positive: true },
    { symbol: "S&P 500", value: "5,751.13", change: "+0.38%", positive: true },
    { symbol: "PKR / USD", value: "277.85", change: "-0.08%", positive: false },
    { symbol: "Gold (10g)", value: "242,100", change: "+0.65%", positive: true },
    { symbol: "Brent Crude", value: "$74.15", change: "-1.10%", positive: false },
  ],
};

export const breakingNews = [
  {
    id: "break-1",
    headline: "SCO Summit: Prime Minister calls for enhanced regional connectivity and sustainable trade corridor",
    timestamp: "12 mins ago",
    category: "Diplomacy",
    url: "#article/sco-summit-regional-connectivity",
  },
  {
    id: "break-2",
    headline: "Central Bank cuts benchmark interest rate by 150 basis points citing declining inflation trend",
    timestamp: "28 mins ago",
    category: "Economy",
    url: "#article/central-bank-cuts-policy-rate",
  },
  {
    id: "break-3",
    headline: "UN Climate Envoy urges immediate climate financing pledges ahead of COP negotiations",
    timestamp: "45 mins ago",
    category: "World",
    url: "#article/un-climate-envoy-financing-call",
  },
  {
    id: "break-4",
    headline: "Champions Trophy 2025: Gaddafi Stadium upgradation enters final construction phase",
    timestamp: "1 hour ago",
    category: "Sports",
    url: "#article/champions-trophy-stadium-upgrade",
  },
];

export const navigationCategories = [
  { id: "home", label: "Home", slug: "home" },
  { id: "pakistan", label: "Pakistan", slug: "pakistan" },
  { id: "world", label: "World", slug: "world" },
  { id: "business", label: "Business", slug: "business" },
  { id: "technology", label: "Technology", slug: "technology" },
  { id: "sports", label: "Sports", slug: "sports" },
  { id: "entertainment", label: "Entertainment", slug: "entertainment" },
  { id: "opinion", label: "Opinion", slug: "opinion" },
  { id: "lifestyle", label: "Life & Style", slug: "lifestyle" },
];

export const articles = [
  // 1. LEAD STORY (Featured front page)
  {
    id: "lead-story-1",
    slug: "sco-summit-regional-connectivity",
    title: "SCO Summit Concludes in Islamabad: Member States Forge Consensus on Green Energy and Trade Corridors",
    subtitle: "Joint declaration emphasizes multilateral trade corridors, cross-border digital payment networks, and climate resilience frameworks across South and Central Asia.",
    category: "Pakistan",
    section: "lead",
    isLead: true,
    isFeatured: true,
    author: {
      name: "Tariq Mahmood",
      role: "Diplomatic Affairs Editor",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "October 2, 2026 • 00:15 PKT",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=85",
    imageCaption: "Delegates and foreign dignitaries assemble at the Jinnah Convention Centre in Islamabad for the concluding plenary session of the SCO Council of Heads of Government.",
    summary: "In a landmark diplomatic gathering, heads of government from across member states reaffirmed commitments to mutual economic cooperation, resolving tariff barriers, and bolstering digital trans-Eurasian transport routes.",
    content: [
      "ISLAMABAD — The Shanghai Cooperation Organisation (SCO) Council of Heads of Government concluded its two-day high-level summit here on Thursday, issuing a comprehensive joint communique that outlines strategic priorities in energy transition, infrastructural integration, and counter-terrorism.",
      "Presiding over the summit's final plenary at the Jinnah Convention Centre, Pakistan's leadership underscored the imperative of transforming geographical proximity into robust trade conduits. With bilateral trade among member nations currently standing at a fraction of its potential, the delegates agreed to fast-track harmonized customs clearance protocols and establish digital transit documentation systems.",
      "'Our shared geopolitical geography is not merely a map; it is a living economic corridor capable of lifting hundreds of millions out of poverty,' the Prime Minister observed during his keynote address to the assembly.",
      "Key outcomes of the summit included a unanimous resolution backing cross-border settlements in local currencies, a proposal that economists argue could buffer emerging economies from global foreign currency liquidity shocks. Central bankers from attending nations will convene next month in Tashkent to finalize technical frameworks.",
      "On environmental security, the assembly ratified the Islamabad Framework on Glacial Lake Outburst Floods (GLOF), dedicating a joint early-warning disaster response fund designed to safeguard agrarian valleys across the Hindu Kush and Himalayan mountain belts.",
      "Foreign observers hailed the smooth organization and diplomatic warmth of the summit as a major achievement for the host country, establishing a constructive baseline for multilateral engagement heading into the upcoming UN General Assembly session."
    ],
    tags: ["SCO Summit", "Islamabad", "Diplomacy", "Trade", "Central Asia"],
    relatedIds: ["sec-story-1", "pak-2", "bus-1"],
  },

  // 2. SECONDARY FEATURED STORIES (Beside or below the lead)
  {
    id: "sec-story-1",
    slug: "central-bank-cuts-policy-rate",
    title: "State Bank Slashes Policy Rate to 15.5% as Headline Inflation Cools to 32-Month Low",
    subtitle: "Monetary Policy Committee signals gradual monetary easing to support industrial revival while preserving external sector stability.",
    category: "Business",
    section: "secondary",
    isFeatured: true,
    author: {
      name: "Sania Rehman",
      role: "Senior Economics Correspondent",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "October 1, 2026 • 22:40 PKT",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=85",
    imageCaption: "The State Bank of Pakistan headquarters in Karachi. The Monetary Policy Committee announced its decision following a day-long review.",
    summary: "Driven by bumper harvest yields and steady energy tariff adjustments, the central bank took decisive action to lower borrowing costs for manufacturing enterprises.",
    content: [
      "KARACHI — The Monetary Policy Committee (MPC) of the State Bank of Pakistan on Thursday announced a 150 basis point reduction in the key policy rate, bringing it down to 15.5 percent with immediate effect.",
      "The rate cut marks the third consecutive policy easing cycle, driven by an annualized Consumer Price Index (CPI) inflation print that retreated to 6.9 percent in September, significantly outpacing the central bank's earlier medium-term targets.",
      "Financial markets greeted the announcement enthusiastically, with the Karachi Stock Exchange benchmark KSE-100 climbing over 1,200 points in after-hours institutional trading.",
      "In its post-decision statement, the MPC highlighted that current account dynamics have remained resilient, aided by robust remittance inflows from expatriate workers and lower international crude oil import bills."
    ],
    tags: ["State Bank", "Interest Rates", "Inflation", "KSE-100", "Economy"],
    relatedIds: ["bus-1", "lead-story-1", "bus-2"],
  },
  {
    id: "sec-story-2",
    slug: "ai-governance-summit-telecom",
    title: "National AI Task Force Unveils Strategic Roadmap for South Asia's First Sovereign GPU Cluster",
    subtitle: "Public-private initiative aims to cultivate indigenous large language models and bolster digital export competitiveness.",
    category: "Technology",
    section: "secondary",
    isFeatured: true,
    author: {
      name: "Bilal Farooq",
      role: "Tech & Cyber Editor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "October 1, 2026 • 21:15 PKT",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Engineers inspecting high-performance computing server racks at the National Incubation Center data facility in Islamabad.",
    summary: "The Ministry of IT along with leading tech consortiums has launched a $120M venture to establish high-throughput computing infrastructure for academic and commercial AI research.",
    content: [
      "ISLAMABAD — In a bid to position the country at the forefront of digital innovation in the Global South, the National AI Task Force has unveiled a blueprint to deploy 10,000 sovereign tensor compute nodes over the next eighteen months.",
      "The initiative aims to address a critical bottleneck faced by domestic artificial intelligence startups: prohibitive cloud computing costs and data sovereignty restrictions.",
      "Under the framework, domestic software developers, universities, and health-tech enterprises will receive subsidized computational credits to train vernacular language models in Urdu, Sindhi, Pashto, and Punjabi.",
      "'Without computational sovereignty, emerging nations risk remaining mere consumers rather than creators of transformative technologies,' stated the Task Force co-chair."
    ],
    tags: ["Artificial Intelligence", "Technology", "Cloud Computing", "Innovation"],
    relatedIds: ["tech-1", "bus-1"],
  },
  {
    id: "sec-story-3",
    slug: "supreme-court-judicial-reforms",
    title: "Supreme Court Full Court Establishes Uniform Bench Allocation Criteria in Landmark Ruling",
    subtitle: "Constitutional benches to streamline case disposal, targeting decades-old pendency in civil and commercial litigations.",
    category: "Pakistan",
    section: "secondary",
    isFeatured: true,
    author: {
      name: "Zainab Bokhari",
      role: "Legal & Constitutional Affairs Analyst",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "October 1, 2026 • 20:00 PKT",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=85",
    imageCaption: "The Supreme Court of Pakistan building along Constitution Avenue, Islamabad.",
    summary: "The apex court unanimously passed rules setting objective algorithmic criteria for bench formation, ensuring judicial transparency and expeditious justice delivery.",
    content: [
      "ISLAMABAD — In what senior jurists describe as a historic institutional reform, a full bench of the Supreme Court of Pakistan has finalized operational guidelines governing cause-list scheduling and bench constitution.",
      "The digital allocation system will automatically schedule appeals based on chronological filing dates, barring rare national emergencies where urgent judicial intervention is warranted.",
      "Legal experts and bar council leadership widely praised the move as an indispensable step toward clearing the backlog of over 50,000 pending petitions."
    ],
    tags: ["Supreme Court", "Judiciary", "Constitution", "Pakistan"],
    relatedIds: ["lead-story-1", "pak-2"],
  },

  // 3. LATEST NEWS FEED (Chronological timeline)
  {
    id: "latest-1",
    slug: "karachi-deep-water-terminal-expansion",
    title: "Karachi Port inaugurates automated deep-water container terminal to handle mega container vessels",
    category: "Business",
    publishedAt: "25 mins ago",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=300&q=80",
    readTime: "2 min read",
  },
  {
    id: "latest-2",
    slug: "gulf-cooperation-council-trade-pact",
    title: "Final text of Free Trade Agreement with GCC nations initialed ahead of ministerial signing",
    category: "World",
    publishedAt: "42 mins ago",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80",
    readTime: "3 min read",
  },
  {
    id: "latest-3",
    slug: "cricket-tri-series-schedule-announced",
    title: "PCB confirms tri-nation ODI series involving South Africa and New Zealand for early February",
    category: "Sports",
    publishedAt: "1 hour ago",
    image: "https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=300&q=80",
    readTime: "2 min read",
  },
  {
    id: "latest-4",
    slug: "solar-tariffs-net-metering-update",
    title: "NEPRA clarifies rooftop solar regulations; ensures existing prosumer net-metering contracts remain untouched",
    category: "Pakistan",
    publishedAt: "2 hours ago",
    image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=300&q=80",
    readTime: "3 min read",
  },
  {
    id: "latest-5",
    slug: "european-space-agency-climate-satellite",
    title: "Earth observation orbiter captures vital hydrological data on Indus basin glacial retreat",
    category: "Technology",
    publishedAt: "3 hours ago",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&q=80",
    readTime: "3 min read",
  },
  {
    id: "latest-6",
    slug: "lok-virsa-folk-heritage-festival",
    title: "Ten-day national heritage festival kicks off at Lok Virsa with over 500 artisans displaying master crafts",
    category: "Entertainment",
    publishedAt: "4 hours ago",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80",
    readTime: "2 min read",
  },

  // 4. OPINION & EDITORIAL PIECES
  {
    id: "op-1",
    slug: "rethinking-pakistans-fiscal-compact",
    title: "Rethinking the Fiscal Compact: Why Taxing Real Estate and Agriculture Can No Longer Wait",
    subtitle: "A sustainable macroeconomic equilibrium demands dismantling archaic tax exemptions that penalize formal salaried labor.",
    category: "Opinion",
    section: "opinion",
    author: {
      name: "Dr. Asad Ullah Khan",
      role: "Former Chief Economist & Visiting Fellow at Brookings",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "October 1, 2026",
    readTime: "6 min read",
    summary: "As sovereign debt servicing eats up fiscal breathing room, our political leadership must exhibit courage to broaden the tax base across untaxed provincial segments.",
    content: [
      "For decades, Pakistan's macroeconomic debates have resembled a tragic Groundhog Day. Every structural crisis brings an emergency trip to multilateral lenders, cosmetic spending freezes, and regressive indirect levies on electricity bills and fuel.",
      "The elephant in the room remains what it has always been: a structural tax-to-GDP ratio stuck below 10 percent because influential lobbies in urban real estate and agrarian elite landholding have successfully evaded equitable documentation.",
      "A salaried teacher or junior engineer in Lahore pays a higher effective income tax rate than an owner of hundreds of fertile canal-irrigated acres. This is not merely an economic inefficiency; it is a moral hazard tearing the social fabric apart.",
      "If the current reform momentum is to endure beyond the present IMF stabilization cycle, the provincial assemblies must pass unified agricultural income tax legislation indexed to actual market returns, alongside capital value levies that disincentivize unproductive speculative land plots."
    ],
    tags: ["Taxation", "Fiscal Reform", "Economy", "Editorials"],
  },
  {
    id: "op-2",
    slug: "geopolitics-of-the-silicon-strait",
    title: "The Silicon Strait: Navigating the US-China Tech Divide Without Alienating Either Superpower",
    subtitle: "Middle powers in the Global South cannot afford technological bifurcations that sever access to global scientific supply chains.",
    category: "Opinion",
    section: "opinion",
    author: {
      name: "Huma Rabbani",
      role: "Distinguished Fellow for International Security",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "October 1, 2026",
    readTime: "5 min read",
    summary: "Strategic autonomy in the 21st century is defined by digital architecture. Maintaining interoperability between Eastern and Western technology stacks is our greatest foreign policy challenge.",
    content: [
      "In an era where export controls on advanced extreme ultraviolet (EUV) photolithography equipment carry the strategic weight once reserved for naval blockades, foreign policy can no longer be formulated in diplomatic isolation.",
      "For Pakistan, whose telecommunication backbone relies substantially on partner hardware while its software export markets reside predominantly in North America and Western Europe, technological alignment cannot be a zero-sum calculation.",
      "We must adopt open standards, invest aggressively in domestic semiconductor design talent, and champion neutral digital corridors that bridge polarized computational ecosystems."
    ],
    tags: ["Geopolitics", "Semiconductors", "Foreign Policy", "Technology"],
  },
  {
    id: "op-3",
    slug: "climate-finance-from-pledges-to-pipelines",
    title: "Loss and Damage: Transforming Glasgow & Sharm el-Sheikh Pledges into Concrete Valley Pipelines",
    subtitle: "Vulnerable states cannot rebuild washed-away bridges with declarations and promissory statements.",
    category: "Opinion",
    section: "opinion",
    author: {
      name: "Syed M. Ali",
      role: "Environmental Jurist & Climate Policy Analyst",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    },
    publishedAt: "September 30, 2026",
    readTime: "4 min read",
    summary: "Direct grant transfers for climate adaptation must replace high-interest loans that plunge post-disaster communities into debt traps.",
    content: [
      "When unprecedented atmospheric rivers triggered the catastrophic 2022 deluges across Sindh and Balochistan, the international community pledged solidarity. Yet four years later, disbursement of institutional loss-and-damage financing remains mired in bureaucratized multilateral procedures.",
      "Communities along the Swat riverbanks cannot wait for decade-long feasibility studies to rebuild flood-resistant retaining embankments. We must demand direct, grant-based financing mechanisms that recognize climate vulnerability as an urgent global responsibility."
    ],
    tags: ["Climate Change", "Environment", "Global Warming", "Floods"],
  },

  // 5. PAKISTAN SECTION ARTICLES
  {
    id: "pak-1",
    slug: "diamer-bhasha-dam-reaches-milestone",
    title: "Diamer-Bhasha Dam Project Crosses 60% Completion Mark Ahead of Divergent River Closure",
    subtitle: "Massive roller-compacted concrete gravity dam will add 4,500MW clean hydel power and 6.4 million acre-feet of water storage.",
    category: "Pakistan",
    section: "pakistan",
    author: {
      name: "Farhan Saeed",
      role: "Infrastructure Bureau Chief",
    },
    publishedAt: "October 1, 2026 • 18:30 PKT",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Aerial perspective of civil engineering excavation and RCC dam crest works on the Indus River gorge.",
    summary: "Engineers have successfully completed the main diversion tunnels, paving the way for round-the-clock concrete placement on the main dam wall.",
    content: [
      "CHILAS — In a monumental stride for national water and energy security, project directors at the Diamer-Bhasha Dam site confirmed that overall civil works have reached 62 percent completion.",
      "The multipurpose facility, rising 272 meters above the riverbed, is designed to withstand seismic activity while holding back enough sediment to extend the operational lifespan of downstream Tarbela Dam by over three decades.",
      "WAPDA engineers confirmed that diversion tunnel number two has achieved dry closure testing, allowing the Indus River's flow to be safely routed through subterranean spillway ducts during the upcoming peak snowmelt season."
    ],
    tags: ["Diamer Bhasha", "WAPDA", "Hydropower", "Water Storage", "Indus"],
  },
  {
    id: "pak-2",
    slug: "islamabad-metro-electric-bus-expansion",
    title: "Capital Development Authority Rolls Out 160 Electric Buses Across Eight New Commuter Corridors",
    subtitle: "Eco-friendly transit system links peripheral rural sectors to central government and educational hubs.",
    category: "Pakistan",
    section: "pakistan",
    author: {
      name: "Ayesha Malik",
      role: "Urban Affairs Reporter",
    },
    publishedAt: "October 1, 2026 • 15:45 PKT",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Fleet of newly deployed zero-emission electric commuter buses lined up at the central charging depot in Sector H-9, Islamabad.",
    summary: "Equipped with dedicated battery charging stations and smart farecards, the public bus expansion aims to reduce carbon emissions and ease traffic bottlenecks.",
    content: [
      "ISLAMABAD — Commuters across the federal capital woke up to expanded public transit options on Thursday as the Capital Development Authority (CDA) inaugurated operations on eight new routes.",
      "The newly commissioned fleet of 160 zero-emission electric buses will cater to over 100,000 daily passengers, connecting suburban zones in Bara Kahu, Rawat, and Tarnol to the central red line metro spine.",
      "Special discounts have been enacted for students, senior citizens, and differently-abled travelers, who can access universal digital smartcards integrated into national identity verifications."
    ],
    tags: ["Islamabad", "Public Transit", "Electric Vehicles", "Clean Energy"],
  },

  // 6. WORLD SECTION ARTICLES
  {
    id: "world-1",
    slug: "un-peacekeeping-mandate-middle-east",
    title: "UN Security Council Unanimously Adopts Resolution for Ceasefire Verification and Civilian Aid Passages",
    subtitle: "Resolution 2814 mandates unimpeded humanitarian convoys and establishes an independent monitoring mission under UN auspices.",
    category: "World",
    section: "world",
    author: {
      name: "David Vance",
      role: "United Nations Correspondent",
    },
    publishedAt: "October 1, 2026 • 23:10 PKT",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Security Council chamber at UN Headquarters in New York following the unanimous vote on Resolution 2814.",
    summary: "Diplomats described the vote as an indispensable breakthrough after months of gridlock, opening safe land routes for emergency medical and sustenance relief.",
    content: [
      "NEW YORK — Following weeks of intense back-channel negotiations, all fifteen members of the United Nations Security Council voted affirmatively on Thursday to mandate immediate humanitarian pauses and established verified transit corridors.",
      "The resolution obligates all parties to guarantee safe passage for convoys from the World Food Programme, the World Health Organization, and the Red Crescent.",
      "Speaking after the vote, the Secretary-General welcomed the council's rare unanimity, emphasizing that operational logistics on the ground must begin within hours to avert catastrophic famine conditions."
    ],
    tags: ["United Nations", "Security Council", "Peacekeeping", "Humanitarian Aid"],
  },
  {
    id: "world-2",
    slug: "european-union-quantum-computing-initiative",
    title: "European Commission Approves €12B Quantum Computing Roadmap to Secure Critical Infrastructure",
    subtitle: "Strategic program establishes post-quantum cryptography standards across banking, aerospace, and power grid networks.",
    category: "World",
    section: "world",
    author: {
      name: "Helena Lindqvist",
      role: "European Affairs Bureau",
    },
    publishedAt: "October 1, 2026 • 19:20 PKT",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Cryogenic dilution refrigerator setup at a quantum optics laboratory in Munich.",
    summary: "The European Union has moved to safeguard its digital financial architecture against future quantum decryption breakthroughs with a landmark multi-nation funding pledge.",
    content: [
      "BRUSSELS — The European Commission has officially cleared an ambitious €12 billion strategic investment envelope aimed at achieving quantum resilience by 2030.",
      "The program will fund three cutting-edge fabrication centers in Germany, France, and the Netherlands to develop fault-tolerant superconducting qubit processors while updating legacy military and financial cryptography to lattice-based mathematics.",
      "EU tech commissioners emphasized that preparing for the post-quantum paradigm is essential to preserving national sovereignty in data transmission and satellite communications."
    ],
    tags: ["European Union", "Quantum Computing", "Cybersecurity", "Technology"],
  },

  // 7. BUSINESS SECTION ARTICLES
  {
    id: "bus-1",
    slug: "pakistan-it-exports-cross-3-5-billion",
    title: "Pakistan IT and Software Exports Surge 28% to Record $3.8 Billion in FY26",
    subtitle: "Freelancer formalization, enterprise cloud consulting, and software services driving foreign exchange earnings.",
    category: "Business",
    section: "business",
    author: {
      name: "Kamran Qureshi",
      role: "Commerce & Trade Analyst",
    },
    publishedAt: "October 1, 2026 • 17:15 PKT",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Software developers working at a tech park campus in Lahore.",
    summary: "Boosted by central bank regulatory relaxations permitting IT firms to hold 50% export proceeds in foreign currency bank accounts, the digital sector has outpaced traditional textiles in growth rate.",
    content: [
      "KARACHI — Pakistan's information technology and IT-enabled services (ITeS) exports registered historic numbers during the fiscal year, touching $3.82 billion according to figures released by the State Bank of Pakistan.",
      "The robust growth trajectory reflects growing overseas demand for enterprise software engineering, fintech backend development, and AI data annotation hubs located across Karachi, Lahore, and Islamabad.",
      "Industry leaders attribute the momentum to consistent policy incentives, notably the specialized foreign currency retention regime which allows registered export houses to seamlessly finance international marketing and cloud server infrastructure."
    ],
    tags: ["IT Exports", "Software", "Economy", "Tech Startups", "Karachi"],
  },
  {
    id: "bus-2",
    slug: "renewable-energy-investments-thar-solar",
    title: "Consortium Finalizes $650M Financing for 1,000MW Hybrid Wind and Solar Park in Jhimpir Corridor",
    subtitle: "Project will supply ultra-low-cost clean electricity at 4.2 cents per kilowatt-hour into the national grid.",
    category: "Business",
    section: "business",
    author: {
      name: "Nadeem Akhtar",
      role: "Energy Markets Correspondent",
    },
    publishedAt: "October 1, 2026 • 14:10 PKT",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Wind turbine installations along the Gharo-Jhimpir wind corridor in Sindh.",
    summary: "Combining bifacial photovoltaic panels with utility-scale wind turbines, the hybrid energy park will generate baseload clean power directly offsetting expensive imported fuel generation.",
    content: [
      "JHIMPIR — In the largest private renewable energy transaction in the country's history, a syndicate of domestic commercial banks and international green climate funds finalized debt documentation for the Jhimpir Megawatt Hybrid Complex.",
      "The project will deploy 600 megawatts of tracking solar PV arrays alongside 400 megawatts of high-yield wind turbines, taking advantage of the wind corridor's nocturnal gusts to deliver round-the-clock power stability.",
      "Commercial operations are slated to commence within eighteen months, with electricity tariff tariffs locked at an unprecedented low of 4.2 US cents per unit."
    ],
    tags: ["Renewable Energy", "Wind Power", "Solar", "Energy Grid", "Sindh"],
  },

  // 8. TECHNOLOGY SECTION ARTICLES
  {
    id: "tech-1",
    slug: "5g-spectrum-auction-pakistan-rollout",
    title: "PTA Finalizes 5G Spectrum Auction Framework; Commercial Launch Slated for Early Q1 2027",
    subtitle: "High-speed mobile broadband frequency bands in 3.5GHz and 2.6GHz allocated for smart city and telemedicine pilots.",
    category: "Technology",
    section: "technology",
    author: {
      name: "Bilal Farooq",
      role: "Tech & Cyber Editor",
    },
    publishedAt: "October 1, 2026 • 16:00 PKT",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Fiber optic communication infrastructure and cellular transmission base stations.",
    summary: "The Pakistan Telecommunication Authority has released the technical guidelines for commercial 5G rollout, prioritizing tier-1 metropolitan clusters before phased provincial coverage.",
    content: [
      "ISLAMABAD — After extensive multi-stakeholder consultations with cellular mobile operators, the Pakistan Telecommunication Authority (PTA) has formally approved the Information Memorandum for the upcoming 5G spectrum auction.",
      "The roadmap mandates winning bidders to establish localized 5G testbeds within major university hospitals and industrial production zones to stimulate applications in autonomous logistics, smart agriculture monitoring, and remote robotic surgery.",
      "Telecom analysts note that operators are accelerating their fiber-to-the-tower (FTTT) backhaul rollouts, which have already crossed 45 percent coverage across key municipal corporations."
    ],
    tags: ["5G", "Telecommunications", "PTA", "Broadband", "Smart Cities"],
  },

  // 9. SPORTS SECTION ARTICLES
  {
    id: "sports-1",
    slug: "champions-trophy-stadium-upgrade",
    title: "Gaddafi, National, and Rawalpindi Stadiums Overhauled for ICC Champions Trophy 2025",
    subtitle: "State-of-the-art LED floodlighting, upgraded media centres, and digitized hospitality enclosures ready for ICC inspection.",
    category: "Sports",
    section: "sports",
    author: {
      name: "Shahid Hashmi",
      role: "Chief Cricket Correspondent",
    },
    publishedAt: "October 1, 2026 • 21:00 PKT",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Gaddafi Stadium Lahore under illuminated floodlights during evening trial fixtures.",
    summary: "The Pakistan Cricket Board has completed the extensive infrastructure revamps across all three host venues well ahead of the global cricket extravaganza.",
    content: [
      "LAHORE — Ahead of the anticipated inspection visit by the International Cricket Council (ICC) technical delegation, the Pakistan Cricket Board (PCB) confirmed that structural renovations at Lahore's Gaddafi Stadium and Karachi's National Bank Stadium are virtually complete.",
      "The upgrades include sightlines optimized for spectator comfort, world-class dressing rooms outfitted with modern recovery hydrotherapy suites, and ultra-high-definition broadcast camera tracks.",
      "'We are thrilled to welcome the top eight cricket teams of the world to pristine venues that honor the grand traditions and unmatched passion of Pakistani cricket supporters,' PCB officials stated during a media briefing."
    ],
    tags: ["Cricket", "Champions Trophy", "PCB", "Gaddafi Stadium", "Sports"],
  },
  {
    id: "sports-2",
    slug: "arshad-nadeem-javelin-world-athletics-gold",
    title: "Olympic Champion Arshad Nadeem Clinches Diamond League Gold with 92.4m Monster Throw",
    subtitle: "Pakistani track-and-field icon dominates world championship field in Zurich, cementing legendary athletic stature.",
    category: "Sports",
    section: "sports",
    author: {
      name: "Shahid Hashmi",
      role: "Chief Cricket Correspondent",
    },
    publishedAt: "October 1, 2026 • 13:40 PKT",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Track and field athletes at the international athletics stadium.",
    summary: "Continuing his supreme reign in international javelin, Arshad Nadeem unleashed a world-leading throw on his fourth attempt to capture the prestigious Diamond League trophy.",
    content: [
      "ZURICH — Olympic gold medalist Arshad Nadeem continued his record-shattering dominance on the international circuit by capturing first place at the Diamond League finals in Switzerland.",
      "His fourth-round throw of 92.47 meters eclipsed the competition, leaving rival throwers in awe of his explosive technique and consistency.",
      "The victory brings another global accolade home to Pakistan, inspiring a burgeoning generation of javelin throwers and track athletes across the nation's grassroots training academies."
    ],
    tags: ["Arshad Nadeem", "Javelin", "Diamond League", "Olympics", "Athletics"],
  },

  // 10. ENTERTAINMENT SECTION ARTICLES
  {
    id: "ent-1",
    slug: "lahore-international-film-festival-revival",
    title: "Lahore International Film Festival Celebrates Renaissance of Independent South Asian Cinema",
    subtitle: "Over 80 feature films, documentaries, and animated shorts from 24 nations screened across historic walled-city venues.",
    category: "Entertainment",
    section: "entertainment",
    author: {
      name: "Mariam Sherazi",
      role: "Arts & Culture Critic",
    },
    publishedAt: "October 1, 2026 • 19:40 PKT",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Red carpet and projection amphitheatre set up at the Lahore Fort's Sheesh Mahal courtyard for the opening gala.",
    summary: "Filmmakers, storytellers, and cinephiles converged in Lahore for a week-long celebration highlighting female directors and groundbreaking regional narratives.",
    content: [
      "LAHORE — The seventh edition of the Lahore International Film Festival (LIFF) kicked off with an enchanting opening ceremony staged beneath the illuminated arches of the Sheesh Mahal in the historic Lahore Fort.",
      "This year's curated lineup features a powerful spotlight on socially conscious cinema, with independent shorts exploring rural education, climate migration in the Indus delta, and the preservation of indigenous musical traditions.",
      "Audiences gave standing ovations to several homegrown debut films, reinforcing how Pakistani cinema has successfully navigated commercial revival while preserving intellectual honesty."
    ],
    tags: ["Film Festival", "Cinema", "Culture", "Lahore", "Art"],
  },
  {
    id: "ent-2",
    slug: "coke-studio-global-tour-sold-out",
    title: "Coke Studio Global Arena Tour Sells Out London O2 and Dubai Coca-Cola Arena Within Hours",
    subtitle: "Fusion music sensation brings indigenous Sufi poetry, folk beats, and urban hip-hop to thunderous international audiences.",
    category: "Entertainment",
    section: "entertainment",
    author: {
      name: "Mariam Sherazi",
      role: "Arts & Culture Critic",
    },
    publishedAt: "October 1, 2026 • 12:15 PKT",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Live musical ensemble performing traditional qawwali harmoniums and percussion instruments on stage.",
    summary: "With over 4 billion views worldwide, Pakistan's premier musical franchise continues its trailblazing journey across world concert arenas.",
    content: [
      "LONDON — Music lovers in the British capital secured all 20,000 tickets to the Coke Studio Live arena concert in under forty minutes, cementing the cultural phenomenon's status as one of the world's most vibrant musical exports.",
      "The lineup features iconic artists collaborating live with symphonic orchestras, fusing Eastern classical raags with contemporary electronic rhythm sections.",
      "Cultural analysts praise the platform for showcasing Pakistan's rich pluralistic heritage to millions of younger global listeners."
    ],
    tags: ["Coke Studio", "Music", "Sufi", "Culture", "Concerts"],
  },

  // 11. LIFE & STYLE SECTION
  {
    id: "life-1",
    slug: "hunza-valley-sustainable-ecotourism-boom",
    title: "Hunza Valley Pioneers Zero-Plastic Community Tourism and Solar-Powered Eco-Lodges",
    subtitle: "Local community councils enforce strict environmental ordinances to safeguard pristine Karakoram glaciers and orchards.",
    category: "Life & Style",
    section: "lifestyle",
    author: {
      name: "Samina Baig",
      role: "Travel & Ecology Contributor",
    },
    publishedAt: "October 1, 2026 • 11:00 PKT",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85",
    imageCaption: "Terraced apricot orchards and snowcapped peaks of the Hunza valley.",
    summary: "By coupling heritage conservation with sustainable tourism codes, the valley offers a blueprint for alpine preservation in the face of climate change.",
    content: [
      "KARIMABAD — As travelers from around the world flock to witness the autumn foliage of the Karakoram range, local village organizations across Central Hunza have implemented a trailblazing environmental pact.",
      "Single-use plastic bottles and polythene packaging have been banned at all highway entry checkpoints, replaced by community-operated spring water refill kiosks and biodegradable fabric bags.",
      "Tourism revenues are pooled into a valley endowment fund that subsidizes winter heating for schools and funds reforestation along fragile moraine slopes."
    ],
    tags: ["Hunza", "Ecotourism", "Karakoram", "Travel", "Environment"],
  },
];

export const trendingStories = [
  {
    rank: 1,
    id: "lead-story-1",
    title: "SCO Summit Concludes in Islamabad: Member States Forge Consensus on Green Energy and Trade",
    category: "Pakistan",
    views: "184.2K reads",
  },
  {
    rank: 2,
    id: "sec-story-1",
    title: "State Bank Slashes Policy Rate to 15.5% as Headline Inflation Cools to 32-Month Low",
    category: "Business",
    views: "142.8K reads",
  },
  {
    rank: 3,
    id: "sports-2",
    title: "Olympic Champion Arshad Nadeem Clinches Diamond League Gold with 92.4m Monster Throw",
    category: "Sports",
    views: "119.5K reads",
  },
  {
    rank: 4,
    id: "op-1",
    title: "Rethinking the Fiscal Compact: Why Taxing Real Estate and Agriculture Can No Longer Wait",
    category: "Opinion",
    views: "98.4K reads",
  },
  {
    rank: 5,
    id: "bus-1",
    title: "Pakistan IT and Software Exports Surge 28% to Record $3.8 Billion in FY26",
    category: "Business",
    views: "82.1K reads",
  },
];
