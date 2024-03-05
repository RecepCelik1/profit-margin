import { useState } from "react";


function App() {

  const [costOfItem , setCostOfItem] = useState(null)
  const [markup , setMarkup] = useState(null)

  const [calculate , setCalculate] = useState(false)


  const parsingFunction = (event , field) => {

    const filteredValue = event.replace(/[^0-9,.]/g, "");
    let parsedValue = parseFloat(filteredValue.replace(",", "."));

    if(isNaN(parsedValue)) {
      parsedValue = 0
    }

    if(field === "cost") {
      setCostOfItem(parsedValue)
    } else if(field === "markup") {
      setMarkup(parsedValue)
    }

  }

  let salePrice = costOfItem + (costOfItem*markup/100)
  salePrice = parseFloat(salePrice.toFixed(2))

  let profit = salePrice - costOfItem

  let grossMargin = parseFloat(((profit/salePrice)*100).toFixed(2))
 
  const resetButton = () => {

    setCostOfItem(0)
    setMarkup(0)
    setCalculate(false)

  }

  return (

    <div className="h-screen">
      <div className="bg-sky-600 h-20 w-full flex justify-center items-center font-bold text-white">Header</div>
      <div className="bg-emerald-600 h-10 w-full flex justify-center items-center font-bold text-white">Navbar</div>

      <div className="h-full flex">


        <div className="bg-slate-800 w-36 h-full font-bold text-white flex justify-center items-center hidden md:block">aside</div>


        <div className="flex justify-center items-center w-full"> {/* main content */}

          <div className="flex flex-col p-3">

            <div className="p-2 bg-gray-300 rounded-md">

              <div className="flex flex-col sm:flex-row justify-center">

                <div className="m-1 w-64">

                  <input 
                    className="h-12 p-2 rounded-md w-full"
                    onChange={(e) => parsingFunction(e.target.value , "cost")}
                    placeholder="Cost of item ($)"
                    value={costOfItem === 0 ? "" : costOfItem}
                  />

                </div>

                <div className="m-1 flex flex-col w-64">    

                  <input 
                    className="h-12 p-2 rounded-md w-full"
                    onChange={(e) => parsingFunction(e.target.value , "markup")}
                    placeholder="Markup (%)"
                    value={markup === 0 ? "" : markup}
                  />

                  <div className="mt-3 flex justify-center">

                  <button 
                  className="mr-5 ml-5 text-xs text-green-800 font-bold"
                  onClick={(e) => resetButton()}
                  >
                    Reset
                  </button>

                  <button
                    className={`bg-[#008254] w-full h-[45px] font-bold text-white ${
                      costOfItem === null  || markup === null
                        ? "opacity-50"
                        : ""
                    }`}
                    disabled={costOfItem === null || markup === null}
                    onClick={(e) => setCalculate(true)}
                  >
                    Calculate Profit
                  </button>

                  </div>

                </div>
               </div>
              </div>

              {calculate && (
              <div className="mt-5 w-128 border">

<h1 className="text-2xl font-bold p-3 w-full flex justify-center items-center text-gray-700">PROFIT MARGIN CALCULATOR RESULTS</h1>

        <div className="grid grid-cols-3 ">

          {/* İlk kutucuk */}
          <div className="border p-4 flex justify-center items-center">

            <div className="flex flex-col">

              <h2 className="text-xl font-semibold mb-2">Your sale price</h2>
                <div className="flex justify-center items-center text-3xl text-green-800">$ {salePrice}</div>

            </div>

          </div>

          {/* İkinci kutucuk */}
          <div className="border p-4 flex justify-center items-center">

            <div className="flex flex-col">

              <h2 className="text-xl font-semibold mb-2">Your profit</h2>
                <div className="flex justify-center items-center text-3xl text-green-800">$ {parseFloat((costOfItem*markup/100).toFixed(2))}</div>

            </div>

          </div>

          {/* Üçüncü kutucuk */}
          <div className="border p-4 flex justify-center items-center">

            <div className="flex flex-col">

              <h2 className="text-xl font-semibold mb-2">Gross Margin</h2>
                <div className="flex justify-center items-center text-3xl text-green-800">{isNaN(grossMargin) ? 0 : grossMargin}%</div>

            </div>

          </div>
        </div>

              </div>
              )}
          </div>

          
        </div>
      </div>

      <div className="w-full bg-cyan-900 font-bold text-white flex justify-center items-center h-20">Footer</div>

    </div>
  );
}

export default App;
