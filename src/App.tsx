import React, { useCallback, useEffect } from "react";
import Chart from "./Chart"
import { fetchDivision } from "./app/division";
import { useDispatch } from "react-redux"
import { AppDispatch } from "./app/store";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const fetchDivisionCallback = useCallback(() => {
    dispatch(fetchDivision());
  }, []);

  useEffect(() => {
    fetchDivisionCallback();
  }, [fetchDivisionCallback]);
  return (
    <div className="w-full bg-black flex justify-center">
      <Chart />
    </div>
  )
}

export default React.memo(App)
