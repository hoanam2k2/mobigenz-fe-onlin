import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { DividerModule } from 'primeng/divider';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
@NgModule({
  declarations: [],
  imports: [
    ButtonModule,
    GalleriaModule,
    ImageModule,
    DividerModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    CheckboxModule,
  ],
  exports: [
    ButtonModule,
    GalleriaModule,
    ImageModule,
    DividerModule,
    TabViewModule,
    TableModule,
    InputTextModule,
    RadioButtonModule,
    InputTextareaModule,
    CheckboxModule,
  ],
})
export class CommonPrimengModuleModule {}