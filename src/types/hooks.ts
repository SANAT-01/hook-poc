export interface UserAttributes {
  username: string;
  bio: string | null;
  status: string;
  hookCount: number;
  viewCount: number;
  followerCount: number;
  followingCount: number;
  instagramHandle: string | null;
  twitterHandle: string | null;
  facebookHandle: string | null;
  tiktokHandle: string | null;
  isVerified: boolean;
  profileBackground: unknown;
  createdAt: string;
  thumbnails: {
    original: string;
    small: string;
  };
}

export interface User {
  id: string;
  type: string;
  attributes: UserAttributes;
}

export interface SongAttributes {
  title: string;
  status: string;
  duration: number;
  hookCount: number;
  previewUrl: string;
  coverartUrl: string;
  bgColor: string;
  isrc: string;
  artists: Artist[];
}

interface Song {
  id: string;
  type: string;
  attributes: SongAttributes;
}

interface ArtistAttributes {
  displayName: string;
  alphabeticalName: string;
  description: string;
  status: string;
  songCount: number;
  hookCount: number;
  imageUrl: string;
}

interface Artist {
  id: string;
  type: string;
  attributes: ArtistAttributes;
}

interface HookSongAttributes {
  startRange: number;
  endRange: number;
  startBeat: number;
  endBeat: number;
  volume: number;
  pitchShift: number;
  role: string;
  song: Song;
}

interface HookSong {
  id: string;
  type: string;
  attributes: HookSongAttributes;
}

interface PresetAttributes {
  title: string;
  key: string;
  description: string;
  presetType: string;
  category: string;
  defaultSliderPosition: number;
  featured: boolean;
  scrollable: boolean;
  displayOrder: number;
  icon: {
    original: string;
    big: string;
  };
  iconUrl: string;
  mutedIcon: {
    original: string;
  };
  mutedIconUrl: string;
}

interface Preset {
  id: string;
  type: string;
  attributes: PresetAttributes;
}

interface HookPresetAttributes {
  sliderPosition: number;
  order: number;
  songId: string | null;
  presetId: string;
  hookId: string;
  preset: Preset;
}

interface HookPreset {
  id: string;
  type: string;
  attributes: HookPresetAttributes;
}

export interface Hook {
  id: string;
  title: string;
  description: string;
  status: string;
  likeCount: number;
  saveCount: number;
  commentCount: number;
  viewCount: number;
  shareCount: number;
  reHookCount: number;
  bgColor: string;
  createdAt: string;
  postedAt: string;
  videoUrl: string;
  thumbnailUrl: string;
  thumbnails: {
    original: string;
    small: string;
  };
  signedVideoUrl: string;
  user: User;
  hookSongs: HookSong[];
  hookPresets: HookPreset[];
}
