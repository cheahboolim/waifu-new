import type { PageLoad } from './$types';

export interface Manga {
  id: number;
  title: string;
  image: string;
  rating: number;
  status: 'Ongoing' | 'Completed';
  description?: string;
  chapters?: number;
  genres?: string[];
}

export interface Waifu {
  id: number;
  name: string;
  series: string;
  image: string;
  votes: number;
  description?: string;
  age?: string;
  traits?: string[];
}

export interface PageData {
  featuredManga: Manga[];
  featuredWaifus: Waifu[];
  stats: {
    totalManga: number;
    totalWaifus: number;
    activeUsers: number;
    dailyUpdates: number;
  };
}

// This would typically fetch from your API
async function fetchFeaturedManga(): Promise<Manga[]> {
  // For now, returning mock data
  // In production, this would be: await fetch('/api/manga/featured').then(r => r.json())
  
  return [
    {
      id: 1,
      title: "Attack on Titan",
      image: "/images/manga/aot.jpg",
      rating: 9.0,
      status: "Completed",
      description: "Humanity fights for survival against giant humanoid Titans.",
      chapters: 139,
      genres: ["Action", "Drama", "Fantasy"]
    },
    {
      id: 2,
      title: "One Piece",
      image: "/images/manga/op.jpg",
      rating: 9.2,
      status: "Ongoing",
      description: "Follow Luffy's journey to become the Pirate King.",
      chapters: 1100,
      genres: ["Adventure", "Comedy", "Shounen"]
    },
    {
      id: 3,
      title: "Demon Slayer",
      image: "/images/manga/ds.jpg",
      rating: 8.8,
      status: "Completed",
      description: "Tanjiro's quest to save his demon sister Nezuko.",
      chapters: 205,
      genres: ["Action", "Supernatural", "Historical"]
    },
    {
      id: 4,
      title: "Jujutsu Kaisen",
      image: "/images/manga/jjk.jpg",
      rating: 8.9,
      status: "Ongoing",
      description: "Students battle cursed spirits in modern Japan.",
      chapters: 250,
      genres: ["Action", "School", "Supernatural"]
    },
    {
      id: 5,
      title: "My Hero Academia",
      image: "/images/manga/mha.jpg",
      rating: 8.7,
      status: "Ongoing",
      description: "Izuku Midoriya's journey to become a hero.",
      chapters: 400,
      genres: ["Action", "School", "Superhero"]
    },
    {
      id: 6,
      title: "Tokyo Ghoul",
      image: "/images/manga/tg.jpg",
      rating: 8.6,
      status: "Completed",
      description: "Ken Kaneki's transformation into a half-ghoul.",
      chapters: 144,
      genres: ["Action", "Horror", "Supernatural"]
    }
  ];
}

async function fetchFeaturedWaifus(): Promise<Waifu[]> {
  // For now, returning mock data
  // In production, this would be: await fetch('/api/waifu/featured').then(r => r.json())
  
  return [
    {
      id: 1,
      name: "Mikasa Ackerman",
      series: "Attack on Titan",
      image: "/images/waifu/mikasa.jpg",
      votes: 1250,
      description: "Elite soldier and Eren's childhood friend.",
      age: "19",
      traits: ["Strong", "Loyal", "Protective"]
    },
    {
      id: 2,
      name: "Nezuko Kamado",
      series: "Demon Slayer",
      image: "/images/waifu/nezuko.jpg",
      votes: 1180,
      description: "Demon sister who retained her humanity.",
      age: "14",
      traits: ["Kind", "Protective", "Cute"]
    },
    {
      id: 3,
      name: "Nobara Kugisaki",
      series: "Jujutsu Kaisen",
      image: "/images/waifu/nobara.jpg",
      votes: 980,
      description: "Confident jujutsu sorcerer from the countryside.",
      age: "16",
      traits: ["Confident", "Strong", "Fashionable"]
    },
    {
      id: 4,
      name: "Nami",
      series: "One Piece",
      image: "/images/waifu/nami.jpg",
      votes: 1350,
      description: "Navigator of the Straw Hat Pirates.",
      age: "20",
      traits: ["Smart", "Greedy", "Caring"]
    },
    {
      id: 5,
      name: "Ochaco Uraraka",
      series: "My Hero Academia",
      image: "/images/waifu/ochaco.jpg",
      votes: 890,
      description: "Cheerful hero student with gravity powers.",
      age: "16",
      traits: ["Cheerful", "Determined", "Kind"]
    },
    {
      id: 6,
      name: "Touka Kirishima",
      series: "Tokyo Ghoul",
      image: "/images/waifu/touka.jpg",
      votes: 1100,
      description: "Ghoul who works at Anteiku coffee shop.",
      age: "17",
      traits: ["Tsundere", "Strong", "Caring"]
    }
  ];
}

async function fetchStats() {
  // Mock stats - in production, fetch from API
  return {
    totalManga: 10547,
    totalWaifus: 52340,
    activeUsers: 1200000,
    dailyUpdates: 150
  };
}

export const load: PageLoad = async ({ fetch, params }) => {
  try {
    // Fetch data in parallel for better performance
    const [featuredManga, featuredWaifus, stats] = await Promise.all([
      fetchFeaturedManga(),
      fetchFeaturedWaifus(),
      fetchStats()
    ]);

    // Take only first 4 items for homepage display
    const limitedManga = featuredManga.slice(0, 4);
    const limitedWaifus = featuredWaifus.slice(0, 4);

    return {
      featuredManga: limitedManga,
      featuredWaifus: limitedWaifus,
      stats
    };
  } catch (error) {
    console.error('Error loading homepage data:', error);
    
    // Return empty data on error
    return {
      featuredManga: [],
      featuredWaifus: [],
      stats: {
        totalManga: 0,
        totalWaifus: 0,
        activeUsers: 0,
        dailyUpdates: 0
      }
    };
  }
};

// Optional: Enable prerendering for better performance
export const prerender = true;

// Optional: Set cache control headers
export const csr = true; // Enable client-side rendering
export const ssr = true; // Enable server-side rendering