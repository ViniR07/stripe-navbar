export interface IOption {
    id: number;
    optionDimensions: DOMRect;
    contentDimensions?: DOMRect;
    optionCenterX: number;
    WrappedContent: React.FC;
    backgroundHeight: number;
}

export interface DropdownOptionProps {
    name: string;
    content: React.FC;
    backgroundHeight: number;
}

export interface DropdownContextValues {
    registerOption: (props: IOption) => void;
    updateOptionProps: (optionId: any, props: any) => void;
    getOptionById: (id: any) => IOption | undefined;
    deleteOptionById: (id: any) => void;
    options: IOption[];
    setOptions?: React.Dispatch<React.SetStateAction<[] | IOption[]>>;
    targetId: number | null;
    setTargetId: React.Dispatch<React.SetStateAction<number | null>>;
    cachedId: number | null;
    setCachedId: React.Dispatch<React.SetStateAction<number | null>>;
}
