import React, {
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { motion } from 'framer-motion';
import { useDimensions } from './Dimensions';
import { DropdownContext } from './Provider';
import { DropdownOptionProps } from '@types';

// import { Container } from './styles';

// "confie em mim, esta variável existe e tem este tipo"
declare global {
  interface Window {
    isMobile: boolean;
  }
}

let lastOptionId = 0;

export const DropdownOption: React.FC<DropdownOptionProps> = ({
  name,
  content: Content,
  backgroundHeight,
}) => {
  /* criando um id único para cada opção */
  const idRef = useRef(++lastOptionId);
  const id = idRef.current;

  const [hook, optionDimensions] = useDimensions();
  const [registered, setRegistered] = useState(false);

  const {
    registerOption,
    updateOptionProps,
    deleteOptionById,
    setTargetId,
    targetId,
  } = useContext(DropdownContext);

  useEffect(() => {
    if (!registered && optionDimensions) {
      // Relaciona a dimensao do conteudo ao pai dele
      const WrappedContent = () => {
        const contentRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
          const contentDimensions =
            contentRef.current && contentRef.current.getBoundingClientRect();
          updateOptionProps(id, { contentDimensions });
        }, []);

        return (
          <div ref={contentRef}>
            <Content />
          </div>
        );
      };

      registerOption({
        id,
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.width / 2,
        WrappedContent,
        backgroundHeight,
      });
      setRegistered(true);
    } else if (registered && optionDimensions) {
      // já registrado e tem novas dimensoes
      updateOptionProps(id, {
        optionDimensions,
        optionCenterX: optionDimensions.x + optionDimensions.width / 2,
      });
    }
  }, [
    registerOption,
    id,
    registered,
    optionDimensions,
    updateOptionProps,
    deleteOptionById,
    backgroundHeight,
  ]);

  useEffect(() => deleteOptionById(id), [deleteOptionById, id]);

  const handleOpen = () => setTargetId(id);
  const handleClose = () => setTargetId(null);
  const handleTouch = () => (window.isMobile = true);

  const handleClick: MouseEventHandler = e => {
    e.preventDefault();
    return targetId === id ? handleClose() : handleOpen();
  };

  return (
    <motion.button
      className="dropdown-option"
      ref={hook}
      onMouseDown={handleClick}
      onHoverStart={() => {
        !window.isMobile && handleOpen();
      }}
      onHoverEnd={() => {
        !window.isMobile && handleClose();
      }}
      onTouchStart={handleTouch}
      onFocus={handleOpen}
      onBlur={handleClose}
    >
      {name}
    </motion.button>
  );
};
