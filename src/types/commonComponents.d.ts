declare namespace CommonComponentsNS {

    interface ICommonButtonProps {
        disabled: boolean;
        onClick: (...args:any) => void;
        buttonStyle?: string; 
        name?: string;
        isLoading?: boolean;
    }

    interface IColumnsStructure {
        colName: string | React.ReactNode;
        keyToSearch: string;
        className?: string;
        render?: (...args:any) => React.ReactNode;
    }

    interface ICommonTableProps {
        columns: IColumnsStructure[];
        data: any;
    }

}