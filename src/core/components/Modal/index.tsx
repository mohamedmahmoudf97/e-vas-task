import { ModalProps } from "./types";
import CloseButton from "./CloseButton";
import ModalHeader from "./ModalHeader";

const Modal: React.FC<ModalProps> = ({isOpen, toggle, withClose = true, title = '', subTitle = '', children}):JSX.Element|null => {
    return isOpen ? (
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
            <CloseButton withClose={withClose} toggle={toggle} />
            <ModalHeader title={title} subTitle={subTitle} />
            {children}
          </div>
        </div>
      </div>
    ) : null;
}
export default Modal