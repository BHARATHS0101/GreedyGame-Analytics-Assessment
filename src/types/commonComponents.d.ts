declare namespace CommonComponentsNS {

    interface ICommonButtonProps {
        disabled: boolean;
        onClick: (...args:any) => void;
        buttonStyle?: string; 
        name?: string;
        isLoading?: boolean;
    }

}