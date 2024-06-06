themeRiver()
function themeRiver() {
    var selectBox = document.getElementById("theme-river-select");
    var value = selectBox.options[selectBox.selectedIndex].value;
    if (value == '俄方全面进攻') {
        var keywords0 = 'Topic 0: 俄罗斯 美国 中国 国家 制裁 乌克兰 战争 西方 欧洲 一个 没有 世界 欧盟 可能 已经 现在 经济';
        var keywords1 = 'Topic 1: 乌克兰 俄罗斯 视频 表示 美国 总统 局势 北约 谈判 微博 中国 新闻 拜登 问题 时间 报道 普京';
        var keywords2 = 'Topic 2: 全球 价格 影响 上涨 供应 出口 俄罗斯 油价 市场 美元 进口 乌克兰 小麦 能源 经济 需求 国际';
        var keywords3 = 'Topic 3: 市场 影响 指数 板块 预期 经济 投资 加息 黄金 公司 下跌 继续 风险 资金 可能 增长 股市';
    } else if (value == '俄方乌东攻势') {
        var keywords0 = 'Topic 0: 中国 美国 国家 俄罗斯 世界 一个 问题 西方 日本 经济 没有 国际 台湾 印度 发展 可能 全球';
        var keywords1 = 'Topic 1: 乌克兰 俄罗斯 俄军 视频 泽连斯基 局势 微博 西方 战争 乌军 表示 已经 普京 没有 地区 国家';
        var keywords2 = 'Topic 2: 美国 俄罗斯 乌克兰 北约 欧盟 欧洲 制裁 表示 拜登 德国 国家 视频 天然气 英国 总统 报道 ';
        var keywords3 = 'Topic 3: 市场 全球 经济 影响 价格 增长 出口 通胀 疫情 上涨 预期 公司 粮食 持续 美元 国内 需求 能源 ';
    } else if (value == '乌方全面反攻') {
        var keywords0 = 'Topic 0: 俄罗斯 乌克兰 美国 俄军 战争 没有 一个 已经 西方 可能 现在 乌军 地区 国家 武器 局势 进行 ';
        var keywords1 = 'Topic 1: 俄罗斯 乌克兰 普京 国家 北约 中国 表示 西方 视频 总统 微博 美国 德国 局势 报道 结束 新闻 ';
        var keywords2 = 'Topic 2: 市场 经济 中国 全球 欧洲 美元 美国 影响 增长 价格 通胀 能源 加息 持续 国内 企业 今年 公司 ';
        var keywords3 = 'Topic 3: 欧洲 俄罗斯 天然气 美国 德国 欧盟 能源 北溪 英国 管道 国家 表示 报道 制裁 法国 拜登 可能 ';
    } else if (value == '俄乌僵持') {
        var keywords0 = 'Topic 0: 美国 中国 国家 俄罗斯 战争 一个 世界 问题 欧洲 没有 西方 现在 国际 已经 和平 政治 发展 ';
        var keywords1 = 'Topic 1: 经济 全球 市场 中国 美元 增长 影响 美国 企业 投资 可能 公司 通胀 价格 今年 持续 发展 需求 ';
        var keywords2 = 'Topic 2: 乌克兰 俄罗斯 视频 北约 美国 微博 局势 泽连斯基 总统 表示 提供 普京 俄军 报道 西方 乌军 武器 ';
        var keywords3 = 'Topic 3: 俄罗斯 以色列 美国 无人机 报道 制裁 天然气 英国 瓦格纳 欧盟 普京 国家 伊朗 欧洲 表示 袭击 已经 ';
    } else if (value == '对俄制裁') {
        var keywords0 = 'Topic 0: 乌克兰 俄罗斯 美国 北约 普京 总统 西方 表示 国家 泽连斯基 战争 没有 可能 报道 法国 特朗普 ';
        var keywords1 = 'Topic 1: 中国 国家 世界 俄罗斯 发展 问题 国际 德国 合作 和平 经济 全球 战争 一个 制裁 安全 欧洲 ';
        var keywords2 = 'Topic 2: 乌克兰 俄罗斯 俄军 局势 视频 微博 军事 乌军 无人机 导弹 袭击 超话 地区 新进展 报道 关注 战争 ';
        var keywords3 = 'Topic 3: 美国 中国 经济 以色列 黄金 伊朗 全球 市场 美元 已经 可能 日本 现在 中东 一个 没有 影响 增长 ';
    }
    ;
    d3.select('.theme-river-keywords0').text(keywords0);
    d3.select('.theme-river-keywords1').text(keywords1);
    d3.select('.theme-river-keywords2').text(keywords2);
    d3.select('.theme-river-keywords3').text(keywords3);

    d3.csv('./data/' + value.toString() + '_final.csv', function (d) {
        return {
            date: d['发布时间'],
            topic0: +d.topic0,
            topic1: +d.topic1,
            topic2: +d.topic2,
            topic3: +d.topic3,
        };
    }).then(function (data) {
        /* ----------------------------配置参数------------------------  */
        d3.select('.box').remove()
        const chart = new Chart();
        const config = {
            margins: {top: 80, left: 80, bottom: 50, right: 80},
            textColor: 'black',
            gridColor: 'gray',
            title: value.toString() + '时期主题河流图',
            animateDuration: 1000
        }

        chart.margins(config.margins);
        /* ----------------------------尺度转换------------------------  */
        chart.scaleX = d3.scaleTime()
            .domain([new Date(data[0].date), new Date(data[data.length - 1].date)])
            .range([0, chart.getBodyWidth()]);

        chart.scaleY = d3.scaleLinear()
            .domain([d3.min(data, (d) => d.topic0),
                (Math.floor((
                    d3.max(data, (d) => d.topic0) +
                    d3.max(data, (d) => d.topic1) +
                    d3.max(data, (d) => d.topic2) +
                    d3.max(data, (d) => d.topic3)
                )))])
            .range([chart.getBodyHeight(), 0])

        chart.stack = d3.stack()
            .keys(['topic0', 'topic1', 'topic2', 'topic3'])
            .order(d3.stackOrderNone)
            .offset(d3.stackOffsetWiggle);

        /* ----------------------------渲染面------------------------  */
        if (value == '俄方乌东攻势') {
            var centerY = 80
        } else if (value == '俄方全面进攻') {
            var centerY = 135
        } else if (value == '乌方全面反攻') {
            var centerY = 135
        } else if (value == '俄乌僵持') {
            var centerY = 135
        } else if (value == '对俄制裁') {
            var centerY = 110
        }
        ;
        chart.renderArea = function () {
            const areas = chart.body().insert('g', ':first-child')
                .attr('transform', 'translate(0, -' + centerY + ')')   // 使流图的位置处于Y轴中部
                .selectAll('.area')
                .data(chart.stack(data));

            areas.enter()
                .append('path')
                .attr('class', (d) => 'area area-' + d.key)
                .merge(areas)
                .style('fill', (d, i) => chart._colors(i))
                .transition().duration(config.animateDuration)
                .attrTween('d', areaTween);

            //中间帧函数
            function areaTween(_d) {
                if (!_d) return;
                const generateArea = d3.area()
                    .x((d) => d[0])
                    .y0((d) => d[1])
                    .y1((d) => d[2])
                    .curve(d3.curveCardinal.tension(0));

                const pointX = data.map((d) => chart.scaleX(new Date(d.date)));
                const pointY0 = _d.map((d) => chart.scaleY(d[0]));
                const pointY1 = _d.map((d) => chart.scaleY(d[1]));

                const interpolate = getAreaInterpolate(pointX, pointY0, pointY1);

                const ponits = [];

                return function (t) {
                    ponits.push([interpolate.x(t), interpolate.y0(t), interpolate.y1(t)]);
                    return generateArea(ponits);
                }
            }

            //点插值
            function getAreaInterpolate(pointX, pointY0, pointY1) {

                const domain = d3.range(0, 1, 1 / (pointX.length - 1));
                domain.push(1);

                const interpolateX = d3.scaleLinear()
                    .domain(domain)
                    .range(pointX);

                const interpolateY0 = d3.scaleLinear()
                    .domain(domain)
                    .range(pointY0);

                const interpolateY1 = d3.scaleLinear()
                    .domain(domain)
                    .range(pointY1);
                return {
                    x: interpolateX,
                    y0: interpolateY0,
                    y1: interpolateY1
                };

            }

        }

        /* ----------------------------渲染坐标轴------------------------  */
        if (value == '俄方乌东攻势') {
            var dayX = 16;
            formatX = "%Y-%m-%d"
        } else if (value == '俄方全面进攻') {
            var dayX = 4;
            formatX = "%Y-%m-%d"
        } else if (value == '乌方全面反攻') {
            var dayX = 5;
            formatX = "%Y-%m-%d"
        } else if (value == '俄乌僵持') {
            var dayX = 32;
            formatX = "%Y-%m"
        } else if (value == '对俄制裁') {
            var dayX = 16;
            formatX = "%Y-%m-%d"
        }
        ;
        chart.renderX = function () {
            chart.svg().insert('g', '.body')
                .attr('transform', 'translate(' + chart.bodyX() + ',' + (chart.bodyY() + chart.getBodyHeight()) + ')')
                .attr('class', 'xAxis')
                .call(d3.axisBottom(chart.scaleX).ticks(d3.timeDay.every(dayX)).tickFormat(d3.timeFormat(formatX)));
        }

        chart.renderY = function () {
            chart.svg().insert('g', '.body')
                .attr('transform', 'translate(' + chart.bodyX() + ',' + chart.bodyY() + ')')
                .attr('class', 'yAxis')
                .call(d3.axisLeft(chart.scaleY));
        }

        chart.renderAxis = function () {
            chart.renderX();
            chart.renderY();
        }

        /* ----------------------------渲染文本标签------------------------  */
        chart.renderText = function () {
            d3.select('.xAxis').append('text')
                .attr('class', 'axisText')
                .attr('x', chart.getBodyWidth() + 35)
                .attr('y', 0)
                .attr('fill', config.textColor)
                .attr('dy', 20)

                .text('日期').style('font-family', 'SimSun').style('font-size','18px');

            d3.select('.yAxis').append('text')
                .attr('class', 'axisText')
                .attr('x', 15)
                .attr('y', 0)
                .attr('fill', config.textColor)
                .attr('dy', -10)
                .attr('text-anchor', 'end')
                .style('font-family', 'SimSun')
                .text('每日微博数量').style('font-size','16px');
        }

        /* ----------------------------渲染网格线------------------------  */
        chart.renderGrid = function () {
            d3.selectAll('.xAxis .tick')
                .append('line')
                .attr('class', 'grid')
                .attr('stroke', config.gridColor)
                .attr('stroke-dasharray', '10,10')
                .attr('x1', 0)
                .attr('y1', 0)
                .attr('x2', 0)
                .attr('y2', -chart.getBodyHeight());
        }

        /* ----------------------------渲染图标题------------------------  */
        chart.renderTitle = function () {
            chart.svg().append('text')
                .classed('title', true)
                .attr('x', chart.width() / 2)
                .attr('y', 0)
                .attr('dy', '2em')
                .text(config.title)
                .attr('font-size', '25px')
                .attr('fill', config.textColor)
                .attr('text-anchor', 'middle')
                .attr('stroke', config.textColor);

        }

        /* ----------------------------绑定鼠标交互事件------------------------  */
        chart.addMouseOn = function () {
            //防抖函数
            function debounce(fn, time) {
                let timeId = null;
                return function () {
                    const context = this;
                    const event = d3.event;
                    timeId && clearTimeout(timeId)
                    timeId = setTimeout(function () {
                        d3.event = event;
                        fn.apply(context, arguments);
                    }, time);
                }
            }

            d3.selectAll('.area')
                .on('mouseover', function (d) {
                    const e = d3.event;

                    const position = d3.pointer(d);
                    d.target.style.cursor = 'hand'

                    d3.selectAll('.area')
                        .attr('fill-opacity', 0.3);

                    d3.select(d.target)
                        .attr('fill-opacity', 1);
                    chart.svg()
                        .append('text')
                        .classed('tip', true)
                        .attr('x', position[0] + 50)
                        .attr('y', position[1] - 5)
                        .attr('fill', config.textColor)
                        .text(d3.select(this).datum().key);
                })
                .on('mouseleave', function () {
                    const e = d3.event;

                    d3.selectAll('.area')
                        .attr('fill-opacity', 1);

                    d3.select('.tip').remove();
                })
                .on('mousemover', debounce(function (d) {
                        const position = d3.pointer(d);
                        d3.select('.tip')
                            .attr('x', position[0] + 50)
                            .attr('y', position[1] - 5);
                    }, 6)
                );
        }

        chart.render = function () {

            chart.renderAxis();

            chart.renderText();

            chart.renderGrid();

            chart.renderTitle();

            chart.renderArea();

            chart.addMouseOn();
        }

        chart.renderChart();


    });

    class Chart {
        constructor() {
            this._width = 1000;
            this._height = 400;
            this._margins = {top: 30, left: 30, right: 30, bottom: 30};
            this._data = [];
            this._scaleX = null;
            this._scaleY = null;
            this._colors = d3.scaleOrdinal(d3.schemeCategory10);
            this._box = null;
            this._svg = null;
            this._body = null;
            this._padding = {top: 10, left: 10, right: 10, bottom: 10};
        }

        width(w) {
            if (arguments.length === 0) return this._width;
            this._width = w;
            return this;
        }

        height(h) {
            if (arguments.length === 0) return this._height;
            this._height = h;
            return this;
        }

        margins(m) {
            if (arguments.length === 0) return this._margins;
            this._margins = m;
            return this;
        }

        data(d) {
            if (arguments.length === 0) return this._data;
            this._data = d;
            return this;
        }

        scaleX(x) {
            if (arguments.length === 0) return this._scaleX;
            this._scaleX = x;
            return this;
        }

        scaleY(y) {
            if (arguments.length === 0) return this._scaleY;
            this._scaleY = y;
            return this;
        }

        svg(s) {
            if (arguments.length === 0) return this._svg;
            this._svg = s;
            return this;
        }

        body(b) {
            if (arguments.length === 0) return this._body;
            this._body = b;
            return this;
        }

        box(b) {
            if (arguments.length === 0) return this._box;
            this._box = b;
            return this;
        }

        getBodyWidth() {
            let width = this._width - this._margins.left - this._margins.right;
            return width > 0 ? width : 0;
        }

        getBodyHeight() {
            let height = this._height - this._margins.top - this._margins.bottom;
            return height > 0 ? height : 0;
        }

        padding(p) {
            if (arguments.length === 0) return this._padding;
            this._padding = p;
            return this;
        }

        defineBodyClip() {

            this._svg.append('defs')
                .append('clipPath')
                .attr('id', 'clip')
                .append('rect')
                .attr('width', this.getBodyWidth() + this._padding.left + this._padding.right)
                .attr('height', this.getBodyHeight() + this._padding.top + this._padding.bottom)
                .attr('x', -this._padding.left)
                .attr('y', -this._padding.top);
        }

        render() {
            return this;
        }

        bodyX() {
            return this._margins.left;

        }

        bodyY() {
            return this._margins.top;
        }

        renderBody() {
            if (!this._body) {
                this._body = this._svg.append('g')
                    .attr('class', 'body')
                    .attr('transform', 'translate(' + this.bodyX() + ',' + this.bodyY() + ')')
                    .attr('clip-path', "url(#clip)");
            }

            this.render();
        }

        renderChart() {
            if (!this._box) {
                this._box = d3.select('body')
                    .select('#theme-river-img')
                    .append('div')
                    .attr('class', 'box');
            }

            if (!this._svg) {
                this._svg = this._box.append('svg')
                    .attr('width', this._width)
                    .attr('height', this._height);
            }

            this.defineBodyClip();

            this.renderBody();
        }

    };
}



















