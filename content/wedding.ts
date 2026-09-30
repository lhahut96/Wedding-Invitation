// ─────────────────────────────────────────────────────────────
// All wedding content lives here. Edit this file only.
// Photos: drop files into /public/images and set `src` to e.g. "/images/hero-1.jpg".
// Any photo without `src` renders as a soft gradient placeholder.
// ─────────────────────────────────────────────────────────────

export type Photo = { src?: string; alt: string };

export const wedding = {
  meta: {
    title: "An & Bình — Save the date",
    description: "Thiệp cưới của An & Bình",
  },

  bride: {
    name: "An",
    fullName: "Nguyễn Thu An",
    role: "Cô dâu",
    bio: "Mê cà phê sữa đá, sách cũ và những chuyến đi không kế hoạch.",
    photo: { src: "/images/bride.jpg", alt: "Cô dâu" } as Photo,
  },
  groom: {
    name: "Bình",
    fullName: "Trần Quốc Bình",
    role: "Chú rể",
    bio: "Kỹ sư ban ngày, đầu bếp nghiệp dư ban đêm, fan cứng của mèo.",
    photo: { src: "/images/groom.jpg", alt: "Chú rể" } as Photo,
  },

  // Square photo that stays pinned in the middle while the bride/groom profiles scroll past
  couplePhoto: { src: "/images/couple.jpg", alt: "Ảnh đôi" } as Photo,

  // ISO date-time of the main ceremony (used for the countdown)
  date: "2026-12-20T17:00:00+07:00",
  dateLabel: "20 . 12 . 2026",

  hero: {
    // 5 photos that rise into the center window on load, then the main photo opens full screen
    frames: [
      { src: "/images/hero-1.jpg", alt: "Khoảnh khắc 1" },
      { src: "/images/hero-2.jpg", alt: "Khoảnh khắc 2" },
      { src: "/images/hero-3.jpg", alt: "Khoảnh khắc 3" },
      { src: "/images/hero-4.jpg", alt: "Khoảnh khắc 4" },
      { src: "/images/hero-5.jpg", alt: "Khoảnh khắc 5" },
    ] as Photo[],
    main: { src: "/images/hero-main.jpg", alt: "Ảnh cưới chính" } as Photo,
  },

  intro: {
    kicker: "Lời mở đầu",
    subtitle: "cho một hành trình mới",
    lines: [
      "Sau bao nhiêu mùa mưa nắng, tụi mình quyết định viết tiếp chung một trang.",
      "Trang web nhỏ này là lời mời gửi đến bạn, cùng vài kỷ niệm tụi mình đã góp nhặt suốt chặng đường qua.",
      "Rất mong được gặp bạn trong ngày vui!",
    ],
  },

  galleryLabel: { title: "Khoảnh khắc", years: "2019 — nay" },

  story: [
    { year: "2019", title: "Lần đầu gặp", text: "Chung một nhóm dự án, chung cả deadline.", photo: { src: "/images/story-1.jpg", alt: "2019" } },
    { year: "2021", title: "Chính thức hẹn hò", text: "Một buổi tối mưa và ly trà đào quen thuộc.", photo: { src: "/images/story-2.jpg", alt: "2021" } },
    { year: "2023", title: "Chuyến đi đầu tiên", text: "Đà Lạt, lạnh run nhưng vui hết cỡ.", photo: { src: "/images/story-3.jpg", alt: "2023" } },
    { year: "2025", title: "Lời cầu hôn", text: "Anh quỳ, em khóc, con mèo thì bỏ đi.", photo: { src: "/images/story-4.jpg", alt: "2025" } },
    { year: "2026", title: "Về chung một nhà", text: "Và đây là chương tiếp theo.", photo: { src: "/images/story-5.jpg", alt: "2026" } },
  ] as { year: string; title: string; text: string; photo: Photo }[],

  gallery: Array.from({ length: 9 }, (_, i) => ({ src: `/images/gallery-${i + 1}.jpg`, alt: `Ảnh ${i + 1}` })) as Photo[],

  music: {
    title: "Bài hát của tụi mình",
    artist: "Nghệ sĩ",
    // Put an mp3 you have rights to in /public/music and set src, e.g. "/music/song.mp3"
    src: "",
  },

  events: [
    {
      title: "Lễ Vu Quy",
      time: "09:00 · 20.12.2026",
      place: "Tư gia nhà gái",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      mapUrl: "https://maps.google.com/?q=Ho+Chi+Minh+City",
      photo: { src: "/images/event-1.jpg", alt: "Lễ Vu Quy" } as Photo,
    },
    {
      title: "Lễ Thành Hôn",
      time: "11:00 · 20.12.2026",
      place: "Tư gia nhà trai",
      address: "789 Đường GHI, Quận 7, TP.HCM",
      mapUrl: "https://maps.google.com/?q=Ho+Chi+Minh+City",
      photo: { src: "/images/event-2.jpg", alt: "Lễ Thành Hôn" } as Photo,
    },
    {
      title: "Tiệc Cưới",
      time: "17:00 · 20.12.2026",
      place: "Trung tâm Hội nghị XYZ",
      address: "456 Đường DEF, Quận 3, TP.HCM",
      mapUrl: "https://maps.google.com/?q=Ho+Chi+Minh+City",
      photo: { src: "/images/event-3.jpg", alt: "Tiệc Cưới" } as Photo,
    },
  ],

  gift: {
    note: "Sự hiện diện của bạn là món quà lớn nhất. Nếu muốn gửi thêm chút yêu thương:",
    accounts: [
      { owner: "NGUYEN THU AN", bank: "Vietcombank", number: "0123456789", qr: { alt: "QR cô dâu" } as Photo },
      { owner: "TRAN QUOC BINH", bank: "Techcombank", number: "9876543210", qr: { alt: "QR chú rể" } as Photo },
    ],
  },

  nav: [
    { label: "(Cô dâu · Chú rể)", target: "couple" },
    { label: "(Chuyện tụi mình)", target: "story" },
    { label: "(Nghe nhạc)", target: "music" },
    { label: "(Lịch trình)", target: "schedule" },
  ],

  thanks: "Cảm ơn bạn đã ghé thăm ♥",
};
