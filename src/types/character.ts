export type MotivationalTheme =
  | 'Discipline'
  | 'Confidence'
  | 'Courage'
  | 'Resilience'
  | 'Leadership'
  | 'Mental Strength'
  | 'Sacrifice';

export type AnimeSeries =
  | 'Black Clover'
  | 'Naruto'
  | 'One Piece'
  | 'My Hero Academia'
  | 'Dragon Ball'
  | 'Demon Slayer'
  | 'Attack on Titan'
  | 'Haikyuu!!'
  | 'Blue Lock'
  | 'Hajime no Ippo'
  | 'Jujutsu Kaisen'
  | 'Hunter x Hunter'
  | 'Bleach'
  | 'Fullmetal Alchemist: Brotherhood'
  | 'Death Note'
  | 'Code Geass'
  | 'Cowboy Bebop'
  | 'Steins;Gate'
  | 'Neon Genesis Evangelion'
  | 'Berserk'
  | 'Vinland Saga'
  | 'Chainsaw Man'
  | 'Mob Psycho 100'
  | "JoJo's Bizarre Adventure"
  | 'Yu Yu Hakusho'
  | 'Monster'
  | 'Gurren Lagann'
  | 'Rurouni Kenshin'
  | 'Fate/Zero'
  | 'Fate/stay night'
  | 'One Punch Man'
  | 'Gintama'
  | 'Cyberpunk: Edgerunners'
  | 'Solo Leveling'
  | 'Tokyo Ghoul'
  | "Frieren: Beyond Journey's End"
  | 'Trigun'
  | 'Ghost in the Shell'
  | 'Naruto Shippuden';

export type VerificationStatus = 'verified' | 'unverified';

export interface Character {
  id: string;
  slug: string;
  name: string;
  characterTitle: string; // e.g., "Break Your Limits", "The Burden of Sacrifice"
  anime: AnimeSeries | string;
  imageUrl: string;
  imagePosition?: string; // Optional custom object-position (e.g., '22% 15%')
  accentColor: string; // Hex for subtle character aura
  motivationalTheme: MotivationalTheme;
  motivationTags: string[];
  shortDescription: string;
  quoteText: string;
  quoteSource: string;
  episodeOrChapter?: string;
  episode?: string | number;
  chapter?: string | number;
  sceneName?: string;
  sourceUrl?: string;
  youtubeVideoId?: string; // YouTube 11-char ID when verified
  youtubeVideoUrl?: string; // Fallback or direct link
  whyItHitsHard: string;
  verificationStatus: VerificationStatus;
  verified?: boolean;
}
