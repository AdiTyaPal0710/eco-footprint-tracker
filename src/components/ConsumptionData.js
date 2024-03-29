import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CarbonFootprintCalculator from "./carbon";
import EatingHabits from "./EatingHabits";
import Header from "./common/Header";
import CarbonFootprintCalculatorVehicle from "./vehicle";
import CarbonFootprintCalculatorPublicVehicle from "./public_transport";
import "./common/Tailwind.css";

const ConsumptionData = () => {
  const [activeSection, setActiveSection] = useState("carbon"); // 'carbon' or 'eating'

  const handleNavigateToCarbon = () => {
    setActiveSection("carbon");
  };

  const handleNavigateToEatingHabits = () => {
    setActiveSection("eating");
  };

  const handleNavigateToVehicle = () => {
    setActiveSection("vehicle");
  };

  const handleNavigateToPublicVehicle = () => {
    setActiveSection("public_vehicle")
  };

  return (
    <div>
      <Header />
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
            Trusted by the world’s most innovative teams
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <button onClick={handleNavigateToCarbon}>
              Home Footprint
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg"
                alt="Transistor"
                width={158}
                height={48}
              />
            </button>

            <button onClick={handleNavigateToEatingHabits}>
              Eating Habits
              <img
                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                src="https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg"
                alt="Reform"
                width={158}
                height={48}
              />
            </button>
            
            <button onClick={handleNavigateToVehicle}>
              Private Vehicles
            <img
              className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg"
              alt="Tuple"
              width={158}
              height={48}
            />
            </button>

            <button onClick={handleNavigateToPublicVehicle}>
              Public Vehicles
            <img
              className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg"
              alt="SavvyCal"
              width={158}
              height={48}
            />
            </button>

            <img
              className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg"
              alt="Statamic"
              width={158}
              height={48}
            />
          </div>
        </div>
        <div>
          {/* <button onClick={handleNavigateToCarbon}>Calculate Carbon Footprint</button>
        <button onClick={handleNavigateToEatingHabits}>Eating Habits</button> */}

          {activeSection === "carbon" && <CarbonFootprintCalculator />}
          {activeSection === "eating" && <EatingHabits />}
          {activeSection === "vehicle" && <CarbonFootprintCalculatorVehicle/>}
          {activeSection === "public_vehicle" && <CarbonFootprintCalculatorPublicVehicle/>}
        </div>
      </div>
    </div>
  );
};

export default ConsumptionData;
