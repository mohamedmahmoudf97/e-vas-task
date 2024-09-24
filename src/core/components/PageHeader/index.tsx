import { ReactNode } from "react";

const PageHeader: React.FC<{action?: ReactNode, title:string, subtitle?:string}> = ({title, subtitle, action}) => {
    return (
        <div className="bg-white shadow p-4">
            <div className=" flex justify-between items-center">
                <h1 className="text-xl font-semibold">{title}</h1>
                <div>
                    {action}
                </div>
            </div>
          {subtitle ? <p className="text-sm font-medium">{subtitle}</p>: null}
        </div>
      );
}

export default PageHeader