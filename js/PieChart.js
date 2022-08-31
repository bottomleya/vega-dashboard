class PieChart {
  constructor(idStr) {
    
    this.order = 0;
    
    this.canvas_id = "canvas_" + String(idStr);
    this.item_id = "item_" + String(idStr);
    this.itemContent_id = "itemContent_" + String(idStr);
    
    this.options = {
      events: false,
      animation: {
        duration: 500,
        easing: "easeOutQuart",
        onComplete: function () {
          var ctx = this.chart.ctx;
          ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontFamily, 'normal', Chart.defaults.global.defaultFontFamily);
          ctx.textAlign = 'center';
          ctx.textBaseline = 'bottom';

          this.data.datasets.forEach(function (dataset) {

            for (var i = 0; i < dataset.data.length; i++) {
              var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model,
                  total = dataset._meta[Object.keys(dataset._meta)[0]].total,
                  mid_radius = model.innerRadius + (model.outerRadius - model.innerRadius)/2,
                  start_angle = model.startAngle,
                  end_angle = model.endAngle,
                  mid_angle = start_angle + (end_angle - start_angle)/2;

              var x = mid_radius * Math.cos(mid_angle);
              var y = mid_radius * Math.sin(mid_angle);

              ctx.fillStyle = '#fff';
              if (i == 3){ // Darker text color for lighter background
                ctx.fillStyle = '#444';
              }
              var percent = String(Math.round(dataset.data[i]/total*100)) + "%";      
              //Don't Display If Legend is hide or value is 0
              if(dataset.data[i] != 0 && dataset._meta[0].data[i].hidden != true) {
                ctx.fillText(dataset.data[i], model.x + x, model.y + y);
                // Display percent in another line, line break doesn't work for fillText
                ctx.fillText(percent, model.x + x, model.y + y + 15);
              }
            }
          });               
        }
      }
    };
    
    
    this.title = [];
    
    this.points = [];
    
    this.htmlString = "";
    
    this.setDOM();
    
    makeResizableDiv('#'+this.itemContent_id);
    enableResizers();
    
    this.ctx = document.getElementById(this.canvas_id);
    
    this.createChart();
  }
  
  setDOM() {
    var item = document.createElement('div');
    item.setAttribute('class', 'item');
    item.setAttribute('id', this.item_id);
    item.innerHTML = this.html();
    document.body.appendChild(item);
    grid.add([item]);
    this.saveOrder();
  }
  
  html() {
    this.htmlString = "<div class=\"item-content resizable\" id=\"" + this.itemContent_id + "\"><div class=\"x\"><i class=\"fa fa-xmark\"></i></div><div class=\"resizers inactive\"><div class=\"resizer bottom-right hidden\"></div><canvas id=\"" + this.canvas_id + "\" width=\"" + String(this.width) +"\" height=\"" + String(this.height) + "\"></canvas></div></div>";
    return this.htmlString
  }
  
  saveOrder() {
    var gridItemList = grid.getItems();
    for (let i=0; i<gridItemList.length; i++) {
      if (gridItemList[i].getElement().id == this.item_id) {
        this.order = i;
      }
    }
  }
  
  addPoint(name, displayName, units, colorStr, values) {
    this.points.push(new Point(name, displayName, units, colorStr, values));
    this.updateChart();
  }
  
  parsePoints() {
    this.labels = [];
    this.data = [];
    this.colors = [];
    // parse points
    for (let i=0; i<this.points.length; i++) {
      this.labels.push(this.points[i].displayName);
      this.data.push(this.points[i].values[0]);
      this.colors.push(this.points[i].color);
    }
  }
  
  createChart() {
    this.parsePoints();
    this.chart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
          labels: this.labels,
          datasets: [{
            label: this.title,
            data: this.data,
            backgroundColor: this.colors,
            hoverOffset: 4
          }]
        },
        options: this.options
    });
  }
  
  updateChart() {
    this.parsePoints();
    this.chart.data = {
          labels: this.labels,
          datasets: [{
            label: this.title,
            data: this.data,
            backgroundColor: this.colors,
            hoverOffset: 4
          }]
        };
    this.chart.update();
  }
  
  getConfig() {
    
    let config = [];
    for (let i=0; i<this.points.length; i++) {
        config.push(['',
                   '\<input type=\"text\" value=\"' + this.points[i].name + '\"\>',
                   '\<input type=\"text\" value=\"' + this.points[i].displayName + '\"\>',
                   '\<input type=\"text\" value=\"' + this.points[i].units + '\"\>',
                   '\<input type=\"color\" value=\"' + this.points[i].color + '\"\>',
                   '\<input type=\"text\" value=\"' + this.points[i].values + '\"\>']); 
    }
    
    var dataObject = {
      columns: [{
        title: ""
      }, {
        title: "Point Name"
      }, {
        title: "Display Name"
      }, {
        title: "Units"
      }, {
        title: "Color"
      }, {
        title: "Values"
      }],
      data: config
    };
    
    return dataObject;
  }
  
}
