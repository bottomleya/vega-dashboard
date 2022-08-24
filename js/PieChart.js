class PieChart {
  constructor(divGrid, idStr) {
    
    this.grid = divGrid;
    
    this.points = [];
    
    this.canvas_id = "canvas_" + String(idStr);
    
    this.item_id = "item_" + String(idStr);
    
    this.width="800";
    this.height="200";
           
  }
  
  setDOM() {
    var item = document.createElement('div');
    item.setAttribute('class', 'item');
    item.innerHTML = this.html();
    document.body.appendChild(item);
    grid.add([item]);
  }
  
  html() {
    this.htmlString = "<div class=\"item-content resizable\" id=\"" + this.item_id + "\"><div class=\"x\"><i class=\"fa fa-xmark\"></i></div><div class=\"resizers inactive\"><div class=\"resizer bottom-right hidden\"></div><canvas id=\"" + this.canvas_id + "\" width=\"" + String(this.width) +"\" height=\"" + String(this.height) + "\"></canvas></div></div>";
    return this.htmlString
  }
    
}
