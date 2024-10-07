export default function News() {
  const news=[0,0,0,0,0,0]
    return (
        <div className="container px-2 py-10 mx-auto w-full ">
            <div className="flex flex-col w-full">
            {news.map((_,i)=>{
                return (
                  <div key={i} className="py-3 px-2 w-full rounded border-b border-green-600">
                    <div className="h-full flex gap-0.5 md:gap-2">
                        <img
                            alt="news"
                            className="flex  rounded-lg w-28 h-28 object-cover object-center sm:mb-0 mb-4"
                            src="https://dummyimage.com/112x112"
                        />
                        <div className="flex flex-col">
                        <span className="ml-5 text-xs bg-green-500 rounded-3xl text-white py-1 px-2 w-max">May 16,2023</span>
                            <h3 className="text-green-500 text-lg title-font tracking-tight flex-wrap font-medium text-center md:text-start">
                                anim qui mollit labore duis aliquip labori
                            </h3>
                            <p className="mb-4 text-left tracking-tight break-all">
                                DIY tote bag drinking vinegar cronut adaptogen
                                squid fanny pack vaporware.
                            </p>
                        </div>
                    </div>
                </div>
                )})}
            </div>
        </div>
    );
}
