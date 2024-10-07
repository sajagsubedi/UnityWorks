export default function Notices() {
  const notices=[0,0,0,0,0,0]
    return (
        <div className="container px-2 py-10 mx-auto">
            <div className="flex flex-col w-full">
            {notices.map((_,i)=>{
                return (
                  <div key={i} className="py-3 px-2 w-full rounded border-b border-green-600">
                               <div className="flex h-full flex-col">
                        <p className="text-xs">Notice Detail</p>
                        <span className="ml-0 text-xs bg-green-500 rounded-3xl text-white py-1 px-2 w-max">May 16,2023</span>
                            <h3 className="text-green-500 text-lg title-font tracking-tight flex-wrap font-medium">
                                anim qui mollit labore duis aliquip labori
                            </h3>
                            <p className="mb-4 text-left tracking-tight break-all">
                                DIY tote bag drinking vinegar cronut adaptogen
                                squid fanny pack vaporware.
                            </p>
                        </div>
                </div>
                )})}
            </div>
        </div>
    );
}
