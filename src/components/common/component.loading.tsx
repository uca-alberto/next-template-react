export default function ComponentLoading({ text }: { text: string }) {
     return (
          <>
               <div className="h-[75vh] flex items-center justify-center ">
                    <ViewInternal text={text} />
               </div>
          </>
     );
}

const ViewInternal = ({ text }: { text: string }) => {
     if (text) return (
          <h1 className="text-2xl text-gray-900">{text}</h1>
     )

     return (
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
     );

}