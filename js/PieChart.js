class PieChart {
  constructor(idStr) {
    
    this.order = 0;
    
    this.canvas_id = "canvas_" + String(idStr);
    this.item_id = "item_" + String(idStr);
    this.itemContent_id = "itemContent_" + String(idStr);
    
    this.config = {
      title:      "Default Pie Chart",
      width:      "300",
      height:     "300",
      points:     []      
    }
    
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
  
  createChart() {
    let labels = [];
    let data = [];
    let colors = [];
    // parse points
    for (let i=0; i<this.config.points.length; i++) {
      labels.push(this.config.points[i].displayName);
      data.push(this.config.points[i].values[0]);
      colors.push(this.config.points[i].color);
    }
    this.chart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: this.config.title,
            data: data,
            backgroundColor: colors,
            hoverOffset: 4
          }]
        },
        options: {
            maintainAspectRatio: false
        }
    });
  }
  
}
