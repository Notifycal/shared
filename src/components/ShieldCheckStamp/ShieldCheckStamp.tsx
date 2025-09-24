import { IconShieldCheck } from '@tabler/icons-react';
import { FC } from 'react';

interface ShieldCheckStampProps {
  text: string;
  recommended: boolean;
}

export const ShieldCheckStamp: FC<ShieldCheckStampProps> = ({ text, recommended }) => {
  return (
    <div className="relative">
      <div className="absolute -right-2 -bottom-10 md:-bottom-13 z-10 rotate-22">
        <IconShieldCheck
          size={85}
          className={recommended ? 'text-primary-600' : 'text-primary-600'}
          strokeWidth={1.5}
          style={{
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.75)) drop-shadow(0 1px 2px rgba(0,0,0,0.6))'
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-md font-semibold text-center leading-tight px-1 ${recommended ? 'text-white' : 'text-white'}`}
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.95)) drop-shadow(0 1px 2px rgba(0,0,0,0.8))'
            }}
          >
            {text.split(' ').map((word, i) => (
              <div key={i}>{word}</div>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
};
