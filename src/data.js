// All visible text is { en, bn }. Edit here without touching layout.

export const SERVICES = [
  { icon: '🎥', title: { en: 'Cinematography', bn: 'সিনেমাটোগ্রাফি' }, text: { en: 'Multi-camera 4K coverage and cinematic edits: highlight reels, full-length films and social cut-downs.', bn: 'মাল্টি-ক্যামেরা ৪কে কাভারেজ ও সিনেমাটিক এডিট: হাইলাইট রিল, পূর্ণদৈর্ঘ্য ফিল্ম এবং সোশ্যাল মিডিয়ার ছোট ভিডিও।' } },
  { icon: '🚁', title: { en: 'Aerial & Drone', bn: 'এরিয়াল ও ড্রোন' }, text: { en: 'Sweeping drone shots of venues, landscapes and crowds that add scale and drama to your final film.', bn: 'ভেন্যু, প্রকৃতি ও জনসমাগমের আকাশ থেকে তোলা দৃশ্য, যা আপনার ফিল্মে দেয় বিশালতা ও নাটকীয়তা।' } },
  { icon: '📷', title: { en: 'Event Photography', bn: 'ইভেন্ট ফটোগ্রাফি' }, text: { en: 'Candid and portrait coverage placed to catch every angle. Edited galleries delivered fast.', bn: 'প্রতিটি অ্যাঙ্গেল ধরে রাখা ক্যান্ডিড ও পোর্ট্রেট ছবি। দ্রুত এডিট করা গ্যালারি হাতে পাবেন।' } },
  { icon: '🗓️', title: { en: 'Event Management', bn: 'ইভেন্ট ম্যানেজমেন্ট' }, text: { en: 'Concept, venue, vendors, schedule and on-the-day coordination for weddings, corporate events and concerts.', bn: 'বিয়ে, কর্পোরেট অনুষ্ঠান ও কনসার্টের ধারণা, ভেন্যু, ভেন্ডর, সময়সূচি ও অনুষ্ঠানের দিনের সমন্বয়।' } },
  { icon: '📡', title: { en: 'Live Streaming', bn: 'লাইভ স্ট্রিমিং' }, text: { en: 'Broadcast-quality multi-cam streaming so remote guests are part of the moment.', bn: 'ব্রডকাস্ট মানের মাল্টি-ক্যাম স্ট্রিমিং, যাতে দূরের অতিথিরাও অনুষ্ঠানের অংশ হতে পারেন।' } },
  { icon: '💎', title: { en: 'Albums & Keepsakes', bn: 'অ্যালবাম ও স্মৃতিচিহ্ন' }, text: { en: 'Premium printed albums, framed prints and private online galleries to share with family.', bn: 'প্রিমিয়াম প্রিন্টেড অ্যালবাম, ফ্রেমে বাঁধানো ছবি এবং পরিবারের সাথে শেয়ার করার প্রাইভেট অনলাইন গ্যালারি।' } },
]

// Curated public media from the client's profile; provenance in ../media-sources.json.
const photo = (id) => `/photos/rasel/${id}.webp`
export const WORK = [
  { cat: 'landscape', title: { en: 'Waterfront, at dusk', bn: 'গোধূলির জলতীর' }, type: 'Photo', src: photo('4500003163562549') },
  { cat: 'production', title: { en: 'Inside the podcast studio', bn: 'পডকাস্ট স্টুডিওর ভেতরে' }, type: 'Photo', src: photo('4560541677508697') },
  { cat: 'documentary', title: { en: 'Documentary, on location', bn: 'লোকেশনে ডকুমেন্টারি শুট' }, type: 'Photo', src: photo('4531762740386591') },
  { cat: 'aerial', title: { en: 'Before the flight', bn: 'উড্ডয়নের আগে' }, type: 'Photo', src: photo('4531762783719920') },
  { cat: 'documentary', title: { en: 'The recycling story', bn: 'পুনর্ব্যবহারের গল্প' }, type: 'Photo', src: photo('4530156263880572') },
  { cat: 'landscape', title: { en: 'A quieter perspective', bn: 'এক শান্ত দৃষ্টিভঙ্গি' }, type: 'Photo', src: photo('4500003140229218') },
  { cat: 'aerial', title: { en: 'The aerial setup', bn: 'এরিয়াল শুটের প্রস্তুতি' }, type: 'Photo', src: photo('4531762843719914') },
  { cat: 'production', title: { en: 'A frame in the field', bn: 'প্রকৃতির মাঝে একটি ফ্রেম' }, type: 'Photo', src: photo('4444972645732268') },
  { cat: 'production', title: { en: 'Setting the scene', bn: 'দৃশ্যের প্রস্তুতি' }, type: 'Photo', src: photo('4560541970842001') },
  { cat: 'production', title: { en: 'Behind the camera', bn: 'ক্যামেরার পেছনে' }, type: 'Photo', src: photo('4560541950842003') },
  { cat: 'production', title: { en: 'Through the monitor', bn: 'মনিটরে একটি ফ্রেম' }, type: 'Photo', src: photo('4560541780842020') },
  { cat: 'documentary', title: { en: 'Materials, reimagined', bn: 'উপকরণের নতুন জীবন' }, type: 'Photo', src: photo('4530156250547240') },
  { cat: 'documentary', title: { en: 'The field crew', bn: 'লোকেশনের দল' }, type: 'Photo', src: photo('4531762713719927') },
  { cat: 'documentary', title: { en: 'Stories at work', bn: 'কাজের মাঝে গল্প' }, type: 'Photo', src: photo('4531762230386642') },
  { cat: 'production', title: { en: 'Camera in hand', bn: 'হাতে ক্যামেরা' }, type: 'Photo', src: photo('4530156330547232') },
  { cat: 'landscape', title: { en: 'Under open skies', bn: 'খোলা আকাশের নিচে' }, type: 'Photo', src: photo('4519979044898294') },
]
export const FILTERS = [
  { id: 'all', label: { en: 'All', bn: 'সব' } },
  { id: 'production', label: { en: 'Behind the scenes', bn: 'নেপথ্যের দৃশ্য' } },
  { id: 'documentary', label: { en: 'Documentary', bn: 'ডকুমেন্টারি' } },
  { id: 'landscape', label: { en: 'Landscapes', bn: 'প্রকৃতি' } },
  { id: 'aerial', label: { en: 'Aerial production', bn: 'এরিয়াল প্রোডাকশন' } },
]

export const STEPS = [
  { n: '01', title: { en: 'Discover', bn: 'জানা' }, text: { en: 'We learn your vision, guest list, budget and the moments that matter most.', bn: 'আপনার ভাবনা, অতিথির তালিকা, বাজেট এবং সবচেয়ে গুরুত্বপূর্ণ মুহূর্তগুলো আমরা জেনে নিই।' } },
  { n: '02', title: { en: 'Design', bn: 'পরিকল্পনা' }, text: { en: 'A full event plan plus a shot list for photo and video, so nothing is missed.', bn: 'সম্পূর্ণ ইভেন্ট পরিকল্পনা ও ছবি-ভিডিওর শট লিস্ট, যাতে কিছুই বাদ না পড়ে।' } },
  { n: '03', title: { en: 'Deliver', bn: 'ধারণ' }, text: { en: 'We run the day while photographers and cinematographers capture it all.', bn: 'আমরা অনুষ্ঠান সামলাই, আর ফটোগ্রাফার ও সিনেমাটোগ্রাফাররা সবকিছু ধারণ করেন।' } },
  { n: '04', title: { en: 'Relive', bn: 'স্মৃতিতে ফেরা' }, text: { en: 'Edited galleries and films delivered to your private online gallery.', bn: 'এডিট করা ছবি ও ফিল্ম আপনার প্রাইভেট অনলাইন গ্যালারিতে পৌঁছে যায়।' } },
]

// Placeholder amounts in BDT (৳). Replace with Rasel's real rates.
export const PACKAGES = [
  { id: 'Essential', tag: { en: 'Capture', bn: 'ধারণ' }, name: { en: 'Essential', bn: 'এসেনশিয়াল' }, price: 12500, items: [
    { en: 'Up to 4 hours coverage', bn: 'সর্বোচ্চ ৪ ঘণ্টা কাভারেজ' }, { en: '1 photographer', bn: '১ জন ফটোগ্রাফার' },
    { en: '150+ edited photos', bn: '১৫০+ এডিট করা ছবি' }, { en: 'Online gallery', bn: 'অনলাইন গ্যালারি' }] },
  { id: 'Signature', tag: { en: 'Most popular', bn: 'সবচেয়ে জনপ্রিয়' }, name: { en: 'Signature', bn: 'সিগনেচার' }, price: 30000, featured: true, items: [
    { en: 'Full event management', bn: 'সম্পূর্ণ ইভেন্ট ম্যানেজমেন্ট' }, { en: '2 photographers + 1 cinematographer', bn: '২ জন ফটোগ্রাফার + ১ জন সিনেমাটোগ্রাফার' },
    { en: '4K highlight film (3–5 min)', bn: '৪কে হাইলাইট ফিল্ম (৩–৫ মিনিট)' }, { en: '500+ edited photos', bn: '৫০০+ এডিট করা ছবি' }, { en: 'Drone footage', bn: 'ড্রোন ফুটেজ' }] },
  { id: 'Cinematic', tag: { en: 'Everything', bn: 'সবকিছু' }, name: { en: 'Cinematic', bn: 'সিনেমাটিক' }, price: 60000, items: [
    { en: 'End-to-end production', bn: 'শুরু থেকে শেষ পর্যন্ত প্রোডাকশন' }, { en: 'Multi-cam film team + drone', bn: 'মাল্টি-ক্যাম ফিল্ম টিম + ড্রোন' },
    { en: 'Highlight + full-length film', bn: 'হাইলাইট + পূর্ণদৈর্ঘ্য ফিল্ম' }, { en: 'Live streaming', bn: 'লাইভ স্ট্রিমিং' }, { en: 'Premium album', bn: 'প্রিমিয়াম অ্যালবাম' }] },
]

export const QUOTES = [
  { text: { en: 'They ran the whole day so smoothly that we forgot to worry. The film made our families cry. Sample testimonial.', bn: 'পুরো দিনটা এত সুন্দরভাবে সামলেছেন যে দুশ্চিন্তার কথা ভুলেই গিয়েছিলাম। ফিল্মটা দেখে আমাদের পরিবার কেঁদে ফেলেছে। (নমুনা মন্তব্য)' }, who: { en: 'Amira & Daniel', bn: 'আমিরা ও ড্যানিয়েল' }, role: { en: 'Wedding clients', bn: 'বিয়ের ক্লায়েন্ট' } },
  { text: { en: 'Photos were in our inbox the next morning and the aftermovie went viral for the brand. Sample testimonial.', bn: 'পরদিন সকালেই ছবি হাতে পেয়েছি, আর আফটারমুভিটা আমাদের ব্র্যান্ডের জন্য ভাইরাল হয়েছে। (নমুনা মন্তব্য)' }, who: { en: 'Sofia Reyes', bn: 'সোফিয়া রেয়েস' }, role: { en: 'Marketing Director', bn: 'মার্কেটিং ডিরেক্টর' } },
  { text: { en: 'Calm, creative and incredibly organised. One team for planning and coverage is a game changer. Sample testimonial.', bn: 'শান্ত, সৃজনশীল এবং অসাধারণ গোছানো। পরিকল্পনা ও কাভারেজ এক টিমে পাওয়া সত্যিই দারুণ। (নমুনা মন্তব্য)' }, who: { en: 'Karim Hassan', bn: 'করিম হাসান' }, role: { en: 'Festival Producer', bn: 'ফেস্টিভ্যাল প্রযোজক' } },
]

// Phone/WhatsApp: his public number from Facebook. Confirm it is on WhatsApp.
export const CONTACT = {
  email: 'hello@rasel.example',
  phone: '+880 1575 355075',
  tel: '+8801575355075',
  whatsapp: '8801575355075',
  place: { en: 'Bangladesh · Available worldwide', bn: 'বাংলাদেশ · সারা বিশ্বে সেবা দিই' },
}

// Verified public reels. Full playback stays with Facebook; posters are local.
export const HERO_REEL = '1209964024117944'
export const REELS = [
  { id: '1209964024117944', poster: '/photos/rasel/aerial-hero.jpg', title: { en: 'Above the city', bn: 'শহরের আকাশে' }, category: { en: 'Aerial · HashTag Eventography', bn: 'এরিয়াল · HashTag Eventography' } },
  { id: '1247393600662005', poster: photo('reel-1247393600662005'), localVideo: '/videos/reel-1247393600662005.mp4', title: { en: 'On the factory floor', bn: 'কারখানার ভেতরে' }, category: { en: 'Documentary · Photo Click', bn: 'ডকুমেন্টারি · ফটো ক্লিক' } },
  { id: '945359991032245', poster: photo('reel-945359991032245'), localVideo: '/videos/reel-945359991032245.mp4', title: { en: 'A story unfolds', bn: 'গল্পের শুরু' }, category: { en: 'Drama trailer · ZRITV', bn: 'নাটকের ট্রেলার · ZRITV' } },
  { id: '1184676460541645', poster: photo('reel-1184676460541645'), title: { en: 'After dark', bn: 'সন্ধ্যার পরে' }, category: { en: 'Event film', bn: 'ইভেন্ট ফিল্ম' } },
  { id: '1022793594070555', poster: photo('reel-1022793594070555'), title: { en: 'The recycling story', bn: 'পুনর্ব্যবহারের গল্প' }, category: { en: 'Documentary · Behind the scenes', bn: 'ডকুমেন্টারি · নেপথ্যের দৃশ্য' } },
  { id: '1477413774153429', poster: photo('reel-1477413774153429'), title: { en: 'A world in motion', bn: 'চলমান এক পৃথিবী' }, category: { en: 'Visual montage', bn: 'ভিজ্যুয়াল মন্টাজ' } },
  { id: '1021410550105332', poster: photo('reel-1021410550105332'), title: { en: 'Under the lights', bn: 'আলোর নিচে' }, category: { en: 'Live event', bn: 'লাইভ ইভেন্ট' } },
  { id: '25088383934178123', poster: photo('reel-25088383934178123'), title: { en: 'On the event floor', bn: 'অনুষ্ঠানের প্রাঙ্গণে' }, category: { en: 'Production · Photo Click', bn: 'প্রোডাকশন · ফটো ক্লিক' } },
]
export const FB_PAGE = 'https://www.facebook.com/raselofficialid'

export const PAYMENT_METHODS = [
  { en: 'bKash', bn: 'বিকাশ' }, { en: 'Nagad', bn: 'নগদ' }, { en: 'Rocket', bn: 'রকেট' },
  { en: 'Bank transfer', bn: 'ব্যাংক ট্রান্সফার' }, { en: 'Cash', bn: 'নগদ টাকা' },
]
