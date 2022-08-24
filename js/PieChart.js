class PieChart {
  constructor(div, idStr) {
    
    this.parentDiv = div;
    
    this.points = [];
    
    this.canvas_id = "canvas_" + String(idStr);
    
    this.item_id = "idem_" + String(idStr);
    
    this.width="800";
    this.height="200";
    
    
       
  }
  
  setDOM() {
    
  }
  
  html() {
    return "<div class=\"item\"><div class=\"item-content resizable\" id=\"" + this.item_id + "\"><div class=\"x\"><i class=\"fa fa-xmark\"></i></div><div class=\"resizers inactive\"><div class=\"resizer bottom-right hidden\"></div><canvas id=\"" + this.canvas_id + "\" width=\"" + String(this.width) +"\" height=\"" + String(this.height) + "\"></canvas></div></div></div>"
  }
    
}
