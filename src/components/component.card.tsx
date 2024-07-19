
import { ReactNode } from 'react';

interface CardProps {
     children: ReactNode;
}

export default function Card({ children }: CardProps) {
     return (
          <>
               <div className='w-full flex justify-center'>
                    <div
                         className="h-36 w-40 flex justify-center items-center shadow-md rounded-md border border-slate-50 p-3 m-2 text-center"
                    >
                         {children}
                    </div>
               </div>
          </>
     )
}