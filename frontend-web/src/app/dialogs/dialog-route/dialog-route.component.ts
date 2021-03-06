import { OnePoiResponse } from 'src/app/interfaces/one-poi-response';
import { PoiResponse } from './../../interfaces/poi-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RouteService } from 'src/app/services/route.service';
import { PoiService } from 'src/app/services/poi.service';
import { RouteDto } from 'src/app/dto/route.dto';

@Component({
  selector: 'app-dialog-route',
  templateUrl: './dialog-route.component.html',
  styleUrls: ['./dialog-route.component.scss']
})
export class DialogRouteComponent implements OnInit {
  allPois: OnePoiResponse[];
  edit: boolean;
  name: string;
  routeId: string;
  selectedPois = [];
  form: FormGroup;

  constructor(private snackBar: MatSnackBar, private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any,
  private poisService: PoiService, private routeService: RouteService, public dialogRef: MatDialogRef<DialogRouteComponent>) { }

  ngOnInit() {
    this.getAllPois();
    this.createForm();
    if (this.data.route) {
      this.edit = true;
      this.routeId = this.data.route.id;
    } else {
      this.edit = false;
    }
  }

  onSubmit() {
    if (this.edit) {
      const editedRoute: RouteDto = <RouteDto>this.form.value;
      this.routeService.edit(this.routeId, editedRoute).subscribe(r => {
        this.dialogRef.close('confirm');
      }, e => {
        this.snackBar.open('Failed to create.', 'Close', {duration: 3000});
      });
    } else {
      const newRoute: RouteDto = <RouteDto>this.form.value;
      this.routeService.create(newRoute).subscribe(r => this.dialogRef.close('confirm'),
      e => this.snackBar.open('Failed to create.', 'Close', {duration: 3000}));
    }
  }

  createForm() {
    if (this.data) {
      const editForm: FormGroup = this.fb.group ({
        name: [this.data.route.name, Validators.compose ([ Validators.required ])],
        pois: [this.selectedPois, Validators.compose ([ Validators.required ])]
      });
      this.form = editForm;
    } else {
      const newForm: FormGroup = this.fb.group ({
        name: [null, Validators.compose ([ Validators.required ])],
        pois: [null, Validators.compose ([ Validators.required ])]
      });
      this.form = newForm;
    }
  }

  getAllPois() {
    this.poisService.getAll().subscribe(pois => {
      this.allPois = pois.rows;
      if (this.data.route) {
        this.data.route.pois.forEach(p => {
            this.selectedPois.push(p.id);
          });
      }
    }, error => this.snackBar.open('There was an error loading data.', 'Close', {duration: 3000}));
  }

  addRoute() {
    const poisIds: string[] = [];
    this.allPois.forEach(poi => {
      poisIds.push(poi.id);
    });
    const routeCreateDto = new RouteDto(this.name, poisIds);
    this.routeService.create(routeCreateDto).subscribe(
      route => {
        this.dialogRef.close('confirm');
      }
    );
  }

  editRoute() {
    const poisIds: string[] = [];
    this.allPois.forEach(poi => {
      poisIds.push(poi.id);
    });
    const routeCreateDto = new RouteDto(this.name, poisIds);
    this.routeService.edit(this.routeId, routeCreateDto).subscribe(
      categoria => {
        this.dialogRef.close('confirm');
      }
    );
  }

}
