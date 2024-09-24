import { ReactNode } from "react"

const Layout: React.FC<{children: ReactNode}> = ({children}): JSX.Element => {
    return (
        <div className="min-h-screen p-4 bg-gray-100">
            {children}
        </div>
    )
}
export default Layout