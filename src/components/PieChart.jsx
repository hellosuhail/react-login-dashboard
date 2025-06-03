import React, { useMemo } from 'react';
import Chart from 'react-apexcharts';

const PieChart = ({ pokemonList }) => {
  const { labels, series } = useMemo(() => {
 const typeMap = {};

    pokemonList.forEach((pokemon) => {
      pokemon.types.forEach((typeObj) => {
        const typeName = typeObj.type.name;
     typeMap[typeName] = typeMap[typeName] ? typeMap[typeName] + 1 : 1;
      });
    });

    const labels = Object.keys(typeMap);
    const series = Object.values(typeMap);

    return { labels, series };
  }, [pokemonList]);

  return (
    <div className="container mb-14 w-full mx-auto px-4 md:px-6">
      <Chart  type="pie"
        width="100%"
        height="550"
        series={series}
        options={{
          chart: {
            width: '100%'  },
          title: {
            text: 'Number of Pokemon by Type',
            style: { fontSize: '18px' },},
          labels: labels,
          legend: {
            position: 'bottom',
          }, }}
      />
    </div>
  );
};

export default PieChart;
