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
    <div className="bg-black">
      <Chart />
    </div>
  )
}

export default React.memo(App)
