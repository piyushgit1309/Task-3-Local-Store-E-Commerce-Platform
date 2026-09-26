import React from 'react';

export const IconBase: React.FC<{
  children: React.ReactNode;
  className?: string;
  size?: number;
}> = ({ children, className = 'w-5 h-5', size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={size ? { width: size, height: size } : undefined}
  >
    {children}
  </svg>
);

export const ShoppingBagIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </IconBase>
);

export const ShoppingCartIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <IconBase className={className}>
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </IconBase>
);

export const SearchIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <IconBase className={className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconBase>
);

export const StarIcon = ({ className = 'w-4 h-4', filled = true }: { className?: string; filled?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const TruckIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
    <path d="M15 18H9" />
    <path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-5v10" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </IconBase>
);

export const ShieldCheckIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </IconBase>
);

export const MapPinIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </IconBase>
);

export const ClockIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </IconBase>
);

export const CheckIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M20 6 9 17l-5-5" />
  </IconBase>
);

export const CheckCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </IconBase>
);

export const XIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconBase>
);

export const PlusIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </IconBase>
);

export const MinusIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M5 12h14" />
  </IconBase>
);

export const TrashIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" x2="10" y1="11" y2="17" />
    <line x1="14" x2="14" y1="11" y2="17" />
  </IconBase>
);

export const ChevronRightIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="m9 18 6-6-6-6" />
  </IconBase>
);

export const ChevronDownIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="m6 9 6 6 6-6" />
  </IconBase>
);

export const FilterIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </IconBase>
);

export const SparklesIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </IconBase>
);

export const MessageCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
  </IconBase>
);

export const PhoneIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </IconBase>
);

export const MailIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </IconBase>
);

export const TagIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
    <path d="M7 7h.01" />
  </IconBase>
);

export const ArrowRightIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </IconBase>
);

export const RefreshCwIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </IconBase>
);

export const AlertCircleIcon = ({ className = 'w-5 h-5' }: { className?: string }) => (
  <IconBase className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </IconBase>
);

export const HeartIcon = ({ className = 'w-4 h-4', filled = false }: { className?: string; filled?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const EyeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <IconBase className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </IconBase>
);
