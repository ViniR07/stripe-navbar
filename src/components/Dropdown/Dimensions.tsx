import { useCallback, useLayoutEffect, useState } from 'react';

const getDimensions = (element: HTMLElement) => element.getBoundingClientRect();

export const useDimensions = (responsive = true) => {
  const [dimensions, setDimensions] = useState<DOMRect>();
  const [element, setElement] = useState<HTMLElement>();

  const hook = useCallback((e: HTMLButtonElement) => {
    setElement(e);
  }, []);

  /**
     * É executado de forma síncrona após uma renderização, mas antes da atualização da tela
        - Você causa uma renderização de alguma forma (altera o estado ou o componente pai é renderizado novamente)
        - React renderiza seu componente (chama seu componente)
        - useLayoutEffect é executado e o React aguarda seu término
        - A tela é visualmente atualizada
     */
  useLayoutEffect(() => {
    if (element) {
      const updateDimensions = () => {
        // https://developer.mozilla.org/pt-BR/docs/Web/API/Window/requestAnimationFrame
        // Fala para o navegador que antes de "pintar" a tela deve executar uma função para animação
        window.requestAnimationFrame(() => {
          setDimensions(getDimensions(element));
        });
      };
      updateDimensions();

      if (responsive) {
        window.addEventListener('resize', updateDimensions);

        return () => {
          window.removeEventListener('resize', updateDimensions);
        };
      }
    }
    return;
  }, [element, hook, responsive]);

  return [hook, dimensions, element] as const;
};
