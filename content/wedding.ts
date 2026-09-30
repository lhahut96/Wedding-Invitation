// ─────────────────────────────────────────────────────────────
// All wedding content lives here. Edit this file only.
// Photos: drop files into /public/images and set `src` to e.g. "/images/hero-1.jpg".
// ─────────────────────────────────────────────────────────────

export type Photo = { src: string; alt: string };

export const wedding = {
  meta: {
    title: "Trâm Anh & Anh Tú — Save the date",
    description: "Thiệp cưới của Trâm Anh & Anh Tú",
  },

  bride: {
    name: "Trâm Anh",
    fullName: "Trần Như Trâm Anh",
    role: "Cô dâu",
    bio: "Mê cà phê sữa đá, sách cũ và những chuyến đi không kế hoạch.",
    photo: { src: "/images/bride.jpg", alt: "Cô dâu" } as Photo,
  },
  groom: {
    name: "Anh Tú",
    fullName: "Lê Hoàng Anh Tú",
    role: "Chú rể",
    bio: "Kỹ sư ban ngày, đầu bếp nghiệp dư ban đêm, fan cứng của mèo.",
    photo: { src: "/images/groom.jpg", alt: "Chú rể" } as Photo,
  },

  // Square photo that stays pinned in the middle while the bride/groom profiles scroll past
  couplePhoto: { src: "/images/couple.jpg", alt: "Ảnh đôi" } as Photo,

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

  galleryLabel: { title: "Khoảnh khắc", years: "2021 — nay" },

  gallery: Array.from({ length: 9 }, (_, i) => ({ src: `/images/gallery-${i + 1}.jpg`, alt: `Ảnh ${i + 1}` })) as Photo[],

  // Venue + timeline (from the Canva design)
  venue: {
    lead: "hôn lễ được tổ chức tại",
    name: "Louis Palace",
    kind: "Trung tâm tiệc cưới",
    address: "Km5+200, đường Lê Trọng Tấn, An Khánh, Hoài Đức, Hà Nội.",
    mapUrl:
      "https://www.google.com/maps/dir/Trung+t%C3%A2m+t%E1%BB%95+ch%E1%BB%A9c+S%E1%BB%B1+ki%E1%BB%87n+%26+Ti%E1%BB%87c+c%C6%B0%E1%BB%9Bi+Louis+Palace,+Km5%2B200,+%C4%90.+Ho%C3%A0ng+T%C3%B9ng,+T%C3%A2y+M%E1%BB%97,+H%C3%A0+N%E1%BB%99i+13200,+Vi%E1%BB%87t+Nam",
  },
  timeline: [
    { time: "11:00 am", label: "Tổ chức hôn lễ" },
    { time: "12:00 pm", label: "Ăn tiệc cưới" },
    { time: "12:45 pm", label: "Chụp ảnh" },
    { time: "1:30 pm", label: "Tung hoa cưới" },
    { time: "2:00 pm", label: "Cocktail hour" },
    { time: "4:00 pm", label: "Tiệc nhảy" },
    { time: "6:00 pm", label: "Tiệc tối" },
  ],

  nav: [
    { label: "(Cô dâu · Chú rể)", target: "couple" },
    { label: "(Hình ảnh)", target: "gallery" },
    { label: "(Xác nhận tham dự)", target: "rsvp" },
    { label: "(Lịch trình)", target: "schedule" },
  ],

  thanks: "Cảm ơn bạn đã ghé thăm ♥",
};
