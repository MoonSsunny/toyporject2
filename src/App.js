import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import "./App.css";

const dataApi = () => {
  return fetch("data.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const dataKey = [];
      dataKey.push(Object.keys(data.data[0]));
      const mapData = Object.values(data.data).map((v) =>
        Object.keys(v).map((v2) => v[v2])
      );
      const finalData = [...dataKey, ...mapData];
      return finalData;
    });
};

function App() {
  const [cartData, setCartData] = useState();
  useEffect(() => {
    dataApi().then((res) => {
      setCartData(res);
    });
  }, []);

  const pieOptions = {
    title: "votes",
    pieHole: 0.3,
    slices: [
      {
        color: "#2BB673",
      },
      {
        color: "#d91e48",
      },
      {
        color: "#007fad",
      },
      {
        color: "#e9a227",
      },
    ],
    legend: "none",
    tooltip: {
      showColorCode: true,
    },
    chartArea: {
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
    },
    fontName: "Roboto",
  };

  return (
    <div className="App">
      <Chart
        chartType="PieChart"
        data={cartData}
        options={pieOptions}
        graph_id="PieChart"
        width={"100%"}
        height={"400px"}
        legend_toggle
      />
    </div>
  );
}

export default App;
