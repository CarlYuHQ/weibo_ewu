// 当文档内容完全加载后执行以下函数
document.addEventListener("DOMContentLoaded", updateTimeSeriesImg)
document.addEventListener("DOMContentLoaded", updataWordcloudImgs)

// 生成时间序列面积图（文档加载时、点击按钮时调用）
function updateTimeSeriesImg() {
    // 获取日期选择器中的开始和结束日期
    const startDate = new Date(document.getElementById('startDatePicker').value);
    const endDate = new Date(document.getElementById('endDatePicker').value);
    // 定义图表的边距、宽度和高度
    const margin = { top: 80, right: 90, bottom: 80, left: 80 },
        width = 950 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    // 获取鼠标位置
    bisectDate = d3.bisector(function (d) { return d.date; }).left;

    // 创建横向网格线
    function gridline(scale) {
        return d3.axisLeft(scale)
            .tickSize(-width, 0, 0) // 网格线与x轴平行，延伸整个图表宽度
            .tickFormat("") // 不显示刻度标签
    }


    // 定义日期解析器和x、y轴的比例尺
    const parseDate = d3.timeParse("%Y/%m/%d");
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);
    const formatNumber = d3.format(",");
    const formatDate = d3.timeFormat("%Y/%m/%d");

    // 定义面积生成器，并设置x、y0和y1的访问器
    const area = d3.area()
        .x(d => x(d.date))
        .y0(height)
        .y1(d => y(d.count));
    // 清除原有SVG元素
    d3.select("#time-series-img").selectAll("svg").remove();

    // 选择SVG元素，并设置其宽度、高度和内部g元素的变换
    const svgArea = d3.select("#time-series-img")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // 读取CSV文件，并在加载完成后执行回调函数
    d3.csv("data/daily_counts.csv").then(function (data) {
        
        // 对数据进行预处理，将日期和数量转换为合适的格式
        data.forEach(d => {
            d.date = parseDate(d.date);
            d.count = +d.count;
        });
        // 过滤数据，只保留在指定日期范围内的数据
        data = data.filter(d => d.date >= startDate && d.date <= endDate);

        // 设置x、y轴的比例尺的定义域
        x.domain(d3.extent(data, d => d.date));
        y.domain([0, d3.max(data, d => d.count)]);

        // 添加横向网格线到面积图
        svgArea.append("g")
            .attr("class", "grid")
            .call(gridline(y))
            .attr("stroke-opacity", 0.2);

        var lineSvg = svgArea.append("g");

        var focus = svgArea.append("g")
            .style("display", "none");

        // 在SVG中添加路径元素，使用面积图
        lineSvg.append("path")
            .datum(data)
            .attr("class", "area")
            .attr("d", area)
            .attr("fill", "#8A91FF")
            .attr("stroke", "#585DA3")
            .style("opacity", 0.8)
            .attr("stroke-width", 1.5);

        // 添加纵向提示线
        focus.append("line")
            .attr("class", "x")
            .style("stroke", "black")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5)
            .attr("y1", 0);

        // 添加横向提示线
        focus.append("line")
            .attr("class", "y")
            .style("stroke", "black")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.5);

        // 添加圆点
        focus.append("circle")
            .attr("class", "y")
            .style("fill", "#242642")
            .attr("r", 4);

        // 添加人口文本
        focus.append("text")// 白色边框
            .attr("class", "y1")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", 8);
        focus.append("text")// 黑色文本
            .attr("class", "y2")
            .attr("dx", 8)
            .attr("dy", 8);

        // 添加日期文本
        focus.append("text")// 白色边框
            .attr("class", "y3")
            .style("stroke", "white")
            .style("stroke-width", "3.5px")
            .style("opacity", 0.8)
            .attr("dx", 8)
            .attr("dy", -8);
        focus.append("text")// 黑色文本
            .attr("class", "y4")
            .attr("dx", 8)
            .attr("dy", -8);

        // 添加鼠标事件监听器
        svgArea.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", function () { focus.style("display", null); })
            .on("mouseout", function () { focus.style("display", "none"); })
            .on("mousemove", function () {
                // 获取鼠标位置，并更新提示线
                var x0 = x.invert(d3.pointer(event)[0]),
                    i = bisectDate(data, x0, 1),
                    d0 = data[i - 1],
                    d1 = data[i],
                    d = x0 - d0.date > d1.date - x0 ? d1 : d0;
                // 整体更新位置
                focus.attr("transform",
                    "translate(" + x(d.date) + "," +
                    y(d.count) + ")");

                focus.select("text.y1").text("微博数量：" + formatNumber(d.count));

                focus.select("text.y2").text("微博数量：" + formatNumber(d.count));

                focus.select("text.y3").text("日期：" + formatDate(d.date));

                focus.select("text.y4").text("日期：" + formatDate(d.date));

                focus.select("line.x").attr("y2", height - y(d.count));

                focus.select("line.y").attr("x1", width - x(d.date)).attr("x2", -x(d.date));
                // 当鼠标位置过于靠右时，将文本显示在左侧
                if (x(d.date) > width*3 / 4) {
                    focus.select("text.y1").attr("dx", -140);
                    focus.select("text.y2").attr("dx", -140);
                    focus.select("text.y3").attr("dx", -140);
                    focus.select("text.y4").attr("dx", -140);
                }else {
                    focus.select("text.y1").attr("dx", 8);
                    focus.select("text.y2").attr("dx", 8);
                    focus.select("text.y3").attr("dx", 8);
                    focus.select("text.y4").attr("dx", 8);
                }
            });

        markEvent('2022-02-24','2022年2月24日 俄罗斯宣布对乌特别军事行动','data/22-02-24.webp','2022年2月24日，普京宣布在顿巴斯地区进行特别军事行动。乌克兰总统泽连斯基发表讲话说，乌克兰全境进入战时状态。随后，泽连斯基宣布与俄罗斯断交。（图为2022年2月24日的乌克兰基辅的街景。图/新华社）');
        markEvent('2023-02-23','2023年2月24日 联大通过“和平公式”决议草案','data/23-02-23.jpg','当地时间2月23日，联合国大会继续就乌克兰局势召开紧急特别会议。在当天的会议上，联大以141票赞成，7票反对，32票弃权的结果通过了包括乌克兰在内的75国共同提交的“和平公式”决议草案。该草案强调在乌克兰寻求符合《联合国宪章》宗旨和原则的全面、公正与持久和平的紧迫性。');
        markEvent('2024-02-23','2024年2月24日 美国宣布对俄“毁灭性”制裁','data/24-02-23.jpeg','俄乌冲突爆发两周年之际，美国总统拜登23日宣布对俄罗斯实施新一轮500多项制裁措施，以加大向莫斯科施压。欧盟和英国也加入新一轮对俄制裁的队伍中。美国代理常务副国务卿维多利亚·纽兰宣称，美国和欧盟对俄罗斯实施的新制裁将是“毁灭性的”，并将给俄方针对现有制裁的规避行为制造障碍。');
        function markEvent(dateStr, title, img_url, text) {
            // 指定重要事件的日期
            var eventDate = new Date(dateStr); // 用你的实际日期替换这里

            // 确定竖线在x轴上的位置
            var eventXPosition = x(eventDate);

            // 添加竖线
            svgArea.append('line')
                .attr('class', 'event-line') // 添加类名以便样式设置
                .attr('x1', eventXPosition)
                .attr('y1', y.range()[0]) // 竖线起始于y轴的最底部
                .attr('x2', eventXPosition)
                .attr('y2', y.range()[1]) // 竖线结束于y轴的最顶部
                .style('stroke', 'black') // 设置竖线颜色
                .style('stroke-width', '5px')
                .style('stroke-dasharray', '15, 10')
                .style('opacity', 0.5)
                .on('mouseover', function () {
                    // 鼠标经过时，显示提示框
                    d3.select(this).style('opacity', 1);

                    var newstitle = document.getElementById('news-title');
                    var newsImg = document.getElementById('news-img');
                    var newsText = document.getElementById('news-text');

                    // 更新标题（替换为您想要的新标题）
                    newstitle.textContent = title;
                    // 更新图片链接（替换为您想要的新链接）
                    newsImg.src = img_url;
                    // 更新文本内容（替换为您想要显示的新文本）
                    newsText.textContent = text;
                })
                .on('mouseout', function () {
                    // 鼠标离开时，隐藏提示框
                    d3.select(this).style('opacity', 0.5);
                });
        }

        // 自定义一个函数来计算合适的刻度间隔
        function calculateTickInterval(xScale) {
            // 获取x轴的时间范围
            const rangeStart = xScale.domain()[0];
            const rangeEnd = xScale.domain()[1];

            // 计算时间范围的总长度（以月为单位）
            const totalMonths = d3.timeMonth.count(rangeStart, rangeEnd);

            // 如果时间范围小于12个月，则使用以日为单位的刻度
            if (totalMonths < 6) {
                // 计算时间范围的总长度（以日为单位），并确定合适的日间隔
                const totalDays = d3.timeDay.count(rangeStart, rangeEnd);
                var intervalDays = Math.ceil(totalDays / 12);
                return d3.timeDay.every(intervalDays);
            } else {
                // 如果时间范围大于等于12个月，则使用以月为单位的刻度
                let intervalMonths = Math.ceil(totalMonths / 12);
                if (intervalMonths < 1) {
                    intervalMonths = 1;
                }
                return d3.timeMonth.every(intervalMonths);
            }
        }

        // 添加x轴，并进行相关设置
        const xAxis = d3.axisBottom(x)
            .ticks(calculateTickInterval(x)) // 使用自定义的刻度间隔计算函数
            .tickFormat(d => (d3.timeMonth.count(x.domain()[0], x.domain()[1]) < 6) ?
                d3.timeFormat("%m-%d")(d) : // 如果时间范围小于6个月，格式化日期显示为“年-月-日”
                d3.timeFormat("%Y-%m")(d));    // 否则显示为“年-月”

        // 旋转刻度标签
        svgArea.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis)
            .selectAll(".tick text")
            .style("text-anchor", "end")  // 使得文本旋转后对齐
            .attr("dx", "-.8em")  // 调整文本位置
            .attr("dy", ".15em")  // 调整文本位置
            .attr("transform", "rotate(-45)"); // 旋转文本

        // 添加y轴
        svgArea.append("g")
            .call(d3.axisLeft(y));

        // 添加横轴（底部）标题
        svgArea.append("text")
            .attr("transform", `translate(${width / 2},${height + margin.top - 10})`)
            .style("text-anchor", "middle")
            .text("发布时间");

        // 添加纵轴（左侧）标题
        svgArea.append("text")
            .attr("transform", `translate(-55,${height / 2}) rotate(-90)`)
            .style("text-anchor", "middle")
            .text("微博数量");

    }).catch(function (error) { // 文件读取错误
        console.error("Error reading CSV:", error);
    });
}

function updataWordcloudImgs() {
    // 获取日期选择器中的开始和结束日期
    const startRank = document.getElementById('startRankPicker').value;
    // 清除现有词云图
    d3.select("#word-cloud-img").selectAll(".word-cloud").select("svg").remove();
    d3.select("#word-cloud-img").selectAll(".word-cloud").select("p").remove();
    d3.select("#word-cloud-img").selectAll(".word-cloud").select("p").remove();
    // 加载数据，并绘制词云图
    d3.csv("data/词频统计/word_frequency_1.csv").then(function (data) { updataWordcloudImg(data, startRank, 1, "俄方全面进攻时期", "2022.2.24-2022.3.31") }).catch(function (error) {
        console.error("Error loading the CSV file: " + error.message);
    });
    d3.csv("data/词频统计/word_frequency_2.csv").then(function (data) { updataWordcloudImg(data, startRank, 2, "俄方乌东攻势时期", "2022.4.1-2022.8.31") }).catch(function (error) {
        console.error("Error loading the CSV file: " + error.message);
    });
    d3.csv("data/词频统计/word_frequency_3.csv").then(function (data) { updataWordcloudImg(data, startRank, 3, "乌方全面反攻时期", "2022.9.1-2022.10.31") }).catch(function (error) {
        console.error("Error loading the CSV file: " + error.message);
    });
    d3.csv("data/词频统计/word_frequency_4.csv").then(function (data) { updataWordcloudImg(data, startRank, 4, "俄乌双方僵持时期", "2022.11.1-2022.12.31") }).catch(function (error) {
        console.error("Error loading the CSV file: " + error.message);
    });
    d3.csv("data/词频统计/word_frequency_5.csv").then(function (data) { updataWordcloudImg(data, startRank, 5, "2024年以来", "2024.1.1-2024.5.14") }).catch(function (error) {
        console.error("Error loading the CSV file: " + error.message);
    });
}

function updataWordcloudImg(data, startRank, index, title, timeperiod) {
    var words = data
        .map(d => ({ text: d.word, count: parseInt(d.count, 10) }))
        .sort((a, b) => b.count - a.count)
        .slice(startRank - 1, 29 + parseInt(startRank));

    const maxCount = Math.max(...words.map(d => d.count));
    const minCount = Math.min(...words.map(d => d.count));

    const fontSizeScale = d3.scaleLinear()
        .domain([minCount, maxCount])
        .range([10, 35]);

    const width = 230, height = 180;
    const word_cloud_div = d3.select("#word-cloud-img").select("#word-cloud-" + index);

    const svg = word_cloud_div.append("svg")
        .attr("width", width)
        .attr("height", height);

    word_cloud_div.append("p")
        .text(title)
        .style("font-size", "15px")
        .style("margin", "0");

    word_cloud_div.append("p")
        .text(timeperiod)
        .style("font-size", "15px")
        .style("margin", "0");

    const simulation = d3.forceSimulation(words)
        .velocityDecay(0.6)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX(width / 2).strength(0.05))
        .force("y", d3.forceY(height / 2).strength(0.05))
        .force("collide", d3.forceCollide((d) => fontSizeScale(d.count) * 1.3).strength(0.8))
        .on("tick", ticked);

    // 预定义的颜色数组
    const colors = ['#6F88FF', '#7EFFB1', '#FFE982', '#84C5FF', '#9175FF'];

    // 生成随机颜色的函数
    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * colors.length);
        return colors[randomIndex];
    }

    //更新文本节点
    function ticked() {
        const nodes = svg.selectAll("text")
            .data(words, d => d.text);

        nodes.enter()
            .append("text")
            .text(d => d.text)
            .attr("font-size", d => fontSizeScale(d.count))
            .attr("text-anchor", "middle")
            .style("fill", getRandomColor)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        nodes
            .attr("x", d => d.x = Math.max(fontSizeScale(d.count), Math.min(width - fontSizeScale(d.count), d.x)))
            .attr("y", d => d.y = Math.max(fontSizeScale(d.count), Math.min(height - fontSizeScale(d.count), d.y)));

        nodes.exit().remove();
    }

    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
    }
}