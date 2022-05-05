import React, { useContext } from 'react';
import { IOption } from '@types';
import { DropdownContext } from './Provider';
import { motion } from 'framer-motion';

export const DropdownSection: React.FC<{ option: IOption }> = ({ option }) => {
  const { cachedId } = useContext(DropdownContext);

  const { id, optionCenterX, contentDimensions } = option;

  const contentWidth = contentDimensions?.width || 0;
  const x = optionCenterX - contentWidth / 2;

  const isAtive = cachedId === id;

  return (
    <motion.div
      className="dropdown-section"
      // Para evitar animação "Vindo da direita"
      initial={{
        x,
      }}
      animate={{
        x,
        opacity: isAtive ? 1 : 0,
        pointerEvents: isAtive ? 'unset' : 'none',
      }}
      transition={{
        ease: 'easeOut',
        opacity: { duration: 0.2 },
        bounce: 0,
      }}
    >
      <option.WrappedContent />
    </motion.div>
  );
};
