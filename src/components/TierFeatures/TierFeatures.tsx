import { TierInfo } from '@components/TierCard/TierCard';
import { ActionIcon, Popover } from '@mantine/core';
import { IconCheck, IconInfoCircle, TablerIcon } from '@tabler/icons-react';
import clsx from 'clsx';
import type { FC } from 'react';
import { useState } from 'react';

interface TierFeatures {
  tier: TierInfo;
  icon?: TablerIcon;
  className?: string;
}

export const TierFeatures: FC<TierFeatures> = ({ tier, className, icon: Icon = IconCheck }) => {
  const [openedPopover, setOpenedPopover] = useState<number | null>(null);

  return (
    <ul className={clsx('mt-4 flex flex-col gap-2 items-start text-sm opacity-80 px-0', className)}>
      {tier.features.map((feature, index) => {
        const moreInfo = feature.moreInfo;
        return (
          <li key={index} className="flex items-start gap-2 mt-2">
            <span className={clsx(tier.defaultRecommended || tier.calculatedRecommended ? '' : 'text-primary')}>
              <Icon />
            </span>
            <span className="flex items-center gap-1">
              {feature.text}
              {moreInfo && (
                <Popover
                  width={330}
                  position="top"
                  withArrow
                  shadow="md"
                  opened={openedPopover === index}
                  onChange={(opened) => setOpenedPopover(opened ? index : null)}
                >
                  <Popover.Target>
                    <ActionIcon
                      size="xs"
                      variant="subtle"
                      color="gray"
                      onClick={() => setOpenedPopover(openedPopover === index ? null : index)}
                    >
                      <IconInfoCircle size={16} />
                    </ActionIcon>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <div className="text-sm">{moreInfo}</div>
                  </Popover.Dropdown>
                </Popover>
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default TierFeatures;
