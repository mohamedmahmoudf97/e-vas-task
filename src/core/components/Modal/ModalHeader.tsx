import { ModalHeaderProp } from "./types"

const ModalHeader:React.FC<ModalHeaderProp> = ({title, subTitle}):JSX.Element => {
    return <>
        {title ? <h2 className="text-2xl font-semibold text-center mb-2">{title}</h2> : null}
        {title && subTitle ? <p className="text-gray-600 text-center mb-4">{subTitle}</p> : null}
    </>
}

export default ModalHeader