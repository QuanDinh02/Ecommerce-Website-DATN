import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdOutlineContentCopy } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";

interface IProps {
    value: any
}

const CopyClipboard = (props: IProps) => {

    const { value } = props;
    const [isCopy, setIsCopy] = React.useState<boolean>(false);

    return (
        <CopyToClipboard
            text={value}
            onCopy={() => setIsCopy(true)}
        >
            {
                !isCopy ?
                <MdOutlineContentCopy />
                :
                <IoCheckmarkSharp/>
            }
            
        </CopyToClipboard>
    )
}

export default CopyClipboard;