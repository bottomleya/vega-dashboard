class PieChart {
  constructor(divGrid, idStr) {
    
    this.grid = divGrid;
    
    this.points = [];
    
    this.canvas_id = "canvas_" + String(idStr);
    this.item_id = "item_" + String(idStr);
    this.itemContent_id = "itemContent_" + String(idStr);
    
    this.width="800";
    this.height="200";
    
    this.htmlString = "";
    
    this.setDOM();
    
    makeResizableDiv('#'+this.itemContent_id);
    
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
  }
  
  html() {
    this.htmlString = "<div class=\"item-content resizable\" id=\"" + this.itemContent_id + "\"><div class=\"x\"><i class=\"fa fa-xmark\"></i></div><div class=\"resizers inactive\"><div class=\"resizer bottom-right hidden\"></div><canvas id=\"" + this.canvas_id + "\" width=\"" + String(this.width) +"\" height=\"" + String(this.height) + "\"></canvas></div></div>";
    return this.htmlString
  }
  
  createChart() {
    this.chart = new Chart(this.ctx, {
        type: 'doughnut',
        data: {
          labels: [
            'Red',
            'Blue',
            'Yellow'
          ],
          datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
          }]
        }
    });
  }
  
}