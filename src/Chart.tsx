import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { faker } from "@faker-js/faker";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
    // maintainAspectRatio: false, // this is to customize height and width
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Population by Division",
    },
  },
};

const labels = [
  "Genesis Cinema",
  "Gentec",
  "Genesis Port Harcourt Hotels",
  "The Sojourner",
  "Genesis Center",
  "Property and Investment",
  "Genesis F&B",
  "Genesis Restaurant",
  "Genesis Catering",
  "Genesis Group",
  "Industrial Catering",
  "Trans-Amadi",
];

const generateBrightColor = () => {
  const r = Math.floor(Math.random() * 156) + 100; // Generate values between 100 and 255 for red
  const g = Math.floor(Math.random() * 156) + 100; // Generate values between 100 and 255 for green
  const b = Math.floor(Math.random() * 156) + 100; // Generate values between 100 and 255 for blue
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
};
const divisionBackgroundColors: string[] = [];

labels.forEach(() => {
  let color;
  do {
    color = generateBrightColor();
  } while (divisionBackgroundColors.includes(color));
  divisionBackgroundColors.push(color);
});

const dataElements = labels.map((label, index) => ({
  label: label,
  data: Array.from({ length: labels.length }, () => faker.number.int({ min: 200, max: 400 })),
  backgroundColor: divisionBackgroundColors[index],
}));

export const data = {
  labels: ["staff"],
  datasets: [...dataElements]
};


// Gender
let doughnutLabels = [
  "Male",
  "Female"
];

const dataData = doughnutLabels.map(() =>
  faker.number.int({ min: 200, max: 1000 })
);

const backgroundColors: string[] = [];
const borderColors: string[] = [];

const generateGenderBrightColor = () => {
  const r = Math.floor(Math.random() * 156) + 100; // Generate values between 100 and 255 for red
  const g = Math.floor(Math.random() * 156) + 100; // Generate values between 100 and 255 for green
  const b = Math.floor(Math.random() * 156) + 100; // Generate values between 100 and 255 for blue
  return `rgba(${r}, ${g}, ${b}, 0.8)`;
};

doughnutLabels.forEach(() => {
  let color;
  do {
    color = generateGenderBrightColor();
  } while (backgroundColors.includes(color));
  backgroundColors.push(color);

  const borderColor = color.replace("0.2", "1");
  borderColors.push(borderColor);
});

console.log(borderColors);

export const DoughnutData = {
  labels: doughnutLabels,
  datasets: [
    {
      label: "Population By Gender",
      data: dataData,
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1,
    },
  ],
};
const Chart = () => {
  return (
    <div className="flex gap-10 text-white h-[500px] w-[700px]">
      <Bar options={options} data={data} width={500} height={500} />
      <Doughnut data={DoughnutData} />
    </div>
  );
};

export default Chart;
