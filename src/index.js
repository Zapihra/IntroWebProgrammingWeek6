import "./styles.css";
import { Chart } from "frappe-charts/dist/frappe-charts.min.esm"
const fetchButton = document.getElementById("submit-data");

const getData = async(code) => {
  const url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px";
  //console.log(code);

  if (code == null || code == undefined) {
    code = "SSS";
  }

  const query = {
    "query": [
        {
            "code": "Vuosi",
            "selection": {
                "filter": "item",
                "values": [
                    "2000",
                    "2001",
                    "2002",
                    "2003",
                    "2004",
                    "2005",
                    "2006",
                    "2007",
                    "2008",
                    "2009",
                    "2010",
                    "2011",
                    "2012",
                    "2013",
                    "2014",
                    "2015",
                    "2016",
                    "2017",
                    "2018",
                    "2019",
                    "2020",
                    "2021"
                ]
            }
        },
        {
            "code": "Alue",
            "selection": {
                "filter": "item",
                "values": [
                    code
                ]
            }
        },
        {
            "code": "Tiedot",
            "selection": {
                "filter": "item",
                "values": [
                    "vaesto"
                ]
            }
        }
    ],
    "response": {
        "format": "json-stat2"
    }
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {"content-type": "application/json"},
    body: JSON.stringify(query)
  });
  if(!res.ok) {
    return;
  }
  const data = await res.json();
  
  return data;

  
}

const buildChart = async (municipality) => {
  let code;
  if (municipality != null || municipality != undefined) {
    code = await municipalityCheck(municipality);
  }
  
  const data = await getData(code);

  const labels = Object.values(data.dimension.Vuosi.category.label);
  const population = data.value; 
  const theData = [];
  theData[0] = {
    name: "population",
    values: population
  }

  const chartData = {
    labels: labels,
    datasets: theData
  }
  
  const chart = new frappe.Chart("#chart", {
    title: "Finnish population",
    data: chartData,
    type: 'line', 
    height: 450,
    colors: ['#eb5146']
  });
}

const municipalityCheck = async(municipality) => {
  const resp = await fetch("https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/synt/statfin_synt_pxt_12dy.px", 
  {method: "GET"});
  if(!resp.ok) {
    return;
  }
  const dataset = await resp.json();

  const candidates = dataset.variables[1].valueTexts;
  let code;

  for (let i = 0; i < candidates.length; i++) {
    if (municipality.toLowerCase() == candidates[i].toLowerCase()) {
       code = dataset.variables[1].values[i];
      break;
    }
  }
  
  return code;
}

fetchButton.addEventListener("click", () => {
  const municipality = document.getElementById("input-area").value;
  
  buildChart(municipality);

  event.preventDefault();
})



buildChart();



