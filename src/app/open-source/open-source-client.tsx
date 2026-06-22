'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGrid, Users, Zap, Monitor, Plug, BookOpen,
  Search, X, ArrowRight,
} from 'lucide-react';
import { GrowthWatermark } from '@/shared/components/ui/growth-watermark';
import { SQUADS, TOTAL_AGENTES } from '@/data/agentes';
import { contentPosts } from '@/data/content-posts';

const CINEMA: [number, number, number, number] = [0.7, 0, 0.2, 1];
const GLIDE: [number, number, number, number] = [0.25, 1, 0.3, 1];

const statsVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.38 } },
};
const statItemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: GLIDE } },
};

const categories = [
  { id: 'all',         label: 'Todos',        Icon: LayoutGrid },
  { id: 'squads',      label: 'Squads',       Icon: Users      },
  { id: 'skills',      label: 'Skills',       Icon: Zap        },
  { id: 'apps',        label: 'Apps',         Icon: Monitor    },
  { id: 'integracoes', label: 'Integrações',  Icon: Plug       },
  { id: 'aprendizado', label: 'Aprendizado',  Icon: BookOpen   },
];

// Rótulo e ícone padrão por categoria — fallback para cards de content-posts
// que não trazem categoryLabel/icon próprios.
const categoryLabelById: Record<string, string> = {
  squads:      'Squads',
  skills:      'Skills',
  apps:        'Apps',
  integracoes: 'Integrações',
  aprendizado: 'Aprendizado',
};
const postCategoryIcon: Record<string, string> = {
  squads:      'agents',
  skills:      'setup',
  apps:        'monitor',
  integracoes: 'plugin',
  aprendizado: 'book',
};

const skillIcons: Record<string, string> = {
  framework:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
  community:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"/>',
  monitor:      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/>',
  message:      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"/>',
  setup:        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"/>',
  video:        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"/>',
  image:        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zm2.25-10.5a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"/>',
  carousel:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-1.243 1.007-2.25 2.25-2.25h13.5z"/>',
  design:       '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"/>',
  ads:          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"/>',
  google:       '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"/>',
  deploy:       '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>',
  github:       '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  database:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"/>',
  book:         '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>',
  remotion:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z"/>',
  website:      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>',
  plugin:       '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"/>',
  agents:       '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"/>',
  automation:   '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  mobile:       '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18h3"/>',
  brain:        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>',
  obsidian:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>',
  crm:          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>',
  seo:          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>',
  copywriting:  '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>',
  presentation: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"/>',
  dm:           '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"/>',
  dashboard:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
  pixel:        '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"/>',
  animejs:      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"/>',
  instagram:    '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>',
  browser:      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>',
  notebook:     '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
  layout:       '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z"/>',
};

const skills = [
  { title: 'AIOX Framework',              description: 'Sistema de orquestração de agentes com squads e personas. Defina workflows, delegue tasks e escale sua operação.',                                               icon: 'framework',    href: '/framework/aiox-framework',          categoryId: 'squads',      categoryLabel: 'Squads',       author: '@SynkraAI' },
  { title: 'Xquads Squads',               description: '12 squads especializadas com 96+ agentes. A maior coleção de squads AIOX da comunidade.',                                                                       icon: 'community',    href: '/squads/xquads',                     categoryId: 'squads',      categoryLabel: 'Squads',       author: '@rafa.grandi' },
  { title: 'n8n Killers Squad',           description: '10 agentes AI para migrar workflows n8n e criar automações via API. Dexter, Hannibal, Bourne, Lisbeth e mais.',                                               icon: 'automation',   href: '/skills/n8n-killers',                categoryId: 'squads',      categoryLabel: 'Squads',       author: '@joaoguirunas' },
  { title: 'Claude Agent Teams',          description: '27 agentes pré-configurados em 3 squads + smart-memory + /team-os. Drop-in para qualquer projeto Claude Code.',                                               icon: 'agents',       href: '/skills/claude-agent-teams',         categoryId: 'squads',      categoryLabel: 'Squads',       author: '@joaoguirunas' },
  { title: 'AIOX Monitor',                description: 'Dashboard isométrico real-time de agentes autônomos. Visualize performance, tasks e métricas.',                                                               icon: 'monitor',      href: '/monitor/aiox-monitor',              categoryId: 'apps',        categoryLabel: 'Apps',         author: '@joaoguirunas' },
  { title: 'Maestri',                     description: 'Comunicação inter-agentes entre terminais. Conecte múltiplos Claude Code para colaboração em tempo real.',                                                    icon: 'message',      href: '/tools/maestri',                     categoryId: 'apps',        categoryLabel: 'Apps',         author: 'Maestri Team' },
  { title: 'Pixel Agents',                description: 'Visualize seus agentes Claude Code ao vivo. Personagens pixel art que espelham cada ação em tempo real.',                                                    icon: 'pixel',        href: '/tools/pixel-agents',                categoryId: 'apps',        categoryLabel: 'Apps',         author: '@joaoguirunas' },
  { title: 'Anime.js',                    description: 'Biblioteca de componentes animados profissionais. Botões, temporizadores, transições — código pronto para usar.',                                             icon: 'animejs',      href: '/tools/animejs',                     categoryId: 'apps',        categoryLabel: 'Apps',         author: '@joaoguirunas' },
  { title: 'Instagram CLI',               description: 'Use o Instagram pelo terminal. Sem doom-scrolling, sem feed. Integra com LLMs para automatizar.',                                                            icon: 'instagram',    href: '/tools/instagram-cli',               categoryId: 'apps',        categoryLabel: 'Apps',         author: '@joaoguirunas' },
  { title: 'Setup Claude Code',           description: 'Guia completo de configuração avançada. Do básico ao expert em Claude Code CLI.',                                                                             icon: 'setup',        href: '/setup/claude-code',                 categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'AI Video Generation',         description: 'Gere vídeos com IA usando 40+ modelos. Veo 3.1, Seedance, Wan 2.5, Grok e mais.',                                                                            icon: 'video',        href: '/skills/ai-video',                   categoryId: 'skills',      categoryLabel: 'Skills',       author: '@nichochar' },
  { title: 'AI Image Generation',         description: 'Gere imagens com IA usando 50+ modelos. FLUX, Gemini, Grok, Seedream e mais.',                                                                               icon: 'image',        href: '/skills/ai-image',                   categoryId: 'skills',      categoryLabel: 'Skills',       author: '@nichochar' },
  { title: 'Social Media Carousel',       description: 'Design de carrosséis multi-slide para Instagram, LinkedIn e Twitter/X com hooks e swipe psychology.',                                                        icon: 'carousel',     href: '/skills/carousel',                   categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Graphic Designer',            description: 'Design de thumbnails, social media, banners e apresentações com princípios CRAP e Gestalt.',                                                                  icon: 'design',       href: '/skills/graphic-designer',           categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Remotion + Claude Code',      description: 'Edite e crie vídeos com Claude Code. Cortes, legendas, split screen — tudo via prompt no terminal.',                                                         icon: 'remotion',     href: '/skills/remotion',                   categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Website Builder',             description: 'Crie sites profissionais com Claude Code + 21st.dev. Do zero ao deploy em minutos, sem experiência prévia.',                                                  icon: 'website',      href: '/skills/website-builder',            categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Claude Cowork & Plugins',     description: 'Módulos prontos que transformam o Claude em especialista da sua área. Open source, gratuitos.',                                                              icon: 'plugin',       href: '/skills/cowork-plugins',             categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Claude Code vs N8N',          description: 'Migre suas automações do N8N para o Claude Code. Webhooks, APIs, lógica condicional — tudo no terminal.',                                                   icon: 'automation',   href: '/skills/n8n',                        categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Remote Control',              description: 'Acesse seu Claude Code pelo celular. Um QR Code e seu setup local fica acessível de qualquer lugar.',                                                        icon: 'mobile',       href: '/skills/remote-control',             categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Claude Code + NotebookLM',    description: 'O maior hack de 2026. Combine Claude Code com NotebookLM como sistema RAG gratuito e potente.',                                                              icon: 'notebook',     href: '/skills/notebook-lm',                categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Claude Code + Obsidian',      description: 'Dê memória permanente ao Claude Code com Obsidian. Tudo que você faz numa sessão é salvo e lembrado.',                                                      icon: 'obsidian',     href: '/skills/obsidian',                   categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'CRM com Claude Code',         description: 'Crie seu CRM do zero sem programação. Pipelines customizados com automações de IA integradas.',                                                              icon: 'crm',          href: '/skills/crm',                        categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Dev Browser',                 description: 'Controle o Chrome com Claude Code via código. Mais rápido, barato e preciso que Computer Use.',                                                              icon: 'browser',      href: '/skills/dev-browser',                categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Copywriting Skill',           description: 'Skill que ensina o Claude a escrever textos de venda. Frameworks profissionais para landing pages e preços.',                                                icon: 'copywriting',  href: '/skills/copywriting',                categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Design System Skill',         description: 'Skill que mantém consistência visual em todo código gerado. Claude aprende seu design system e aplica automaticamente.',                                     icon: 'design',       href: '/skills/design-system',              categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Apresentações com Gamma',     description: 'Crie slides, e-books e infográficos no Claude. Gamma App integrado para layouts profissionais em um clique.',                                                icon: 'presentation', href: '/skills/presentations',              categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Dashboard de Conteúdo',       description: 'Claude Code constrói e opera seu dashboard. Publica, agenda, analisa — tudo dentro do software que ele criou.',                                             icon: 'dashboard',    href: '/skills/content-dashboard',          categoryId: 'skills',      categoryLabel: 'Skills',       author: '@joaoguirunas' },
  { title: 'Meta Ads com IA',             description: 'Automação de campanhas Meta com agentes. Otimize criativos, copy e targeting automaticamente.',                                                              icon: 'ads',          href: '/learn/meta-ads-ai',                 categoryId: 'integracoes', categoryLabel: 'Integrações',  author: '@joaoguirunas' },
  { title: 'Google Ads com IA',           description: 'Otimização de Google Ads com IA. Performance Max, Search e Display gerenciados por agentes.',                                                               icon: 'google',       href: '/learn/google-ads-ai',               categoryId: 'integracoes', categoryLabel: 'Integrações',  author: '@joaoguirunas' },
  { title: 'Vercel Deploy',               description: 'Deploy automatizado com preview deployments, domínios custom e edge functions para projetos web.',                                                           icon: 'deploy',       href: '/skills/vercel',                     categoryId: 'integracoes', categoryLabel: 'Integrações',  author: 'Vercel' },
  { title: 'GitHub',                      description: 'Integração completa com repositórios, PRs, Issues e Actions para workflow de desenvolvimento.',                                                              icon: 'github',       href: '/skills/github',                     categoryId: 'integracoes', categoryLabel: 'Integrações',  author: 'GitHub' },
  { title: 'Supabase',                    description: 'Backend open source com PostgreSQL, Auth, Storage e Realtime para aplicações modernas.',                                                                     icon: 'database',     href: '/skills/supabase',                   categoryId: 'integracoes', categoryLabel: 'Integrações',  author: 'Supabase' },
  { title: 'Claude nos DMs do Instagram', description: 'Configure o Claude como vendedor 24/7 no Instagram. Responde directs automaticamente.',                                                                      icon: 'dm',           href: '/skills/instagram-dms',              categoryId: 'integracoes', categoryLabel: 'Integrações',  author: '@joaoguirunas' },
  { title: 'Ads Dashboard',               description: 'Meta Ads, Google Ads e Analytics em um painel centralizado. Relatórios, alertas e recomendações automáticas.',                                              icon: 'dashboard',    href: '/skills/ads-dashboard',              categoryId: 'integracoes', categoryLabel: 'Integrações',  author: '@joaoguirunas' },
  { title: 'Cursos Anthropic',            description: 'Curadoria dos 13 cursos gratuitos da Anthropic. Aprenda a construir com Claude.',                                                                            icon: 'book',         href: '/learn/anthropic-courses',           categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: 'Anthropic' },
  { title: 'Time de Agentes com IA',      description: 'Monte uma empresa de agentes de IA trabalhando 24/7. Do zero a uma operação completa delegada para IA.',                                                    icon: 'agents',       href: '/learn/multi-agent',                 categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: '8 Repositórios Essenciais',   description: 'Os repositórios GitHub que fazem o Claude Code performar até 10x mais. Curadoria dos melhores.',                                                            icon: 'github',       href: '/learn/github-repos',                categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: 'SEO com Claude Code',         description: 'Agentes de SEO que auditam, planejam e implementam melhorias no seu site. Do relatório à execução automática.',                                             icon: 'seo',          href: '/learn/seo-claude-code',             categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: '5 Ferramentas Grátis',        description: 'As ferramentas que todo usuário de Claude Code deveria usar. Superpower, Memory, N8N MCP, UI Pro e mais.',                                                  icon: 'setup',        href: '/learn/claude-code-skills',          categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: 'Brandbook com Claude Design',  description: 'Tutorial completo com os prompts exatos — do brief ao app React interativo. Logo, direção visual, tipografia e motion num dia.',                   icon: 'layout',       href: '/learn/claude-design-brandbook',     categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: 'Layouts Profissionais com IA',description: 'Crie interfaces com design de nível profissional usando IA. Prompts exatos, variações ilimitadas.',                                                         icon: 'layout',       href: '/learn/ai-layouts',                  categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: 'Claude Code + Google Stitch',  description: 'Design profissional → código de produção via MCP. Sem designer, sem agência. Guia completo com prompt exato.',                                                  icon: 'design',       href: '/learn/google-stitch',               categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: '@joaoguirunas' },
  { title: 'Learn Your Way',              description: 'IA que aprende como você aprende. Mapas mentais, áudios, quizzes personalizados para qualquer conteúdo.',                                                   icon: 'brain',        href: '/learn/learn-your-way',              categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: 'Google' },
  { title: 'Managed Agents',              description: 'Como a Anthropic desacoplou brain/hands em agentes. Session + Harness + Sandbox com 60% menos latência.',                                                   icon: 'agents',       href: '/learn/managed-agents',              categoryId: 'aprendizado', categoryLabel: 'Aprendizado',  author: 'Anthropic Engineering' },
];

// Stats fixos do header. O total de "Recursos" é calculado dinamicamente no
// componente (skills + content-posts migrados) e injetado no início.
const fixedStats = [
  { value: '100%', label: 'Open Source' },
  { value: '13',   label: 'Cursos Curados' },
  { value: '24/7', label: 'Agentes Ativos' },
];

export function OpenSourceClient() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Content-posts migrados para tutorial entram no catálogo como cards
  // filtráveis. Só entram os que já têm categoryId (migração em andamento);
  // posts ainda não enriquecidos ficam de fora até serem categorizados.
  const postCards = contentPosts
    .filter((p) => !!p.categoryId)
    .map((p) => ({
      title: p.titulo,
      description: p.longDescription?.[0] ?? p.legenda.replace(/#\w+/g, '').replace(/\s+/g, ' ').trim().slice(0, 120),
      icon: postCategoryIcon[p.categoryId as string] ?? 'book',
      href: `/open-source/${p.slug}/`,
      categoryId: p.categoryId as string,
      categoryLabel: p.categoryLabel ?? categoryLabelById[p.categoryId as string] ?? 'Aprendizado',
      author: p.author ?? '@joaoguirunas',
    }));

  const catalog = [...skills, ...postCards];

  const stats = [
    { value: String(catalog.length), label: 'Recursos' },
    ...fixedStats,
  ];

  const filtered = (() => {
    const q = searchQuery.toLowerCase().trim();
    return catalog.filter((s) => {
      const cat = activeFilter === 'all' || s.categoryId === activeFilter;
      const text = !q || s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.author.toLowerCase().includes(q);
      return cat && text;
    });
  })();

  return (
    <>
      {/* ── 1. Editorial Header ── */}
      <section className="relative overflow-hidden bg-[#050507] pt-20 sm:pt-32 pb-16 sm:pb-20 min-h-[60vh] flex items-end">
        {/* Founder portrait */}
        <Image
          src="/images/bg-open-source.png"
          alt=""
          fill
          className="object-cover object-[center_20%]"
          priority
        />
        {/* Gradients — text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507]/95 via-[#050507]/70 to-[#050507]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-[#050507]/20 to-transparent" />

        <GrowthWatermark size={520} className="top-0 right-0 -translate-y-1/4 translate-x-1/4" />

        <div className="relative w-full mx-auto max-w-6xl px-6 lg:px-8">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: CINEMA }}
            className="mb-8"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,58,14,0.8)', fontWeight: 500 }}
          >
            João Guirunas · 40+ Recursos · Open Source
          </motion.p>

          {/* H1 Display */}
          <motion.h1
            initial={{ opacity: 0, y: 44, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.08, ease: CINEMA }}
            className="font-[family-name:var(--font-display-serif)] font-[400] leading-[0.92] tracking-[-0.03em] text-white mb-8"
            style={{ fontSize: 'clamp(48px, 10vw, 120px)' }}
          >
            Open{' '}
            <span className="italic font-[300]" style={{ color: '#FF3A0E' }}>
              Source
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: GLIDE }}
            className="text-base sm:text-lg max-w-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.42)' }}
          >
            Ferramentas reais para Claude Code — curadas e usadas em produção.
          </motion.p>

          {/* Stats strip — stagger por item */}
          <motion.div
            variants={statsVariants}
            initial="hidden"
            animate="show"
            className="mt-14 pt-8 flex flex-wrap gap-10 sm:gap-16"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={statItemVariants} className="flex flex-col gap-1">
                <span
                  className="text-2xl sm:text-3xl font-bold leading-none"
                  style={{ color: '#FF3A0E', fontFamily: 'var(--font-display-serif)' }}
                >
                  {stat.value}
                </span>
                <span
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 1.5 Featured: Agent Teams ── */}
      <section className="relative bg-[#050507] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <Link
            href="/agentes"
            className="group relative block overflow-hidden border border-white/10 hover:border-[#FF3A0E]/50 transition-all"
            style={{
              background: `
                radial-gradient(ellipse at 80% 50%, rgba(255,58,14,0.10) 0%, transparent 60%),
                linear-gradient(135deg, #0a0a0d 0%, #050507 100%)
              `,
            }}
          >
            {/* dot grid */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center p-5 sm:p-8 lg:p-12">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className="inline-block px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase"
                    style={{ background: '#FF3A0E', color: '#050507', fontFamily: 'var(--font-mono)' }}
                  >
                    Novo
                  </span>
                  <span
                    className="text-white/50 uppercase"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.14em' }}
                  >
                    Centro de Treinamento Claude
                  </span>
                </div>

                <h2
                  className="font-[family-name:var(--font-display-serif)] font-[400] leading-[0.95] tracking-[-0.02em] text-white mb-4"
                  style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
                >
                  {TOTAL_AGENTES} agentes que{' '}
                  <span className="italic font-[300]" style={{ color: '#FF3A0E' }}>
                    trabalham por você
                  </span>
                </h2>

                <p className="text-white/60 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
                  Conheça as 4 squads completas — Dev, Sites, Social e Traffic. Cada agente com persona,
                  autoridades e skills definidos. Drop-in pra qualquer projeto Claude Code.
                </p>

                {/* Squad chips */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {SQUADS.map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 border"
                      style={{
                        borderColor: `${s.accent}55`,
                        background: `${s.accent}0d`,
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        letterSpacing: '0.12em',
                      }}
                    >
                      <span className="w-1 h-1 rounded-full" style={{ background: s.accent }} />
                      <span className="text-white/85 uppercase">{s.label}</span>
                      <span className="text-white/40">{s.count}</span>
                    </span>
                  ))}
                </div>

                <span
                  className="inline-flex items-center gap-2 text-[#FF3A0E] uppercase font-semibold transition-transform group-hover:translate-x-1"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em' }}
                >
                  Conhecer os {TOTAL_AGENTES} agentes
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>

              {/* Big number on the right */}
              <div className="hidden lg:flex items-center justify-center pr-4">
                <div className="text-center">
                  <div
                    className="font-[family-name:var(--font-display-serif)] font-[300] leading-none"
                    style={{
                      fontSize: 'clamp(120px, 14vw, 180px)',
                      color: '#FF3A0E',
                      textShadow: '0 0 80px rgba(255,58,14,0.4)',
                    }}
                  >
                    {TOTAL_AGENTES}
                  </div>
                  <div
                    className="text-white/50 uppercase mt-2"
                    style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.18em' }}
                  >
                    Agentes
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── 2. Skills Grid ── */}
      <section id="skills" className="bg-[#050507] pb-28">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          {/* Search */}
          <div className="pt-10 pb-5">
            <div className="relative w-full sm:max-w-xs">
              <Search
                className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.28)' }}
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar..."
                className="w-full pl-10 pr-8 py-3 text-sm placeholder-white/25 bg-transparent focus:outline-none transition-colors min-h-[44px]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                aria-label="Buscar recursos"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                  aria-label="Limpar busca"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: GLIDE }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map(({ id, label, Icon }) => {
              const active = activeFilter === id;
              return (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 min-h-[44px] transition-all duration-150"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    fontWeight: 500,
                    background: active ? 'rgba(255,58,14,0.06)' : 'transparent',
                    border: `1px solid ${active ? 'rgba(255,58,14,0.3)' : 'rgba(255,255,255,0.07)'}`,
                    color: active ? '#FF3A0E' : 'rgba(255,255,255,0.38)',
                    cursor: 'pointer',
                  }}
                >
                  <Icon className="h-3 w-3 flex-shrink-0" />
                  {label}
                </button>
              );
            })}
          </motion.div>

          {/* Result label */}
          {searchQuery && (
            <p className="mb-5 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}>
              {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para &ldquo;{searchQuery}&rdquo;
            </p>
          )}

          {/* Empty state */}
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="mb-4 text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.3)' }}>
                Nenhum resultado para &ldquo;{searchQuery}&rdquo;
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                className="text-sm underline underline-offset-4 transition-colors"
                style={{ color: '#FF3A0E', fontFamily: 'var(--font-mono)' }}
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              style={{ border: '1px solid rgba(255,255,255,0.07)', gap: 1, background: 'rgba(255,255,255,0.07)' }}
            >
              {filtered.map((skill) => (
                <Link
                  key={skill.title}
                  href={skill.href}
                  className="group flex flex-col p-5 bg-[#0e0e11] hover:bg-[#1f1f24] transition-colors duration-150"
                  aria-label={`Ver detalhes de ${skill.title}`}
                >
                  {/* Icon + category */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-colors duration-150 group-hover:border-white/[0.14]"
                      style={{
                        background: '#16161a',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: 'rgba(255,255,255,0.38)',
                      }}
                    >
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        dangerouslySetInnerHTML={{ __html: skillIcons[skill.icon] ?? skillIcons['monitor']! }}
                      />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.55rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'rgba(255,255,255,0.22)',
                        fontWeight: 500,
                      }}
                    >
                      {skill.categoryLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-sm font-semibold leading-snug mb-2 transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.82)' }}
                  >
                    {skill.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-xs leading-relaxed flex-1 mb-4 line-clamp-2"
                    style={{ color: 'rgba(255,255,255,0.38)' }}
                  >
                    {skill.description}
                  </p>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between pt-3"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <span
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center gap-1"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#FF3A0E',
                      }}
                      aria-hidden="true"
                    >
                      Ver
                      <ArrowRight className="h-3 w-3" />
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.58rem',
                        color: 'rgba(255,255,255,0.2)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {skill.author}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. CTA — Full-bleed ember (KV closing pattern) ── */}
      <section
        className="relative overflow-hidden py-20 sm:py-28 lg:py-36"
        style={{ background: '#FF3A0E' }}
      >
        {/* Brand watermark — símbolo JG em void sobre ember */}
        <GrowthWatermark
          size={560}
          className="bottom-0 right-0 translate-x-1/4 translate-y-1/4"
          color="#050507"
          opacity={0.07}
        />

        <div className="relative mx-auto max-w-6xl px-6 sm:px-12 lg:px-[140px]">
          {/* Eyebrow */}
          <p
            className="mb-6"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.16em',
              color: 'rgba(5,5,7,0.45)',
              fontWeight: 500,
            }}
          >
            Mentoria Exclusiva · João Guirunas
          </p>

          {/* H2 */}
          <h2
            className="font-[family-name:var(--font-display-serif)] font-[400] leading-[0.92] tracking-[-0.03em] mb-8 max-w-3xl"
            style={{ fontSize: 'clamp(36px, 7vw, 96px)', color: '#050507' }}
          >
            Pronto para{' '}
            <span className="italic font-[300]">escalar?</span>
          </h2>

          {/* Subtext */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-12 max-w-md"
            style={{ color: 'rgba(5,5,7,0.58)', letterSpacing: '-0.005em' }}
          >
            Turmas exclusivas de 10 alunos · 4 semanas · 10 encontros que transformam sua operação com IA.
          </p>

          {/* CTA — primary button: void bg, bone text (KV spec) */}
          <Link
            href="/mentoria"
            className="inline-flex items-center gap-3 transition-all duration-300 hover:gap-4 active:scale-[0.98]"
            style={{
              background: '#050507',
              color: '#f1f1f3',
              padding: '16px 28px',
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: '-0.01em',
            }}
            aria-label="Ir para página de mentoria"
          >
            Quero minha vaga
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
