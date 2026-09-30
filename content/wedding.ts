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
    photo: { alt: "Cô dâu" } as Photo,
  },
  groom: {
    name: "Bình",
    fullName: "Trần Quốc Bình",
    role: "Chú rể",
    bio: "Kỹ sư ban ngày, đầu bếp nghiệp dư ban đêm, fan cứng của mèo.",
    photo: { alt: "Chú rể" } as Photo,
  },

  // ISO date-time of the main ceremony (used for the countdown)
  date: "2026-12-20T17:00:00+07:00",
  dateLabel: "20 . 12 . 2026",

  hero: {
    // 5 frames that scatter as you scroll, then the main photo fills the screen
    frames: [
      { alt: "Khoảnh khắc 1" },
      { alt: "Khoảnh khắc 2" },
      { alt: "Khoảnh khắc 3" },
      { alt: "Khoảnh khắc 4" },
      { alt: "Khoảnh khắc 5" },
    ] as Photo[],
    main: { alt: "Ảnh cưới chính" } as Photo,
  },

  intro: {
    kicker: "Một lời mời nhỏ",
    lines: ["Sau bao nhiêu mùa mưa nắng,", "tụi mình quyết định", "viết tiếp chung một trang."],
  },

  story: [
    { year: "2019", title: "Lần đầu gặp", text: "Chung một nhóm dự án, chung cả deadline.", photo: { alt: "2019" } },
    { year: "2021", title: "Chính thức hẹn hò", text: "Một buổi tối mưa và ly trà đào quen thuộc.", photo: { alt: "2021" } },
    { year: "2023", title: "Chuyến đi đầu tiên", text: "Đà Lạt, lạnh run nhưng vui hết cỡ.", photo: { alt: "2023" } },
    { year: "2025", title: "Lời cầu hôn", text: "Anh quỳ, em khóc, con mèo thì bỏ đi.", photo: { alt: "2025" } },
    { year: "2026", title: "Về chung một nhà", text: "Và đây là chương tiếp theo.", photo: { alt: "2026" } },
  ] as { year: string; title: string; text: string; photo: Photo }[],

  gallery: Array.from({ length: 9 }, (_, i) => ({ alt: `Ảnh ${i + 1}` })) as Photo[],

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
    },
    {
      title: "Tiệc Cưới",
      time: "17:00 · 20.12.2026",
      place: "Trung tâm Hội nghị XYZ",
      address: "456 Đường DEF, Quận 3, TP.HCM",
      mapUrl: "https://maps.google.com/?q=Ho+Chi+Minh+City",
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
