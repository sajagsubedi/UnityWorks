import { BsGraphUpArrow } from "react-icons/bs";
import { LiaAwardSolid } from "react-icons/lia";
import { FaUser } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";

export default function Achievements() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className=" w-full mb-6 lg:mb-0 flex flex-col items-center">
          <div className="h-1 w-20 bg-green-500 rounded"></div>
          <h2 className="sm:text-3xl text-2xl font-bold title-font mb-2 text-gray-700 ">
            ACHIEVMENTS
          </h2>
        </div>
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-col items-center gap-2">
              <BsGraphUpArrow className="text-7xl text-center text-green-500 font-bold" />
              <h3 className="title-font font-medium text-3xl text-gray-900">
                5
              </h3>
              <p className="leading-relaxed">NO. of SERVICE YEAR</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-col items-center gap-2">
              <LiaAwardSolid className="text-7xl text-center text-green-500 font-bold" />

              <h3 className="title-font font-medium text-3xl text-gray-900">
                3
              </h3>
              <p className="leading-relaxed">Awards</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-col items-center gap-2">
              <FaUser className="text-7xl text-center text-green-500 font-bold" />

              <h3 className="title-font font-medium text-3xl text-gray-900">
                2.3K
              </h3>
              <p className="leading-relaxed">Total Members</p>
            </div>
          </div>
          <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div className="border-2 border-gray-200 px-4 py-6 rounded-lg flex flex-col items-center gap-2">
              <GiReceiveMoney className="text-7xl text-center text-green-500 font-bold" />

              <h3 className="title-font font-medium text-3xl text-gray-900">
                315,457,693
              </h3>
              <p className="leading-relaxed">Total Assets</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
