/**
 * Wedding Invitation Configuration Object
 * Easily customize any aspect of the digital wedding invitation here.
 */
export interface LoveStoryItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface GalleryItem {
  id: number;
  url: string;
  caption: string;
}

export interface WeddingConfig {
  bride: {
    shortName: string;
    fullName: string;
    parents: string;
    instagram: string;
    photo: string;
  };
  groom: {
    shortName: string;
    fullName: string;
    parents: string;
    instagram: string;
    photo: string;
  };
  weddingDate: string; // ISO format for countdown timer
  events: {
    akad: {
      title: string;
      dateText: string;
      timeText: string;
      placeName: string;
      address: string;
      mapUrl: string;
    };
    resepsi: {
      title: string;
      dateText: string;
      timeText: string;
      placeName: string;
      address: string;
      mapUrl: string;
    };
  };
  calendarUrl: string;
  loveStory: LoveStoryItem[];
  gallery: GalleryItem[];
  youtubeEmbedUrl: string;
  musicUrl: string;
  guestDefaultName: string;
  appScriptUrl: string; // Google App Script URL for RSVP database
  quote: {
    text: string;
    source: string;
  };
}

export const defaultWeddingConfig: WeddingConfig = {
  bride: {
    shortName: "Aurelia",
    fullName: "Aurelia Amanda S.Kom.",
    parents: "Putri Pertama dari Bapak Bambang Hermawan & Ibu Shinta Wijaya",
    instagram: "https://instagram.com",
    photo: "https://images.unsplash.com/photo-1549417229-aa67d3263c09?auto=format&fit=crop&q=80&w=600"
  },
  groom: {
    shortName: "Andi",
    fullName: "Andi Pratama S.T.",
    parents: "Putra Kedua dari Bapak Handoko Pratama & Ibu Elly Maria",
    instagram: "https://instagram.com",
    photo: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
  },
  weddingDate: "2026-12-12T09:00:00+07:00", // Saturday, 12 December 2026 at 09:00 AM WIB
  events: {
    akad: {
      title: "Akad Nikah",
      dateText: "Sabtu, 12 Desember 2026",
      timeText: "08:00 - 10:00 WIB",
      placeName: "Masjid Raya Al-Bakrie",
      address: "Kawasan Rasuna Epicentrum, Jl. H. R. Rasuna Said, Kuningan, Jakarta Selatan",
      mapUrl: "https://maps.google.com/?q=Masjid+Raya+Al-Bakrie"
    },
    resepsi: {
      title: "Resepsi Pernikahan",
      dateText: "Sabtu, 12 Desember 2026",
      timeText: "11:00 - 14:00 WIB",
      placeName: "The Grand Ballroom Epicentrum",
      address: "Jl. H. R. Rasuna Said No.Kav C-22, Kuningan, Jakarta Selatan",
      mapUrl: "https://maps.google.com/?q=The+Grand+Ballroom+Epicentrum"
    }
  },
  calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Andi+%26+Aurelia&dates=20261212T010000Z/20261212T070000Z&details=Undangan+Pernikahan+Digital+Andi+%26+Aurelia&location=The+Grand+Ballroom+Epicentrum,+Jakarta",
  loveStory: [
    {
      id: 1,
      title: "Pertama Bertemu (First Meet)",
      date: "14 Agustus 2023",
      description: "Kami pertama kali dipertemukan di sebuah perpustakaan kota saat sama-sama mencari buku referensi teknis. Obrolan singkat mengenai buku favorit kami menjadi benih awal dari perjalanan ini.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      title: "Menjalin Komitmen",
      date: "25 Maret 2024",
      description: "Setelah berbulan-bulan berdiskusi, bertukar cerita, dan merasa saling memahami satu sama lain, kami memutuskan untuk berkomitmen serius membangun masa depan bersama.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      title: "Hari Lamaran (Engagement)",
      date: "10 Januari 2026",
      description: "Di hadapan keluarga besar kami yang dipenuhi kehangatan dan doa restu, Andi meminang Aurelia secara resmi. Langkah awal yang penuh kebahagiaan dan keseriusan suci.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 4,
      title: "Pernikahan Suci",
      date: "12 Desember 2026",
      description: "Hari bahagia yang dinantikan tiba. Kami mengikat janji suci di hadapan Tuhan, keluarga, dan para sahabat terbaik untuk saling mencintai hingga akhir hayat.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400"
    }
  ],
  gallery: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=600",
      caption: "Momen Kehangatan Bersama"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
      caption: "Langkah Menuju Masa Depan"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=600",
      caption: "Senyum Manis di Hari Bahagia"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&q=80&w=600",
      caption: "Cinta yang Bertumbuh Indah"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1520854221256-17451cc35953?auto=format&fit=crop&q=80&w=600",
      caption: "Menatap Hari Esok yang Cerah"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=600",
      caption: "Janji Setia yang Abadi"
    }
  ],
  youtubeEmbedUrl: "https://www.youtube.com/embed/S2hsmE_8E4E", // Beautiful instrumental wedding trailer placeholder
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3", // Gentle acoustic wedding backing track
  guestDefaultName: "Tamu Undangan",
  appScriptUrl: "https://script.google.com/macros/s/AKfycbx_your_deployed_script_url/exec", // Placed for custom URL integrations
  quote: {
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21"
  }
};

// Load dynamic wedding config, merging defaults with any custom localStorage values
const getActiveConfig = (): WeddingConfig => {
  try {
    const localData = localStorage.getItem("wedding_config");
    if (localData) {
      const parsed = JSON.parse(localData);
      return {
        ...defaultWeddingConfig,
        ...parsed,
        bride: { ...defaultWeddingConfig.bride, ...parsed.bride },
        groom: { ...defaultWeddingConfig.groom, ...parsed.groom },
        events: {
          akad: { ...defaultWeddingConfig.events.akad, ...parsed.events?.akad },
          resepsi: { ...defaultWeddingConfig.events.resepsi, ...parsed.events?.resepsi }
        },
        quote: { ...defaultWeddingConfig.quote, ...parsed.quote }
      };
    }
  } catch (error) {
    console.error("Error loading local wedding config:", error);
  }
  return defaultWeddingConfig;
};

export const weddingConfig: WeddingConfig = getActiveConfig();
