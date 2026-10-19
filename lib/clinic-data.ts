export interface DentistProfile {
  id: string;
  slug: string;
  name: string;
  title: string;
  qualifications: string;
  specialization: string;
  experienceYears: number;
  bio: string;
  philosophy: string;
  education: string[];
  memberships: string[];
  specialties: string[];
  image: string;
  warmImage: string;
}

export interface ServiceDetail {
  slug: string;
  name: string;
  navLabel: string;
  tagline: string;
  shortDescription: string;
  clinicalExplanation: string;
  whoNeeds: string[];
  benefits: string[];
  indications: { condition: string; explanation: string }[];
  procedureSteps: { stepNumber: number; title: string; duration: string; description: string; clinicalDetails: string }[];
  recoveryTimeline: { period: string; expectedSensations: string; careProtocol: string }[];
  costTransparency: { baseRange: string; factors: string[]; whatIsIncluded: string[]; note: string };
  beforeAfterCase: { category: string; clinicalContext: string; beforeLabel: string; afterLabel: string; beforeImage: string; afterImage: string; timeframe: string };
  assignedDentistId: string;
  faqs: { question: string; answer: string; relatedSlug?: string }[];
}

export interface ClinicInformation {
  name: string;
  legalName: string;
  tagline: string;
  establishedYear?: number;
  primaryLocation: {
    street: string;
    suite: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    directions: string;
    landmarks: string;
    coordinates?: { lat: number; lng: number };
  };
  contact: { phone: string; emergencyPhone: string; email?: string; whatsapp: string; website?: string };
  identityHighlights: string[];
  schedule: { day: string; hours: string; isOpenToday?: boolean; isEmergencyOnly?: boolean }[];
  verifiedStats: { value: number; suffix: string; label: string; description: string }[];
  accreditations: string[];
}

export const CLINIC_INFO: ClinicInformation = {
  name: 'Proven Roofing', legalName: 'Proven Roofing LTD', tagline: 'Your local roofing specialists in Cork.',
  primaryLocation: {
    street: '18 South Bank, The Lough', suite: '', city: 'Cork', state: 'County Cork', postalCode: 'T12 TP89', country: 'Ireland',
    directions: '18 South Bank, The Lough, Cork, T12 TP89, Ireland', landmarks: 'VGWC+FG Cork, Ireland',
  },
  contact: { phone: '+353 87 069 0272', emergencyPhone: '+353 87 069 0272', whatsapp: '+353 87 069 0272', website: 'https://www.provenroofing.ie/' },
  identityHighlights: ['Roofing contractor', 'Cork, Ireland'],
  schedule: [{ day: 'Monday', hours: 'Open 24 hours' }, { day: 'Tuesday', hours: 'Open 24 hours' }, { day: 'Wednesday', hours: 'Open 24 hours' }, { day: 'Thursday', hours: 'Open 24 hours' }, { day: 'Friday', hours: 'Open 24 hours' }, { day: 'Saturday', hours: 'Open 24 hours' }, { day: 'Sunday', hours: 'Open 24 hours' }],
  verifiedStats: [{ value: 5, suffix: '.0', label: 'Google rating', description: '17 customer reviews' }], accreditations: [],
};

const teamId = 'michael';
export const DENTISTS: DentistProfile[] = [{
  id: teamId, slug: 'michael', name: 'Michael', title: 'Roofing specialist', qualifications: '', specialization: 'Roof repairs, new roofs and guttering', experienceYears: 0,
  bio: 'Michael and the Proven Roofing team provide roofing and guttering work across County Cork. Recent reviews praise the service and workmanship; one customer noted the quoted price stayed the same when they called back.',
  philosophy: 'Take the time to understand the roof, explain the work and deliver the agreed workmanship.',
  education: [], memberships: [], specialties: ['Roof repairs', 'New roofs', 'Flat roofing', 'Guttering'], image: '/images/proven-logo-square.png', warmImage: '/images/proven-logo-square.png',
}];

const photos = Array.from({ length: 17 }, (_, i) => `/images/jsroof-stock-${String(i + 1).padStart(2, '0')}.jpg`);

const makeService = (slug: string, name: string, tagline: string, description: string, needs: string[], benefits: string[], photo: number): ServiceDetail => ({
  slug, name, navLabel: name, tagline, shortDescription: description, clinicalExplanation: description,
  whoNeeds: needs, benefits,
  indications: needs.map((condition) => ({ condition, explanation: `We can discuss the roof, the issue you have noticed and the suitable options for ${condition.toLowerCase()}.` })),
  procedureSteps: [
    { stepNumber: 1, title: 'Tell us about the roof', duration: 'Initial conversation', description: 'Share what you have noticed and what you would like to have done.', clinicalDetails: 'We discuss the property, the roof and the work you have in mind.' },
    { stepNumber: 2, title: 'Assess and quote', duration: 'By arrangement', description: 'The team reviews the job and explains the proposed scope and price.', clinicalDetails: 'The work is agreed with you before it begins.' },
    { stepNumber: 3, title: 'Carry out the work', duration: 'As agreed', description: 'The team completes the agreed roofing or maintenance work.', clinicalDetails: 'Timing depends on the roof, access, materials and weather.' },
    { stepNumber: 4, title: 'Review the finish', duration: 'On completion', description: 'Review the completed work with the team.', clinicalDetails: 'Any questions about the completed work can be discussed with the team.' },
  ],
  recoveryTimeline: [
    { period: 'Before work', expectedSensations: 'The scope, timing and access arrangements are discussed.', careProtocol: 'Share details about the roof and any access considerations.' },
    { period: 'During work', expectedSensations: 'Work duration varies with the roof and agreed scope.', careProtocol: 'Keep clear of the work area and follow the team’s site guidance.' },
    { period: 'After work', expectedSensations: 'The completed work is ready for a review.', careProtocol: 'Contact the team with any questions about the work completed.' },
  ],
  costTransparency: { baseRange: 'Request a quote for your property.', factors: ['Roof condition and size', 'Materials and agreed scope', 'Access and site conditions'], whatIsIncluded: ['Discussion of the work required', 'Agreed roofing scope', 'Review of the finished work'], note: 'Price and timing are confirmed with the team after discussing the property and work.' },
  beforeAfterCase: { category: name, clinicalContext: 'Roofing imagery is illustrative. The work required depends on the roof and agreed project scope.', beforeLabel: 'Roofing reference', afterLabel: 'Roofing reference', beforeImage: photos[photo % photos.length], afterImage: photos[(photo + 1) % photos.length], timeframe: 'Illustrative roofing images' },
  assignedDentistId: teamId,
  faqs: [
    { question: `What does ${name.toLowerCase()} involve?`, answer: `${description} The exact work is discussed and agreed with you after reviewing your property and requirements.` },
    { question: 'What can affect the quote?', answer: 'The size and condition of the property, the materials selected, site access and the agreed scope can all affect the price. The team will discuss these factors with you before work begins.' },
    { question: 'How long will the work take?', answer: 'Timing depends on the work required, materials, access, site conditions and weather. The team will discuss a suitable schedule with you as part of the quote.' },
    { question: 'How can I prepare for a discussion or site visit?', answer: 'Share what you have noticed, your property details and any access considerations. Photos taken safely from the ground can also help explain the issue. Please do not climb onto the roof.' },
    { question: 'How do I arrange a quote?', answer: 'Call Proven Roofing on +353 87 069 0272 or use the request-a-quote form to discuss the property and next steps.' },
  ],
});

export const SERVICES: ServiceDetail[] = [
  makeService('roof-repairs', 'Roof Repairs', 'Roof repair work for homes across Cork.', 'Roof repairs for leaks, damaged tiles, roof valleys, flashing and other issues. Proven Roofing can discuss the problem and arrange a free estimate.', ['A roof leak or water ingress', 'Loose or damaged tiles', 'Storm damage or worn roof details'], ['Discuss the condition and repair options', 'Free, no-obligation estimates'], 2),
  makeService('new-roofs', 'New Roofs', 'New roof installations for Cork properties.', 'New roof work planned around your property, the existing roof and your chosen materials. Contact Proven Roofing for a free estimate.', ['A new roof for a property', 'A roof that needs full renewal', 'Roofing as part of a renovation'], ['Discuss materials and project scope', 'Free, no-obligation estimates'], 4),
  makeService('flat-roofing', 'Flat Roofing', 'Flat roof installation and repair in Cork.', 'Flat roofing services for homes and properties, including assessment of worn coverings and discussion of suitable roofing options.', ['A leaking or ageing flat roof', 'A flat roof replacement', 'Flat roof maintenance'], ['Options discussed for your property', 'Free estimates available 7 days a week'], 6),
  makeService('liquid-roofing-systems', 'Liquid Roofing Systems', 'Liquid-applied roofing systems for flat roofs.', 'Liquid roofing systems can be considered for suitable flat roof projects. The team can assess the roof and discuss whether this option fits the property.', ['A flat roof project', 'A roof covering that needs renewal', 'Discussing an alternative flat roof system'], ['Suitability discussed before work', 'Project estimate tailored to the roof'], 7),
  makeService('roof-tiling', 'Roof Tiling', 'Roof tiling and ridge work for pitched roofs.', 'Roof tiling work including repairs and ridge tiling, with the work required discussed after reviewing the roof.', ['Broken or displaced roof tiles', 'Ridge tiles needing attention', 'Pitched roof repairs'], ['Discuss repairs or tiling work', 'Free, no-obligation estimates'], 8),
  makeService('roof-valleys', 'Roof Valleys', 'Roof valley repairs and replacement.', 'Roof valleys channel rainwater between roof slopes. Proven Roofing can inspect visible concerns and discuss repair or renewal options.', ['A leak near a roof valley', 'Worn or damaged valley materials', 'Roof maintenance and repairs'], ['Discuss the roof and water ingress', 'Free estimates across County Cork'], 9),
  makeService('roof-skylights', 'Roof Skylights', 'Skylight replacement and roof work in Cork.', 'Roof skylight work including replacement, with the roof and opening assessed so the proposed work suits your property.', ['A skylight that needs replacing', 'A leak around a roof window', 'Roof work around an existing skylight'], ['Discuss the scope and suitable options', 'Estimate provided before work begins'], 10),
  makeService('chimneys', 'Chimney Repairs', 'Chimney repairs and roof junction maintenance.', 'Chimney repairs for visible wear and water ingress around chimney stacks and roof junctions. Contact us to arrange an assessment.', ['Worn chimney masonry or pointing', 'A leak around a chimney', 'Chimney flashing needing attention'], ['Discuss the issue and repair options', 'Free, no-obligation estimates'], 11),
  makeService('roof-flashing', 'Roof Flashing', 'Roof flashing repairs around vulnerable joints.', 'Roof flashing helps seal joints around chimneys, walls and roof openings. We can assess concerns and discuss the work needed.', ['Loose or damaged flashing', 'Water ingress around roof joints', 'Flashing repairs during roof work'], ['Assessment of the affected roof detail', 'Clear estimate before work'], 12),
  makeService('gutter-repairs', 'Gutter Repairs', 'Gutter repairs to help rainwater drain away.', 'Gutter repairs for leaks, damage and drainage issues. Proven Roofing can discuss the guttering concern and provide a free estimate.', ['Leaking or damaged gutters', 'Overflowing rainwater', 'Loose guttering or brackets'], ['Discuss repair or replacement options', 'Free estimates available 7 days a week'], 13),
  makeService('guttering-installations', 'Guttering Installations', 'Guttering installation for Cork homes and properties.', 'Guttering installation planned for your roofline and property, including discussion of downpipes and drainage.', ['New guttering for a property', 'Replacing worn guttering', 'Adding or replacing downpipes'], ['Discuss suitable guttering and layout', 'Free, no-obligation estimates'], 14),
  makeService('soffit-and-fascia', 'Soffit and Fascia', 'Soffit and fascia installation and repairs.', 'Soffit and fascia work for roof edges, including repairs and replacement options discussed for your property.', ['Worn or damaged fascia boards', 'Soffit repairs or renewal', 'Roofline improvements'], ['Options planned around your roofline', 'Free estimates available 7 days a week'], 15),
  makeService('downpipes', 'Downpipes', 'Downpipe installation and repairs.', 'Downpipe work to help direct rainwater from the guttering system. Discuss installation, repairs or drainage concerns with our team.', ['A leaking or damaged downpipe', 'Gutter replacement requiring downpipes', 'Rainwater drainage concerns'], ['Discuss the guttering and drainage layout', 'Free, no-obligation estimates'], 3),
  makeService('dry-verges', 'Dry Verges', 'Dry verge installation and repair.', 'Dry verge work for pitched roof edges, with options discussed for repairs or installation on your property.', ['A roof verge needing repair', 'Loose or worn verge details', 'Pitched roof maintenance'], ['Discuss the roof edge and work required', 'Free estimates across County Cork'], 5),
];

export interface EmergencyCondition { id: string; title: string; urgency: 'Immediate (0–2 hours)' | 'Same-Day (2–6 hours)' | 'Urgent (Within 24 hours)'; symptoms: string[]; immediateAction: string[]; clinicTreatment: string; }
export const EMERGENCY_CONDITIONS: EmergencyCondition[] = [
  { id: 'active-leak', title: 'Active roof leak', urgency: 'Same-Day (2–6 hours)', symptoms: ['Water entering through the roof', 'A growing damp patch during rain'], immediateAction: ['Move people and belongings away from the wet area.', 'Keep clear of electrical fittings affected by water.', 'Do not climb onto the roof during rain.'], clinicTreatment: 'Contact the team to discuss the leak and arrange next steps when the property can be accessed safely.' },
  { id: 'storm-damage', title: 'Storm damage', urgency: 'Urgent (Within 24 hours)', symptoms: ['Roofing materials displaced by wind', 'An exposed area of roof'], immediateAction: ['Keep clear of loose materials.', 'Photograph visible damage from the ground if safe.', 'Do not climb onto the roof or attempt repairs yourself.'], clinicTreatment: 'The team can discuss an inspection when access is safe.' },
  { id: 'ceiling-water', title: 'Water near electrical fittings', urgency: 'Immediate (0–2 hours)', symptoms: ['Dampness near lights or sockets', 'A sagging or changing ceiling'], immediateAction: ['Leave the affected area and do not touch wet electrical equipment.', 'Contact a qualified professional if electrical power needs to be isolated.', 'Seek emergency assistance if anyone or the property is in immediate danger.'], clinicTreatment: 'Make the property safe first; roof work can be discussed when the area is secure.' },
];

export interface BlogPost { slug: string; title: string; category: string; readTime: string; publishDate: string; lastUpdated: string; authorId: string; excerpt: string; leadImage: string; relatedServiceSlug: string; content: { intro: string; sections: { heading: string; body: string }[]; faqs?: { question: string; answer: string }[] }; }
export const BLOG_POSTS: BlogPost[] = [
  { slug: 'signs-your-roof-needs-repair', title: 'Signs your roof may need repair', category: 'Roof Repairs', readTime: '3 min read', publishDate: '2026-10-18', lastUpdated: '2026-10-18', authorId: teamId, excerpt: 'Leaks, damaged roofing materials and damp patches can all be reasons to arrange a roof assessment.', leadImage: photos[2], relatedServiceSlug: 'roof-repairs', content: { intro: 'Roof issues are not always obvious from inside the home. A leak or visible damage is a useful reason to ask a roofing contractor to assess the roof and discuss next steps.', sections: [{ heading: 'Look for signs from the ground', body: 'After bad weather, look for displaced materials or damage from a safe position on the ground. Do not climb onto a roof to inspect or repair it yourself.' }, { heading: 'Notice changes inside', body: 'Water marks or damp patches may point to a roof leak. Keep people and belongings away from affected areas and be cautious around electrical fittings.' }] } },
  { slug: 'planning-a-new-roof', title: 'Planning a new roof', category: 'New Roofs', readTime: '4 min read', publishDate: '2026-10-18', lastUpdated: '2026-10-18', authorId: teamId, excerpt: 'Discuss the roof condition, materials, access and project timing before replacement work begins.', leadImage: photos[4], relatedServiceSlug: 'new-roofs', content: { intro: 'A new roof project starts with understanding the property, the roof condition and the work involved. Discuss materials and project scope with your roofing contractor before agreeing on a plan.', sections: [{ heading: 'Talk through the roof and materials', body: 'The existing roof and the needs of the property help guide material options and the scope of work.' }, { heading: 'Agree timing and access', body: 'Access, site conditions and weather can affect scheduling. Confirm the arrangements and quote before work starts.' }] } },
  { slug: 'roof-maintenance-and-gutters', title: 'Roof maintenance and guttering', category: 'Guttering', readTime: '3 min read', publishDate: '2026-10-18', lastUpdated: '2026-10-18', authorId: teamId, excerpt: 'Good drainage helps direct rainwater away from your roof and property.', leadImage: photos[12], relatedServiceSlug: 'guttering-installations', content: { intro: 'Gutters form part of the roof drainage system. If they are damaged or not draining as expected, discuss the condition with a roofing contractor.', sections: [{ heading: 'Pay attention to drainage', body: 'Overflowing or damaged guttering may need maintenance or replacement. Describe what you have noticed when arranging an assessment.' }, { heading: 'Keep access safe', body: 'Avoid climbing ladders or working at height without the right training and equipment. Contact a qualified contractor to discuss the work.' }] } },
  { slug: 'what-to-do-after-storm-roof-damage', title: 'What to do after storm damage to a roof', category: 'Emergency Repairs', readTime: '3 min read', publishDate: '2026-10-18', lastUpdated: '2026-10-18', authorId: teamId, excerpt: 'Keep clear of loose roofing materials and contact a contractor to discuss safe next steps.', leadImage: photos[16], relatedServiceSlug: 'roof-flashing', content: { intro: 'Storms can dislodge or damage roofing materials. Keep people away from affected areas and do not climb onto the roof to inspect it.', sections: [{ heading: 'Make the area safe', body: 'Keep clear of loose materials and move people and belongings away from any water entering the property. Be cautious around wet electrical fittings.' }, { heading: 'Get advice', body: 'Photograph visible damage from the ground if safe, then contact a roofing contractor to discuss inspection and repairs.' }] } },
];
