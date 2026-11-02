import React from 'react';

// Drop the full horizontal logo files from the graphic designer into /public and set
// the paths here — every logo on the site (navbar + footer) will switch over automatically.
// `light` is used on dark backgrounds, `dark` on light backgrounds.
const HORIZONTAL_LOGO = { light: null, dark: null };

const SIZES = {
  md: { mark: 'h-[22px]', text: 'text-[17px]', full: 'h-7' },
  lg: { mark: 'h-6', text: 'text-lg', full: 'h-8' },
};

const Logo = ({ variant = 'light', size = 'md' }) => {
  const s = SIZES[size];
  const full = HORIZONTAL_LOGO[variant];

  if (full) return <img src={full} alt="APEX CEREBRO" className={`${s.full} w-auto`} />;

  return (
    <span className="flex items-center gap-2.5">
      <img src={variant === 'dark' ? '/apex-mark-dark.png' : '/apex-mark-white.png'} alt="" className={`${s.mark} w-auto`} />
      <span className={`font-display font-bold ${s.text} tracking-tight leading-none`}>APEX <span className="font-medium opacity-80">CEREBRO</span></span>
    </span>
  );
};

export default Logo;
