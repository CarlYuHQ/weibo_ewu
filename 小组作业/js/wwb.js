//全部加载完之后运行
document.addEventListener("DOMContentLoaded", locationVisualize())
// 声明一个全局变量data

var satndpointData;

//读取CSV文件并将数据存储在全局变量中
d3.csv("data/attitude.csv").then(function (csvData) {
    // 将读取的数据赋值给全局变量data
    satndpointData = csvData;

    // 在这里可以对数据进行处理或者其他操作
    //console.log("Data loaded:", data);

    dataManipulation();
});
document.getElementById('update-lg').addEventListener('click', function () {
    // 清除旧的SVG元素
    d3.select("#location-graph-ip-img").selectAll("svg").remove();
    d3.select("#location-graph-ip-img").selectAll("li").remove();
    d3.select("#location-graph-ip-img").selectAll("span").remove();
    // 重新调用函数
    locationVisualize();
});

function locationVisualize() {
    const margin = {top: 10, right: 30, bottom: 10, left: 30},
        width = 950 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;
    //console.log(1);
    //console.log(width);
    var projection = d3.geoMercator()
        .center([107, 31])
        .scale(600)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);
    //console.log(0.5);
    d3.json("data/china.geo.json").then(function (root) {
        // console.log(1)
        var svg = d3.select("#location-graph-ip-img")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("transform", `translate(${margin.left},${margin.top})`);
        //.attr("transform", `translate(${margin.left},${margin.top})`);

        var groups = svg.append("g");
        //console.log(2)
        d3.csv("data/result.csv").then(function (data) {
            //console.log(3);
            var attitudes = ["支持", "反对", "中立"];
            var dominantAttitudes = {};

            data.forEach(function (d) {
                var ip = d.ip;
                if (!dominantAttitudes[ip]) {
                    dominantAttitudes[ip] = {};
                    attitudes.forEach(function (attitude) {
                        dominantAttitudes[ip][attitude] = 0;
                    });
                }
                dominantAttitudes[ip][d.态度] = +d.rate;
            });
            //console.log(dominantAttitudes);
            groups.selectAll("path")
                .data(root.features)
                .enter().append("path")
                .style("fill", function (d) {
                    var ip = d.properties.name;
                    var attitudeData = dominantAttitudes[ip];
                    var supportPercentage = attitudeData["支持"];
                    var oppositionPercentage = attitudeData["反对"];
                    var neutralPercentage = attitudeData["中立"];
                    if (supportPercentage > oppositionPercentage && supportPercentage > neutralPercentage) return "green";
                    else if (oppositionPercentage > supportPercentage && oppositionPercentage > neutralPercentage) return "orange";
                    else return "#ffdbff";
                })
                .attr("d", path).attr('stroke', 'black')
                .on("click", function (event, d) {
                    var ip = d.properties.name;
                    var percentages = dominantAttitudes[ip];
                    showTooltip(event, ip, percentages);
                });

            var legend = d3.select("#location-legend")
                .append("ul")
                .attr("class", "location-legend")
                .selectAll("li")
                .data(["支持乌克兰", "中立", "支持俄罗斯"])
                .enter().append("li")
                .on("click", function (event, d) {
                    updateMap(d);
                });

            legend.append("span")
                .style("background-color", function (d) {
                    if (d === "中立") return "#ffdbff";
                    else if (d === "支持乌克兰") return "orange";
                    else if (d === "支持俄罗斯") return "green";
                });

            legend.append("span").attr("class", "location-label").style("width", "90px").style("height", "20px").text(function (d) {
                return d;
            });

            function updateMap(selectedAttitude) {
                groups.selectAll("path")
                    .data(root.features)
                    .style("fill", function (d) {
                        var ip = d.properties.name;
                        var attitudeData = dominantAttitudes[ip];
                        var supportPercentage = attitudeData["支持"];
                        var oppositionPercentage = attitudeData["反对"];
                        var neutralPercentage = attitudeData["中立"];
                        if (selectedAttitude) {
                            if (selectedAttitude === "支持俄罗斯") {
                                return supportPercentage > oppositionPercentage && supportPercentage > neutralPercentage ? "green" : "none";
                            } else if (selectedAttitude === "支持乌克兰") {
                                return oppositionPercentage > supportPercentage && oppositionPercentage > neutralPercentage ? "orange" : "none";
                            } else if (selectedAttitude === "中立") {
                                return neutralPercentage > supportPercentage && neutralPercentage > oppositionPercentage ? "#ffdbff" : "none";
                            }
                        } else {
                            return "#ffdbff";
                        }
                    });
            }

            function showTooltip(event, province, percentages) {
                var tooltip = d3.select("#location-graph-ip-img").append("div")
                    .attr("class", "location-tooltip")
                    .style("opacity", 0);

                var supportPercentage = (percentages["支持"] * 100).toFixed(2) + "%";
                var oppositionPercentage = (percentages["反对"] * 100).toFixed(2) + "%";
                var neutralPercentage = (percentages["中立"] * 100).toFixed(2) + "%";

                tooltip.transition()
                    .duration(100)
                    .style("opacity", .8);
                tooltip.html("<b>" + province + "</b><br>支持: " + supportPercentage + "<br>反对: " + oppositionPercentage + "<br>中立: " + neutralPercentage)
                    .style("left", (event.pageX) + "px")
                    .style("top", (event.pageY - 28) + "px");

                setTimeout(function () {
                    tooltip.transition()
                        .duration(300)
                        .style("opacity", 0);
                }, 1000);
            }
        });
    }).catch(function (error) {
        console.error("Failed to load or parse JSON data:", error);
    })
};

function dataManipulation() {

    var useData = satndpointData;
    // 获取选择框的值
    //console.log(useData);
    var selectedArea = document.getElementById("standpoint-area").value;
    // 按照选择的类别筛选景点数据
    var filteredData;
    // 否则，只显示符合选择类别的景点
    filteredData = useData.filter(function (data) {
        return data.阶段 === selectedArea;
    });
    //画图更新
    renderPieChart(filteredData);
    analyzeData(filteredData);
};

function renderPieChart(data) {
    // 清空SVG容器,保证原图更新饼图
    d3.select("#standpoint-img").select("svg").remove();

    // 设置饼图的数据
    // 设置SVG容器的宽度和高度
    var width = 450;
    var height = 300;

    // 创建SVG容器
    var svg = d3.select("#standpoint-img")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    // 设置饼图的半径
    var radius = Math.min(width, height) / 2;

    // 创建一个g元素，并将它定位在SVG容器的中心
    var g = svg.append("g")
        .attr("transform", "translate(" + width / 1.5 + "," + height / 2 + ")");

    // 创建颜色比例尺
    var color = d3.scaleOrdinal()
        .domain(["反对", "中立", "支持"])
        .range(["orange", "#ffdbff", "green"]);

    // 创建一个饼图生成器
    var pie = d3.pie()
        .value(function (d) {
            return d.count;
        });

    // 生成饼图的路径
    var path = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    // 为每个数据点绘制饼图路径
    var arc = g.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    arc.append("path")
        .attr("d", path)
        .attr("fill", function (d) {
            return color(d.data.态度);
        });

    // 在饼图中心添加标签
    arc.append("text")
        .attr("transform", function (d) {
            var centroid = path.centroid(d);
            var x = centroid[0];
            var y = centroid[1];
            // 将标签稍微偏移
            var labelX = x + (centroid[0] > 0 ? 10 : -10);
            var labelY = y + (centroid[1] > 0 ? 30 : -30);
            return "translate(" + labelX + "," + labelY + ")";
        })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .style("fill", "#333") // Set text color
        .style("font-size", "16px") // Set font size
        .text(function (d) {
            // 计算百分比
            var percentage = (d.data.count / d3.sum(data, function (d) {
                return d.count;
            })) * 100;
            return percentage.toFixed(1) + "%";
        });

    // 添加图例
    var legend = svg.selectAll(".legend")
        .data(color.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            // 将图例放置在图的右侧
            var x = width - 400; // 图例距离右侧的距离
            var y = i * 80 + 40; // 图例之间的垂直间距
            return "translate(" + x + "," + y + ")";
        });

    legend.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", color);

    legend.append("text")
        .attr("x", 24)
        .attr("y", 10)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .style("font-family", 'SimSun')
        .style("fill", "#333")
        .style("font-size", "16px")
        .text(function (d) {
            if (d == "支持") {
                return "支持俄罗斯"
            } else if (d == "中立") {
                return "中立"
            } else if (d == "反对") {
                return "支持乌克兰"
            }
        });
}

function analyzeData(data) {
    useData = data;
    againstData = useData.filter(function (data) {
        return data.态度 === "反对";
    });
    supportData = useData.filter(function (data) {
        return data.态度 === "支持";
    });
    mediaData = useData.filter(function (data) {
        return data.态度 === "中立";
    });
    //console.log("这里是试验:"+againstData);
    againstReason = againstData[0].微博正文;
    supportReason = supportData[0].微博正文;
    mediaReason = mediaData[0].微博正文;
    console.log(againstReason);
    totalPerson = data[0].总数量;
    againstPerson = againstData[0].count;
    supportPerson = supportData[0].count;
    mediaPerson = mediaData[0].count;

    //console.log(mediaPerson);
    /*const summaryHTML = `
<p>这个阶段的总共使用了${totalPerson}人数据</p>
<p>在这个阶段，总共有${againstPerson}人支持乌克兰</p>
<p>在这个阶段，总共有${supportPerson}人支持俄罗斯</p>
<p>在这个阶段，总共有${mediaPerson}人保持中立</p>

`;*/
    //console.log(againstReason);
    const againstHTML = "<h2 style='font-family: SimSun;'>微博示例:支持乌克兰</h2>" +
        `<p style='margin-top: 5px;
    line-height: 25px;
    font-size: 15px;
    font-family: SimSun;
    text-align: left;'>\u00A0\u00A0${againstReason}</p>`;
    const supporttHTML = "<h2 style='font-family: SimSun;'>微博示例：支持俄罗斯</h2>" + `
 <p style='margin-top: 5px;
    line-height: 25px;
    font-size: 15px;
    font-family: SimSun;
    text-align: left;'>\u00A0\u00A0${supportReason}</p>
`;
    const mediaHTML = "<h2 style='font-family: SimSun;'>微博示例：中立态度</h2>" + `
 <p style='margin-top: 5px;
    line-height: 25px;
    font-size: 15px;
    font-family: SimSun;
    text-align: left;'>\u00A0\u00A0${mediaReason}</p>
`;
    // 将HTML内容设置为summaryDiv的innerHTML
    document.getElementById('standpoint-text-1').innerHTML = againstHTML
    // 将HTML内容设置为summaryDiv的innerHTML
    document.getElementById('standpoint-text-2').innerHTML = supporttHTML
    document.getElementById('standpoint-text-3').innerHTML = mediaHTML
    //document.getElementById('standpoint-summary').innerHTML = summaryHTML
}