import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({ pokemonList }) => {
 
  const {  labels, series } = useMemo(() => {
    const typeMap = {};

    pokemonList.forEach((pokemon) => {
      pokemon.types.forEach((typeObj) => {
        const type = typeObj.type.name;
        typeMap[type]= typeMap[type] ? typeMap[type] + 1 : 1;
      });
    });

    const labels = Object.keys(typeMap);
    const series = Object.values(typeMap);

    return { typeCounts: typeMap, labels, series };
  }, [pokemonList]);

  return (
    <div className='container w-full mx-auto p-4'>
      <Chart
        type="pie"
        width="450px"
        height="350px"
        series={series}
        options={{
          title: { text: "Number of Pokemon by Type", style: { fontSize: '18px' } },
          labels: labels,
          legend: {
            position: 'bottom'
          }
        }}
      />
    </div>
  );
};

export default PieChart;
