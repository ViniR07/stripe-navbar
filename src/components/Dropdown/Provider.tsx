import React, { useCallback, useState, useEffect } from 'react';
import { IOption, DropdownContextValues } from '@types';

export const DropdownContext = React.createContext<DropdownContextValues>(
    {} as DropdownContextValues
);

export const DropdownProvider: React.FC<{ children?: React.ReactNode }> = ({
    children,
}) => {
    const [options, setOptions] = useState<IOption[] | []>([]); // Guarda as opções como um banco
    const [targetId, setTargetId] = useState<number | null>(null); // Id da opção selecionada
    const [cachedId, setCachedId] = useState<number | null>(null); // Id da ultima opção selec.

    const registerOption = useCallback(
        ({
            id,
            optionDimensions,
            optionCenterX,
            WrappedContent,
            backgroundHeight,
        }: IOption) => {
            setOptions(items => [
                ...items,
                {
                    id,
                    optionDimensions,
                    optionCenterX,
                    WrappedContent,
                    backgroundHeight,
                },
            ]);
        },
        [setOptions]
    );

    const updateOptionProps = useCallback(
        (optionId, props) => {
            setOptions((items): IOption[] => {
                const newItems = items.map<IOption>((item: IOption) => {
                    if (item.id === optionId) {
                        item = { ...item, ...props };
                    }
                    return item;
                });
                return newItems;
            });
        },
        [setOptions]
    );

    const getOptionById = useCallback(
        id => options.find(item => item.id === id),
        [options]
    );

    const deleteOptionById = useCallback(
        id => {
            setOptions(items => items.filter(item => item.id !== id));
        },
        [setOptions]
    );

    useEffect(() => {
        if (targetId !== null) setCachedId(targetId);
    }, [targetId]);

    return (
        <DropdownContext.Provider
            value={{
                registerOption,
                updateOptionProps,
                getOptionById,
                deleteOptionById,
                options,
                targetId,
                setTargetId,
                cachedId,
                setCachedId,
            }}
        >
            {children}
        </DropdownContext.Provider>
    );
};
