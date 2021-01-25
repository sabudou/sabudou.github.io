function Metadata(id) {
    d3.json("samples.json").then((data) => {
               
        var select = data.samples.filter(sample => sample.id === id)[0];               
        var values = select.sample_values.slice(0, 10).reverse();
        var otuids = select.otu_ids.map(otuid => `OTU ${otuid}`).slice(0, 10).reverse();        
        var trace1 = {
            x: values,
            y: otuids,            
            type: "bar",
            orientation: "h",
        };
        var one = [trace1];
        var barchart = {
            title: "OTU",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };
        Plotly.newPlot("bar", one, barchart);

        var tracer = {
            x: select.otu_ids,
            y: select.sample_values,
            mode: "markers",
            marker: {
                size: select.sample_values,
                color: select.otu_ids
            },
            text: select.otu_labels
        };
        var bubblechart = {
            xaxis: {
                title: "ID"
            },
            height: 600,
            width: 1000
        };
        var two = [tracer];
        Plotly.newPlot("bubble", two, bubblechart);
    })
};
function optionChanged(id) {
    Metadata(id);
    chart(id);    
}
function chart(id) {
    d3.json("samples.json").then((data) => {
        var selectMetadata = data.metadata.filter(sample => sample.id === id)[0];        
        var sampleMet = d3.select("#sample-metadata");
        sampleMet.html("");
        Object.entries(selectMetadata).forEach(function ([key, value]) {
            var row = sampleMet.append("tbody");
            row.text(`${key}: ${value}`);
        })

    })
}
function init() {
    var dropdown = d3.select("#selDataset");    
    d3.json("samples.json").then((data) => {
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        Metadata(data.names[0]);
        chart(data.names[0]);        
    });
}
init();
