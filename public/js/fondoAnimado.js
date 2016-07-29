/*
      $(function(){
        
        var canvas = $("#paper")[0],
            c = canvas.getContext("2d"),
            size = canvas.width, 
            rowsCols = 100,
            cellSize = size / rowsCols, 
            cells = [];
        
        c.fillStyle = "black";
        c.fillRect(0,0,size,size);
        
        function Cell(x, y){
          this.x = x;
          this.y = y;
          this.dx = x;
          this.dy = y;
        }
        Cell.prototype.draw = function(){
          this.x += (this.dx - this.x) / 4;
          this.y += (this.dy - this.y) / 4;
          if (Math.random() < 0.005 &&  
              Math.abs(this.x - this.dx) < 0.1 && 
              Math.abs(this.y - this.dy) < 0.1){
            var dir = parseInt(Math.random() * 4); 
            if (dir == 0){
              this.dx -= cellSize;
            }else if (dir == 1){
              this.dx += cellSize;
            }else if (dir == 2){
              this.dy -= cellSize;
            }else if (dir == 3){
              this.dy += cellSize;
            }
            this.dx = Math.max(0, Math.min(size - cellSize, this.dx));
            this.dy = Math.max(0, Math.min(size - cellSize, this.dy));
          }
          c.fillStyle = "#47aede";
          c.fillRect(this.x, this.y, cellSize, cellSize);
        };
        
        for (var i = 0; i < rowsCols; i++){
          for (var j = 0; j < rowsCols; j++){
            cells.push(new Cell(j * cellSize, i * cellSize))
          }
        }
        
        setInterval(function(){
          c.fillStyle = "#ffffff";
          c.fillRect(0,0,size,size);
          for (var i = 0; i < cells.length; i++){
            cells[i].draw(); 
          }
        }, 30);
        
      });
    
    */
      $(function(){
        
        var canvas = $("#paper")[0],
            c = canvas.getContext("2d"),
            size = canvas.width,
            centerX = size / 2,
            centerY = size / 2,
            rotX = 0, rotY = 0,
            perspective = 340, 
            currX, currY,
            pointNum = 500,
            points = [], 
            radius = 120, x, y, z,
            TWO_PI = Math.PI * 2,
            angleA = 0, angleB = 0;
        
        
        
        c.fillStyle = "#47aede";
        c.fillRect(0, 0, size, size);
        
        for (var i = 0; i < pointNum; i++){
          angleA = TWO_PI * Math.random();
          angleB = TWO_PI * Math.random();
          x = radius * Math.cos(angleA) * Math.sin(angleB);
          y = radius * Math.sin(angleA) * Math.sin(angleB);
          z = radius * Math.cos(angleB);
          points.push(x, y, z);
        }
        
        
        setInterval(function(){
          rotX += 0.05;
          rotY += 0.05;
          c.fillStyle = "#47aede";
          c.fillRect(0, 0, size, size);
          
          c.fillStyle = "#ffffff";
           
          for (var i = 0; i < pointNum; i+=3){
            point3d(points[i], points[i + 1], points[i + 2]);
            c.fillRect(currX, currY, 5, 5);
          }
          
        }, 30);
        
        // based on code by Andries Odendaal - www.wireframe.co.za
        function point3d(x, y, z){
          var cosX = Math.cos(rotX),
              cosY = Math.cos(rotY),
              sinX = Math.sin(rotX),
              sinY = Math.sin(rotY);
          
          var posZ = z * cosX - x * sinX,
              posX = z * sinX + x * cosX,
              posY = y * cosY - posZ * sinY,
              posZ = y * sinY + posZ * cosY,
              depth = 1/(posZ/perspective+1);
 
          currX = posX * depth + centerX;
          currY = posY * depth + centerY-80;
        }
        
      });
    