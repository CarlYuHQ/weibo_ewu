// SVG drawing area
var margin_cn = {top: 40, right: 10, bottom: 60, left: 60};
var width_cn = 1300 - margin_cn.left - margin_cn.right,
    height_cn = 1000 - margin_cn.top - margin_cn.bottom;

var svg_cn = d3.select("#country-name-img").append("svg")
    .attr("width", width_cn + margin_cn.left + margin_cn.right)
    .attr("height", height_cn + margin_cn.top + margin_cn.bottom);
var colorScale = d3.scaleSequential(d3.interpolateReds);

// 创建一个颜色比例尺的轴
var colorAxis = d3.axisBottom()
    .scale(colorScale)
    .tickSize(13)
    .tickFormat(function (d) {
        return d;
    });

var data;
loadData()
// Load CSV file
// Load CSV file
function loadData() {
    d3.csv("data/name/data.csv")
        .then(function (csv) {
            csv.forEach(function (d) {
                d.weight = +d.weight;
            });

            // Store csv data in global variable
            data = csv;
            // 更新颜色比例尺的定义域
            var weightExtent = d3.extent(csv, function (d) {
                return d.weight;
            });
            colorScale.domain(weightExtent);

            // Draw the visualization for the first time
            drawVisualization();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function drawVisualization() {

    // 加载地理数据和权重数据
    console.log(data)
    // Load GeoJSON data

    // Define projection
    const projection = d3.geoEquirectangular()
        .scale(200)
        .translate([width_cn / 2, height_cn / 2.8]);

    // Create path generator
    const path = d3.geoPath()
        .projection(projection);

    // Load GeoJSON data
    d3.json("data/world.json").then(function (world) {
        console.log("GeoJSON data loaded:", world); // Debug: Log GeoJSON data
        // Check if features are present
        if (!world.features) {
            throw new Error("GeoJSON data does not contain features");
        }
        console.log("GeoJSON data loaded:", world)
        // Draw map
        var tooltip = d3.select("#tooltip");

        svg_cn.selectAll("path")
            .data(world.features)
            .enter().append("path")
            .attr("d", path)
            .attr("fill", function (d) {
                var country = data.find(function (c) {
                    return c.country === d.properties.name;
                });
                return country ? colorScale(country.weight) : "#ccc";
            })
            .attr("stroke", "black")
            .on('mouseover', function (event, d) {
                var country = data.find(function (c) {
                    return c.country === d.properties.name;
                });
                // 更新tooltip的内容
                tooltip.style("opacity", 1)
                    .html(country ? `<strong>Country:</strong> <span style='color:red'>${country.country}</span><br><strong>Weight:</strong> <span style='color:red'>${country.weight}</span>` : "No data")
                    .style("left", (event.pageX-120) + "px")
                    .style("top", (event.pageY - 120) + "px");
                // 改变当前国家的轮廓颜色
                d3.select(this).style("stroke", "red");
            })
            .on('mouseout', function () {
                tooltip.style("opacity", 0);
                // 恢复原来的轮廓颜色
                d3.select(this).style("stroke", "black");
            });
        ;


        // 在画布上添加颜色比例尺
        var defs = svg_cn.append("defs");
        var linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient");

        linearGradient.selectAll("stop")
            .data(colorScale.ticks().map((t, i, n) => ({offset: `${100 * i / n.length}%`, color: colorScale(t)})))
            .enter().append("stop")
            .attr("offset", d => d.offset)
            .attr("stop-color", d => d.color);

        svg_cn.append('rect')
            .attr('transform', `translate(450, ${height_cn - 400})`)
            .attr('width', 500)
            .attr('height', 10)
            .style('fill', 'url(#linear-gradient)');

        svg_cn.append("g")
            .attr("class", "color axis")
            .attr("transform", `translate(450, ${height_cn - 380})`)
            .call(d3.axisBottom(d3.scaleLinear().range([0, 500]).domain(colorScale.domain())));

        console.log("Map rendered successfully"); // Debug: Log successful rendering
    }).catch(function (error) {
        console.error("Error loading the GeoJSON data:", error);
    });
}

