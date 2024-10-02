import { Component, OnInit } from '@angular/core';
import { FilesService } from 'src/app/services/files/files.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.scss']
})
export class GraphicsComponent implements OnInit {

  single: any[] = [];
  view: [number, number] = [700, 400];
  showLegend = true;
  gradient = false;
  dataAll: any;

  constructor(
    private _filesService: FilesService
  ) { }
  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this._filesService.inventories().subscribe({
      next: (res: any) => {
        const processedData: any = {};
        res.data.forEach((inventory: any) => {
          const productName = inventory.description;
          const totalValue = parseFloat(inventory.totalValue);

          if (!processedData[productName]) {
            processedData[productName] = totalValue;
          } else {
            processedData[productName] += totalValue;
          }
        });

        this.single = Object.keys(processedData).map(key => {
          return {
            name: key,
            value: processedData[key]
          };
        });
      }
    });
  }
}
