themeRiver()
function themeRiver() {
    var selectBox = document.getElementById("theme-river-select");
    var value = selectBox.options[selectBox.selectedIndex].value;
    if (value == '俄方全面进攻') {
        var keywords0 = '金融市场与投资策略: 关键词"市场""指数""板块""投资""加息""黄金""公司"等都与金融市场和投资者的决策紧密相关。此外，"预期""风险""资金""增长""情绪"等词也反映了投资者在决策过程中考虑的各种因素。';
        var keywords1 = '全球经济与市场动态: 关键词"全球""价格""上涨""供应""出口""进口"等都反映了全球市场的经济活动和价格波动。特别是"俄罗斯""乌克兰"的提及，可能与这两个国家在全球能源和粮食供应中的地位有关。';
        var keywords2 = '乌克兰局势与外交谈判: 关键词"乌克兰""俄罗斯""美国""总统""局势""谈判"等都指向了与乌克兰局势相关的外交努力和新闻报道。此外，"微博""新闻""报道"等词也暗示了这一主题与社交媒体和新闻报道的紧密关系。';
        var keywords3 = '国际政治与地缘关系: 这个主题主要涉及国际政治和地缘关系的讨论，包括俄罗斯、美国、中国、乌克兰等国家之间的政治动态和互动。关键词如"制裁""战争""西方""欧盟""北约"等都指向了这些国家之间的政治冲突和外交关系。';
    } else if (value == '俄方乌东攻势') {
        var keywords0 = '全球经济与市场趋势: 关键词"市场""全球经济""影响""价格""增长""出口""通胀""疫情"等都反映了全球经济市场的动态和变化。同时，"美联储""加息"等词也暗示了货币政策对全球经济的影响。此外，"粮食""能源"等关键词也反映了全球经济中重要的商品领域。';
        var keywords1 = '国际能源与政治: 关键词"美国""俄罗斯""乌克兰""北约""欧盟""天然气""石油"等都与能源供应和地缘政治紧密相关。同时，"拜登""普京"等领导人的提及也体现了他们在国际能源政策中的重要作用。';
        var keywords2 = '乌克兰局势与军事动态: 关键词"乌克兰""俄罗斯""俄军""泽连斯基""战争""军事""武器"等都指向了乌克兰地区的冲突和军事活动。同时，"西方""联合国"等词也暗示了国际社会对此事的关注和参与。';
        var keywords3 = '国际政治与经济: 关键词包括"中国""美国""俄罗斯""世界""经济""国际""发展""战略""政治""安全"等，反映了这些国家在全球经济、政治和安全事务中的重要地位，同时也提到了台湾、印度等地区的国际政治问题。';
    } else if (value == '乌方全面反攻') {
        var keywords0 = '欧洲能源政策与地缘政治: 关键词"欧洲""俄罗斯""天然气""美国""德国""欧盟"等都指向了欧洲与俄罗斯之间的能源关系。而"北溪""管道""石油"等词则进一步揭示了欧洲能源供应的地理和政治背景。';
        var keywords1 = '全球经济与市场趋势: 关键词"市场""经济""中国""全球""美元""增长""通胀""能源"等都反映了全球经济市场的动态和变化。同时，"加息""企业""公司""预期"等词也体现了经济政策和市场参与者对未来经济发展的预期。';
        var keywords2 = '乌克兰局势与国际反应: 关键词"俄罗斯""乌克兰""北约""中国""美国"等体现了国际社会的主要参与方。而"普京""泽连斯基""总统""微博""报道"等词则揭示了这一事件在社交媒体和新闻报道中的广泛传播和关注。';
        var keywords3 = '乌克兰战争与军事动态: 关键词如"俄罗斯""乌克兰""俄军""战争""乌军""武器""军事""无人机""导弹"等都直接指向了当前的军事冲突和双方的军事行动。同时，"地区""国家""局势"等词也反映了这场战争对国际局势的影响。';
    } else if (value == '俄乌僵持') {
        var keywords0 = '能源政策与地缘政治: 关键词"俄罗斯""天然气""石油""欧盟""美国"等体现了不同国家在地缘政治中的能源角色。同时，"制裁""无人机""袭击"等词汇也揭示了能源政策与地缘政治之间的紧张关系。此外，"以色列""伊朗""哈马斯"等词汇也显示了中东地区在能源和地缘政治中的重要地位。';
        var keywords1 = '乌克兰局势与军事动态: 关键词"乌克兰""俄罗斯""北约""战争""军事""武器"等直接指向了当前的军事冲突和双方的军事行动。同时，"视频""报道""总统"等词汇也反映了媒体对这一事件的广泛关注。';
        var keywords2 = '全球经济与市场趋势: 关键词"经济""全球""市场""增长""投资""通胀"等反映了全球经济的整体趋势和主要影响因素。同时，"企业""公司""能源""加息"等词汇也展示了不同经济实体在市场中的行为和策略。';
        var keywords3 = '国际政治与和平发展: 关键词包括"美国""中国""俄罗斯""战争""世界""政治""合作"等，显示了不同国家在国际事务中的角色与关系。同时，"和平""发展""战略""安全"等词汇体现了对于国际关系中稳定与繁荣的追求。';
    } else if (value == '对俄制裁') {
        var keywords0 = '全球经济与投资: 关键词"美国""中国""经济""全球""市场""美元"等揭示了全球经济的主要驱动力和市场状况。同时，"以色列""伊朗""中东""石油"等词则展示了地缘政治对全球经济的影响。此外，"黄金""增长""投资"等词则反映了经济活动中投资者和市场的关注点。';
        var keywords1 = '乌克兰军事动态: 关键词"乌克兰""俄罗斯""俄军""军事""无人机""导弹"等直接关联到乌克兰的军事行动和冲突升级。同时，"局势""视频""微博""关注""打击"等词则展示了媒体和公众对这一军事动态的关注和报道。';
        var keywords2 = '国际政治与合作: 关键词"中国""世界""俄罗斯""发展""国际"等揭示了主要国家在国际舞台上的地位和角色。同时，"和平""经济""全球""合作"等词则表达了国际间合作与共同发展的愿望。此外，"战争""制裁""安全"等词也反映了国际政治中的挑战和冲突。';
        var keywords3 = '乌克兰冲突与国际支持: 关键词如"乌克兰""俄罗斯""美国""北约""普京"等直接关联到乌克兰与俄罗斯之间的冲突，而"总统""西方""支持""援助"等词则表明国际社会对此冲突的态度和行动。';
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
                .attr('x', chart.getBodyWidth() + 45)
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
                    
                    var txt;

                    if(value == '俄方全面进攻'){
                        if(d3.select(this).datum().key == 'topic0'){
                            txt = '国际政治与地缘关系'
                        }else if(d3.select(this).datum().key == 'topic1'){
                            txt = '乌克兰局势与外交谈判'
                        }else if(d3.select(this).datum().key == 'topic2'){
                            txt = '全球经济与市场动态'
                        }else if(d3.select(this).datum().key == 'topic3'){
                            txt = '金融市场与投资策略'
                        }
                    }else if(value == '俄方乌东攻势'){
                        if(d3.select(this).datum().key == 'topic0'){
                            txt = '国际政治与经济'
                        }else if(d3.select(this).datum().key == 'topic1'){
                            txt = '乌克兰局势与军事动态'
                        }else if(d3.select(this).datum().key == 'topic2'){
                            txt = '国际能源与政治'
                        }else if(d3.select(this).datum().key == 'topic3'){
                            txt = '全球经济与市场趋势'
                        }
                    }else if(value == '乌方全面反攻'){
                        if(d3.select(this).datum().key == 'topic0'){
                            txt = '乌克兰战争与军事动态'
                        }else if(d3.select(this).datum().key == 'topic1'){
                            txt = '乌克兰局势与国际反应'
                        }else if(d3.select(this).datum().key == 'topic2'){
                            txt = '全球经济与市场趋势'
                        }else if(d3.select(this).datum().key == 'topic3'){
                            txt = '欧洲能源政策与地缘政治'
                        }
                    }else if(value == '俄乌僵持'){
                        if(d3.select(this).datum().key == 'topic0'){
                            txt = '国际政治与和平发展'
                        }else if(d3.select(this).datum().key == 'topic1'){
                            txt = '全球经济与市场趋势'
                        }else if(d3.select(this).datum().key == 'topic2'){
                            txt = '乌克兰局势与军事动态'
                        }else if(d3.select(this).datum().key == 'topic3'){
                            txt = '能源政策与地缘政治'
                        }
                    }else if(value == '对俄制裁'){
                        if(d3.select(this).datum().key == 'topic0'){
                            txt = '乌克兰冲突与国际支持'
                        }else if(d3.select(this).datum().key == 'topic1'){
                            txt = '国际政治与合作'
                        }else if(d3.select(this).datum().key == 'topic2'){
                            txt = '乌克兰军事动态'
                        }else if(d3.select(this).datum().key == 'topic3'){
                            txt = '全球经济与投资'
                        }
                    }
                    
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
                        .text(txt);
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



















