// 定义一个空数组来存储数据
var data_pn = [];
var detailMap = {};
// SVG drawing area
var margin_pn = {top: 30, right: 10, bottom: 60, left: 60};
var width_pn = 1300 - margin_pn.left - margin_pn.right,
    height_pn = 1000 - margin_pn.top - margin_pn.bottom;
// 创建SVG画布
var svg_pn = d3.select("#person-name-img").append("svg")
    .attr("width", width_pn + margin_pn.left + margin_pn.right)
    .attr("height", height_pn + margin_pn.top + margin_pn.bottom);
// 创建一个对象来存储每个国家的颜色
var nationColor = {
    "美国": "#1f77b4",
    "俄罗斯": "#ff7f0e",
    "乌克兰": "#2ca02c",
    "法国": "#d62728",
    "英国": "#9467bd",
    "白俄罗斯": "#8c564b",
    "土耳其": "#e377c2",
    "德国": "#7f7f7f",
};
// 使用Promise.all()函数同时加载两个CSV文件
Promise.all([
    d3.csv("data/name/name_co.csv"),
    d3.csv("data/name/detail.csv")
]).then(function (files) {
    // files[0]将包含name_co.csv的数据，files[1]将包含detail.csv的数据
    var nameCoData = files[0];
    var detailData = files[1];
    detailData.forEach(function (row) {
        detailMap[row.name] = row;
    });
    // 处理name_co.csv中的数据
    var nodes = [];
    var links = [];
    nameCoData.forEach(function (row) {
        // 将每一行的数据转换为合适的格式，并添加到links数组中
        links.push({
            source: row["Name1"],
            target: row["Name2"],
            value: +row["Cooccurrence"]
        });
        // 将节点添加到节点数组中
        nodes.push(row["Name1"]);
        nodes.push(row["Name2"]);
    });
    // 去除节点数组中的重复项
    nodes = [...new Set(nodes)];
    nodes = nodes.map(function (node) {
        var detail = detailMap[node];
        return {
            id: node,
            nation: detail ? detail.nation : "未知",
            x: Math.random() * width_pn / 2,
            y: Math.random() * height_pn / 2
        };
    });

    // 将链接数组中的source和target属性转换为节点对象
    links = links.map(function (link) {
        return {
            source: nodes.find(function (node) {
                return node.id === link.source;
            }),
            target: nodes.find(function (node) {
                return node.id === link.target;
            }),
            value: link.value
        };
    });

    // 在这里调用绘制力导向图的函数
    drawForceDirectedGraph(nodes, links);
}).catch(function (error) {
    console.log("Error loading the CSV files:", error);
});

function drawForceDirectedGraph(nodes, links) {
    // 创建力导向图布局
    console.log(nodes)
    console.log(links)
    // 找到链接权重的最大值和最小值
    var minWeight = d3.min(links, function (d) {
        return d.value;
    });
    var maxWeight = d3.max(links, function (d) {
        return d.value;
    });

    // 创建一个颜色比例尺
    var colorScale = d3.scaleLinear()
        .domain([minWeight, maxWeight])
        .range(["lightblue", "darkblue"]);

    var simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(function (d) {
            return d.id;
        }).distance(150))
        .force("charge", d3.forceManyBody().strength(-500))
        .force("center", d3.forceCenter(width_pn / 2, height_pn / 2));

    // 添加连线
    var link = svg_pn
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke-width", 10)
        .attr("stroke", function (d) {
            return colorScale(d.value);
        });

    // 添加节点
    var node = svg_pn
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("r", 35) // 增加节点的半径
        .attr("fill", function (d) {
            return nationColor[d.nation]; // 使用国家颜色
        })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)).on("mouseover", function () { // 添加鼠标悬浮事件
            d3.select(this).attr("fill", "yellow"); // 改变节点颜色
        })
        .on("click", function(event, d) { // 添加点击事件
        // 创建和更新表格
        var table = d3.select("#table").html(""); // 清空表格
        var thead = table.append("thead");
        var tbody = table.append("tbody");
        // 添加表头
        thead.append("tr")
            .selectAll("th")
            .data(["Name", "Age", "Position", "Nation"])
            .enter().append("th")
            .text(function(column) { return column; });
        // 添加表格内容
        var row = tbody.append("tr");
        row.append("td").text(d.id);
        row.append("td").text(detailMap[d.id].age);
        row.append("td").text(detailMap[d.id].position);
        row.append("td").text(d.nation);
    })

        .on("mouseout", function () { // 添加鼠标移出事件
            d3.select(this).attr("fill", function (d) {
                return nationColor[d.nation]; // 使用国家颜色
            }); // 还原节点颜色
        });

    // 添加文本标签
    var labels = svg_pn
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("text-anchor", "middle")
        .attr("fill", "black")
        .attr("dominant-baseline", "central")
        .text(function (d) {
            return d.id;
        });

    // 创建力导向图布局

    // 添加力导向图的tick事件
    simulation.on("tick", ticked);

    function ticked() {
        link
            .attr("x1", function (d) {
                return d.source.x;
            })
            .attr("y1", function (d) {
                return d.source.y;
            })
            .attr("x2", function (d) {
                return d.target.x;
            })
            .attr("y2", function (d) {
                return d.target.y;
            });

        node
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            });

        labels
            .attr("x", function (d) {
                return d.x;
            })
            .attr("y", function (d) {
                return d.y;
            });
    }

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        simulation.alpha(1).restart();
    }

    // 创建一个g元素来放置图例
    var legend = svg_pn.append("g")
        .attr("transform", "translate(20,20)"); // 你可以根据需要调整这个值

// 为每个国家创建一个图例项
    var legendItem = legend.selectAll(".legendItem")
        .data(Object.entries(nationColor))
        .enter().append("g")
        .attr("class", "legendItem")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 30 + ")"; // 你可以根据需要调整这个值
        });

// 在每个图例项中添加一个矩形来表示颜色
    legendItem.append("rect")
        .attr("width", 20) // 增大矩形的宽度
        .attr("height", 20) // 增大矩形的高度
        .attr("fill", function (d) {
            return d[1]; // 使用国家颜色
        });

// 在每个图例项中添加一个文本标签来表示国家名称
    legendItem.append("text")
        .attr("x", 25) // 增大文本标签的x坐标
        .attr("y", 15) // 增大文本标签的y坐标
        .style("font-size", "20px") // 增大字体大小
        .text(function (d) {
            return d[0]; // 使用国家名称
        });


    // 创建一个比例尺
    var x = d3.scaleLinear()
        .domain([minWeight, maxWeight])
        .rangeRound([0, 600]);

    // 创建一个颜色比例尺
    var colorScale = d3.scaleLinear()
        .domain([minWeight, maxWeight])
        .range(["lightblue", "darkblue"]);

    // 在SVG中添加一个g元素来放置比例尺
    var g = svg_pn.append("g")
        .attr("transform", "translate(400," + (height_pn + margin_pn.top - 40) + ")");

    // 在g元素中添加一个长条
    g.append("rect")
        .attr("width", 600)
        .attr("height", 20)
        .style("fill", "url(#gradient)");

    // 在g元素中添加一个比例尺
    g.call(d3.axisBottom(x).tickSize(13).tickValues(colorScale.domain()))
        .select(".domain")
        .remove();

    // 设置字体大小
    g.selectAll("text")
        .style("font-size", "15px")
        .attr("dy", "2em"); // 你可以根据需要调整这个值; // 你可以根据需要调整这个值


    // 定义一个线性渐变
    var linearGradient = svg_pn.append("defs")
        .append("linearGradient")
        .attr("id", "gradient");

// 定义渐变的开始颜色
    linearGradient.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "lightblue");

// 定义渐变的结束颜色
    linearGradient.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "darkblue");


    link.on("mouseover", function (event, d) { // 添加鼠标悬浮事件
        d3.select(this).attr("stroke", "lightcoral"); // 改变连线颜色
        // 显示权重
        var coords = d3.pointer(event);
        svg_pn.append("text")
            .attr("id", "linkinfo") // 添加id，用于后面的删除
            .attr("x", coords[0] + 10)
            .attr("y", coords[1] + 10)
            .attr("fill", "red") // 设置字体颜色为白色
            .attr("stroke", "red") // 添加黑色描边
            .text(d.value);
    })
        .on("mouseout", function () { // 添加鼠标移出事件
            d3.select(this).attr("stroke", function (d) {
                return colorScale(d.value);
            }) // 还原连线颜色
            d3.select("#linkinfo").remove(); // 删除权重信息
        });

}
