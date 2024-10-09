import { FaRegClipboard, FaMobileAlt, FaServicestack } from "react-icons/fa"
import { IoPeopleSharp } from "react-icons/io5";
import { FaHandHoldingDollar } from "react-icons/fa6";
 import { PiHandsPrayingBold } from "react-icons/pi"; 

const services = [
  {
    icon: FaRegClipboard,
    title: "Savings",
    description: "Save today for better tomorrow!",
  },
  {
    icon: FaHandHoldingDollar,
    title: "Loan",
    description: "Empowering Dreams, Enabling Success: Unity Works SACCOS Loans",
  },
  {
    icon: FaMobileAlt,
    title: "Digital Banking",
    description: "Simplify your financial journey with UNity Wrorks Digital Banking Service",
  },
  {
    icon: PiHandsPrayingBold,
    title: "Member Welfare",
    description: "Secure your future with Unity Works Savings & Co-operative Ltd.",
  },
  {
    icon: IoPeopleSharp,
    title: "Financial Wellbeing",
    description: "Unity Works's Path to Employees' Financial Wellness!",
  },
  {
    icon: FaServicestack,
    title: "Other Services",
    description: "Our various other services that benefit our members!",
  },
]

export default function Services() {
  return (
    <section className="w-full px-[10vw] py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className=" w-full lg:mb-0 flex flex-col items-center mb-8">
          <div className="h-1 w-20 bg-green-500 rounded"></div>
          <h2 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900 ">
            OUR PRODUCTS AND SERVICES
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out ">
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                  <service.icon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-green-600 text-center">{service.title}</h3>
                <p className="mt-2 text-base text-gray-500 text-center">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}