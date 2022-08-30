class PieChart {
  constructor(idStr) {
    
    this.order = 0;
    
    this.canvas_id = "canvas_" + String(idStr);
    this.item_id = "item_" + String(idStr);
    this.itemContent_id = "itemContent_" + String(idStr);
    
    
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
  
  addPoint(name) {
    this.points.push(new Point(name));
    this.createChart();
  }
  
  createChart() {
    let labels = [];
    let data = [];
    let colors = [];
    // parse points
    for (let i=0; i<this.points.length; i++) {
      labels.push(this.points[i].displayName);
      data.push(this.points[i].values[0]);
      colors.push(this.points[i].color);
    }
    this.chart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: this.title,
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
  
  getConfig() {
    
    let config = [];
    // push blank row for adding new points
    config.push(['\<i class=\"fa-solid fa-circle-plus\"\>\<\/i\>',
                 '\<input type=\"text\" value=\"\"\>',
                 '\<input type=\"text\" value=\"\"\>',
                 '\<input type=\"text\" value=\"\"\>',
                 '\<input type=\"color\" value=\"\#FFFFFF\"\>',
                 '\<input type=\"text\" value=\"\"\>']);
    // add rest of points below
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
