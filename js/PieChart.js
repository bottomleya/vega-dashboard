class PieChart {
  constructor(idStr) {
    
    this.order = 0;
    
    this.canvas_id = "canvas_" + String(idStr);
    this.item_id = "item_" + String(idStr);
    this.itemContent_id = "itemContent_" + String(idStr);
    
    this.title = [];
    
    this.points = [];
    this.options = {};
    
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
  
  setPoints(pointsObj) {
    this.points = pointsObj;
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
        options: {
          maintainAspectRatio: false,
          labels: {
            // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
            render: 'value'
          }
        }
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
}
