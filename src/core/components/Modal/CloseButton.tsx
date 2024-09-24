import { CloseButtonProp } from "./types"

const CloseButton: React.FC<CloseButtonProp> = ({withClose, toggle}):JSX.Element|null => {
    return withClose ? (
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => toggle()}
        >
          &times;
        </button>
      ) : null
}

export default CloseButton