// ─────────────────────────────────────────────────────────────
// All wedding content lives here. Edit this file only.
// Photos: drop files into /public/images and set `src` to e.g. "/images/hero-1.jpg".
// ─────────────────────────────────────────────────────────────

// `full` (optional) is the high-resolution version shown in the gallery lightbox.
export type Photo = { src: string; alt: string; full?: string };

// Fixed photo choices: hero from set 1, groom/bride from the colour-adjusted set 2.
const photos = {
  heroMain: "/images/hero-main-v1.jpg",
  groom: "/images/groom-v2-adjusted.jpg",
  bride: "/images/bride-v2-adjusted.jpg",
};

export const wedding = {
  meta: {
    title: "💍 👰 Trâm Anh & Anh Tú 🤵",
    description: "Thiệp cưới của Trâm Anh & Anh Tú",
  },

  bride: {
    name: "Trâm Anh",
    fullName: "Trần Như Trâm Anh",
    role: "Cô dâu",
    bio: "Part-time UI/UX Designer, full-time khóc vì phim Hoa–Hàn. Chạy bằng cà phê, yêu màu hồng, dị ứng với sự giả dối.",
    photo: { src: photos.bride, alt: "Cô dâu" } as Photo,
  },
  groom: {
    name: "Anh Tú",
    fullName: "Lê Hoàng Anh Tú",
    role: "Chú rể",
    bio: "Sáng làm dev, tối làm game thủ, cuối tuần làm con bạc. Fan cứng của chó, nhất là Shibaaaaaaa.",
    photo: { src: photos.groom, alt: "Chú rể" } as Photo,
  },

  // Square photo that stays pinned in the middle while the bride/groom profiles scroll past
  couplePhoto: { src: "/images/couple-scroll.jpg", alt: "Ảnh đôi" } as Photo,

  dateLabel: "20 . 12 . 2026",

  hero: {
    // 4 pre-wedding photos that rise into the center window on load, then the main photo opens full screen
    frames: ["pp-00738", "pp-01040", "pp-01783", "pp-02046"].map((n, i) => ({
      src: `/images/gallery/thumb/${n}.webp`,
      alt: `Khoảnh khắc ${i + 1}`,
    })) as Photo[],
    main: { src: photos.heroMain, alt: "Ảnh cưới chính" } as Photo,
  },

  intro: {
    kicker: "Lời mở đầu",
    subtitle: "cho một hành trình mới",
    lines: [
      "Sau bao nhiêu mùa mưa nắng, tụi mình quyết định viết tiếp chung một trang.",
      "Trang web nhỏ này là lời mời gửi đến bạn. Cứ mang theo bụng đói và nụ cười, còn lại để tụi mình lo!",
      "Rất mong được gặp bạn trong ngày vui!",
    ],
  },

  galleryLabel: { title: "Khoảnh khắc" },

  // All pre-wedding photos (WebP): `thumb` for the grid, `full` (2800px) for the lightbox.
  // The first 6 are shown up front; the rest appear after "Xem thêm".
  gallery: [
    "pp-01381", "pp-00692", "pp-01813", "pp-01286", "pp-00416", "pp-01952",
    "pp-00276", "pp-00476", "pp-00480", "pp-00738", "pp-00757", "pp-00865", "pp-00960", "pp-01040", "pp-01110", "pp-01180", "pp-01190", "pp-01208", "pp-01264", "pp-01279", "pp-01360", "pp-01392", "pp-01403", "pp-01407", "pp-01682", "pp-01709", "pp-01759", "pp-01774", "pp-01783", "pp-01861", "pp-02046",
  ].map((n, i) => ({
    src: `/images/gallery/thumb/${n}.webp`,
    full: `/images/gallery/full/${n}.webp`,
    alt: `Ảnh ${i + 1}`,
  })) as Photo[],

  // Venue + timeline (from the Canva design)
  venue: {
    lead: "hôn lễ được tổ chức tại",
    name: "Diamond Place",
    address: "15A Hồ Văn Huê, P. Đức Nhuận, TP. Hồ Chí Minh.",
    mapUrl: "https://maps.app.goo.gl/M6ScDCDqsqoyEKVn6",
  },
  timeline: [
    {
      time: "11:00",
      label: "Đón khách",
      activitiesLabel: "Hoạt động:",
      activities: ["Welcome Drink ở ngoài sảnh", "Lưu lời chúc ở Video Guestbook"],
    },
    { time: "12:00", label: "Nghi lễ & Khai tiệc" },
    { time: "13:00", label: "Mini games", note: "Những phần quà hấp dẫn" },
  ] as { time: string; label: string; activitiesLabel?: string; activities?: string[]; note?: string }[],


  nav: [
    { label: "Cô dâu · Chú rể", target: "couple" },
    { label: "Hình ảnh", target: "gallery" },
    { label: "Xác nhận tham dự", target: "rsvp" },
    { label: "Lịch trình", target: "schedule" },
  ],

  thanks: "Cảm ơn bạn đã ghé thăm ♥",
};
