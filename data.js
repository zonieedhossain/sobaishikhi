/* SobaiShikhi — marketplace mock data. window.DATA */
(function () {
  // ৳ = BDT
  const categories = [
    { id: "academic", name: "Academic Education", bn: "একাডেমিক শিক্ষা", icon: "book", hue: 250, courses: 1240 },
    { id: "vocational", name: "Technical & Vocational", bn: "কারিগরি ও বৃত্তিমূলক", icon: "wrench", hue: 38, courses: 860 },
    { id: "hardware", name: "Hardware & Device", bn: "হার্ডওয়্যার ও ডিভাইস", icon: "chip", hue: 200, courses: 410 },
    { id: "freelancing", name: "Freelancing & Tech", bn: "ফ্রিল্যান্সিং ও প্রযুক্তি", icon: "laptop", hue: 168, courses: 1530 },
    { id: "business", name: "Business & Entrepreneurship", bn: "ব্যবসা ও উদ্যোক্তা", icon: "chart", hue: 300, courses: 720 },
    { id: "religious", name: "Religious Education", bn: "ধর্মীয় শিক্ষা", icon: "moon", hue: 150, courses: 640 },
    { id: "language", name: "Language Learning", bn: "ভাষা শিক্ষা", icon: "globe", hue: 220, courses: 530 },
    { id: "cooking", name: "Cooking & Lifestyle", bn: "রান্না ও লাইফস্টাইল", icon: "flask", hue: 25, courses: 480 },
    { id: "arts", name: "Arts & Creative", bn: "শিল্প ও সৃজনশীলতা", icon: "brush", hue: 330, courses: 390 },
    { id: "agriculture", name: "Agriculture & Farming", bn: "কৃষি ও খামার", icon: "leaf", hue: 130, courses: 280 },
    { id: "professional", name: "Professional Certifications", bn: "পেশাগত সার্টিফিকেশন", icon: "badge", hue: 80, courses: 350 },
    { id: "personal", name: "Personal Development", bn: "ব্যক্তিগত উন্নয়ন", icon: "spark", hue: 290, courses: 460 },
  ];

  const instructors = [
    { id: "in1", name: "Tahmid Rahman", bn: "তাহমিদ রহমান", initials: "TR", verified: true, title: "Full-Stack Developer", cat: "freelancing", students: 18400, courses: 6, rating: 4.8, reviews: 5640, revenue: 1240000, payout: 86000,
      location: "Dhaka, Bangladesh", since: 2021, langs: ["বাংলা", "English"],
      headline: "৮ বছরের সফটওয়্যার ইঞ্জিনিয়ার — শেখাই কোড লিখে চাকরি ও ফ্রিল্যান্সিং করার বাস্তব দক্ষতা।",
      bio: ["আমি তাহমিদ, একজন ফুল-স্ট্যাক ডেভেলপার ও মেন্টর। গত ৮ বছর ধরে দেশি-বিদেশি স্টার্টআপ ও সফটওয়্যার কোম্পানিতে কাজ করেছি — JavaScript, React, Node.js আর ক্লাউড নিয়ে।", "শেখানোর প্রতি আমার ভালোবাসা শুরু হয় ছোট ছোট ব্যাচে বন্ধুদের কোডিং শেখানো থেকে। এখন SobaiShikhi-তে আমার লক্ষ্য একটাই — বাংলায়, একদম শূন্য থেকে, এমনভাবে শেখানো যাতে আপনি সত্যিকারের প্রজেক্ট বানিয়ে আয় শুরু করতে পারেন।", "আমার প্রতিটি কোর্স প্রজেক্ট-ভিত্তিক। শুধু থিওরি নয় — হাতে-কলমে কোড লিখে, ভুল করে, ঠিক করে শিখবেন।"],
      expertise: ["JavaScript", "React", "Node.js", "Freelancing", "Graphic Design"] },
    { id: "in2", name: "Nusrat Jahan", bn: "নুসরাত জাহান", initials: "NJ", verified: true, title: "IELTS & English Coach", cat: "language", students: 24100, courses: 4, rating: 4.9, reviews: 7210, revenue: 980000, payout: 64000,
      location: "Chattogram, Bangladesh", since: 2020, langs: ["বাংলা", "English"],
      headline: "IELTS-এ নিজে পেয়েছি Band 8.5 — শেখাই প্রমাণিত কৌশলে আত্মবিশ্বাসী ইংরেজি।",
      bio: ["আমি নুসরাত, একজন সার্টিফায়েড ইংরেজি প্রশিক্ষক। যুক্তরাজ্যে পড়াশোনার সময় বুঝেছি ভাষার ভয় কীভাবে সম্ভাবনা আটকে দেয়।", "১০ বছরে হাজারো শিক্ষার্থীকে IELTS, স্পোকেন ইংলিশ আর ইন্টারভিউ ইংরেজিতে দক্ষ করে তুলেছি। আমার ক্লাসে ব্যাকরণের ভয় নয়, বাস্তব কথোপকথনে জোর।"],
      expertise: ["IELTS", "Spoken English", "Pronunciation", "Interview Prep"] },
    { id: "in3", name: "Mufti Imran Hossain", bn: "মুফতি ইমরান হোসেন", initials: "IH", verified: true, title: "Islamic Scholar", cat: "religious", students: 31200, courses: 9, rating: 4.9, reviews: 9840, revenue: 1520000, payout: 102000,
      location: "Dhaka, Bangladesh", since: 2019, langs: ["বাংলা", "العربية"],
      headline: "দাওরায়ে হাদিস ও ইফতা সম্পন্ন — শেখাই সহিহ তাজবিদ ও দৈনন্দিন ইসলামি জ্ঞান।",
      bio: ["আমি মুফতি ইমরান হোসেন। দীর্ঘ পড়াশোনা ও শিক্ষকতার অভিজ্ঞতা নিয়ে সহজ-সরল ভাষায় কুরআন, তাজবিদ ও ফিকহ শেখানোর চেষ্টা করি।", "আমার বিশ্বাস — সঠিক জ্ঞান সবার জন্য সহজলভ্য হওয়া উচিত। তাই ধাপে ধাপে, ধৈর্য ধরে, যেকোনো বয়সের শিক্ষার্থীর উপযোগী করে কোর্স সাজাই।"],
      expertise: ["Quran & Tajweed", "Fiqh", "Arabic", "Islamic History"] },
    { id: "in4", name: "Shahida Akter", bn: "শাহিদা আক্তার", initials: "SA", verified: true, title: "Chef & Food Entrepreneur", cat: "cooking", students: 9600, courses: 3, rating: 4.7, reviews: 2180, revenue: 410000, payout: 28000,
      location: "Sylhet, Bangladesh", since: 2022, langs: ["বাংলা"],
      headline: "ঘরোয়া রান্নাকে বানিয়েছি ব্যবসা — শেখাই রেস্টুরেন্ট-মানের বাঙালি রান্না।",
      bio: ["আমি শাহিদা, একজন শেফ ও ফুড উদ্যোক্তা। নিজের ক্লাউড কিচেন চালাই এবং রান্নার প্রতি ভালোবাসা থেকেই শেখানো শুরু করি।", "আমার কোর্সে পরিমাপ, টেকনিক আর উপস্থাপন — সব কিছু এমনভাবে দেখাই যাতে আপনি ঘরে বসেই নিখুঁত স্বাদ আনতে পারেন, এমনকি ছোট ব্যবসাও শুরু করতে পারেন।"],
      expertise: ["Bengali Cuisine", "Baking", "Food Business", "Plating"] },
    { id: "in5", name: "Rakibul Islam", bn: "রাকিবুল ইসলাম", initials: "RI", verified: false, title: "Mobile Repair Technician", cat: "hardware", students: 0, courses: 1, rating: 0, reviews: 0, revenue: 0, payout: 0,
      location: "Rajshahi, Bangladesh", since: 2026, langs: ["বাংলা"],
      headline: "১২ বছরের মোবাইল সার্ভিসিং অভিজ্ঞতা — শেখাতে চাই হাতে-কলমে।",
      bio: ["আমি রাকিবুল, রাজশাহীতে নিজের মোবাইল সার্ভিসিং দোকান চালাই। হাতে-কলমে শেখানোর জন্য SobaiShikhi-তে যুক্ত হয়েছি।"],
      expertise: ["Mobile Repair", "Diagnostics", "Soldering"] },
    { id: "in6", name: "Farzana Kabir", bn: "ফারজানা কবির", initials: "FK", verified: true, title: "Digital Marketing Strategist", cat: "business", students: 14300, courses: 5, rating: 4.6, reviews: 3920, revenue: 760000, payout: 51000,
      location: "Dhaka, Bangladesh", since: 2020, langs: ["বাংলা", "English"],
      headline: "১,২০০+ ছোট ব্যবসাকে অনলাইনে দাঁড় করিয়েছি — শেখাই ফলাফল-নির্ভর ডিজিটাল মার্কেটিং।",
      bio: ["আসসালামু আলাইকুম, আমি ফারজানা কবির — একজন ডিজিটাল মার্কেটিং স্ট্র্যাটেজিস্ট ও কনসালট্যান্ট। গত ৭ বছরে আমি ১,২০০-এর বেশি ছোট ও মাঝারি ব্যবসাকে ফেসবুক, ইনস্টাগ্রাম আর গুগলে গ্রাহক খুঁজে পেতে সাহায্য করেছি।", "আমার পথচলা শুরু হয়েছিল নিজের একটি ছোট অনলাইন বুটিক দিয়ে। তখন বুঝেছিলাম — ভালো পণ্য থাকলেই হয় না, সঠিক মানুষের কাছে পৌঁছানো জানতে হয়। সেই অভিজ্ঞতা থেকেই আমি মার্কেটিং শিখি এবং পরে এজেন্সি গড়ে তুলি।", "SobaiShikhi-তে আমি সেই বাস্তব জ্ঞানটাই ভাগ করি — কোনো জটিল তত্ত্ব নয়, বরং আজ থেকেই কাজে লাগানোর মতো কৌশল। আমার কোর্সে থাকে রিয়েল ক্যাম্পেইন, রিয়েল বাজেট আর রিয়েল ফলাফলের কেস স্টাডি।", "আমার লক্ষ্য — বাংলাদেশের প্রতিটি উদ্যোক্তা যেন নিজের ব্যবসা নিজেই অনলাইনে বড় করতে পারেন, কাউকে হাজার হাজার টাকা না দিয়েই।"],
      expertise: ["Facebook Ads", "SEO", "Google Ads", "Content Strategy", "Funnel Building", "Freelancing"] },
  ];

  const courses = [
    { id: "c1", slug: "web-dev-bangla", title: "Complete Web Development in Bangla", titleBn: "সম্পূর্ণ ওয়েব ডেভেলপমেন্ট বাংলায়",
      cat: "freelancing", instr: "in1", level: "Beginner", price: 1499, oldPrice: 3500, rating: 4.8, ratings: 3420, students: 12400,
      lessons: 142, hours: 38, lang: "Bangla", updated: "May 2026", status: "published", bestseller: true,
      blurb: "HTML, CSS, JavaScript, React আর Node.js — শূন্য থেকে চাকরি-উপযোগী ডেভেলপার হওয়ার সম্পূর্ণ পথ।" },
    { id: "c2", slug: "ielts-band8", title: "IELTS Band 8: Speaking & Writing", titleBn: "IELTS ব্যান্ড ৮: স্পিকিং ও রাইটিং",
      cat: "language", instr: "in2", level: "Intermediate", price: 1999, oldPrice: 4000, rating: 4.9, ratings: 2810, students: 9800,
      lessons: 96, hours: 24, lang: "Bangla + English", updated: "Apr 2026", status: "published", bestseller: true,
      blurb: "Proven strategies, model answers, আর live correction দিয়ে band 8 নিশ্চিত করুন।" },
    { id: "c3", slug: "quran-tajweed", title: "Quran Recitation with Tajweed", titleBn: "তাজবিদসহ কুরআন তিলাওয়াত",
      cat: "religious", instr: "in3", level: "Beginner", price: 999, oldPrice: 2000, rating: 4.9, ratings: 5120, students: 21300,
      lessons: 120, hours: 30, lang: "Bangla", updated: "Mar 2026", status: "published", bestseller: false,
      blurb: "সঠিক মাখরাজ ও তাজবিদের নিয়মসহ সুন্দরভাবে কুরআন তিলাওয়াত শিখুন ধাপে ধাপে।" },
    { id: "c4", slug: "bangla-cooking", title: "Authentic Bengali Cooking Masterclass", titleBn: "খাঁটি বাঙালি রান্নার মাস্টারক্লাস",
      cat: "cooking", instr: "in4", level: "All levels", price: 799, oldPrice: 1800, rating: 4.7, ratings: 1640, students: 6200,
      lessons: 64, hours: 16, lang: "Bangla", updated: "May 2026", status: "published", bestseller: false,
      blurb: "বিরিয়ানি থেকে পিঠা — ঘরে বসেই রেস্টুরেন্ট-মানের বাঙালি রান্না শিখুন।" },
    { id: "c5", slug: "fb-marketing", title: "Facebook Marketing for Small Business", titleBn: "ছোট ব্যবসার জন্য ফেসবুক মার্কেটিং",
      cat: "business", instr: "in6", level: "Beginner", price: 1299, oldPrice: 2800, rating: 4.6, ratings: 1980, students: 8700,
      lessons: 78, hours: 20, lang: "Bangla", updated: "Apr 2026", status: "published", bestseller: false,
      blurb: "পেজ সেটআপ, বুস্টিং, ক্যাম্পেইন আর সেলস ফানেল — নিজের ব্যবসা অনলাইনে দাঁড় করান।" },
    { id: "c6", slug: "graphic-design", title: "Graphic Design with Photoshop & Illustrator", titleBn: "ফটোশপ ও ইলাস্ট্রেটর দিয়ে গ্রাফিক ডিজাইন",
      cat: "freelancing", instr: "in1", level: "Beginner", price: 1199, oldPrice: 2600, rating: 4.7, ratings: 2240, students: 9100,
      lessons: 88, hours: 22, lang: "Bangla", updated: "Mar 2026", status: "published", bestseller: false,
      blurb: "ফ্রিল্যান্স মার্কেটপ্লেসে কাজ পাওয়ার মতো প্রফেশনাল ডিজাইন স্কিল গড়ে তুলুন।" },
    { id: "c7", slug: "spoken-english", title: "Spoken English in 60 Days", titleBn: "৬০ দিনে স্পোকেন ইংলিশ",
      cat: "language", instr: "in2", level: "Beginner", price: 899, oldPrice: 2000, rating: 4.8, ratings: 3010, students: 14600,
      lessons: 60, hours: 18, lang: "Bangla", updated: "May 2026", status: "published", bestseller: true,
      blurb: "প্রতিদিনের কথোপকথন, উচ্চারণ আর কনফিডেন্স — দুই মাসে ইংরেজিতে কথা বলুন।" },
    { id: "c8", slug: "freelancing-start", title: "Start Freelancing on Fiverr & Upwork", titleBn: "ফাইভার ও আপওয়ার্কে ফ্রিল্যান্সিং শুরু",
      cat: "freelancing", instr: "in6", level: "Beginner", price: 1099, oldPrice: 2400, rating: 4.6, ratings: 1720, students: 7400,
      lessons: 54, hours: 14, lang: "Bangla", updated: "Apr 2026", status: "published", bestseller: false,
      blurb: "গিগ তৈরি, ক্লায়েন্ট কমিউনিকেশন আর প্রথম অর্ডার — রেমিট্যান্স আয়ের হাতেখড়ি।" },

    // pending review / draft (for admin + instructor dashboards)
    { id: "c9", slug: "mobile-repair", title: "Smartphone Repair & Diagnostics", titleBn: "স্মার্টফোন মেরামত ও ডায়াগনস্টিকস",
      cat: "hardware", instr: "in5", level: "Beginner", price: 1399, oldPrice: 2900, rating: 0, ratings: 0, students: 0,
      lessons: 72, hours: 19, lang: "Bangla", updated: "Jun 2026", status: "under_review", submitted: "Jun 09, 2026", bestseller: false,
      blurb: "ডিসপ্লে, ব্যাটারি, চার্জিং পোর্ট আর সফটওয়্যার — হাতে-কলমে মোবাইল সার্ভিসিং শিখুন।" },
    { id: "c10", slug: "digital-marketing-pro", title: "Advanced Digital Marketing & SEO", titleBn: "অ্যাডভান্সড ডিজিটাল মার্কেটিং ও SEO",
      cat: "business", instr: "in6", level: "Advanced", price: 1799, oldPrice: 3600, rating: 0, ratings: 0, students: 0,
      lessons: 110, hours: 28, lang: "Bangla", updated: "Jun 2026", status: "under_review", submitted: "Jun 10, 2026", bestseller: false,
      blurb: "SEO, Google Ads, analytics আর funnel — এজেন্সি-লেভেল মার্কেটিং দক্ষতা।" },
    { id: "c11", slug: "fish-farming", title: "Profitable Fish Farming", titleBn: "লাভজনক মাছ চাষ",
      cat: "agriculture", instr: "in4", level: "Beginner", price: 699, oldPrice: 1500, rating: 0, ratings: 0, students: 0,
      lessons: 40, hours: 11, lang: "Bangla", updated: "Jun 2026", status: "revision", submitted: "Jun 06, 2026", bestseller: false,
      blurb: "পুকুর প্রস্তুতি, পোনা ব্যবস্থাপনা আর বাজারজাত — কম পুঁজিতে মাছ চাষের ব্যবসা।" },
    { id: "c12", slug: "react-native", title: "React Native App Development", titleBn: "রিঅ্যাক্ট নেটিভ অ্যাপ ডেভেলপমেন্ট",
      cat: "freelancing", instr: "in1", level: "Intermediate", price: 1899, oldPrice: 3800, rating: 0, ratings: 0, students: 0,
      lessons: 124, hours: 32, lang: "Bangla", updated: "Jun 2026", status: "revision", submitted: "Jun 10, 2026", bestseller: false,
      adminNotes: ["Lesson 4 ও 5-এর অডিও অস্পষ্ট — আবার রেকর্ড করুন", "কোর্স কভারে থার্ড-পার্টি ব্র্যান্ড লোগো ব্যবহার করা যাবে না", "Module 2-এ প্র্যাকটিস প্রজেক্ট নেই — অন্তত ১টি যোগ করুন"],
      blurb: "একটি কোডবেস থেকে Android ও iOS অ্যাপ — পাবলিশ পর্যন্ত সম্পূর্ণ গাইড।" },

    // requests a brand-new category (instructor couldn't find a fit) — goes through review
    { id: "c13", slug: "drone-piloting", title: "Drone Piloting & Aerial Photography", titleBn: "ড্রোন চালনা ও এরিয়াল ফটোগ্রাফি",
      cat: "__new", newCategory: "ড্রোন ও রোবোটিক্স", newCategoryEn: "Drone & Robotics", instr: "in1", level: "Beginner",
      price: 1699, oldPrice: 3400, rating: 0, ratings: 0, students: 0, lessons: 58, hours: 16, lang: "Bangla",
      updated: "Jun 2026", status: "under_review", submitted: "Jun 11, 2026", bestseller: false,
      blurb: "নিরাপদে ড্রোন ওড়ানো, ক্যামেরা সেটিংস আর সিনেমাটিক এরিয়াল ফুটেজ — শূন্য থেকে।" },
  ];

  const reviews = [
    { id: "r1", course: "c1", name: "Sabbir Ahmed", initials: "SA", rating: 5, when: "2 weeks ago", text: "অসাধারণ কোর্স! প্রতিটা টপিক এত সহজভাবে বুঝিয়েছেন যে কোডিং একদম নতুন হয়েও সব ধরতে পেরেছি।" },
    { id: "r2", course: "c1", name: "Mim Akter", initials: "MA", rating: 5, when: "1 month ago", text: "Projects গুলো করতে গিয়ে অনেক কিছু শিখলাম। এখন ফ্রিল্যান্সিং শুরু করেছি, আলহামদুলিল্লাহ।" },
    { id: "r3", course: "c1", name: "Hasan Mahmud", initials: "HM", rating: 4, when: "1 month ago", text: "Content দারুণ। শুধু কিছু video-র অডিও আরেকটু পরিষ্কার হলে ভালো হতো।" },
  ];

  // learner (logged in as Ria Islam)
  const learner = {
    name: "Ria Islam", bn: "রিয়া ইসলাম", initials: "RI",
    enrolled: [
      { course: "c1", progress: 58, last: "React: useState hook" },
      { course: "c7", progress: 84, last: "Lesson 51: Job interview English" },
      { course: "c3", progress: 32, last: "Surah Al-Fatiha — makhraj" },
    ],
    wishlist: ["c2", "c6"],
    certificates: [{ course: "c8", date: "Apr 2026" }],
    streak: 12, minutesWeek: 340,
  };

  const stats = {
    learners: 142000, instructors: 2400, courses: 8100, payout: 4200000,
    gmvTrend: [32, 38, 35, 44, 41, 52, 58, 55, 64, 71, 68, 82],
    enrollTrend: [120, 180, 150, 220, 260, 310, 290, 380, 420, 460, 510, 580],
  };

  // admin payments / commission
  const payouts = [
    { id: "PO-3041", instr: "in1", amount: 86000, status: "Paid", date: "Jun 01", method: "bKash" },
    { id: "PO-3042", instr: "in3", amount: 102000, status: "Paid", date: "Jun 01", method: "Bank" },
    { id: "PO-3043", instr: "in2", amount: 64000, status: "Processing", date: "Jun 10", method: "bKash" },
    { id: "PO-3044", instr: "in6", amount: 51000, status: "Pending", date: "Jun 11", method: "Nagad" },
    { id: "PO-3045", instr: "in4", amount: 28000, status: "Pending", date: "Jun 11", method: "bKash" },
  ];

  // enrolled students (admin can see names; no phone numbers exposed publicly)
  const students = [
    { id: "st1", name: "Ria Islam", bn: "রিয়া ইসলাম", initials: "RI", course: "c1", progress: 58, joined: "Jan 2026", status: "Active" },
    { id: "st2", name: "Sabbir Ahmed", bn: "সাব্বির আহমেদ", initials: "SA", course: "c1", progress: 91, joined: "Dec 2025", status: "Active" },
    { id: "st3", name: "Mim Akter", bn: "মিম আক্তার", initials: "MA", course: "c1", progress: 34, joined: "Feb 2026", status: "Active" },
    { id: "st4", name: "Hasan Mahmud", bn: "হাসান মাহমুদ", initials: "HM", course: "c1", progress: 12, joined: "May 2026", status: "Active" },
    { id: "st5", name: "Tania Sultana", bn: "তানিয়া সুলতানা", initials: "TS", course: "c2", progress: 76, joined: "Jan 2026", status: "Active" },
    { id: "st6", name: "Noman Khan", bn: "নোমান খান", initials: "NK", course: "c2", progress: 48, joined: "Mar 2026", status: "Active" },
    { id: "st7", name: "Farhan Rahman", bn: "ফারহান রহমান", initials: "FR", course: "c3", progress: 88, joined: "Nov 2025", status: "Active" },
    { id: "st8", name: "Sumaiya Haque", bn: "সুমাইয়া হক", initials: "SH", course: "c3", progress: 64, joined: "Feb 2026", status: "Active" },
    { id: "st9", name: "Arif Chowdhury", bn: "আরিফ চৌধুরী", initials: "AC", course: "c4", progress: 100, joined: "Dec 2025", status: "Completed" },
    { id: "st10", name: "Nadia Ferdous", bn: "নাদিয়া ফেরদৌস", initials: "NF", course: "c5", progress: 22, joined: "May 2026", status: "Active" },
    { id: "st11", name: "Rakib Hossain", bn: "রাকিব হোসেন", initials: "RH", course: "c7", progress: 55, joined: "Apr 2026", status: "Active" },
    { id: "st12", name: "Jannatul Mawa", bn: "জান্নাতুল মাওয়া", initials: "JM", course: "c7", progress: 81, joined: "Jan 2026", status: "Paused" },
  ];

  window.DATA = { categories, instructors, courses, reviews, learner, stats, payouts, students };

  // helpers
  window.byId = (arr, id) => arr.find((x) => x.id === id);
  window.instrOf = (c) => window.byId(window.DATA.instructors, c.instr);
  window.catOf = (c) => window.byId(window.DATA.categories, c.cat) ||
    { id: c.cat || "new", name: c.newCategoryEn || "New category", bn: c.newCategory || "নতুন ক্যাটাগরি", hue: 286, icon: "spark", courses: 0, isNew: true };
  window.taka = (n) => "৳" + Number(n).toLocaleString("en-IN");
})();
